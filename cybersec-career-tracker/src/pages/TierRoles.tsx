import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  Users, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Clock, 
  DollarSign,
  Zap,
  Shield,
  Search,
  Database,
  Cloud,
  Sparkles
} from 'lucide-react';
import { generateTodoRecommendations } from '../services/openaiService';

interface TierRole {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
  requiredSkills: Record<string, number>;
  requiredTools: string[];
  recommendedCertifications: string[];
  portfolioRequirements: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  typicalDuration: string;
}

const TIER_ROLES: Record<string, TierRole> = {
  tier1: {
    id: 'tier1',
    name: 'SOC Tier 1 Analyst',
    description: 'Entry-level security analyst responsible for monitoring alerts and initial triage.',
    responsibilities: [
      'Monitor security alerts from SIEM and other detection systems',
      'Perform initial triage on security incidents',
      'Analyze phishing emails and malicious attachments',
      'Document incidents clearly with timelines and evidence',
      'Escalate complex incidents to Tier 2 analysts',
      'Update tickets and maintain accurate records',
      'Follow security playbooks and SOPs'
    ],
    requiredSkills: {
      networking: 70,
      operatingSystems: 65,
      securityConcepts: 60,
      tools: 70
    },
    requiredTools: [
      'Wireshark',
      'Splunk',
      'Windows Event Viewer',
      'Basic Linux CLI'
    ],
    recommendedCertifications: [
      'CompTIA Security+',
      'Google Cybersecurity Certificate'
    ],
    portfolioRequirements: [
      '3 incident investigation writeups',
      '1 phishing analysis report',
      '1 network traffic analysis',
      'GitHub with documentation'
    ],
    salaryRange: {
      min: 55000,
      max: 70000,
      currency: 'CAD'
    },
    typicalDuration: '4-6 months'
  },
  tier2: {
    id: 'tier2',
    name: 'SOC Tier 2 Analyst',
    description: 'Experienced analyst responsible for deep-dive investigations and threat hunting.',
    responsibilities: [
      'Deep-dive investigations of security incidents',
      'Threat hunting for advanced persistent threats',
      'Tune detection rules to reduce false positives',
      'Create and improve security playbooks',
      'Mentor Tier 1 analysts',
      'Own incidents end-to-end from detection to resolution'
    ],
    requiredSkills: {
      networking: 80,
      operatingSystems: 80,
      securityConcepts: 85,
      tools: 85,
      programming: 70
    },
    requiredTools: [
      'SIEM (Splunk, ELK)',
      'EDR Platforms',
      'MITRE ATT&CK',
      'Python Scripting',
      'KQL/SPL Query Languages'
    ],
    recommendedCertifications: [
      'CompTIA CySA+',
      'GIAC GSEC',
      'Blue Team Level 2 (BTL2)'
    ],
    portfolioRequirements: [
      '5 detailed incident reports',
      '2 detection rule implementations',
      '1 threat hunting project',
      'Automation scripts repository',
      'Blog posts on security topics'
    ],
    salaryRange: {
      min: 75000,
      max: 95000,
      currency: 'CAD'
    },
    typicalDuration: '6-12 months'
  },
  tier3: {
    id: 'tier3',
    name: 'SOC Tier 3 / Specialist',
    description: 'Senior analyst focused on specialized security domains and strategic initiatives.',
    responsibilities: [
      'Lead major security incidents and breach responses',
      'Develop advanced detection engineering capabilities',
      'Architect security solutions and tool integrations',
      'Conduct proactive threat hunting campaigns',
      'Provide expert consultation to other teams',
      'Drive security program improvements'
    ],
    requiredSkills: {
      networking: 90,
      operatingSystems: 90,
      securityConcepts: 95,
      tools: 90,
      programming: 85,
      cloud: 80
    },
    requiredTools: [
      'Detection Engineering Platforms',
      'Cloud Security Tools (AWS, Azure, GCP)',
      'Advanced Forensics Tools',
      'Custom Scripting Frameworks',
      'Threat Intelligence Platforms'
    ],
    recommendedCertifications: [
      'GIAC GCIH',
      'GIAC GCIA',
      'GIAC GCFE',
      'AWS Security Specialty',
      'Azure Security Engineer'
    ],
    portfolioRequirements: [
      'Complex incident response case studies',
      'Detection engineering projects',
      'Security tool integrations',
      'Research publications',
      'Speaking at conferences or meetups'
    ],
    salaryRange: {
      min: 100000,
      max: 140000,
      currency: 'CAD'
    },
    typicalDuration: '12-18 months'
  }
};

