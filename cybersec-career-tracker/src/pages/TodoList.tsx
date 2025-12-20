import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { CheckCircle, Circle, Trash2, Plus, Target, TrendingUp, ListTodo, Flame, Award, Sparkles, RefreshCw } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import CyberCard from '../components/ui/CyberCard';
import CyberButton from '../components/ui/CyberButton';
import CyberInput from '../components/ui/CyberInput';
import CyberTabs from '../components/ui/CyberTabs';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';
import { generateTodoRecommendations } from '../services/openaiService';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'lab' | 'tool' | 'theory' | 'portfolio' | 'certification';
  dueDate?: Date;
  source: 'auto' | 'manual';
  phaseNumber?: number;
  createdAt: Date;
}

export default function TodoList() {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    category: 'lab' as 'lab' | 'tool' | 'theory' | 'portfolio' | 'certification'
  });
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiTodos, setAiTodos] = useState<any[]>([]);

  useEffect(() => {
    if (currentUser) {
      loadTodos();
    }
  }, [currentUser]);

  const loadTodos = async () => {
    if (!currentUser) return;

    try {
      const todosDoc = await getDoc(doc(db, 'todos', currentUser.uid));

      if (todosDoc.exists()) {
        const data = todosDoc.data();
        setTodos(data.items || []);
      } else {
        // Generate initial todos from curriculum
        await generateTodosFromCurriculum();
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTodosFromCurriculum = async () => {
    if (!currentUser) return;
  
    try {
      const goalsDoc = await getDoc(doc(db, 'userGoals', currentUser.uid));
  
      if (!goalsDoc.exists()) return;
  
      const data = goalsDoc.data();
      const phases = data.generatedCurriculum?.phases || [];
  
      if (phases.length === 0) return;
  
      // Get current phase
      const startDate = data.startDate?.toDate() || new Date();
      const weeksSinceStart = Math.floor((new Date().getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  
      let currentPhase = phases[0];
      for (const phase of phases) {
        if (weeksSinceStart >= phase.startWeek && weeksSinceStart <= phase.endWeek) {
          currentPhase = phase;
          break;
        }
      }
  
      const generatedTodos: Todo[] = [];
  
      // Generate lab todos
      if (currentPhase.labs && currentPhase.labs.length > 0) {
        currentPhase.labs.slice(0, 3).forEach((lab: string, index: number) => {
          generatedTodos.push({
            id: `auto-lab-${index}-${Date.now()}`,
            title: `Complete Lab: ${lab}`,
            description: `Complete this lab and write a detailed writeup with screenshots`,
            completed: false,
            priority: 'high',
            category: 'lab',
            source: 'auto',
            phaseNumber: currentPhase.phaseNumber,
            createdAt: new Date()
          });
        });
      }
  
      // Generate tool practice todos
      if (currentPhase.tools && currentPhase.tools.length > 0) {
        currentPhase.tools.slice(0, 2).forEach((tool: string, index: number) => {
          generatedTodos.push({
            id: `auto-tool-${index}-${Date.now()}`,
            title: `Practice with ${tool}`,
            description: `Spend at least 2 hours practicing with ${tool} and document your work`,
            completed: false,
            priority: 'medium',
            category: 'tool',
            source: 'auto',
            phaseNumber: currentPhase.phaseNumber,
            createdAt: new Date()
          });
        });
      }
  
      // Generate skill learning todos
      if (currentPhase.skills && currentPhase.skills.length > 0) {
        currentPhase.skills.slice(0, 2).forEach((skill: string, index: number) => {
          generatedTodos.push({
            id: `auto-skill-${index}-${Date.now()}`,
            title: `Learn: ${skill}`,
            description: `Study ${skill} and complete related exercises`,
            completed: false,
            priority: 'medium',
            category: 'theory',
            source: 'auto',
            phaseNumber: currentPhase.phaseNumber,
            createdAt: new Date()
          });
        });
      }
  
      // Generate certification todo if applicable
      if (currentPhase.certifications && currentPhase.certifications.length > 0) {
        generatedTodos.push({
          id: `auto-cert-${Date.now()}`,
          title: `Prepare for ${currentPhase.certifications[0]}`,
          description: `Study for certification exam and complete practice tests`,
          completed: false,
          priority: 'high',
          category: 'certification',
          source: 'auto',
          phaseNumber: currentPhase.phaseNumber,
          createdAt: new Date()
        });
      }
  
      setTodos(generatedTodos);
      await saveTodos(generatedTodos);
    } catch (error) {
      console.error('Error generating todos:', error);
    }
  };

  const saveTodos = async (todosToSave: Todo[]) => {
    if (!currentUser) return;

    try {
      await setDoc(doc(db, 'todos', currentUser.uid), {
        items: todosToSave,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
    await saveTodos(updated);

    // If completed, check if we should generate new todos
    const completedTodo = updated.find(t => t.id === id);
    if (completedTodo?.completed && completedTodo.source === 'auto') {
      // Check if all auto todos are completed
      const autoTodos = updated.filter(t => t.source === 'auto');
      const allCompleted = autoTodos.every(t => t.completed);

      if (allCompleted) {
        // Generate next set of todos
        setTimeout(() => generateTodosFromCurriculum(), 1000);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    const updated = todos.filter(todo => todo.id !== id);
    setTodos(updated);
    await saveTodos(updated);
  };

  const addTodo = async () => {
    if (!newTodo.title.trim()) return;

    const todo: Todo = {
      id: `manual-${Date.now()}`,
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      priority: newTodo.priority,
      category: newTodo.category,
      source: 'manual',
      createdAt: new Date()
    };

    const updated = [...todos, todo];
    setTodos(updated);
    await saveTodos(updated);

    setNewTodo({
      title: '',
      description: '',
      priority: 'medium',
      category: 'lab'
    });
    setShowAddForm(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'lab': return '🧪';
      case 'tool': return '🔧';
      case 'theory': return '📚';
      case 'portfolio': return '💼';
      case 'certification': return '🏆';
      default: return '📝';
    }
  };

  const [filterTab, setFilterTab] = useState('all');

  const generateAITodos = async () => {
    if (!currentUser) return;
    
    setGeneratingAI(true);
    try {
      // Get user goals
      const goalsDoc = await getDoc(doc(db, 'userGoals', currentUser.uid));
      const goalsData = goalsDoc.exists() ? goalsDoc.data() : {};
      
      // Get current skills
      const skillsDoc = await getDoc(doc(db, 'skillsMatrix', currentUser.uid));
      const skillsData = skillsDoc.exists() ? skillsDoc.data().skills : {};
      
      // Get recently completed todos
      const completedTodos = todos.filter(t => t.completed).slice(-10);
      
      // Generate AI recommendations
      const recommendations = await generateTodoRecommendations(
        goalsData,
        skillsData,
        completedTodos
      );
      
      setAiTodos(recommendations);
    } catch (error) {
      console.error('Error generating AI todos:', error);
    } finally {
      setGeneratingAI(false);
    }
  };

  const addAITodo = async (aiTodo: any) => {
    const todo: Todo = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: aiTodo.title,
      description: aiTodo.description,
      completed: false,
      priority: aiTodo.priority,
      category: aiTodo.category,
      source: 'manual',
      createdAt: new Date()
    };

    const updated = [...todos, todo];
    setTodos(updated);
    await saveTodos(updated);
    
    // Remove from AI suggestions
    setAiTodos(aiTodos.filter(t => t.title !== aiTodo.title));
  };

  if (loading) {
    return <LoadingState fullScreen message="Loading your tasks..." />;
  }

  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);
  const highPriorityTodos = activeTodos.filter(t => t.priority === 'high');

  const filteredTodos = filterTab === 'all'
    ? activeTodos
    : filterTab === 'completed'
    ? completedTodos
    : activeTodos.filter(t => t.priority === filterTab);

  return (
    <div className="min-h-screen bg-[#0B0E11] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <PageHeader
          title="TODAY'S TASKS"
          subtitle={`${activeTodos.length} active • ${completedTodos.length} completed • ${highPriorityTodos.length} high priority`}
          icon={ListTodo}
          primaryAction={{
            label: 'Add Task',
            onClick: () => setShowAddForm(!showAddForm),
            icon: Plus
          }}
          secondaryActions={[
            {
              label: generatingAI ? 'Generating...' : 'AI Suggestions',
              onClick: generateAITodos,
              icon: Sparkles,
              disabled: generatingAI
            }
          ]}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CyberCard variant="blue" className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyber-blue/20">
                <Target className="w-8 h-8 text-cyber-blue" />
              </div>
              <div>
                <p className="text-3xl font-black text-white font-mono">{activeTodos.length}</p>
                <p className="text-sm text-text-tertiary font-mono">Active Tasks</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard variant="default" className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyber-green/20">
                <CheckCircle className="w-8 h-8 text-cyber-green" />
              </div>
              <div>
                <p className="text-3xl font-black text-white font-mono">{completedTodos.length}</p>
                <p className="text-sm text-text-tertiary font-mono">Completed</p>
              </div>
            </div>
          </CyberCard>
          <CyberCard variant="gold" className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyber-gold/20">
                <Flame className="w-8 h-8 text-cyber-gold" />
              </div>
              <div>
                <p className="text-3xl font-black text-white font-mono">
                  {todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0}%
                </p>
                <p className="text-sm text-text-tertiary font-mono">Completion Rate</p>
              </div>
            </div>
          </CyberCard>
        </div>

        {/* AI Todo Suggestions */}
        {aiTodos.length > 0 && (
          <CyberCard variant="blue" className="p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-primary">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                <h3 className="text-lg sm:text-xl font-mono font-bold text-white">AI-Powered Task Suggestions</h3>
              </div>
              <button 
                onClick={() => setAiTodos([])}
                className="text-text-secondary hover:text-text-primary touch-target"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {aiTodos.map((aiTodo, index) => (
                <CyberCard key={index} variant="default" className="p-3 sm:p-4">
                  <div className="mb-3">
                    <h4 className="font-bold text-text-primary mb-1 text-sm sm:text-base">{aiTodo.title}</h4>
                    <p className="text-xs sm:text-sm text-text-secondary">{aiTodo.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs text-text-tertiary gap-2 mb-3">
                    <span>{aiTodo.estimatedHours} hours</span>
                    <span className="capitalize">{aiTodo.priority} priority</span>
                    <span className="capitalize">{aiTodo.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {aiTodo.skillsDeveloped.slice(0, 3).map((skill: string, skillIndex: number) => (
                      <span key={skillIndex} className="text-xs px-2 py-1 bg-cyber-blue/20 text-cyber-blue rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <CyberButton 
                    variant="primary" 
                    size="sm" 
                    onClick={() => addAITodo(aiTodo)}
                    className="w-full btn-responsive"
                  >
                    Add to My Tasks
                  </CyberButton>
                </CyberCard>
              ))}
            </div>
          </CyberCard>
        )}

        {/* Add Todo Form */}
        {showAddForm && (
          <CyberCard variant="blue" className="p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-mono font-bold text-white mb-4 sm:mb-6">Add New Task</h3>
            <div className="space-y-3 sm:space-y-4">
              <CyberInput
                label="Title"
                value={newTodo.title}
                onChange={(value) => setNewTodo({ ...newTodo, title: value })}
                placeholder="Enter task title..."
                required
                className="input-responsive"
              />

              <div>
                <label className="block text-sm font-mono font-medium text-text-secondary mb-2">
                  Description
                </label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-cyber-bg-surface/50 backdrop-blur-sm border border-cyber-blue/20 rounded-lg text-text-primary font-mono text-sm placeholder:text-text-muted focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/30 hover:border-cyber-blue/40 transition-all duration-200 ease-out input-responsive"
                  rows={3}
                  placeholder="Enter task description..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-mono font-medium text-text-secondary mb-2">Priority</label>
                  <select
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as any })}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-cyber-bg-surface/50 backdrop-blur-sm border border-cyber-blue/20 rounded-lg text-text-primary font-mono text-sm focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/30 hover:border-cyber-blue/40 transition-all duration-200 ease-out input-responsive"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-mono font-medium text-text-secondary mb-2">Category</label>
                  <select
                    value={newTodo.category}
                    onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value as any })}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-cyber-bg-surface/50 backdrop-blur-sm border border-cyber-blue/20 rounded-lg text-text-primary font-mono text-sm focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/30 hover:border-cyber-blue/40 transition-all duration-200 ease-out input-responsive"
                  >
                    <option value="lab">Lab</option>
                    <option value="tool">Tool</option>
                    <option value="theory">Theory</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="certification">Certification</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <CyberButton variant="primary" onClick={addTodo} className="flex-1 btn-responsive">
                  Add Task
                </CyberButton>
                <CyberButton variant="ghost" onClick={() => setShowAddForm(false)} className="btn-responsive">
                  Cancel
                </CyberButton>
              </div>
            </div>
          </CyberCard>
        )}

        {/* Filter Tabs */}
        <CyberTabs
          tabs={[
            { id: 'all', label: 'All Active', icon: Target, count: activeTodos.length },
            { id: 'high', label: 'High Priority', icon: Flame, count: highPriorityTodos.length },
            { id: 'completed', label: 'Completed', icon: CheckCircle, count: completedTodos.length }
          ]}
          activeTab={filterTab}
          onChange={setFilterTab}
          variant="pill"
          className="mb-8"
        />

        {/* Task List */}
        {filteredTodos.length === 0 ? (
          <EmptyState
            icon={ListTodo}
            title="No tasks found"
            description={filterTab === 'completed' ? "You haven't completed any tasks yet. Keep working!" : "You're all caught up! Add a new task to get started."}
            action={filterTab !== 'completed' ? {
              label: 'Add Task',
              onClick: () => setShowAddForm(true),
              icon: Plus
            } : undefined}
          />
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredTodos.map(todo => (
              <CyberCard key={todo.id} variant="default" className="p-4 sm:p-5 hover:scale-[1.01] transition-transform duration-200" hoverable>
                <div className="flex items-start gap-3 sm:gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex-shrink-0 mt-1 group touch-target"
                  >
                    {todo.completed ? (
                      <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-cyber-green group-hover:scale-110 transition-transform duration-200" />
                    ) : (
                      <Circle className="w-5 sm:w-6 h-5 sm:h-6 text-text-tertiary group-hover:text-cyber-blue group-hover:scale-110 transition-all duration-200" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="text-lg sm:text-xl">{getCategoryIcon(todo.category)}</span>
                        <h3 className={`font-mono font-bold text-base sm:text-lg ${todo.completed ? 'line-through text-text-tertiary' : 'text-white'}`}>
                          {todo.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className={`
                          px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-xs font-mono font-medium border
                          ${todo.priority === 'high' ? 'bg-cyber-red/20 text-cyber-red border-cyber-red/30' : ''}
                          ${todo.priority === 'medium' ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/30' : ''}
                          ${todo.priority === 'low' ? 'bg-cyber-green/20 text-cyber-green border-cyber-green/30' : ''}
                        `}>
                          {todo.priority.toUpperCase()}
                        </span>

                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-text-tertiary hover:text-cyber-red hover:scale-110 transition-all duration-200 touch-target"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {todo.description && (
                      <p className="text-xs sm:text-sm text-text-tertiary font-mono mb-2">{todo.description}</p>
                    )}

                    {todo.source === 'auto' && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 sm:gap-2 text-xs px-2 py-1 sm:px-2.5 sm:py-1 bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 rounded-md font-mono">
                          <Award className="w-3 h-3" />
                          <span className="hidden sm:inline">Auto-generated from Phase</span>
                          <span className="sm:hidden">Phase</span> {todo.phaseNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CyberCard>
            ))}
          </div>
        )}

        {todos.length === 0 && !showAddForm && (
          <EmptyState
            icon={ListTodo}
            title="No tasks yet"
            description="Add your first task or complete onboarding to generate tasks automatically from your curriculum"
            action={{
              label: 'Add Your First Task',
              onClick: () => setShowAddForm(true),
              icon: Plus
            }}
          />
        )}
      </div>
    </div>
  );
}

