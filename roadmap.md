🚀 Complete Cybersecurity Career Tracker - Full Implementation Prompt
📋 PROJECT OVERVIEW
Build a full-stack, production-ready cybersecurity career tracking application with Firebase backend, advanced authentication, AI-powered curriculum generation, and intelligent progress tracking.

🔐 AUTHENTICATION & SECURITY REQUIREMENTS
Multi-Factor Authentication (MFA)

Email/Password with email verification
Phone/SMS verification as second factor
Google OAuth 2.0 integration
Microsoft Azure AD integration (for enterprise users)
Biometric authentication support (WebAuthn/FIDO2)
Authenticator app support (TOTP - Time-based One-Time Password)

Identity Federation

Support for SAML 2.0 integration (for government/enterprise)
OAuth 2.0 for social logins (Google, Microsoft, GitHub)
OpenID Connect support
Single Sign-On (SSO) capabilities

Security Features

Session management with automatic timeout
Device fingerprinting and trusted device management
IP-based geo-restriction options
Account activity logging
Password strength requirements (min 12 chars, complexity)
Rate limiting on login attempts
CAPTCHA on suspicious activity


🗄️ FIREBASE ARCHITECTURE
Database Structure (Firestore)
javascript// Collection: users
users/{userId} {
  email: string,
  displayName: string,
  photoURL: string,
  createdAt: timestamp,
  lastLogin: timestamp,
  mfaEnabled: boolean,
  mfaMethods: ['sms', 'authenticator', 'email'],
  trustedDevices: [
    {
      deviceId: string,
      deviceName: string,
      lastUsed: timestamp,
      ipAddress: string
    }
  ],
  preferences: {
    emailNotifications: boolean,
    dailyReminders: boolean,
    reminderTime: string, // "12:00 AM"
    timezone: string,
    theme: string // "dark" or "light"
  }
}

// Collection: userGoals
userGoals/{userId} {
  currentTier: string, // "learning", "tier1", "tier2", "tier3"
  targetTier: string,
  startDate: timestamp,
  milestones: [
    {
      id: string,
      name: string, // "Reach Tier 1"
      targetDate: timestamp,
      completed: boolean,
      completedDate: timestamp,
      requirements: [string] // list of requirement IDs
    }
  ],
  customGoals: [
    {
      id: string,
      description: string,
      deadline: timestamp,
      completed: boolean
    }
  ],
  generatedCurriculum: {
    generatedAt: timestamp,
    totalWeeks: number,
    phases: [
      {
        phaseNumber: number,
        phaseName: string,
        startWeek: number,
        endWeek: number,
        skills: [string],
        tools: [string],
        labs: [string],
        certifications: [string],
        weeklyHours: number
      }
    ]
  }
}

// Collection: dailyLogs
dailyLogs/{userId}/logs/{logId} {
  date: timestamp,
  topicsLearned: [
    {
      category: string, // "networking", "os", "security", "tools"
      topic: string,
      proficiency: number, // 1-10
      timeSpent: number // minutes
    }
  ],
  toolsPracticed: [
    {
      toolName: string,
      activity: string,
      duration: number,
      notes: string
    }
  ],
  labsCompleted: [
    {
      labName: string,
      platform: string, // "TryHackMe", "HackTheBox"
      difficulty: string,
      completed: boolean,
      writeupLink: string
    }
  ],
  hoursStudied: number,
  challenges: string,
  wins: string,
  tomorrowGoals: string,
  mood: string, // "motivated", "struggling", "confident"
  energyLevel: number // 1-10
}

// Collection: skillsMatrix
skillsMatrix/{userId} {
  categories: {
    networking: {
      topics: {
        "TCP/IP": {
          learned: boolean,
          proficiency: number, // 0-100
          lastPracticed: timestamp,
          resources: [string],
          notes: string
        },
        "OSI Model": {...},
        "DNS": {...},
        "HTTP/HTTPS": {...},
        "Ports & Protocols": {...},
        "Packet Analysis": {...}
      },
      overallProficiency: number,
      completionPercentage: number
    },
    operatingSystems: {
      topics: {
        "Windows Event Logs": {
          subtopics: {
            "Event ID 4624": {...},
            "Event ID 4625": {...},
            "Event ID 4688": {...}
          }
        },
        "Linux Logs": {...},
        "File Systems": {...},
        "Permissions": {...}
      }
    },
    securityConcepts: {
      topics: {
        "CIA Triad": {...},
        "IAM": {...},
        "Least Privilege": {...},
        "Authentication vs Authorization": {...},
        "Common Attack Vectors": {...}
      }
    },
    tools: {
      topics: {
        "Wireshark": {
          proficiency: number,
          hoursUsed: number,
          lastUsed: timestamp,
          capabilities: [
            "Packet capture",
            "Protocol analysis",
            "Traffic filtering",
            "PCAP analysis"
          ],
          projectsCompleted: [string]
        },
        "Splunk": {...},
        "Nmap": {...},
        "tcpdump": {...}
      }
    },
    certifications: {
      "CompTIA Security+": {
        targetDate: timestamp,
        started: boolean,
        prerequisites: [string],
        ready: boolean,
        progress: number,
        studyResources: [string],
        practiceExamScores: [
          {
            date: timestamp,
            score: number,
            totalQuestions: number
          }
        ]
      },
      "Google Cybersecurity": {...}
    }
  },
  lastUpdated: timestamp
}

// Collection: readinessIndicators
readinessIndicators/{userId} {
  currentReadiness: [
    {
      id: string,
      type: string, // "certification", "job", "lab", "project"
      title: string,
      description: string,
      progress: number,
      requirements: [
        {
          requirement: string,
          met: boolean,
          details: string
        }
      ],
      unlocked: boolean,
      unlockedAt: timestamp,
      actioned: boolean
    }
  ],
  history: [
    {
      indicator: object, // full indicator object
      unlockedAt: timestamp,
      actionedAt: timestamp
    }
  ]
}

// Collection: notifications
notifications/{userId}/messages/{messageId} {
  type: string, // "daily_checkin", "milestone", "readiness", "reminder"
  title: string,
  body: string,
  read: boolean,
  createdAt: timestamp,
  actionUrl: string,
  priority: string // "high", "medium", "low"
}