const SPECIALIST_PATHS = [
  {
    id: 'detection_engineer',
    name: 'Detection Engineer',
    description: 'Specializes in creating and tuning security detection rules.',
    icon: Zap,
    skills: ['SIEM', 'Rule Writing', 'Automation', 'Threat Modeling'],
    tools: ['Sigma', 'YARA', 'KQL', 'SPL', 'Python'],
    salary: '$100k-$140k CAD',
    bestFor: 'Big Tech, MSSPs'
  },
  {
    id: 'cloud_security',
    name: 'Cloud Security Engineer',
    description: 'Secures cloud infrastructure and monitors cloud-native threats.',
    icon: Cloud,
    skills: ['AWS', 'Azure', 'GCP', 'IAM', 'Cloud Logging'],
    tools: ['AWS Security Hub', 'Azure Security Center', 'GCP Security Command Center'],
    salary: '$100k-$140k CAD',
    bestFor: 'Big Tech, SaaS Companies'
  },
  {
    id: 'threat_hunter',
    name: 'Threat Hunter',
    description: 'Proactively searches for advanced threats and develops hunting methodologies.',
    icon: Search,
    skills: ['Threat Intel', 'Behavioral Analysis', 'Hypothesis Testing', 'Forensics'],
    tools: ['Sysmon', 'Osquery', 'Velociraptor', 'MITRE ATT&CK'],
    salary: '$100k-$140k CAD',
    bestFor: 'Big Tech, Government'
  },
  {
    id: 'dfir',
    name: 'Digital Forensics & Incident Response',
    description: 'Leads major incident responses and conducts forensic investigations.',
    icon: Database,
    skills: ['Forensics', 'Incident Management', 'Evidence Handling', 'Reporting'],
    tools: ['EnCase', 'FTK', 'Autopsy', 'Volatility', 'Wireshark'],
    salary: '$100k-$140k CAD',
    bestFor: 'Government, Finance'
  }
];

