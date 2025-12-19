import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Target, TrendingUp, Award, Filter } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  evidence: string[];
  lastUpdated?: Date;
}

const SKILL_CATEGORIES = {
  'Networking': [
    'TCP/IP Fundamentals', 'Packet Analysis', 'Network Protocols', 'Subnetting', 'DNS/DHCP',
    'VLANs', 'Routing', 'Firewalls', 'VPN', 'Network Security'
  ],
  'Operating Systems': [
    'Linux Command Line', 'Windows Administration', 'PowerShell', 'Bash Scripting',
    'System Hardening', 'Active Directory', 'Group Policy', 'File Systems', 'Process Management'
  ],
  'Security Concepts': [
    'CIA Triad', 'Threat Modeling', 'Risk Assessment', 'Incident Response',
    'Security Frameworks', 'MITRE ATT&CK', 'Kill Chain', 'Defense in Depth', 'Zero Trust'
  ],
  'Tools': [
    'Wireshark', 'Splunk', 'Nmap', 'Metasploit', 'Burp Suite', 'Sysinternals',
    'Volatility', 'SIEM Tools', 'IDS/IPS', 'Endpoint Detection'
  ],
  'Programming': [
    'Python', 'PowerShell Scripting', 'Bash Scripting', 'Regular Expressions',
    'API Integration', 'Automation', 'Data Parsing', 'Web Scraping'
  ],
  'Threat Analysis': [
    'Malware Analysis', 'Log Analysis', 'Threat Intelligence', 'IOC Detection',
    'Behavioral Analysis', 'Forensics', 'Memory Analysis', 'Network Forensics'
  ]
};