// Collection: portfolioItems
portfolioItems/{userId}/items/{itemId} {
  type: string, // "incident_report", "lab_writeup", "project"
  title: string,
  description: string,
  dateCreated: timestamp,
  tags: [string],
  githubUrl: string,
  linkedinUrl: string,
  content: string, // markdown
  skills: [string],
  tools: [string]
}

// Collection: jobApplications
jobApplications/{userId}/applications/{appId} {
  company: string,
  position: string,
  appliedDate: timestamp,
  status: string, // "applied", "interview", "offer", "rejected", "accepted"
  jobDescription: string,
  salaryRange: {
    min: number,
    max: number,
    currency: string
  },
  notes: string,
  interviewDates: [timestamp],
  followUpDate: timestamp
}

🤖 AI CURRICULUM GENERATOR - DATA REQUIREMENTS
Master Knowledge Base (JSON Dataset)
javascriptconst masterKnowledgeBase = {
  // Skill categories with detailed breakdown
  skills: {
    networking: {
      displayName: "Networking Fundamentals",
      importance: 10, // 1-10 scale
      prerequisitesFor: ["tier1", "tier2", "tier3"],
      estimatedHours: 40,
      topics: [
        {
          id: "tcp_ip",
          name: "TCP/IP Protocol Suite",
          subtopics: [
            "TCP vs UDP",
            "IP Addressing (IPv4/IPv6)",
            "Subnetting",
            "Routing basics",
            "Port numbers"
          ],
          difficulty: 3, // 1-10
          estimatedHours: 8,
          resources: [
            {
              type: "video",
              title: "TCP/IP Fundamentals",
              url: "https://...",
              duration: 120, // minutes
              platform: "YouTube"
            },
            {
              type: "course",
              title: "Networking Basics",
              url: "https://tryhackme.com/...",
              platform: "TryHackMe"
            },
            {
              type: "book",
              title: "TCP/IP Illustrated",
              author: "W. Richard Stevens"
            }
          ],
          practiceActivities: [
            "Set up virtual network lab",
            "Analyze TCP handshake in Wireshark",
            "Configure basic routing"
          ],
          assessmentCriteria: [
            "Can explain 3-way handshake",
            "Can subnet a network",
            "Can identify common ports"
          ]
        },
        {
          id: "osi_model",
          name: "OSI Model",
          subtopics: [
            "Layer 1: Physical",
            "Layer 2: Data Link",
            "Layer 3: Network",
            "Layer 4: Transport",
            "Layer 5: Session",
            "Layer 6: Presentation",
            "Layer 7: Application"
          ],
          difficulty: 2,
          estimatedHours: 4,
          resources: [...],
          practiceActivities: [
            "Map real protocols to OSI layers",
            "Troubleshoot network issues using OSI model"
          ]
        },
        {
          id: "dns",
          name: "DNS (Domain Name System)",
          subtopics: [
            "DNS resolution process",
            "Record types (A, AAAA, MX, CNAME, TXT)",
            "DNS zones",
            "DNS attacks (poisoning, tunneling)"
          ],
          difficulty: 4,
          estimatedHours: 6,
          securityFocus: true,
          resources: [...],
          practiceActivities: [
            "Perform DNS reconnaissance with dig/nslookup",
            "Analyze DNS traffic in Wireshark",
            "Identify DNS tunneling"
          ]
        }
        // ... more networking topics
      ]
    },
    
    operatingSystems: {
      displayName: "Operating Systems",
      importance: 9,
      prerequisitesFor: ["tier1", "tier2", "tier3"],
      estimatedHours: 50,
      topics: [
        {
          id: "windows_event_logs",
          name: "Windows Event Logs",
          subtopics: [
            "Event Viewer navigation",
            "Security logs",
            "Event ID 4624 (Successful logon)",
            "Event ID 4625 (Failed logon)",
            "Event ID 4688 (Process creation)",
            "Event ID 4672 (Special privileges)",
            "Forwarding and collection"
          ],
          difficulty: 5,
          estimatedHours: 12,
          securityFocus: true,
          tierRelevance: {
            tier1: "critical",
            tier2: "critical",
            tier3: "important"
          },
          resources: [...],
          practiceActivities: [
            "Investigate failed login attempts",
            "Trace process execution",
            "Identify privilege escalation"
          ],
          labRecommendations: [
            "TryHackMe: Windows Event Logs",
            "Blue Team Labs: Investigating Windows Logs"
          ]
        },
        {
          id: "linux_logs",
          name: "Linux System Logs",
          subtopics: [
            "/var/log/auth.log",
            "/var/log/syslog",
            "/var/log/secure",
            "journalctl",
            "Log rotation",
            "grep, awk, sed for log analysis"
          ],
          difficulty: 6,
          estimatedHours: 10,
          resources: [...],
          practiceActivities: [
            "Parse auth.log for suspicious logins",
            "Create log analysis scripts",
            "Identify brute force attempts"
          ]
        }
        // ... more OS topics
      ]
    },
    
    securityConcepts: {
      displayName: "Security Concepts",
      importance: 10,
      prerequisitesFor: ["tier1", "tier2", "tier3"],
      estimatedHours: 35,
      topics: [
        {
          id: "cia_triad",
          name: "CIA Triad",
          subtopics: [
            "Confidentiality",
            "Integrity",
            "Availability",
            "Real-world examples"
          ],
          difficulty: 2,
          estimatedHours: 3,
          foundational: true
        },
        {
          id: "mitre_attack",
          name: "MITRE ATT&CK Framework",
          subtopics: [
            "Tactics vs Techniques",
            "Initial Access",
            "Execution",
            "Persistence",
            "Privilege Escalation",
            "Defense Evasion",
            "Credential Access",
            "Discovery",
            "Lateral Movement",
            "Collection",
            "Exfiltration",
            "Impact"
          ],
          difficulty: 7,
          estimatedHours: 20,
          tierRelevance: {
            tier1: "basic",
            tier2: "critical",
            tier3: "critical"
          },
          resources: [...],
          practiceActivities: [
            "Map alerts to ATT&CK techniques",
            "Build detection use cases",
            "Threat hunting with ATT&CK"
          ]
        }
        // ... more security concept topics
      ]
    },
    
    tools: {
      displayName: "Security Tools",
      importance: 10,
      prerequisitesFor: ["tier1", "tier2", "tier3"],
      topics: [
        {
          id: "wireshark",
          name: "Wireshark",
          category: "Network Analysis",
          difficulty: 5,
          estimatedHours: 15,
          tierRelevance: {
            tier1: "critical",
            tier2: "important",
            tier3: "basic"
          },
          capabilities: [
            "Packet capture",
            "Protocol analysis",
            "Traffic filtering",
            "PCAP analysis",
            "Network troubleshooting"
          ],
          learningPath: [
            {
              phase: 1,
              skills: "Basic capture and filtering",
              activities: [
                "Install and configure Wireshark",
                "Capture live traffic",
                "Apply display filters",
                "Follow TCP streams"
              ],
              hours: 5
            },
            {
              phase: 2,
              skills: "Protocol analysis",
              activities: [
                "Analyze HTTP/HTTPS traffic",
                "Identify DNS queries",
                "Examine TCP handshakes",
                "Spot suspicious patterns"
              ],
              hours: 5
            },
            {
              phase: 3,
              skills: "Security analysis",
              activities: [
                "Detect port scans",
                "Identify malware C2 traffic",
                "Analyze exploit attempts",
                "Export and report findings"
              ],
              hours: 5
            }
          ],
          resources: [...],
          practiceDatasets: [
            {
              name: "Malware Traffic Analysis",
              url: "https://malware-traffic-analysis.net",
              description: "Real PCAP files from malware infections"
            }
          ],
          assessmentCriteria: [
            "Can capture and filter traffic",
            "Can identify protocols",
            "Can detect anomalies",
            "Can export evidence"
          ]
        },
        {
          id: "splunk",
          name: "Splunk",
          category: "SIEM",
          difficulty: 6,
          estimatedHours: 25,
          tierRelevance: {
            tier1: "critical",
            tier2: "critical",
            tier3: "critical"
          },
          capabilities: [
            "Log ingestion",
            "SPL query language",
            "Dashboard creation",
            "Alert configuration",
            "Correlation rules"
          ],
          learningPath: [
            {
              phase: 1,
              skills: "Splunk basics",
              activities: [
                "Install Splunk Free",
                "Ingest sample data",
                "Basic SPL searches",
                "Time range selections"
              ],
              hours: 8
            },
            {
              phase: 2,
              skills: "Advanced searching",
              activities: [
                "Advanced SPL (stats, eval, rex)",
                "Create visualizations",
                "Build dashboards",
                "Schedule searches"
              ],
              hours: 10
            },
            {
              phase: 3,
              skills: "Security operations",
              activities: [
                "Alert triage workflows",
                "Incident investigation",
                "Threat hunting queries",
                "Correlation searches"
              ],
              hours: 7
            }
          ],
          certifications: [
            "Splunk Core Certified User",
            "Splunk Enterprise Security Certified Admin"
          ],
          resources: [...]
        }
        // ... more tools (Nmap, tcpdump, Metasploit, Burp Suite, etc.)
      ]
    }
  },
  
  // Certification requirements
  certifications: {
    "comptia_security_plus": {
      displayName: "CompTIA Security+",
      vendor: "CompTIA",
      difficulty: 5,
      estimatedStudyHours: 80,
      cost: 370, // USD
      validity: 3, // years
      prerequisites: [
        "Basic networking knowledge",
        "Basic OS knowledge",
        "2 years IT experience (recommended)"
      ],
      domains: [
        {
          name: "Threats, Attacks and Vulnerabilities",
          weight: 24,
          topics: [
            "Social engineering",
            "Malware types",
            "Attack frameworks",
            "Vulnerability scanning"
          ]
        },
        {
          name: "Architecture and Design",
          weight: 21,
          topics: [
            "Secure network design",
            "Cloud security",
            "Cryptography",
            "Identity management"
          ]
        },
        {
          name: "Implementation",
          weight: 25,
          topics: [
            "Secure protocols",
            "Security controls",
            "PKI",
            "Authentication"
          ]
        },
        {
          name: "Operations and Incident Response",
          weight: 16,
          topics: [
            "Security tools",
            "Incident response",
            "Digital forensics",
            "Security operations"
          ]
        },
        {
          name: "Governance, Risk and Compliance",
          weight: 14,
          topics: [
            "Policies and procedures",
            "Risk management",
            "Compliance",
            "Data protection"
          ]
        }
      ],
      skillsRequired: [
        "networking",
        "operatingSystems",
        "securityConcepts",
        "cryptography"
      ],
      readinessCriteria: [
        {
          requirement: "Completed networking fundamentals",
          skillId: "networking",
          minProficiency: 70
        },
        {
          requirement: "Understand OS security",
          skillId: "operatingSystems",
          minProficiency: 60
        },
        {
          requirement: "Know security concepts",
          skillId: "securityConcepts",
          minProficiency: 65
        },
        {
          requirement: "Practice exam score >80%",
          type: "assessment"
        }
      ],
      studyResources: [
        {
          type: "course",
          name: "Professor Messer Security+ Course",
          url: "https://professormesser.com",
          cost: 0
        },
        {
          type: "book",
          name: "CompTIA Security+ Study Guide",
          author: "Darril Gibson",
          cost: 50
        },
        {
          type: "practice",
          name: "ExamCompass Practice Tests",
          url: "https://examcompass.com",
          cost: 0
        }
      ]
    },
    
    "google_cybersecurity": {
      displayName: "Google Cybersecurity Certificate",
      vendor: "Google (via Coursera)",
      difficulty: 3,
      estimatedStudyHours: 180,
      cost: 49, // monthly subscription
      validity: null, // lifetime
      prerequisites: ["None - beginner friendly"],
      courses: [
        {
          name: "Foundations of Cybersecurity",
          hours: 15,
          topics: [
            "Security domains",
            "Threats and attacks",
            "Security frameworks"
          ]
        },
        {
          name: "Play It Safe: Manage Security Risks",
          hours: 22,
          topics: [
            "Security frameworks",
            "Controls and compliance",
            "Common threats"
          ]
        },
        {
          name: "Connect and Protect: Networks and Network Security",
          hours: 23,
          topics: [
            "Network architecture",
            "Network protocols",
            "System hardening"
          ]
        },
        {
          name: "Tools of the Trade: Linux and SQL",
          hours: 26,
          topics: [
            "Linux commands",
            "SQL queries",
            "File systems"
          ]
        },
        {
          name: "Assets, Threats, and Vulnerabilities",
          hours: 31,
          topics: [
            "Asset management",
            "Threat analysis",
            "Vulnerability assessment"
          ]
        },
        {
          name: "Sound the Alarm: Detection and Response",
          hours: 28,
          topics: [
            "Incident lifecycle",
            "IDS/IPS",
            "SIEM tools"
          ]
        },
        {
          name: "Automate Cybersecurity Tasks with Python",
          hours: 35,
          topics: [
            "Python basics",
            "Automation",
            "Data handling"
          ]
        }
      ],
      readinessCriteria: [
        {
          requirement: "Basic computer skills",
          type: "prerequisite"
        },
        {
          requirement: "Time commitment (10 hours/week)",
          type: "time"
        }
      ]
    }
    
    // Add more certifications: AZ-500, CISSP, CEH, OSCP, etc.
  },
  
  // Career tiers with detailed requirements
  tiers: {
    tier1: {
      name: "SOC Tier 1 Analyst",
      typicalDuration: "4-6 months",
      responsibilities: [
        "Monitor security alerts",
        "Perform initial triage",
        "Analyze phishing emails",
        "Document incidents",
        "Escalate to Tier 2",
        "Follow playbooks"
      ],
      requiredSkills: {
        networking: 70,
        operatingSystems: 65,
        securityConcepts: 60,
        tools: 70
      },
      requiredTools: [
        "Wireshark",
        "Splunk",
        "Windows Event Viewer",
        "Basic Linux CLI"
      ],
      recommendedCertifications: [
        "CompTIA Security+",
        "Google Cybersecurity Certificate"
      ],
      portfolioRequirements: [
        "3 incident investigation writeups",
        "1 phishing analysis report",
        "1 network traffic analysis",
        "GitHub with documentation"
      ],
      salaryRange: {
        min: 55000,
        max: 70000,
        currency: "CAD"
      }
    },
    
    tier2: {
      name: "SOC Tier 2 Analyst",
      typicalDuration: "6-12 months",
      responsibilities: [
        "Deep-dive investigations",
        "Threat hunting",
        "Tune detection rules",
        "Create playbooks",
        "Mentor Tier 1",
        "Own incidents end-to-end"
      ],
      requiredSkills: {
        networking: 80,
        operatingSystems: 80,
        securityConcepts: 85,
        tools: 85,
        mitreAttack: 80,
        edr: 75,
        threatHunting: 70
      },
      requiredTools: [
        "Advanced Splunk/KQL",
        "EDR (CrowdStrike/Defender)",
        "MITRE ATT&CK Navigator",
        "Python basics"
      ],
      recommendedCertifications: [
        "Blue Team Level 1",
        "AZ-500",
        "Splunk Core User"
      ],
      salaryRange: {
        min: 75000,
        max: 95000,
        currency: "CAD"
      }
    },
    
    tier3: {
      name: "Specialist / Senior Analyst",
      specializations: [
        {
          name: "Detection Engineer",
          focus: "Writing detection rules, automation",
          skills: ["Advanced SIEM", "Python", "Sigma rules", "YARA"],
          bestFor: "Big Tech"
        },
        {
          name: "Cloud Security Engineer",
          focus: "Cloud security, AWS/Azure",
          skills: ["AWS Security", "Azure Sentinel", "IAM", "CloudTrail"],
          bestFor: "Big Tech, SaaS"
        },
        {
          name: "DFIR Specialist",
          focus: "Forensics, incident response",
          skills: ["Volatility", "Autopsy", "Malware analysis", "Evidence handling"],
          bestFor: "Government, Finance"
        },
        {
          name: "Threat Hunter",
          focus: "Proactive threat detection",
          skills: ["Hypothesis development", "Advanced analytics", "Threat intelligence"],
          bestFor: "Enterprise, Big Tech"
        }
      ],
      typicalDuration: "12-18 months",
      requiredSkills: {
        networking: 90,
        operatingSystems: 90,
        securityConcepts: 95,
        tools: 90,
        mitreAttack: 90,
        programming: 75,
        cloud: 80
      },
      salaryRange: {
        min: 100000,
        max: 140000,
        currency: "CAD"
      }
    }
  },
  
  // Lab platforms and exercises
  labPlatforms: {
    "tryhackme": {
      name: "TryHackMe",
      url: "https://tryhackme.com",
      cost: "Free + $10/month premium",
      focus: "Structured learning paths",
      difficulty: "Beginner to Advanced",
      recommendedPaths: [
        {
          name: "SOC Level 1",
          rooms: 24,
          hours: 50,
          skills: ["Alert triage", "Phishing analysis", "SIEM basics"],
          tierRelevance: "tier1"
        },
        {
          name: "Cyber Defense",
          rooms: 48,
          hours: 100,
          skills: ["Threat hunting", "DFIR", "Network security"],
          tierRelevance: "tier2"
        }
      ]
    },
    "hackthebox": {
      name: "HackTheBox",
      url: "https://hackthebox.com",
      cost: "$20/month VIP",
      focus: "Hands-on labs, realistic scenarios",
      difficulty: "Intermediate to Advanced"
    },
    "letsdefend": {
      name: "LetsDefend",
      url: "https://letsdefend.io",
      cost: "Free + $15/month premium",
      focus: "SOC analyst training, real SIEM interface",
      tierRelevance: "tier1, tier2"
    },
    "blueteamlabs": {
      name: "Blue Team Labs Online",
      url: "https://blueteamlabsonline.com",
      cost: "$15/month",
      focus: "Defensive security, incident investigation"
    },
    "cyberdefenders": {
      name: "CyberDefenders",
      url: "https://cyberdefenders.org",
      cost: "Free",
      focus: "Blue team CTF challenges"
    }
  },
  
  // Readiness detection rules
  readinessRules: [
    {
      id: "ready_for_tier1_jobs",
      type: "job",
      title: "Ready to Apply for SOC Tier 1 Positions",
      description: "You have the foundational skills to start applying",
      requirements: [
        {
          type: "skill",
          category: "networking",
          minProficiency: 70
        },
        {
          type: "skill",
          category: "operatingSystems",
          minProficiency: 65
        },
        {
          type: "skill",
          category: "tools",
          specificTools: ["Wireshark", "Splunk"],
          minProficiency: 60
        },
        {
          type: "portfolio",
          minItems: 3,
          itemTypes: ["incident_report", "lab_writeup"]
        },
        {
          type: "certification",
          anyOf: ["comptia_security_plus", "google_cybersecurity"],
          status: "in_progress_or_completed"
        }
      ],
      recommendations: [
        "Polish your GitHub portfolio",
        "Update LinkedIn with SOC skills",
        "Start applying to 20+ positions",
        "Prepare for behavioral interviews"
      ]
    },
    
    {
      id: "ready_for_comptia_security_plus",
      type: "certification",
      title: "Ready for CompTIA Security+ Exam",
      description: "Your knowledge meets the exam requirements",
      requirements: [
        {
          type: "skill",
          category: "networking",
          minProficiency: 75
        },
        {
          type: "skill",
          category: "securityConcepts",
          minProficiency: 70
        },
        {
          type: "skill",
          category: "operatingSystems",
          minProficiency: 70
        },
        {
          type: "studyTime",
          minHours: 60
        }
      ],
      recommendations: [
        "Take practice exams",
        "Review weak areas",
        "Schedule exam when scoring 85%+",
        "Budget $370 for exam fee"
      ]
    },
    
    {
      id: "ready_for_advanced_labs",
      type: "lab",
      title: "Ready for Advanced Security Labs",
      description: "You can tackle intermediate TryHackMe/HTB challenges",
      requirements: [
        {
          type: "skill",
          category: "tools",
          minProficiency: 75
        },
        {
          type: "labs_completed",
          platform: "tryhackme",
          minCount: 10
        }
      ],
      recommendations: [
        "Try HackTheBox Starting Point",
        "Attempt Blue Team Labs DFIR challenges",
            "Join CTF competitions"
  ]
}

// Add more readiness rules
]
};

