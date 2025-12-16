// Master Knowledge Base - Complete cybersecurity learning data
export const masterKnowledgeBase = {
  skills: {
    networking: {
      displayName: "Networking Fundamentals",
      importance: 10,
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
          difficulty: 3,
          estimatedHours: 8,
          resources: [
            {
              type: "video",
              title: "TCP/IP Fundamentals",
              url: "https://www.youtube.com/watch?v=PpsEaqJV_A0",
              duration: 120,
              platform: "YouTube"
            },
            {
              type: "course",
              title: "Networking Basics",
              url: "https://tryhackme.com/room/introtonetworking",
              platform: "TryHackMe"
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
          resources: [],
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
          resources: [],
          practiceActivities: [
            "Perform DNS reconnaissance with dig/nslookup",
            "Analyze DNS traffic in Wireshark",
            "Identify DNS tunneling"
          ]
        },
        {
          id: "http_https",
          name: "HTTP/HTTPS",
          subtopics: [
            "HTTP methods (GET, POST, PUT, DELETE)",
            "Status codes",
            "Headers",
            "TLS/SSL",
            "Certificates"
          ],
          difficulty: 3,
          estimatedHours: 5,
          securityFocus: true,
          resources: [],
          practiceActivities: [
            "Analyze HTTP traffic",
            "Understand TLS handshake",
            "Inspect certificates"
          ]
        },
        {
          id: "ports_protocols",
          name: "Ports & Protocols",
          subtopics: [
            "Common ports (80, 443, 22, 21, 25, 53)",
            "Well-known vs ephemeral ports",
            "Protocol analysis"
          ],
          difficulty: 2,
          estimatedHours: 3,
          resources: [],
          practiceActivities: [
            "Memorize top 20 ports",
            "Identify services by port",
            "Scan ports with Nmap"
          ]
        },
        {
          id: "packet_analysis",
          name: "Packet Analysis",
          subtopics: [
            "Packet structure",
            "Wireshark basics",
            "Traffic filtering",
            "PCAP analysis"
          ],
          difficulty: 5,
          estimatedHours: 10,
          securityFocus: true,
          resources: [],
          practiceActivities: [
            "Capture and analyze traffic",
            "Identify malicious patterns",
            "Extract artifacts from PCAPs"
          ]
        }
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
          resources: [],
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
          resources: [],
          practiceActivities: [
            "Parse auth.log for suspicious logins",
            "Create log analysis scripts",
            "Identify brute force attempts"
          ]
        },
        {
          id: "file_systems",
          name: "File Systems",
          subtopics: [
            "NTFS (Windows)",
            "ext4 (Linux)",
            "File permissions",
            "Access Control Lists (ACLs)",
            "File system forensics"
          ],
          difficulty: 4,
          estimatedHours: 8,
          resources: [],
          practiceActivities: [
            "Analyze file permissions",
            "Recover deleted files",
            "Understand file metadata"
          ]
        }
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
          foundational: true,
          resources: [],
          practiceActivities: []
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
          resources: [],
          practiceActivities: [
            "Map alerts to ATT&CK techniques",
            "Build detection use cases",
            "Threat hunting with ATT&CK"
          ]
        },
        {
          id: "iam",
          name: "Identity and Access Management",
          subtopics: [
            "Authentication vs Authorization",
            "MFA/2FA",
            "SSO",
            "RBAC",
            "Least Privilege"
          ],
          difficulty: 4,
          estimatedHours: 6,
          resources: [],
          practiceActivities: []
        }
      ]
    },
  },

  tools: {
    wireshark: {
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
      ]
    },
    splunk: {
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
      ]
    },
    nmap: {
      name: "Nmap",
      category: "Network Scanning",
      difficulty: 4,
      estimatedHours: 8,
      tierRelevance: {
        tier1: "important",
        tier2: "important",
        tier3: "basic"
      },
      capabilities: [
        "Port scanning",
        "Service detection",
        "OS fingerprinting",
        "Vulnerability scanning"
      ]
    },
    python: {
      name: "Python",
      category: "Programming",
      difficulty: 6,
      estimatedHours: 40,
      tierRelevance: {
        tier1: "basic",
        tier2: "important",
        tier3: "critical"
      },
      capabilities: [
        "Automation scripts",
        "Log parsing",
        "API interactions",
        "Data analysis"
      ]
    }
  },

  certifications: {
    comptia_security_plus: {
      displayName: "CompTIA Security+",
      vendor: "CompTIA",
      difficulty: 5,
      estimatedStudyHours: 80,
      cost: 370,
      validity: 3,
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
        }
      ],
      skillsRequired: [
        "networking",
        "operatingSystems",
        "securityConcepts"
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
        }
      ]
    },
    google_cybersecurity: {
      displayName: "Google Cybersecurity Certificate",
      vendor: "Google (via Coursera)",
      difficulty: 3,
      estimatedStudyHours: 180,
      cost: 49,
      validity: null,
      prerequisites: ["None - beginner friendly"],
      skillsRequired: [],
      readinessCriteria: [
        {
          requirement: "Basic computer skills",
          type: "prerequisite"
        }
      ]
    }
  },

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
  ],

  labPlatforms: {
    tryhackme: {
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
    hackthebox: {
      name: "HackTheBox",
      url: "https://hackthebox.com",
      cost: "$20/month VIP",
      focus: "Hands-on labs, realistic scenarios",
      difficulty: "Intermediate to Advanced"
    },
    letsdefend: {
      name: "LetsDefend",
      url: "https://letsdefend.io",
      cost: "Free + $15/month premium",
      focus: "SOC analyst training, real SIEM interface",
      tierRelevance: "tier1, tier2"
    }
  }
};

