export interface Phase {
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

export interface UserGoals {
  currentTier: string;
  targetTier: string;
  hoursPerWeek: number;
  existingSkills: string[];
}

export function generateCurriculum(goals: UserGoals): Phase[] {
  const phases: Phase[] = [];
  
  // Phase 0: Foundation (Always included)
  phases.push({
    phaseNumber: 0,
    phaseName: 'Foundation - Core Skills',
    startWeek: 1,
    endWeek: 12,
    skills: [
      'TCP/IP Networking',
      'Linux Command Line',
      'Windows Administration',
      'Security Fundamentals',
      'Log Analysis Basics'
    ],
    tools: [
      'Wireshark',
      'Splunk Free',
      'Nmap',
      'Sysinternals Suite',
      'tcpdump'
    ],
    labs: [
      'TryHackMe: SOC Level 1 Path',
      'CyberDefenders: Blue Team Labs',
      'LetsDefend: SOC Analyst Path',
      'Wireshark Packet Analysis Labs'
    ],
    certifications: [
      'Google Cybersecurity Certificate'
    ],
    weeklyHours: goals.hoursPerWeek
  });

  // Phase 1: SOC Tier 1 Preparation
  if (goals.targetTier === 'tier1' || goals.targetTier === 'tier2' || goals.targetTier === 'tier3') {
    phases.push({
      phaseNumber: 1,
      phaseName: 'SOC Tier 1 - Incident Response',
      startWeek: 13,
      endWeek: 24,
      skills: [
        'Incident Response',
        'SIEM Operations',
        'Threat Intelligence',
        'Malware Analysis Basics',
        'Alert Triage'
      ],
      tools: [
        'Splunk Enterprise',
        'ELK Stack',
        'MITRE ATT&CK',
        'VirusTotal',
        'Any.run'
      ],
      labs: [
        'Blue Team Labs Online',
        'LetsDefend Advanced',
        'CyberDefenders Incident Response',
        'SANS Cyber Aces'
      ],
      certifications: [
        'CompTIA Security+',
        'BTL1 (Blue Team Level 1)'
      ],
      weeklyHours: goals.hoursPerWeek
    });
  }

  // Phase 2: SOC Tier 2 Preparation
  if (goals.targetTier === 'tier2' || goals.targetTier === 'tier3') {
    phases.push({
      phaseNumber: 2,
      phaseName: 'SOC Tier 2 - Advanced Analysis',
      startWeek: 25,
      endWeek: 36,
      skills: [
        'Advanced Malware Analysis',
        'Memory Forensics',
        'Network Forensics',
        'Threat Hunting',
        'SOAR Automation'
      ],
      tools: [
        'Volatility',
        'REMnux',
        'IDA Pro / Ghidra',
        'Zeek (Bro)',
        'TheHive'
      ],
      labs: [
        'Malware Traffic Analysis',
        'SANS FOR508 Labs',
        'Practical Malware Analysis Labs'
      ],
      certifications: [
        'GIAC GCIH',
        'BTL2 (Blue Team Level 2)'
      ],
      weeklyHours: goals.hoursPerWeek
    });
  }

  // Phase 3: SOC Tier 3 / Threat Hunter
  if (goals.targetTier === 'tier3') {
    phases.push({
      phaseNumber: 3,
      phaseName: 'SOC Tier 3 - Threat Hunting',
      startWeek: 37,
      endWeek: 48,
      skills: [
        'Advanced Threat Hunting',
        'Reverse Engineering',
        'APT Detection',
        'Custom Detection Rules',
        'Threat Intelligence Analysis'
      ],
      tools: [
        'Yara',
        'Sigma Rules',
        'Velociraptor',
        'OSQuery',
        'Custom Python Tools'
      ],
      labs: [
        'Active Countermeasures',
        'SANS Threat Hunting Labs',
        'Custom CTF Challenges'
      ],
      certifications: [
        'GIAC GCFA',
        'GIAC GREM',
        'OSCP (Optional)'
      ],
      weeklyHours: goals.hoursPerWeek
    });
  }

  return phases;
}

export function calculateEstimatedCompletion(phases: Phase[]): Date {
  const lastPhase = phases[phases.length - 1];
  const weeksToComplete = lastPhase.endWeek;
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + (weeksToComplete * 7));
  return completionDate;
}