---

## 🧠 AI RECOMMENDATION ENGINE - Logic
```javascript
// Curriculum generation algorithm
function generatePersonalizedCurriculum(userGoals, currentSkills, availableTime) {
  const {
    targetTier,
    targetDate,
    weeklyHours,
    focusAreas, // ["cloud", "dfir", "detection_engineering"]
    certifications // ["comptia_security_plus", "google_cybersecurity"]
  } = userGoals;
  
  // Calculate available study time
  const weeksAvailable = calculateWeeks(new Date(), targetDate);
  const totalHoursAvailable = weeksAvailable * weeklyHours;
  
  // Get tier requirements
  const tierRequirements = masterKnowledgeBase.tiers[targetTier];
  
  // Identify skill gaps
  const skillGaps = [];
  for (const [skillCategory, requiredProficiency] of Object.entries(tierRequirements.requiredSkills)) {
    const currentProficiency = currentSkills[skillCategory] || 0;
    if (currentProficiency < requiredProficiency) {
      skillGaps.push({
        category: skillCategory,
        currentLevel: currentProficiency,
        targetLevel: requiredProficiency,
        gap: requiredProficiency - currentProficiency,
        topics: masterKnowledgeBase.skills[skillCategory].topics
      });
    }
  }
  
  // Sort by importance and gap size
  skillGaps.sort((a, b) => {
    const importanceA = masterKnowledgeBase.skills[a.category].importance;
    const importanceB = masterKnowledgeBase.skills[b.category].importance;
    return (importanceB * b.gap) - (importanceA * a.gap);
  });
  
  // Allocate time to each skill
  const curriculum = {
    phases: [],
    totalWeeks: weeksAvailable,
    weeklyHours: weeklyHours
  };
  
  let currentWeek = 1;
  let remainingHours = totalHoursAvailable;
  
  // Phase 1: Foundation (close critical gaps)
  const foundationPhase = {
    phaseNumber: 1,
    phaseName: "Foundation",
    startWeek: currentWeek,
    skills: [],
    tools: [],
    labs: [],
    certifications: [],
    weeklySchedule: []
  };
  
  for (const gap of skillGaps.filter(g => g.currentLevel < 50)) {
    const hoursNeeded = calculateHoursNeeded(gap);
    if (remainingHours < hoursNeeded) continue;
    
    foundationPhase.skills.push({
      category: gap.category,
      topics: prioritizeTopics(gap.topics, gap.targetLevel),
      hoursAllocated: hoursNeeded,
      learningResources: getResources(gap.category, "beginner"),
      practiceActivities: getPracticeActivities(gap.category, "beginner")
    });
    
    remainingHours -= hoursNeeded;
  }
  
  const foundationWeeks = Math.ceil(
    foundationPhase.skills.reduce((sum, s) => sum + s.hoursAllocated, 0) / weeklyHours
  );
  foundationPhase.endWeek = currentWeek + foundationWeeks - 1;
  curriculum.phases.push(foundationPhase);
  currentWeek = foundationPhase.endWeek + 1;
  
  // Phase 2: Intermediate (build proficiency)
  const intermediatePhase = {
    phaseNumber: 2,
    phaseName: "Skill Building",
    startWeek: currentWeek,
    skills: [],
    tools: [],
    labs: [],
    certifications: []
  };
  
  // Add tools training
  for (const toolName of tierRequirements.requiredTools) {
    const tool = findTool(masterKnowledgeBase.tools, toolName);
    intermediatePhase.tools.push({
      name: toolName,
      learningPath: tool.learningPath,
      hoursAllocated: tool.estimatedHours,
      practiceDatasets: tool.practiceDatasets
    });
  }
  
  // Add certification prep if requested
  for (const certName of certifications) {
    const cert = masterKnowledgeBase.certifications[certName];
    intermediatePhase.certifications.push({
      name: certName,
      studyHours: cert.estimatedStudyHours,
      domains: cert.domains,
      resources: cert.studyResources
    });
  }
  
  const intermediateWeeks = Math.ceil(
    (intermediatePhase.tools.reduce((sum, t) => sum + t.hoursAllocated, 0) +
     intermediatePhase.certifications.reduce((sum, c) => sum + c.studyHours, 0)) / weeklyHours
  );
  intermediatePhase.endWeek = currentWeek + intermediateWeeks - 1;
  curriculum.phases.push(intermediatePhase);
  currentWeek = intermediatePhase.endWeek + 1;
  
  // Phase 3: Specialization (if targeting tier 3)
  if (targetTier === "tier3" && focusAreas.length > 0) {
    const specializationPhase = {
      phaseNumber: 3,
      phaseName: "Specialization",
      startWeek: currentWeek,
      focus: focusAreas[0], // primary focus
      skills: [],
      tools: [],
      labs: [],
      projects: []
    };
    
    // Add specialized skills based on focus
    const specialization = masterKnowledgeBase.tiers.tier3.specializations
      .find(s => s.name.toLowerCase().includes(focusAreas[0]));
    
    specializationPhase.skills = specialization.skills.map(skillName => ({
      name: skillName,
      hoursAllocated: 20,
      advancedTopics: getAdvancedTopics(skillName),
      realWorldProjects: getProjectIdeas(skillName)
    }));
    
    const specializationWeeks = Math.ceil(
      specializationPhase.skills.reduce((sum, s) => sum + s.hoursAllocated, 0) / weeklyHours
    );
    specializationPhase.endWeek = currentWeek + specializationWeeks - 1;
    curriculum.phases.push(specializationPhase);
  }
  
  // Generate weekly breakdown
  curriculum.weeklyBreakdown = generateWeeklySchedule(curriculum, weeklyHours);
  
  return curriculum;
}

// Readiness detection engine
function checkReadiness(userId, userSkills, userLogs, userCertifications) {
  const unlockedIndicators = [];
  
  for (const rule of masterKnowledgeBase.readinessRules) {
    let meetsAllRequirements = true;
    const requirementStatus = [];
    
    for (const req of rule.requirements) {
      let met = false;
      let details = "";
      
      switch (req.type) {
        case "skill":
          const skillProficiency = userSkills[req.category]?.overallProficiency || 0;
          met = skillProficiency >= req.minProficiency;
          details = `${skillProficiency}/${req.minProficiency}%`;
          break;
          
        case "portfolio":
          const portfolioCount = countPortfolioItems(userId, req.itemTypes);
          met = portfolioCount >= req.minItems;
          details = `${portfolioCount}/${req.minItems} items`;
          break;
          
        case "certification":
          met = hasCertification(userCertifications, req.anyOf, req.status);
          details = met ? "Completed" : "In progress";
          break;
          
        case "studyTime":
          const totalHours = calculateTotalStudyHours(userLogs);
          met = totalHours >= req.minHours;
          details = `${totalHours}/${req.minHours} hours`;
          break;
          
        case "labs_completed":
          const labCount = countCompletedLabs(userLogs, req.platform);
          met = labCount >= req.minCount;
          details = `${labCount}/${req.minCount} labs`;
          break;
      }
      
      requirementStatus.push({
        requirement: req,
        met: met,
        details: details
      });
      
      if (!met) {
        meetsAllRequirements = false;
      }
    }
    
    if (meetsAllRequirements) {
      unlockedIndicators.push({
        id: rule.id,
        type: rule.type,
        title: rule.title,
        description: rule.description,
        progress: 100,
        requirements: requirementStatus,
        recommendations: rule.recommendations,
        unlocked: true,
        unlockedAt: new Date()
      });
    } else {
      // Calculate partial progress
      const metCount = requirementStatus.filter(r => r.met).length;
      const progress = (metCount / requirementStatus.length) * 100;
      
      if (progress > 50) {
        // Show indicators that are >50% complete
        unlockedIndicators.push({
          id: rule.id,
          type: rule.type,
          title: rule.title,
          description: rule.description,
          progress: progress,
          requirements: requirementStatus,
          recommendations: rule.recommendations,
          unlocked: false
        });
      }
    }
  }
  
  return unlockedIndicators;
}

// Topic recommendation engine
function recommendNextTopics(currentSkills, targetTier, recentLogs) {
  const recommendations = [];
  
  // Analyze what user has been learning
  const recentTopics = recentLogs
    .flatMap(log => log.topicsLearned)
    .slice(-10); // last 10 topics
  
  // Find related advanced topics
  for (const topic of recentTopics) {
    const relatedAdvanced = findAdvancedTopics(topic.topic, topic.category);
    recommendations.push(...relatedAdvanced);
  }
  
  // Find gaps in required skills for target tier
  const tierRequirements = masterKnowledgeBase.tiers[targetTier].requiredSkills;
  for (const [category, requiredLevel] of Object.entries(tierRequirements)) {
    const currentLevel = currentSkills[category]?.overallProficiency || 0;
    if (currentLevel < requiredLevel) {
      const nextTopics = getNextTopicsForCategory(category, currentLevel);
      recommendations.push(...nextTopics);
    }
  }
  
  // Prioritize by importance and user progress
  return recommendations
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5); // top 5 recommendations
}
```