export default function TierRoles() {
  const { currentUser } = useAuth();
  const [userGoals, setUserGoals] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [generatingAI, setGeneratingAI] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadUserGoals();
    }
  }, [currentUser]);

  const loadUserGoals = async () => {
    if (!currentUser) return;

    try {
      const goalsDoc = await getDoc(doc(db, 'userGoals', currentUser.uid));
      
      if (goalsDoc.exists()) {
        setUserGoals(goalsDoc.data());
      }
    } catch (error) {
      console.error('Error loading user goals:', error);
    } finally {
      setLoading(false);
    }
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
      
      // Filter for role-related recommendations
      const roleRecommendations = recommendations.filter(rec => 
        rec.category === 'theory' || rec.category === 'lab'
      );
      
      setAiRecommendations(roleRecommendations);
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
    } finally {
      setGeneratingAI(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading tier roles information...</div>
      </div>
    );
  }

  const currentTier = userGoals?.targetTier || 'tier1';
  const currentRole = TIER_ROLES[currentTier];

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">SOC Tier Roles</h1>
            <p className="text-text-secondary">Understand your career progression and specialization paths</p>
          </div>
          <button
            onClick={generateAIRecommendations}
            disabled={generatingAI}
            className="px-4 py-2 bg-gradient-to-r from-cyber-purple to-cyber-blue text-white rounded-lg hover:opacity-90 transition-smooth flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5" />
            {generatingAI ? 'Generating...' : 'AI Career Advice'}
          </button>
        </div>

        {/* Current Role Overview */}
        {currentRole && (
          <div className="glass rounded-lg p-6 mb-8 border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30">
                <Users className="w-8 h-8 text-cyber-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Your Target Role: {currentRole.name}</h2>
                <p className="text-text-secondary">{currentRole.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-bg-secondary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-cyber-blue" />
                  <h3 className="font-semibold text-text-primary">Typical Duration</h3>
                </div>
                <p className="text-2xl font-bold text-cyber-blue">{currentRole.typicalDuration}</p>
              </div>
              
              <div className="bg-bg-secondary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-cyber-green" />
                  <h3 className="font-semibold text-text-primary">Salary Range</h3>
                </div>
                <p className="text-2xl font-bold text-cyber-green">
                  ${currentRole.salaryRange.min.toLocaleString()} - ${currentRole.salaryRange.max.toLocaleString()} {currentRole.salaryRange.currency}
                </p>
              </div>
              
              <div className="bg-bg-secondary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-cyber-gold" />
                  <h3 className="font-semibold text-text-primary">Certifications</h3>
                </div>
                <p className="text-2xl font-bold text-cyber-gold">{currentRole.recommendedCertifications.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Responsibilities */}
              <div className="bg-bg-secondary rounded-lg p-4">
                <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyber-blue" />
                  Key Responsibilities
                </h3>
                <ul className="space-y-2">
                  {currentRole.responsibilities.slice(0, 5).map((resp, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></span>
                      {resp}
                    </li>
                  ))}
                  {currentRole.responsibilities.length > 5 && (
                    <li className="text-sm text-cyber-blue font-medium">
                      +{currentRole.responsibilities.length - 5} more responsibilities
                    </li>
                  )}
                </ul>
              </div>

              {/* Required Skills */}
              <div className="bg-bg-secondary rounded-lg p-4">
                <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyber-purple" />
                  Required Skills
                </h3>
                <div className="space-y-3">
                  {Object.entries(currentRole.requiredSkills).map(([skill, level]) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="flex items-center gap-2 w-24">
                        <div className="w-full bg-bg-tertiary rounded-full h-2">
                          <div 
                            className="bg-cyber-blue h-2 rounded-full"
                            style={{ width: `${level}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-text-secondary w-8">{level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="glass rounded-lg p-6 mb-8 border-l-4 border-cyber-purple">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-cyber-purple" />
                <h2 className="text-xl font-bold text-text-primary">AI-Powered Career Recommendations</h2>
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier Progression */}
        <div className="glass rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyber-blue" />
            SOC Tier Progression
          </h2>
          
          <div className="space-y-8">
            {Object.values(TIER_ROLES).map((role) => (
              <div key={role.id} className="relative pl-8 pb-8 border-l-2 border-cyber-blue/30 last:pb-0">
                {/* Timeline dot */}
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyber-blue border-4 border-[#0B0E11]"></div>
                
                <div className={`flex flex-col md:flex-row md:items-start gap-4 ${currentTier === role.id ? 'bg-cyber-blue/5 p-4 rounded-lg' : ''}`}>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-2">{role.name}</h3>
                    <p className="text-text-secondary mb-4">{role.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-1">
                          {role.responsibilities.slice(0, 3).map((resp, idx) => (
                            <li key={idx} className="text-sm text-text-secondary flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.keys(role.requiredSkills).slice(0, 4).map((skill, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-cyber-purple/20 text-cyber-purple rounded-md">
                              {skill.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-48 flex-shrink-0">
                    <div className="bg-bg-secondary rounded-lg p-3">
                      <div className="text-center mb-2">
                        <DollarSign className="w-5 h-5 text-cyber-green mx-auto" />
                        <p className="text-lg font-bold text-cyber-green">
                          ${role.salaryRange.min.toLocaleString()} - ${role.salaryRange.max.toLocaleString()}
                        </p>
                        <p className="text-xs text-text-tertiary">{role.salaryRange.currency}</p>
                      </div>
                      <div className="text-center">
                        <Clock className="w-5 h-5 text-cyber-blue mx-auto" />
                        <p className="text-sm font-semibold text-cyber-blue">{role.typicalDuration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialist Paths */}
        <div className="glass rounded-lg p-6">
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyber-purple" />
            Tier 3 Specialization Paths
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALIST_PATHS.map((path) => {
              const IconComponent = path.icon;
              return (
                <div key={path.id} className="bg-bg-secondary rounded-lg p-5 border border-border-color hover:border-cyber-purple/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-cyber-purple/10">
                      <IconComponent className="w-6 h-6 text-cyber-purple" />
                    </div>
                    <h3 className="font-bold text-text-primary">{path.name}</h3>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-4">{path.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-text-tertiary uppercase mb-2">Key Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-cyber-blue/20 text-cyber-blue rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-cyber-green">{path.salary}</span>
                    <span className="text-xs text-text-tertiary">{path.bestFor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}