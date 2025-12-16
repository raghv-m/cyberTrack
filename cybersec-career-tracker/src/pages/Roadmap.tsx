import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MapPin, CheckCircle, Lock, TrendingUp, Award } from 'lucide-react';

interface Phase {
  phaseNumber: number;
  phaseName: string;
  startWeek: number;
  endWeek: number;
  skills: string[];
  tools: string[];
  labs: string[];
  certifications: string[];
  weeklyHours: number;
}

export default function Roadmap() {
  const { currentUser } = useAuth();
  const [curriculum, setCurriculum] = useState<Phase[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);

  useEffect(() => {
    if (currentUser) {
      loadRoadmap();
    }
  }, [currentUser]);

  const loadRoadmap = async () => {
    if (!currentUser) return;

    try {
      const goalsDoc = await getDoc(doc(db, 'userGoals', currentUser.uid));
      
      if (goalsDoc.exists()) {
        const data = goalsDoc.data();
        const phases = data.generatedCurriculum?.phases || [];
        setCurriculum(phases);

        const startDate = data.startDate?.toDate() || new Date();
        const weeksSinceStart = Math.floor((new Date().getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
        
        let current = 0;
        for (let i = 0; i < phases.length; i++) {
          if (weeksSinceStart >= phases[i].startWeek && weeksSinceStart <= phases[i].endWeek) {
            current = i;
            break;
          }
        }
        setCurrentPhase(current);

        const gatesDoc = await getDoc(doc(db, 'handsonGates', currentUser.uid));
        if (gatesDoc.exists()) {
          const gates = gatesDoc.data();
          const completed: number[] = [];
          if (gates.phase0_complete?.allMet) completed.push(0);
          setCompletedPhases(completed);
        }
      }
    } catch (error) {
      console.error('Error loading roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPhaseStatus = (phaseNumber: number) => {
    if (completedPhases.includes(phaseNumber)) return 'completed';
    if (phaseNumber === currentPhase) return 'current';
    if (phaseNumber < currentPhase) return 'unlocked';
    return 'locked';
  };

  const getPhaseIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-8 h-8 text-success" />;
    if (status === 'current') return <MapPin className="w-8 h-8 text-primary" />;
    if (status === 'unlocked') return <TrendingUp className="w-8 h-8 text-warning" />;
    return <Lock className="w-8 h-8 text-text-tertiary" />;
  };

  const getPhaseColor = (status: string) => {
    if (status === 'completed') return 'border-success bg-success/10';
    if (status === 'current') return 'border-primary bg-primary/10';
    if (status === 'unlocked') return 'border-warning bg-warning/10';
    return 'border-border-color bg-bg-tertiary';
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading roadmap...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Learning Roadmap</h1>
          <p className="text-text-secondary">Your personalized path to cybersecurity mastery</p>
        </div>

        <div className="glass rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">Overall Progress</h2>
            <span className="text-text-secondary">Phase {currentPhase + 1} of {curriculum.length}</span>
          </div>
          <div className="w-full bg-bg-tertiary rounded-full h-4">
            <div
              className="bg-gradient-to-r from-primary to-success h-4 rounded-full transition-all"
              style={{ width: `${((currentPhase + 1) / curriculum.length) * 100}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-text-secondary">{completedPhases.length} Phases Completed</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-text-secondary">Currently in Phase {currentPhase + 1}</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-text-tertiary" />
              <span className="text-text-secondary">
                {Math.max(0, curriculum.length - currentPhase - 1)} Phases Remaining
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {curriculum.map((phase, index) => {
            const status = getPhaseStatus(index);
            
            return (
              <div key={index} className="relative">
                {index < curriculum.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-border-color" />
                )}

                <div className={`glass rounded-lg p-6 border-2 ${getPhaseColor(status)}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{getPhaseIcon(status)}</div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-text-primary">{phase.phaseName}</h3>
                        <span className="text-sm text-text-tertiary">Weeks {phase.startWeek}-{phase.endWeek}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />Skills
                          </h4>
                          <ul className="space-y-1">
                            {phase.skills.slice(0, 5).map((skill, idx) => (
                              <li key={idx} className="text-sm text-text-secondary">• {skill}</li>
                            ))}
                            {phase.skills.length > 5 && (
                              <li className="text-sm text-text-tertiary">+ {phase.skills.length - 5} more</li>
                            )}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-text-primary mb-2">Tools</h4>
                          <ul className="space-y-1">
                            {phase.tools.slice(0, 5).map((tool, idx) => (
                              <li key={idx} className="text-sm text-text-secondary">• {tool}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {phase.certifications.length > 0 && (
                        <div className="mt-4 flex items-center gap-2">
                          <Award className="w-4 h-4 text-warning" />
                          <span className="text-sm font-semibold text-warning">
                            Target: {phase.certifications[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