---

## 📧 EMAIL AUTOMATION SYSTEM
```javascript
// Email templates and scheduling
const emailTemplates = {
  daily_checkin: {
    subject: "🚨 Daily Check-in: What did you learn today?",
    body: (userData) => `
      Hey ${userData.displayName}!
      
      It's the end of Day ${userData.daysSinceStart} on your SOC ${userData.targetTier} journey.
      
      Quick questions:
      ✅ What topics did you cover today?
      ✅ What tools did you practice?
      ✅ Any labs or projects completed?
      ✅ What's your plan for tomorrow?
      
      You're currently ${userData.phaseProgress}% through the ${userData.currentPhase} phase.
      ${userData.nextMilestone} is in ${userData.daysToMilestone} days!
      
      Click below to log your progress:
      ${userData.appUrl}/daily-log
      
      Keep crushing it! 💪
    `,
    sendTime: "00:00", // midnight
    timezone: "user_preference"
  },
  
  weekly_summary: {
    subject: "📊 Your Weekly Progress Report",
    body: (userData, weeklyData) => `
      Week ${weeklyData.weekNumber} Summary
      
      🎯 This Week:
      - ${weeklyData.hoursStudied} hours studied
      - ${weeklyData.topicsLearned.length} topics learned
      - ${weeklyData.labsCompleted} labs completed
      - ${weeklyData.toolsPracticed.length} tools practiced
      
      📈 Progress:
      - Overall: ${userData.overallProgress}% → ${userData.overallProgress + weeklyData.progressGain}%
      - ${userData.currentPhase}: ${weeklyData.phaseProgressBefore}% → ${weeklyData.phaseProgressAfter}%
      
      🏆 Achievements:
      ${weeklyData.achievements.map(a => `- ${a}`).join('\n')}
      
      🎯 Next Week Focus:
      ${weeklyData.recommendedTopics.map(t => `- ${t}`).join('\n')}
      
      ${weeklyData.milestoneMessage || ''}
      
      Review your dashboard: ${userData.appUrl}/dashboard
    `,
    sendTime: "09:00", // Sunday morning
    day: "sunday"
  },
  
  milestone_achieved: {
    subject: "🎉 Milestone Achieved: {milestone_name}!",
    body: (userData, milestone) => `
      Congratulations ${userData.displayName}! 🎉
      
      You've completed: ${milestone.name}
      
      What you've accomplished:
      ${milestone.requirements.map(r => `✅ ${r}`).join('\n')}
      
      You're now ready for:
      ${milestone.nextSteps.map(s => `🎯 ${s}`).join('\n')}
      
      ${milestone.tierTransition ? `
      Next phase starts tomorrow: ${milestone.nextPhase}
      New skills to learn: ${milestone.newSkills.join(', ')}
      ` : ''}
      
      Take a moment to celebrate this achievement! 🥳
      
      View your updated roadmap: ${userData.appUrl}/roadmap
    `,
    sendImmediately: true
  },
  
  capability_unlocked: {
    subject: "🔓 New Capability Unlocked: {capability_name}",
    body: (userData, capability) => `
      Great news ${userData.displayName}!
      
      Based on your learning progress, you're now capable of:
      
      ${capability.title}
      
      ${capability.details.map(d => `✅ ${d}`).join('\n')}
      
      Recommended next steps:
      ${capability.recommendations.map(r => `→ ${r}`).join('\n')}
      
      ${capability.certificationReady ? `
      🎓 You're ready to schedule: ${capability.certificationName}
      Estimated pass probability: ${capability.passProbability}%
      ` : ''}
      
      ${capability.jobReady ? `
      💼 You're ready to apply for: ${capability.jobTitles.join(', ')}
      Start applying to 20+ positions!
      ` : ''}
      
      Keep going! You're ${userData.overallProgress}% to ${userData.targetTier} readiness.
    `,
    sendImmediately: true
  },
  
  falling_behind_alert: {
    subject: "⚠️ Falling Behind Schedule - Let's Get Back on Track",
    body: (userData, analysis) => `
      Hey ${userData.displayName},
      
      I noticed you're falling behind your target timeline.
      
      Current Status:
      - Target tier: ${userData.targetTier} by ${userData.targetDate}
      - Current progress: ${userData.overallProgress}%
      - Expected progress: ${analysis.expectedProgress}%
      - Behind by: ${analysis.weeksBehind} weeks
      
      To get back on track:
      ${analysis.recommendations.map(r => `• ${r}`).join('\n')}
      
      Adjustments needed:
      - Increase weekly study time from ${userData.weeklyHours} to ${analysis.recommendedHours} hours
      OR
      - Extend target date by ${analysis.extensionWeeks} weeks
      
      Remember: Consistent progress beats perfection. Even 30 minutes daily helps!
      
      Update your goals: ${userData.appUrl}/settings
    `,
    condition: (userData) => userData.progressRate < 0.8 // 80% of expected
  },
  
  motivation_boost: {
    subject: "💪 You're Doing Great - Keep It Up!",
    body: (userData, stats) => `
      ${userData.displayName}, you're absolutely crushing it! 💪
      
      Your Stats:
      - ${stats.consecutiveDays} day study streak 🔥
      - ${stats.totalHours} hours invested in your future
      - ${stats.skillsLearned} skills mastered
      - ${stats.labsCompleted} labs completed
      
      Progress This Month:
      - ${stats.monthlyProgress}% closer to ${userData.targetTier}
      - ${stats.certificationsInProgress} certifications in progress
      - ${stats.portfolioItems} portfolio items created
      
      Fun Fact:
      ${stats.comparison}
      
      You're on pace to reach ${userData.targetTier} ${stats.paceStatus}!
      
      Keep up the amazing work! 🚀
    `,
    sendFrequency: "biweekly",
    condition: (userData) => userData.progressRate >= 1.0
  }
};

// Email scheduling service
class EmailScheduler {
  constructor(firebaseDb, userData) {
    this.db = firebaseDb;
    this.user = userData;
  }
  
  async scheduleDailyCheckin() {
    const userTime = this.user.preferences.reminderTime || "00:00";
    const userTimezone = this.user.preferences.timezone || "America/Edmonton";
    
    // In production, use Cloud Functions + Cloud Scheduler
    // For demo, simulate with browser notifications
    
    return {
      type: "daily_checkin",
      scheduledTime: userTime,
      timezone: userTimezone,
      enabled: this.user.preferences.dailyReminders
    };
  }
  
  async sendEmail(templateName, data) {
    const template = emailTemplates[templateName];
    const subject = template.subject.replace(/\{(\w+)\}/g, (_, key) => data[key] || '');
    const body = template.body(this.user, data);
    
    // In production, use SendGrid, AWS SES, or Firebase Extensions
    // For demo, add to notifications collection
    
    await this.db.collection('notifications').doc(this.user.uid).collection('messages').add({
      type: templateName,
      subject: subject,
      body: body,
      read: false,
      createdAt: new Date(),
      priority: template.sendImmediately ? 'high' : 'medium'
    });
    
    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(subject, {
        body: body.substring(0, 100) + '...',
        icon: '/icon.png'
      });
    }
  }
  
  async checkAndSendAutomatedEmails() {
    // Check weekly summary (Sunday morning)
    const today = new Date();
    if (today.getDay() === 0 && today.getHours() === 9) {
      const weeklyData = await this.calculateWeeklyStats();
      await this.sendEmail('weekly_summary', weeklyData);
    }
    
    // Check if falling behind
    const progressAnalysis = await this.analyzeProgress();
    if (progressAnalysis.behindSchedule) {
      await this.sendEmail('falling_behind_alert', progressAnalysis);
    }
    
    // Check for milestones
    const newMilestones = await this.checkMilestones();
    for (const milestone of newMilestones) {
      await this.sendEmail('milestone_achieved', milestone);
    }
    
    // Check for unlocked capabilities
    const newCapabilities = await this.checkCapabilities();
    for (const capability of newCapabilities) {
      await this.sendEmail('capability_unlocked', capability);
    }
  }
}
```

