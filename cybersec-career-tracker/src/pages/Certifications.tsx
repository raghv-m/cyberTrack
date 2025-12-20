import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { 
  Award, 
  Calendar, 
  DollarSign, 
  Clock, 
  Target, 
  BookOpen, 
  Sparkles,
  Plus
} from 'lucide-react';
import { generateTodoRecommendations } from '../services/openaiService';

interface Certification {
  id: string;
  name: string;
  status: 'not_started' | 'in_progress' | 'completed';
  provider: string;
  cost: number;
  estimatedHours: number;
  validityYears: number;
  examDate?: Date;
  completionDate?: Date;
  notes?: string;
  roadmap?: string[];
}

const CERTIFICATIONS_DATA = {
  'comptia_security_plus': {
    name: 'CompTIA Security+',
    provider: 'CompTIA',
    cost: 370,
    estimatedHours: 80,
    validityYears: 3,
    description: 'Foundational cybersecurity certification covering threats, attacks, and vulnerabilities.',
    roadmap: [
      'Study networking fundamentals',
      'Learn security concepts and tools',
      'Practice with hands-on labs',
      'Take practice exams',
      'Schedule and pass the SY0-701 exam'
    ]
  },
  'google_cybersecurity': {
    name: 'Google Cybersecurity Certificate',
    provider: 'Google/Coursera',
    cost: 49,
    estimatedHours: 180,
    validityYears: 0, // No expiration
    description: 'Professional certificate covering cybersecurity foundations and practical skills.',
    roadmap: [
      'Complete Foundations of Cybersecurity course',
      'Learn about Networks and Network Security',
      'Study Linux and SQL basics',
      'Practice with Python scripting',
      'Apply knowledge through labs and projects'
    ]
  },
  'comptia_cysa_plus': {
    name: 'CompTIA CySA+',
    provider: 'CompTIA',
    cost: 370,
    estimatedHours: 120,
    validityYears: 3,
    description: 'Intermediate cybersecurity certification focusing on behavioral analytics.',
    roadmap: [
      'Master threat and vulnerability management',
      'Learn software and systems security',
      'Study compliance and assessment',
      'Practice incident response',
      'Take CS0-003 exam'
    ]
  },
  'isc2_cc': {
    name: 'CISSP',
    provider: '(ISC)²',
    cost: 749,
    estimatedHours: 200,
    validityYears: 3,
    description: 'Advanced cybersecurity certification for experienced professionals.',
    roadmap: [
      'Study security and risk management',
      'Learn asset security principles',
      'Understand security architecture',
      'Practice security assessment',
      'Take CISSP exam'
    ]
  }
};

