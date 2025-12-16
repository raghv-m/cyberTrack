import { useState } from 'react';
import { ExternalLink, Star, DollarSign, Target, BookOpen } from 'lucide-react';

interface Platform {
  name: string;
  url: string;
  description: string;
  cost: string;
  focus: string;
  difficulty: string;
  recommended: boolean;
  category: 'labs' | 'courses' | 'certifications' | 'practice';
}

const PLATFORMS: Platform[] = [
  { name: 'TryHackMe', url: 'https://tryhackme.com', description: 'Structured learning paths with hands-on labs', cost: 'Free + Premium', focus: 'SOC, Cyber Defense', difficulty: 'Beginner to Advanced', recommended: true, category: 'labs' },
  { name: 'HackTheBox', url: 'https://hackthebox.com', description: 'Realistic penetration testing labs', cost: 'VIP $20/month', focus: 'Penetration Testing', difficulty: 'Intermediate+', recommended: true, category: 'labs' },
  { name: 'Blue Team Labs Online', url: 'https://blueteamlabs.online', description: 'Defensive security labs', cost: 'Free + Premium', focus: 'DFIR, SOC Analysis', difficulty: 'Beginner+', recommended: true, category: 'labs' },
  { name: 'LetsDefend', url: 'https://letsdefend.io', description: 'SOC analyst training', cost: 'Free + Premium', focus: 'SOC Operations, SIEM', difficulty: 'Beginner+', recommended: true, category: 'labs' },
  { name: 'Udemy', url: 'https://udemy.com', description: 'Affordable cybersecurity courses', cost: '$10-$100', focus: 'CompTIA, Ethical Hacking', difficulty: 'All Levels', recommended: true, category: 'courses' },
  { name: 'Coursera', url: 'https://coursera.org', description: 'University-level courses', cost: 'Free to audit', focus: 'Google Cybersecurity', difficulty: 'Beginner+', recommended: true, category: 'courses' },
  { name: 'CompTIA', url: 'https://comptia.org', description: 'Industry-standard certifications', cost: '$370-$400', focus: 'Security+, CySA+', difficulty: 'Entry+', recommended: true, category: 'certifications' },
  { name: 'OverTheWire', url: 'https://overthewire.org', description: 'War games for security concepts', cost: 'Free', focus: 'Linux, Networking', difficulty: 'Beginner+', recommended: true, category: 'practice' }
];

export default function LearningPlatforms() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = [
    { id: 'all', name: 'All Platforms', icon: Target },
    { id: 'labs', name: 'Labs', icon: BookOpen },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'certifications', name: 'Certifications', icon: Star },
    { id: 'practice', name: 'Practice', icon: Target }
  ];
  const filteredPlatforms = selectedCategory === 'all' ? PLATFORMS : PLATFORMS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Learning Platforms</h1>
        <p className="text-text-secondary mb-8">All resources for your cybersecurity curriculum</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-smooth flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
              }`}
            >
              <cat.icon className="w-5 h-5" />
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform, index) => (
            <div key={index} className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              {platform.recommended && (
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="text-xs font-semibold text-warning uppercase">Recommended</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-text-primary mb-2">{platform.name}</h3>
              <p className="text-sm text-text-tertiary mb-3">{platform.difficulty}</p>
              <p className="text-text-secondary text-sm mb-4">{platform.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-text-secondary">{platform.cost}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-text-secondary">{platform.focus}</span>
                </div>
              </div>
              <a href={platform.url} target="_blank" rel="noopener noreferrer"
                className="w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center justify-center gap-2">
                Visit Platform <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