---

## 🎨 COMPLETE IMPLEMENTATION PROMPT

**Now, use this prompt with Claude:**

---

### FINAL COMPLETE PROMPT:
Create a full-stack cybersecurity career tracking web application with the following specifications:
AUTHENTICATION

Firebase Authentication with:

Email/Password with email verification
Google OAuth integration
Multi-factor authentication (SMS/Authenticator app)
Session management and device tracking


Login/Signup screens with proper validation
User profile management

DATABASE (Firestore)
Structure as per the complete schema provided above:

users collection
userGoals collection
dailyLogs subcollection
skillsMatrix collection
readinessIndicators collection
notifications subcollection
portfolioItems subcollection
jobApplications subcollection

CORE FEATURES
1. Onboarding & Goal Setting

Welcome wizard asking:

"What tier do you want to reach?" (Tier 1/2/3)
"By when?" (date picker)
"How many hours per week can you study?" (slider 5-40 hours)
"Focus areas?" (Cloud Security, DFIR, Detection Engineering)
"Target certifications?" (CompTIA, Google, etc.)


AI generates personalized curriculum based on inputs
Shows complete timeline with phases and milestones

2. Dashboard Page
Components:

Hero stats (days since start, current phase, progress %, days to next milestone)
Today's focus card (recommended topics, quick log button)
Progress timeline visual (Phase 0 → Tier 3)
Skills matrix grid (networking, OS, security, tools)
Readiness indicators cards ("You're ready to...")
Certification tracker with progress rings
Recent activity feed
Study streak counter with flame icon

