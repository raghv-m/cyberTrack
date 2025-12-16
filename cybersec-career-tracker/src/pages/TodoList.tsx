import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { CheckCircle, Circle, Trash2, Plus, Target, Calendar, TrendingUp } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading todos...</div>
      </div>
    );
  }

  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <div className="min-h-screen bg-bg-primary p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">Today's Tasks</h1>
            <p className="text-text-secondary">
              {activeTodos.length} active • {completedTodos.length} completed
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-text-primary">{activeTodos.length}</p>
                <p className="text-sm text-text-secondary">Active Tasks</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-text-primary">{completedTodos.length}</p>
                <p className="text-sm text-text-secondary">Completed</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-text-primary">
                  {todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0}%
                </p>
                <p className="text-sm text-text-secondary">Completion Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        {showAddForm && (
          <div className="glass rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Add New Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-text-secondary mb-2">Title</label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
                  placeholder="Enter task title..."
                />
              </div>
              <div>
                <label className="block text-text-secondary mb-2">Description</label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
                  rows={3}
                  placeholder="Enter task description..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-secondary mb-2">Priority</label>
                  <select
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as any })}
                    className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text-secondary mb-2">Category</label>
                  <select
                    value={newTodo.category}
                    onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value as any })}
                    className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
                  >
                    <option value="lab">Lab</option>
                    <option value="tool">Tool</option>
                    <option value="theory">Theory</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="certification">Certification</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={addTodo}
                  className="flex-1 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-smooth"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-bg-tertiary text-text-secondary rounded-lg hover:bg-bg-secondary transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Todos */}
        {activeTodos.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Active Tasks</h2>
            <div className="space-y-3">
              {activeTodos.map(todo => (
                <div key={todo.id} className="glass rounded-lg p-4 hover:bg-bg-secondary transition-smooth">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="flex-shrink-0 mt-1"
                    >
                      <Circle className="w-6 h-6 text-text-tertiary hover:text-primary transition-smooth" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getCategoryIcon(todo.category)}</span>
                          <h3 className="font-semibold text-text-primary">{todo.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold uppercase ${getPriorityColor(todo.priority)}`}>
                            {todo.priority}
                          </span>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-text-tertiary hover:text-danger transition-smooth"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {todo.description && (
                        <p className="text-sm text-text-secondary">{todo.description}</p>
                      )}
                      {todo.source === 'auto' && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                            Auto-generated from Phase {todo.phaseNumber}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Todos */}
        {completedTodos.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Completed Tasks</h2>
            <div className="space-y-3">
              {completedTodos.map(todo => (
                <div key={todo.id} className="glass rounded-lg p-4 opacity-60">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="flex-shrink-0 mt-1"
                    >
                      <CheckCircle className="w-6 h-6 text-success" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getCategoryIcon(todo.category)}</span>
                          <h3 className="font-semibold text-text-primary line-through">{todo.title}</h3>
                        </div>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-text-tertiary hover:text-danger transition-smooth"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {todos.length === 0 && (
          <div className="glass rounded-lg p-12 text-center">
            <Target className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">No tasks yet</h3>
            <p className="text-text-secondary mb-6">
              Add your first task or complete onboarding to generate tasks automatically
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-smooth"
            >
              Add Your First Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

