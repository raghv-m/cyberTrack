import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Clock, Award, Rocket, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { initializeUserGates } from '../utils/handsOnGates';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [currentLevel, setCurrentLevel] = useState('');
  const [targetTier, setTargetTier] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [existingSkills, setExistingSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const skillOptions = [
    'Networking Basics',
    'Linux/Windows OS',
    'Security Concepts',
    'Wireshark',
    'Splunk',
    'Python',
    'PowerShell',
    'SIEM Tools'
  ];

  const toggleSkill = (skill: string) => {
    if (existingSkills.includes(skill)) {
      setExistingSkills(existingSkills.filter(s => s !== skill));
    } else {
      setExistingSkills([...existingSkills, skill]);
    }
  };

  const calculateTotalWeeks = () => {
    if (currentLevel === 'beginner') return 24;
    if (currentLevel === 'intermediate') return 16;
    return 12;
  };

  const generateCurriculum = () => {
    const phases = [];

    phases.push({
      phaseNumber: 0,
      phaseName: 'Foundation',
      startWeek: 1,
      endWeek: 12,
      skills: ['Networking', 'OS Fundamentals', 'Security Concepts'],
      tools: ['Wireshark', 'Splunk', 'Nmap'],
      labs: ['TryHackMe SOC Level 1', 'CyberDefenders Blue Team Labs'],
      certifications: ['Google Cybersecurity Certificate'],
      weeklyHours: hoursPerWeek
    });

    if (targetTier === 'tier1' || targetTier === 'tier2' || targetTier === 'tier3') {
      phases.push({
        phaseNumber: 1,
        phaseName: 'SOC Tier 1 Preparation',
        startWeek: 13,
        endWeek: 20,
        skills: ['Incident Response', 'Log Analysis', 'Threat Detection'],
        tools: ['EDR Tools', 'SIEM Advanced', 'Forensics Tools'],
        labs: ['Blue Team Labs Online', 'LetsDefend'],
        certifications: ['CompTIA Security+'],
        weeklyHours: hoursPerWeek
      });
    }

    return phases;
  };

  const handleComplete = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      await setDoc(doc(db, 'userGoals', currentUser.uid), {
        currentTier: currentLevel,
        targetTier,
        startDate: new Date(),
        hoursPerWeek,
        existingSkills,
        milestones: [],
        customGoals: [],
        generatedCurriculum: {
          generatedAt: new Date(),
          totalWeeks: calculateTotalWeeks(),
          phases: generateCurriculum()
        }
      });

      const gates = initializeUserGates();
      await setDoc(doc(db, 'handsonGates', currentUser.uid), gates);

      await setDoc(doc(db, 'skillsMatrix', currentUser.uid), {
        skills: {},
        lastUpdated: new Date()
      });

      navigate('/app/dashboard');
    } catch (error) {
      console.error('Error saving onboarding:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return currentLevel !== '';
    if (step === 2) return targetTier !== '';
    if (step === 3) return hoursPerWeek >= 5;
    return true;
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Welcome to Your Cybersecurity Journey
          </h1>
          <p className="text-text-secondary">
            Let's create your personalized learning path
          </p>
        </div>

        <div className="glass rounded-lg p-8">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-text-secondary">Step {step} of 5</span>
              <span className="text-sm text-text-secondary">{((step / 5) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-bg-secondary rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>




          {/* Step 1: Current Level */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-text-primary">What's your current experience level?</h2>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'beginner', label: 'Beginner', desc: 'New to cybersecurity' },
                  { value: 'intermediate', label: 'Intermediate', desc: 'Some IT/security knowledge' },
                  { value: 'advanced', label: 'Advanced', desc: 'Ready for SOC roles' }
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setCurrentLevel(level.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-smooth ${
                      currentLevel === level.value
                        ? 'border-primary bg-primary bg-opacity-10'
                        : 'border-border-color hover:border-primary'
                    }`}
                  >
                    <div className="font-semibold text-text-primary">{level.label}</div>
                    <div className="text-sm text-text-secondary">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Target Tier */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-text-primary">What's your target role?</h2>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'tier1', label: 'SOC Tier 1 Analyst', desc: 'Entry-level security analyst' },
                  { value: 'tier2', label: 'SOC Tier 2 Analyst', desc: 'Incident responder' },
                  { value: 'tier3', label: 'SOC Tier 3 / Threat Hunter', desc: 'Advanced threat detection' }
                ].map((tier) => (
                  <button
                    key={tier.value}
                    onClick={() => setTargetTier(tier.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-smooth ${
                      targetTier === tier.value
                        ? 'border-primary bg-primary bg-opacity-10'
                        : 'border-border-color hover:border-primary'
                    }`}
                  >
                    <div className="font-semibold text-text-primary">{tier.label}</div>
                    <div className="text-sm text-text-secondary">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Hours Per Week */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-text-primary">How many hours per week can you commit?</h2>
              </div>

              <div className="space-y-4">
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">{hoursPerWeek}</div>
                  <div className="text-text-secondary">hours per week</div>
                </div>
                <div className="bg-bg-secondary rounded-lg p-4 text-sm text-text-secondary">
                  💡 Recommended: 15-20 hours/week for optimal progress
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Existing Skills */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-text-primary">Select your existing skills</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`p-4 rounded-lg border-2 text-left transition-smooth ${
                      existingSkills.includes(skill)
                        ? 'border-primary bg-primary bg-opacity-10'
                        : 'border-border-color hover:border-primary'
                    }`}
                  >
                    <div className="text-text-primary">{skill}</div>
                  </button>
                ))}
              </div>
              <div className="text-sm text-text-tertiary text-center">
                Selected: {existingSkills.length} skills
              </div>
            </div>
          )}

          {/* Step 5: Generate Curriculum */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-text-primary">Ready to start your journey!</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-bg-secondary rounded-lg p-4">
                  <div className="text-sm text-text-secondary mb-2">Current Level</div>
                  <div className="text-text-primary font-semibold capitalize">{currentLevel}</div>
                </div>
                <div className="bg-bg-secondary rounded-lg p-4">
                  <div className="text-sm text-text-secondary mb-2">Target Role</div>
                  <div className="text-text-primary font-semibold">{targetTier === 'tier1' ? 'SOC Tier 1' : targetTier === 'tier2' ? 'SOC Tier 2' : 'SOC Tier 3'}</div>
                </div>
                <div className="bg-bg-secondary rounded-lg p-4">
                  <div className="text-sm text-text-secondary mb-2">Weekly Commitment</div>
                  <div className="text-text-primary font-semibold">{hoursPerWeek} hours/week</div>
                </div>
                <div className="bg-bg-secondary rounded-lg p-4">
                  <div className="text-sm text-text-secondary mb-2">Existing Skills</div>
                  <div className="text-text-primary font-semibold">{existingSkills.length} skills</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border-color text-text-primary rounded-lg hover:bg-bg-tertiary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-bg-primary rounded-lg hover:bg-opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-success text-white rounded-lg hover:bg-opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate My Curriculum'}
                <Rocket className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}