3. Daily Log Form
Quick form with:

Topics learned (autocomplete from knowledge base)
Tools practiced (checkboxes)
Labs completed (name, platform, difficulty)
Hours studied (number input)
Challenges faced (textarea)
Wins today (textarea)
Tomorrow's goals (textarea)
Mood selector (motivated/struggling/confident)
Submit button that updates all relevant collections

4. Roadmap Page

Full SOC Career Roadmap display (Phase 0-3)
Expandable sections for each phase
Checkboxes for requirements that sync to database
Progress bars per phase
Links to resources
Phase detail modals with deep info

5. AI Recommendations Engine
Analyzes user data and shows:

"Based on what you've learned, you can now..."
"Next recommended topics: ..."
"You're X% ready for [certification/job]"
Smart suggestions based on recent logs
Prerequisite checking for advanced topics

6. Email/Notification Center

Simulated inbox showing all "emails"
Daily check-in notification at midnight
Weekly summary on Sundays
Milestone achievement celebrations
Capability unlock notifications
Falling behind alerts (if applicable)
Motivation boosts (biweekly if on track)
Mark as read functionality

7. Skills Matrix Page
Interactive grid showing:

All skill categories (networking, OS, security, tools, certs)
Visual proficiency indicators (empty/learning/proficient/mastered)
Click to expand and see subtopics
Mark topics as learned/in-progress
Add notes and resources to topics
Track last practiced date