export default function Certifications() {
  const { currentUser } = useAuth();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [generatingAI, setGeneratingAI] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadCertifications();
    }
  }, [currentUser]);

  const loadCertifications = async () => {
    if (!currentUser) return;

    try {
      const certDoc = await getDoc(doc(db, 'certifications', currentUser.uid));
      
      if (certDoc.exists()) {
        const data = certDoc.data();
        setCertifications(data.items || []);
      } else {
        // Initialize with default certifications based on user goals
        await initializeDefaultCertifications();
      }
    } catch (error) {
      console.error('Error loading certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaultCertifications = async () => {
    if (!currentUser) return;
    
    try {
      // Get user goals to determine appropriate certifications
      const goalsDoc = await getDoc(doc(db, 'userGoals', currentUser.uid));
      const goalsData = goalsDoc.exists() ? goalsDoc.data() : {};
      
      const defaultCertifications: Certification[] = [];
      
      // Add Security+ for SOC Tier 1
      if (goalsData.targetTier === 'tier1' || goalsData.targetTier === 'tier2' || goalsData.targetTier === 'tier3') {
        defaultCertifications.push({
          id: 'comptia_security_plus',
          name: 'CompTIA Security+',
          status: 'not_started',
          provider: 'CompTIA',
          cost: 370,
          estimatedHours: 80,
          validityYears: 3
        });
      }
      
      // Add Google Cybersecurity Certificate for beginners
      if (goalsData.currentTier === 'beginner') {
        defaultCertifications.push({
          id: 'google_cybersecurity',
          name: 'Google Cybersecurity Certificate',
          status: 'not_started',
          provider: 'Google/Coursera',
          cost: 49,
          estimatedHours: 180,
          validityYears: 0
        });
      }
      
      setCertifications(defaultCertifications);
      await saveCertifications(defaultCertifications);
    } catch (error) {
      console.error('Error initializing certifications:', error);
    }
  };

  const saveCertifications = async (certsToSave: Certification[]) => {
    if (!currentUser) return;

    try {
      await setDoc(doc(db, 'certifications', currentUser.uid), {
        items: certsToSave,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error saving certifications:', error);
    }
  };

  const updateCertificationStatus = async (id: string, status: 'not_started' | 'in_progress' | 'completed') => {
    const updated = certifications.map(cert => 
      cert.id === id ? { ...cert, status } : cert
    );
    setCertifications(updated);
    await saveCertifications(updated);
  };

  const generateAIRecommendations = async () => {
    if (!currentUser) return;
    
    setGeneratingAI(true);
    try {
      // Get user goals
      const goalsDoc = await getDoc(doc(db, 'userGoals', currentUser.uid));
      const goalsData = goalsDoc.exists() ? goalsDoc.data() : {};
      
      // Get current skills
      const skillsDoc = await getDoc(doc(db, 'skillsMatrix', currentUser.uid));
      const skillsData = skillsDoc.exists() ? skillsDoc.data().skills : {};
      
      // Get completed todos
      const todosDoc = await getDoc(doc(db, 'todos', currentUser.uid));
      const todosData = todosDoc.exists() ? todosDoc.data().items || [] : [];
      const completedTodos = todosData.filter((t: any) => t.completed);
      
      // Generate AI recommendations
      const recommendations = await generateTodoRecommendations(
        goalsData,
        skillsData,
        completedTodos
      );
      
      // Filter for certification-related recommendations
      const certRecommendations = recommendations.filter(rec => 
        rec.category === 'certification'
      );
      
      setAiRecommendations(certRecommendations);
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
    } finally {
      setGeneratingAI(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-cyber-green';
      case 'in_progress': return 'text-cyber-blue';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-cyber-green/20 border-cyber-green/40';
      case 'in_progress': return 'bg-cyber-blue/20 border-cyber-blue/40';
      default: return 'bg-bg-tertiary border-border-color';
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading certifications...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Certifications</h1>
            <p className="text-text-secondary">Plan and track your cybersecurity certifications</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={generateAIRecommendations}
              disabled={generatingAI}
              className="px-4 py-2 bg-gradient-to-r from-cyber-purple to-cyber-blue text-white rounded-lg hover:opacity-90 transition-smooth flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              {generatingAI ? 'Generating...' : 'AI Recommendations'}
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-smooth flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Certification
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-lg p-6">
            <h3 className="text-text-secondary mb-2">Total</h3>
            <p className="text-3xl font-bold text-primary">{certifications.length}</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h3 className="text-text-secondary mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-cyber-blue">
              {certifications.filter(c => c.status === 'in_progress').length}
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h3 className="text-text-secondary mb-2">Completed</h3>
            <p className="text-3xl font-bold text-cyber-green">
              {certifications.filter(c => c.status === 'completed').length}
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h3 className="text-text-secondary mb-2">Planned Cost</h3>
            <p className="text-3xl font-bold text-cyber-gold">
              ${certifications.reduce((sum, c) => sum + (c.status !== 'completed' ? c.cost : 0), 0)}
            </p>
          </div>
        </div>

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="glass rounded-lg p-6 mb-8 border-l-4 border-cyber-purple">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-cyber-purple" />
                <h2 className="text-xl font-bold text-text-primary">AI-Powered Certification Recommendations</h2>
              </div>
              <button 
                onClick={() => setAiRecommendations([])}
                className="text-text-secondary hover:text-text-primary"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="bg-bg-secondary rounded-lg p-4 border border-cyber-purple/30">
                  <h3 className="font-bold text-text-primary mb-2">{rec.title}</h3>
                  <p className="text-sm text-text-secondary mb-3">{rec.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-text-tertiary mb-3">
                    <span className="capitalize px-2 py-1 bg-bg-tertiary rounded">
                      {rec.priority} priority
                    </span>
                    <span>{rec.estimatedHours} hours</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {rec.skillsDeveloped.slice(0, 3).map((skill: string, skillIndex: number) => (
                      <span key={skillIndex} className="text-xs px-2 py-1 bg-cyber-blue/20 text-cyber-blue rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => {
                      // Add to certifications list
                      const certId = rec.title.toLowerCase().replace(/\s+/g, '_');
                      const newCert: Certification = {
                        id: certId,
                        name: rec.title,
                        status: 'not_started',
                        provider: 'Recommended',
                        cost: 0,
                        estimatedHours: rec.estimatedHours,
                        validityYears: 0
                      };
                      
                      const updated = [...certifications, newCert];
                      setCertifications(updated);
                      saveCertifications(updated);
                      setAiRecommendations(aiRecommendations.filter((_, i) => i !== index));
                    }}
                    className="w-full px-3 py-2 bg-cyber-purple text-white rounded-md text-sm hover:opacity-90 transition-smooth"
                  >
                    Add to My Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certification List */}
        <div className="space-y-6">
          {certifications.map(cert => {
            const certData = CERTIFICATIONS_DATA[cert.id as keyof typeof CERTIFICATIONS_DATA] || {
              name: cert.name,
              provider: cert.provider,
              cost: cert.cost,
              estimatedHours: cert.estimatedHours,
              validityYears: cert.validityYears,
              description: 'Custom certification',
              roadmap: []
            };
            
            return (
              <div key={cert.id} className="glass rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="p-3 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30">
                        <Award className="w-8 h-8 text-cyber-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary mb-1">{certData.name}</h3>
                        <p className="text-text-secondary mb-2">{certData.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {certData.provider}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ${certData.cost}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {certData.estimatedHours} hours
                          </span>
                          {certData.validityYears > 0 && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {certData.validityYears} years
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Roadmap */}
                    {certData.roadmap && certData.roadmap.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Study Roadmap
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {certData.roadmap.map((step, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-bg-secondary rounded">
                              <div className="mt-1 w-5 h-5 rounded-full bg-cyber-blue/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-cyber-blue font-bold">{index + 1}</span>
                              </div>
                              <span className="text-sm text-text-secondary">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <div className={`px-4 py-2 rounded-lg border ${getStatusBg(cert.status)}`}>
                      <span className={`font-semibold ${getStatusColor(cert.status)}`}>
                        {cert.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {cert.status === 'not_started' && (
                        <button
                          onClick={() => updateCertificationStatus(cert.id, 'in_progress')}
                          className="px-3 py-2 bg-cyber-blue text-white rounded-lg text-sm hover:opacity-90 transition-smooth"
                        >
                          Start Studying
                        </button>
                      )}
                      
                      {cert.status === 'in_progress' && (
                        <button
                          onClick={() => updateCertificationStatus(cert.id, 'completed')}
                          className="px-3 py-2 bg-cyber-green text-white rounded-lg text-sm hover:opacity-90 transition-smooth"
                        >
                          Mark Complete
                        </button>
                      )}
                      
                      {cert.status === 'completed' && (
                        <button
                          onClick={() => updateCertificationStatus(cert.id, 'in_progress')}
                          className="px-3 py-2 bg-cyber-blue text-white rounded-lg text-sm hover:opacity-90 transition-smooth"
                        >
                          Re-certify
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Progress Tracking */}
                {cert.status === 'in_progress' && (
                  <div className="mt-4 pt-4 border-t border-border-color">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">Study Progress</span>
                      <span className="text-sm text-text-secondary">0/100%</span>
                    </div>
                    <div className="w-full bg-bg-tertiary rounded-full h-2">
                      <div 
                        className="bg-cyber-blue h-2 rounded-full transition-all duration-300"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {certifications.length === 0 && (
          <div className="glass rounded-lg p-12 text-center">
            <Award className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">No certifications planned</h3>
            <p className="text-text-secondary mb-6">Add certifications to track your cybersecurity career progression</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-smooth flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Certification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}