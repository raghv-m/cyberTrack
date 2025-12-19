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
    <div className="min-h-screen bg-[#0B0E11] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            LEARNING PLATFORMS // HEX-TILES
          </h1>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            All resources for your cybersecurity curriculum • Connection Status: Online
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-cyber-blue/20 border-2 border-cyber-blue/50 text-cyber-blue shadow-[0_0_20px_rgba(0,163,255,0.3)]'
                  : 'bg-[#161B22]/60 border border-gray-700 text-gray-400 hover:bg-[#161B22] hover:border-cyber-blue/30'
              }`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <cat.icon className="w-5 h-5" />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Hexagonal Grid of Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform, index) => (
            <div key={index} className="relative group">
              {/* Hex-Tile Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-300"></div>

              {/* Hex-Tile Card */}
              <div
                className="relative bg-[#161B22]/60 backdrop-blur-xl border-2 border-cyber-blue/30 rounded-2xl p-6 hover:border-cyber-blue/60 transition-all duration-300 shadow-[0_0_30px_rgba(0,163,255,0.1)] group-hover:shadow-[0_0_40px_rgba(0,163,255,0.3)]"
                style={{
                  clipPath: 'polygon(0 10%, 10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%)'
                }}
              >
              {platform.recommended && (
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-cyber-gold fill-cyber-gold drop-shadow-[0_0_6px_rgba(255,184,0,0.8)]" />
                  <span className="text-xs font-bold text-cyber-gold uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Recommended</span>
                </div>
              )}
                {/* Platform Name */}
                <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {platform.name.toUpperCase()}
                </h3>

                {/* Difficulty Badge */}
                <div className="inline-block px-3 py-1 bg-cyber-purple/20 border border-cyber-purple/40 rounded-full mb-3">
                  <span className="text-xs font-bold text-cyber-purple" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {platform.difficulty.toUpperCase()}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {platform.description}
                </p>

                {/* Platform Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-cyber-green" />
                    <span className="text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{platform.cost}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-cyber-blue" />
                    <span className="text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{platform.focus}</span>
                  </div>
                </div>

                {/* Connection Status Indicator */}
                <div className="flex items-center gap-2 mb-4 text-xs">
                  <div className="w-2 h-2 rounded-full bg-cyber-green shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"></div>
                  <span className="text-cyber-green font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    CONNECTION STATUS: ONLINE
                  </span>
                </div>

                {/* Visit Button */}
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-cyber-blue/10 border-2 border-cyber-blue/40 text-cyber-blue rounded-lg font-bold hover:bg-cyber-blue/20 hover:border-cyber-blue/60 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,163,255,0.2)] hover:shadow-[0_0_25px_rgba(0,163,255,0.4)]"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  VISIT PLATFORM <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