8. Portfolio Tracker

GitHub integration reminder
List of portfolio items (incident reports, writeups, projects)
Add new items with:

Title, description, date
Tags, GitHub URL, LinkedIn URL
Skills demonstrated, tools used


Export portfolio as PDF

9. Job Application Tracker

Add job applications:

Company, position, applied date
Status (applied/interview/offer/rejected)
Salary range, notes
Interview dates


Kanban board view
Reminders for follow-ups

10. Settings Page

Profile management
Goal adjustment (change target tier/date)
Notification preferences
Email reminder time setting
Timezone selection
Theme toggle (dark/light)
Export/import data
Delete account

AI INTELLIGENCE
Curriculum Generator
Use the masterKnowledgeBase provided to:

Identify skill gaps between current and target tier
Calculate time needed based on weekly hours
Generate phases with weekly breakdown
Prioritize foundational topics first
Include certification prep if requested
Add specialization training for Tier 3
Recommend specific labs and projects

Readiness Detection
Continuously check if user meets criteria for:

Job applications (Tier 1/2/3)
Certifications (CompTIA, Google, etc.)
Advanced labs (HTB, BTLO)
Specialized training
Display progress toward each readiness threshold

Smart Recommendations
Based on recent logs, suggest:

Related advanced topics
Complementary skills
Next tools to learn
Relevant lab exercises
Certification timing

