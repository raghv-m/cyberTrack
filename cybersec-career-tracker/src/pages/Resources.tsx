import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, FileText, Download, Search } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  content: string[];
  subtopics?: Topic[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedHours: number;
}

const STUDY_MODULES: Module[] = [
  {
    id: 'module-1',
    title: 'Module 1: Cybersecurity Fundamentals',
    description: 'Core concepts and principles of information security',
    level: 'Beginner',
    estimatedHours: 20,
    topics: [
      {
        id: 'cia-triad',
        title: '1.1 CIA Triad',
        content: [
          'Confidentiality: Ensuring information is accessible only to authorized individuals',
          'Integrity: Maintaining accuracy and completeness of data',
          'Availability: Ensuring systems and data are accessible when needed',
          'Real-world examples: Encryption (C), Hashing (I), Redundancy (A)'
        ]
      },
      {
        id: 'security-principles',
        title: '1.2 Security Principles',
        content: [
          'Defense in Depth: Multiple layers of security controls',
          'Least Privilege: Minimum access rights for users',
          'Separation of Duties: Dividing critical functions among different people',
          'Fail-Safe Defaults: Default deny approach',
          'Economy of Mechanism: Keep security mechanisms simple'
        ]
      },
      {
        id: 'threat-landscape',
        title: '1.3 Threat Landscape',
        content: [
          'Threat: Potential cause of unwanted incident',
          'Vulnerability: Weakness that can be exploited',
          'Risk: Likelihood and impact of a threat exploiting a vulnerability',
          'Common threats: Malware, Phishing, DDoS, Insider threats',
          'Threat actors: Script kiddies, Hacktivists, Organized crime, Nation-states'
        ]
      },
      {
        id: 'security-controls',
        title: '1.4 Security Controls',
        content: [
          'Administrative: Policies, procedures, training',
          'Technical: Firewalls, encryption, antivirus',
          'Physical: Locks, cameras, guards',
          'Preventive, Detective, Corrective, Deterrent controls'
        ]
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Networking Essentials',
    description: 'Understanding networks, protocols, and network security',
    level: 'Beginner',
    estimatedHours: 30,
    topics: [
      {
        id: 'osi-model',
        title: '2.1 OSI Model',
        content: [
          'Layer 7 - Application: HTTP, FTP, SMTP, DNS',
          'Layer 6 - Presentation: Encryption, compression',
          'Layer 5 - Session: Session management',
          'Layer 4 - Transport: TCP, UDP',
          'Layer 3 - Network: IP, ICMP, routing',
          'Layer 2 - Data Link: MAC addresses, switches',
          'Layer 1 - Physical: Cables, signals'
        ]
      },
      {
        id: 'tcp-ip',
        title: '2.2 TCP/IP Protocol Suite',
        content: [
          'IP Addressing: IPv4, IPv6, subnetting',
          'TCP: Connection-oriented, reliable, three-way handshake',
          'UDP: Connectionless, fast, no guarantees',
          'Common ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 21 (FTP), 25 (SMTP)',
          'ICMP: Ping, traceroute'
        ]
      },
      {
        id: 'network-devices',
        title: '2.3 Network Devices',
        content: [
          'Router: Connects different networks, operates at Layer 3',
          'Switch: Connects devices in a LAN, operates at Layer 2',
          'Firewall: Filters traffic based on rules',
          'IDS/IPS: Intrusion Detection/Prevention Systems',
          'Proxy: Intermediary for requests',
          'Load Balancer: Distributes traffic across servers'
        ]
      },
      {
        id: 'network-security',
        title: '2.4 Network Security Concepts',
        content: [
          'VPN: Virtual Private Network for secure remote access',
          'NAT: Network Address Translation',
          'DMZ: Demilitarized Zone for public-facing services',
          'VLAN: Virtual LAN for network segmentation',
          'ACL: Access Control Lists for traffic filtering'
        ]
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: Operating Systems Security',
    description: 'Windows and Linux security fundamentals',
    level: 'Beginner',
    estimatedHours: 25,
    topics: [
      {
        id: 'windows-security',
        title: '3.1 Windows Security',
        content: [
          'User Account Control (UAC)',
          'Windows Defender and antivirus',
          'Group Policy for centralized management',
          'BitLocker for disk encryption',
          'Windows Firewall configuration',
          'Event Viewer for log analysis',
          'Registry security'
        ]
      },
      {
        id: 'linux-security',
        title: '3.2 Linux Security',
        content: [
          'File permissions: chmod, chown, umask',
          'User and group management',
          'sudo and privilege escalation',
          'SELinux and AppArmor',
          'iptables firewall',
          'Log files: /var/log/syslog, /var/log/auth.log',
          'Package management security'
        ]
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: Cryptography',
    description: 'Encryption, hashing, and cryptographic protocols',
    level: 'Intermediate',
    estimatedHours: 20,
    topics: [
      {
        id: 'encryption-basics',
        title: '4.1 Encryption Fundamentals',
        content: [
          'Symmetric encryption: AES, DES, 3DES (same key for encrypt/decrypt)',
          'Asymmetric encryption: RSA, ECC (public/private key pairs)',
          'Encryption modes: ECB, CBC, GCM',
          'Key exchange: Diffie-Hellman',
          'Use cases: Data at rest vs data in transit'
        ]
      },
      {
        id: 'hashing',
        title: '4.2 Hashing and Integrity',
        content: [
          'Hash functions: MD5 (broken), SHA-1 (deprecated), SHA-256, SHA-512',
          'Properties: One-way, deterministic, collision-resistant',
          'HMAC: Hash-based Message Authentication Code',
          'Digital signatures: RSA, DSA, ECDSA',
          'Password hashing: bcrypt, scrypt, Argon2'
        ]
      },
      {
        id: 'pki',
        title: '4.3 Public Key Infrastructure (PKI)',
        content: [
          'Certificate Authority (CA)',
          'Digital certificates: X.509',
          'Certificate chain of trust',
          'SSL/TLS handshake process',
          'Certificate revocation: CRL, OCSP'
        ]
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Web Application Security',
    description: 'OWASP Top 10 and web vulnerabilities',
    level: 'Intermediate',
    estimatedHours: 30,
    topics: [
      {
        id: 'owasp-top-10',
        title: '5.1 OWASP Top 10',
        content: [
          'A01: Broken Access Control',
          'A02: Cryptographic Failures',
          'A03: Injection (SQL, Command, LDAP)',
          'A04: Insecure Design',
          'A05: Security Misconfiguration',
          'A06: Vulnerable and Outdated Components',
          'A07: Identification and Authentication Failures',
          'A08: Software and Data Integrity Failures',
          'A09: Security Logging and Monitoring Failures',
          'A10: Server-Side Request Forgery (SSRF)'
        ]
      },
      {
        id: 'sql-injection',
        title: '5.2 SQL Injection',
        content: [
          'How it works: Injecting malicious SQL code',
          'Types: In-band, Blind, Out-of-band',
          'Detection: Error messages, timing attacks',
          'Prevention: Prepared statements, parameterized queries, input validation',
          'Tools: SQLMap, Burp Suite'
        ]
      },
      {
        id: 'xss',
        title: '5.3 Cross-Site Scripting (XSS)',
        content: [
          'Reflected XSS: Malicious script in URL',
          'Stored XSS: Malicious script stored in database',
          'DOM-based XSS: Client-side vulnerability',
          'Impact: Session hijacking, defacement, phishing',
          'Prevention: Input validation, output encoding, CSP headers'
        ]
      }
    ]
  }
];


export default function Resources() {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const filteredModules = STUDY_MODULES.filter(module => {
    const matchesLevel = selectedLevel === 'all' || module.level === selectedLevel;
    const matchesSearch = searchQuery === '' ||
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.topics.some(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.content.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesLevel && matchesSearch;
  });

  const totalHours = STUDY_MODULES.reduce((sum, module) => sum + module.estimatedHours, 0);

  return (
    <div className="min-h-screen bg-bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Study Resources</h1>
          <p className="text-text-secondary">
            Comprehensive cybersecurity study notes from beginner to expert
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-lg p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-text-primary">{STUDY_MODULES.length}</p>
                <p className="text-sm text-text-secondary">Total Modules</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-text-primary">
                  {STUDY_MODULES.reduce((sum, m) => sum + m.topics.length, 0)}
                </p>
                <p className="text-sm text-text-secondary">Topics Covered</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-text-primary">{totalHours}h</p>
                <p className="text-sm text-text-secondary">Study Time</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Download className="w-8 h-8 text-warning" />
              <div>
                <a
                  href="/Study_Notes_Cyber_Security_Beg_To_Expert_v5.pdf"
                  download
                  className="text-2xl font-bold text-primary hover:text-secondary transition-smooth"
                >
                  PDF
                </a>
                <p className="text-sm text-text-secondary">Download Notes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary transition-smooth"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-smooth ${
                    selectedLevel === level
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                  }`}
                >
                  {level === 'all' ? 'All' : level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {filteredModules.map((module) => (
            <div key={module.id} className="glass rounded-lg overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-bg-secondary transition-smooth"
              >
                <div className="flex items-center gap-4">
                  {expandedModules.includes(module.id) ? (
                    <ChevronDown className="w-6 h-6 text-primary" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-text-tertiary" />
                  )}
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-text-primary mb-1">{module.title}</h2>
                    <p className="text-text-secondary text-sm">{module.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    module.level === 'Beginner' ? 'bg-success/20 text-success' :
                    module.level === 'Intermediate' ? 'bg-warning/20 text-warning' :
                    module.level === 'Advanced' ? 'bg-danger/20 text-danger' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {module.level}
                  </span>
                  <span className="text-text-tertiary text-sm">{module.estimatedHours}h</span>
                </div>
              </button>

              {/* Module Content */}
              {expandedModules.includes(module.id) && (
                <div className="p-6 pt-0 space-y-4">
                  {module.topics.map((topic) => (
                    <div key={topic.id} className="bg-bg-secondary rounded-lg overflow-hidden">
                      {/* Topic Header */}
                      <button
                        onClick={() => toggleTopic(topic.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-bg-tertiary transition-smooth"
                      >
                        <div className="flex items-center gap-3">
                          {expandedTopics.includes(topic.id) ? (
                            <ChevronDown className="w-5 h-5 text-secondary" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-text-tertiary" />
                          )}
                          <h3 className="text-lg font-semibold text-text-primary">{topic.title}</h3>
                        </div>
                        <FileText className="w-5 h-5 text-text-tertiary" />
                      </button>

                      {/* Topic Content */}
                      {expandedTopics.includes(topic.id) && (
                        <div className="p-4 pt-0">
                          <ul className="space-y-2">
                            {topic.content.map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                <span className="text-text-secondary">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="glass rounded-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">No modules found</h3>
            <p className="text-text-secondary">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}