export default function SkillsMatrix() {
  const { currentUser } = useAuth();
  const [skills, setSkills] = useState<Record<string, Skill>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      loadSkills();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const initializeDefaultSkills = (): Record<string, Skill> => {
    const defaultSkills: Record<string, Skill> = {};
    Object.entries(SKILL_CATEGORIES).forEach(([category, skillNames]) => {
      skillNames.forEach(skillName => {
        defaultSkills[skillName] = {
          name: skillName,
          category,
          proficiency: 0,
          evidence: []
        };
      });
    });
    return defaultSkills;
  };

  const loadSkills = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const skillsDoc = await getDoc(doc(db, 'skillsMatrix', currentUser.uid));

      if (skillsDoc.exists()) {
        const data = skillsDoc.data();
        setSkills(data?.skills || initializeDefaultSkills());
      } else {
        // Initialize with defaults
        const defaultSkills = initializeDefaultSkills();
        setSkills(defaultSkills);

        // Save to Firestore in background (non-blocking)
        setDoc(doc(db, 'skillsMatrix', currentUser.uid), {
          skills: defaultSkills,
          lastUpdated: new Date()
        }).catch(err => console.error('Background save failed:', err));
      }

      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error loading skills:', error);
      setError('Failed to load skills. Using defaults.');
      setSkills(initializeDefaultSkills());
      setLoading(false);
    }
  };

  // Removed autoUpdateFromLogs - was causing performance issues

  const updateProficiency = async (skillName: string, newProficiency: number) => {
    if (!currentUser) return;

    const updatedSkills = {
      ...skills,
      [skillName]: {
        ...skills[skillName],
        proficiency: newProficiency,
        lastUpdated: new Date()
      }
    };

    setSkills(updatedSkills);
    setSaving(true);

    try {
      await setDoc(doc(db, 'skillsMatrix', currentUser.uid), {
        skills: updatedSkills,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error updating skill:', error);
    } finally {
      setSaving(false);
    }
  };

  const getProficiencyLabel = (level: number) => {
    const labels = ['Not Started', 'Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
    return labels[level] || 'Not Started';
  };

  const getProficiencyColor = (level: number) => {
    if (level === 0) return 'bg-bg-tertiary';
    if (level <= 2) return 'bg-danger';
    if (level === 3) return 'bg-warning';
    if (level === 4) return 'bg-primary';
    return 'bg-success';
  };

  const calculateAverageProficiency = () => {
    const skillValues = Object.values(skills);
    if (skillValues.length === 0) return '0.0';
    const sum = skillValues.reduce((acc, skill) => acc + skill.proficiency, 0);
    return (sum / skillValues.length).toFixed(1);
  };

  const getCategoryStats = (category: string) => {
    const categorySkills = Object.values(skills).filter(s => s.category === category);
    if (categorySkills.length === 0) return '0.0';
    const avg = categorySkills.reduce((sum, s) => sum + s.proficiency, 0) / categorySkills.length;
    return avg.toFixed(1);
  };

  const filteredSkills = selectedCategory === 'All'
    ? Object.values(skills)
    : Object.values(skills).filter(skill => skill.category === selectedCategory);

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-text-secondary mb-2">Loading skills matrix...</div>
          <div className="text-xs text-text-tertiary">This should only take a moment</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Skills Matrix</h1>
          <p className="text-text-secondary">Track your proficiency across all cybersecurity skills</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-warning bg-opacity-10 border border-warning rounded-lg p-4 text-warning">
            <p className="font-semibold">⚠️ {error}</p>
            <p className="text-sm mt-1">Don't worry - we've initialized your skills matrix with default values. You can start tracking now!</p>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-text-primary">Average Proficiency</h3>
            </div>
            <p className="text-3xl font-bold text-primary">{calculateAverageProficiency()}/5.0</p>
          </div>

          <div className="glass rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-success" />
              <h3 className="font-bold text-text-primary">Skills Tracked</h3>
            </div>
            <p className="text-3xl font-bold text-success">{Object.keys(skills).length}</p>
          </div>

          <div className="glass rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-warning" />
              <h3 className="font-bold text-text-primary">Expert Level</h3>
            </div>
            <p className="text-3xl font-bold text-warning">
              {Object.values(skills).filter(s => s.proficiency === 5).length}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="glass rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-text-secondary" />
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg transition-smooth ${
                selectedCategory === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'
              }`}
            >
              All Categories
            </button>
            {Object.keys(SKILL_CATEGORIES).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-smooth ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'
                }`}
              >
                {category} ({getCategoryStats(category)})
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="space-y-6">
          {Object.entries(SKILL_CATEGORIES).map(([category, categorySkills]) => {
            if (selectedCategory !== 'All' && selectedCategory !== category) return null;

            return (
              <div key={category} className="glass rounded-lg p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-sm text-text-secondary">Avg: {getCategoryStats(category)}/5.0</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map(skillName => {
                    const skill = skills[skillName];
                    if (!skill) return null;

                    return (
                      <div key={skillName} className="bg-bg-secondary rounded-lg p-4 border border-border-color">
                        <div className="mb-3">
                          <h3 className="font-semibold text-text-primary mb-1">{skillName}</h3>
                          <p className="text-xs text-text-tertiary">
                            {getProficiencyLabel(skill.proficiency)}
                            {skill.evidence.length > 0 && ` • ${skill.evidence.length} evidence`}
                          </p>
                        </div>

                        {/* Proficiency Selector */}
                        <div className="flex gap-1 mb-2">
                          {[0, 1, 2, 3, 4, 5].map(level => (
                            <button
                              key={level}
                              onClick={() => updateProficiency(skillName, level)}
                              className={`flex-1 h-8 rounded transition-smooth ${
                                skill.proficiency >= level
                                  ? getProficiencyColor(level)
                                  : 'bg-bg-tertiary hover:bg-bg-primary'
                              }`}
                              title={getProficiencyLabel(level)}
                            >
                              <span className="text-xs font-bold text-white">{level}</span>
                            </button>
                          ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-bg-tertiary rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getProficiencyColor(skill.proficiency)}`}
                            style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Saving Indicator */}
        {saving && (
          <div className="fixed bottom-4 right-4 bg-success text-white px-4 py-2 rounded-lg shadow-lg">
            ✓ Saved
          </div>
        )}
      </div>
    </div>
  );
}