DESIGN
Theme: Cybersecurity Dark

Background: #0a0e27 (dark navy)
Primary: #00d4ff (cyan)
Secondary: #2563eb (electric blue)
Success: #10b981 (green)
Warning: #f59e0b (amber)
Danger: #ef4444 (red)
Text: #e2e8f0 (light gray)

Components:

Glassmorphism cards
Smooth animations
Progress rings (circular)
Gradient buttons
Modern typography (Inter font)
Mobile responsive
Confetti effect for milestones
Pulsing indicators for notifications

Layout:

Sidebar navigation (collapsible on mobile)
Top bar with user menu and notifications
Main content area with padding
Footer with stats summary

DATA PROVIDED
Use the complete masterKnowledgeBase JSON I provided containing:

All skill categories with topics, subtopics, resources
Tools with learning paths
Certifications with domains and requirements
Career tiers with requirements
Lab platforms
Readiness rules

FIREBASE INTEGRATION

Initialize Firebase with config placeholder
All data operations use Firestore
Real-time listeners for live updates
Authentication state persistence
Proper error handling
Loading states

SPECIAL FEATURES

Export progress as PDF report
Weekly email simulation (add to notifications)
Browser notifications (if permitted)
Keyboard shortcuts (ESC to close modals, etc.)
Search functionality across all pages
Dark mode only (cybersecurity theme)

Build this as a single React application using modern React patterns (hooks, context). Use Tailwind CSS for styling. Make it production-ready with proper error boundaries, loading states, and responsive design. The app should feel professional, motivating, and intelligent.
Use the window.storage persistent storage API as fallback for demo purposes with clear instructions on Firebase setup.
All AI logic (curriculum generation, readiness detection, recommendations) should be implemented in utility functions that process the masterKnowledgeBase data.

---
