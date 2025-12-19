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
    if (status === 'completed') return <CheckCircle className="w-8 h-8 text-cyber-green drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]" />;
    if (status === 'current') return <MapPin className="w-8 h-8 text-cyber-blue drop-shadow-[0_0_8px_rgba(0,163,255,0.8)]" />;
    if (status === 'unlocked') return <TrendingUp className="w-8 h-8 text-cyber-gold drop-shadow-[0_0_8px_rgba(255,184,0,0.8)]" />;
    return <Lock className="w-8 h-8 text-gray-500" />;
  };



  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading roadmap...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            TECH TREE // CAREER ROADMAP
          </h1>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Your personalized path to cybersecurity mastery
          </p>
        </div>

        {/* Overall Progress - Glassmorphic Card */}
        <div className="relative group mb-12">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300"></div>

          <div className="relative bg-[#161B22]/60 backdrop-blur-xl border border-cyber-blue/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,163,255,0.1)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                OVERALL PROGRESS
              </h2>
              <span className="text-gray-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Phase {currentPhase + 1} / {curriculum.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#0D0D12] rounded-full h-3 border border-gray-700 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green h-3 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,163,255,0.6)]"
                style={{ width: `${((currentPhase + 1) / curriculum.length) * 100}%` }}
              />
            </div>

            {/* Stats Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 text-cyber-green" />
                <span className="text-gray-300 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {completedPhases.length} Phases Completed
                </span>
              </div>
              <div className="flex items-center gap-3 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-3">
                <MapPin className="w-5 h-5 text-cyber-blue" />
                <span className="text-gray-300 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Currently in Phase {currentPhase + 1}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-gray-700/20 border border-gray-600/30 rounded-lg p-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {Math.max(0, curriculum.length - currentPhase - 1)} Phases Remaining
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Tree - Phase Cards with Circuit Traces */}
        <div className="relative space-y-8">
          {curriculum.map((phase, index) => {
            const status = getPhaseStatus(index);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            const isLocked = status === 'locked';

            return (
              <div key={index} className="relative">
                {/* Circuit Trace Line connecting phases */}
                {index < curriculum.length - 1 && (
                  <div className="absolute left-12 top-32 w-1 h-24 z-0">
                    <div className={`w-full h-full ${
                      isCompleted ? 'bg-gradient-to-b from-cyber-green to-cyber-blue' : 'bg-gray-700'
                    } ${isCompleted ? 'shadow-[0_0_10px_rgba(0,255,136,0.6)]' : ''}`} />
                    {isCompleted && (
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyber-green to-transparent animate-pulse opacity-50" />
                    )}
                  </div>
                )}

                {/* Phase Card with Chamfered Corners */}
                <div className="relative group">
                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-300 ${
                    isCompleted ? 'bg-gradient-to-r from-cyber-green to-cyber-blue' :
                    isCurrent ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple' :
                    'bg-gradient-to-r from-gray-600 to-gray-700'
                  }`}></div>

                  {/* Main Card - Chamfered corners using clip-path */}
                  <div
                    className={`relative bg-[#161B22]/60 backdrop-blur-xl border-2 p-6 shadow-[0_0_30px_rgba(0,163,255,0.1)] ${
                      isCompleted ? 'border-cyber-green/50' :
                      isCurrent ? 'border-cyber-blue/50' :
                      isLocked ? 'border-gray-700/50' : 'border-gray-600/50'
                    }`}
                    style={{
                      clipPath: 'polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))',
                      borderRadius: '0'
                    }}
                  >
                    <div className="flex items-start gap-6">
                      {/* Status Icon Node */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 ${
                          isCompleted ? 'bg-cyber-green/10 border-cyber-green/50 shadow-[0_0_20px_rgba(0,255,136,0.4)]' :
                          isCurrent ? 'bg-cyber-blue/10 border-cyber-blue/50 shadow-[0_0_20px_rgba(0,163,255,0.4)]' :
                          'bg-gray-700/20 border-gray-600/50'
                        }`}>
                          {getPhaseIcon(status)}
                        </div>
                      </div>

                      {/* Phase Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {phase.phaseName.toUpperCase()}
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            WEEKS {phase.startWeek}-{phase.endWeek}
                          </span>
                        </div>

                        {/* Skills & Tools Grid with Node Icons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          {/* Skills Column */}
                          <div>
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              <div className="w-6 h-6 rounded bg-cyber-blue/20 border border-cyber-blue/50 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-cyber-blue" />
                              </div>
                              SKILLS
                            </h4>
                            <ul className="space-y-2">
                              {phase.skills.slice(0, 5).map((skill, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue shadow-[0_0_6px_rgba(0,163,255,0.8)]"></div>
                                  {skill}
                                </li>
                              ))}
                              {phase.skills.length > 5 && (
                                <li className="text-xs text-gray-500 ml-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                  + {phase.skills.length - 5} more skills
                                </li>
                              )}
                            </ul>
                          </div>

                          {/* Tools Column */}
                          <div>
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              <div className="w-6 h-6 rounded bg-cyber-purple/20 border border-cyber-purple/50 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-cyber-purple" />
                              </div>
                              TOOLS
                            </h4>
                            <ul className="space-y-2">
                              {phase.tools.slice(0, 5).map((tool, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-purple shadow-[0_0_6px_rgba(179,102,255,0.8)]"></div>
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Certification Badge */}
                        {phase.certifications.length > 0 && (
                          <div className="mt-6 inline-flex items-center gap-2 bg-cyber-gold/10 border border-cyber-gold/40 rounded-lg px-4 py-2">
                            <Award className="w-4 h-4 text-cyber-gold" />
                            <span className="text-sm font-bold text-cyber-gold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              TARGET: {phase.certifications[0].toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
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
