// Hands-On Gates System - Blocks progress until evidence-based requirements are met

export interface GateRequirement {
  id: string;
  name: string;
  required: number;
  current: number;
  type: 'tool_hours' | 'portfolio_count' | 'lab_count' | 'manual_check';
  evidenceRequired?: string[];
  mustCreate?: string;
  mustBePublic?: boolean;
  dependsOn?: string;
  met: boolean;
  verified?: boolean;
}

export interface ProgressGate {
  id: string;
  locked: boolean;
  requirements: GateRequirement[];
  allMet: boolean;
  progress: number; // percentage
  unlockedAt?: Date;
}

export interface HandsOnGates {
  currentPhase: string;
  gates: {
    [key: string]: ProgressGate;
  };
}

export const PHASE_0_GATE: ProgressGate = {
  id: 'phase0_complete',
  locked: true,
  requirements: [
    {
      id: 'wireshark_hours',
      name: 'Wireshark Practice',
      required: 20,
      current: 0,
      type: 'tool_hours',
      evidenceRequired: ['screenshots', 'pcap_files'],
      met: false
    },
    {
      id: 'incident_writeups',
      name: 'Incident Investigation Writeups',
      required: 3,
      current: 0,
      type: 'portfolio_count',
      evidenceRequired: ['github_urls'],
      mustBePublic: true,
      met: false
    },
    {
      id: 'thm_soc_level1',
      name: 'TryHackMe SOC Level 1 Rooms',
      required: 15,
      current: 0,
      type: 'lab_count',
      evidenceRequired: ['completion_screenshots'],
      met: false
    },
    {
      id: 'splunk_practice',
      name: 'Splunk Queries & Dashboards',
      required: 15,
      current: 0,
      type: 'tool_hours',
      mustCreate: '1 custom dashboard',
      evidenceRequired: ['screenshots', 'spl_queries'],
      met: false
    },
    {
      id: 'pcap_analysis',
      name: 'PCAP Analysis Practice',
      required: 10,
      current: 0,
      type: 'lab_count',
      evidenceRequired: ['analysis_writeups'],
      met: false
    }
  ],
  allMet: false,
  progress: 0
};

export const TIER1_JOBS_GATE: ProgressGate = {
  id: 'ready_for_tier1_jobs',
  locked: true,
  requirements: [
    {
      id: 'public_portfolio',
      name: 'Public GitHub Portfolio',
      required: 5,
      current: 0,
      type: 'portfolio_count',
      mustBePublic: true,
      evidenceRequired: ['github_urls', 'verified_public'],
      met: false
    },
    {
      id: 'linkedin_profile',
      name: 'LinkedIn Profile Updated',
      required: 1,
      current: 0,
      type: 'manual_check',
      met: false,
      verified: false
    },
    {
      id: 'phase0_gate',
      name: 'Phase 0 Completed',
      required: 1,
      current: 0,
      type: 'manual_check',
      dependsOn: 'phase0_complete',
      met: false
    }
  ],
  allMet: false,
  progress: 0
};

export function calculateGateProgress(gate: ProgressGate): number {
  if (gate.requirements.length === 0) return 0;
  
  const totalProgress = gate.requirements.reduce((sum, req) => {
    if (req.type === 'manual_check') {
      return sum + (req.met ? 100 : 0);
    }
    const reqProgress = Math.min((req.current / req.required) * 100, 100);
    return sum + reqProgress;
  }, 0);
  
  return Math.round(totalProgress / gate.requirements.length);
}

export function updateGateProgress(gate: ProgressGate): ProgressGate {
  const updatedRequirements = gate.requirements.map(req => ({
    ...req,
    met: req.type === 'manual_check' ? req.met : req.current >= req.required
  }));
  
  const allMet = updatedRequirements.every(req => req.met);
  const progress = calculateGateProgress({ ...gate, requirements: updatedRequirements });
  
  return {
    ...gate,
    requirements: updatedRequirements,
    allMet,
    progress,
    locked: !allMet,
    unlockedAt: allMet && !gate.unlockedAt ? new Date() : gate.unlockedAt
  };
}

export interface ProgressBlock {
  blockedFeature: string;
  reason: string;
  requirements: GateRequirement[];
  action: string;
  severity: 'critical' | 'high' | 'warning';
}

export function checkProgressBlocks(gates: HandsOnGates): ProgressBlock[] {
  const blocks: ProgressBlock[] = [];
  
  // Check Phase 0 gate
  const phase0Gate = gates.gates.phase0_complete;
  if (phase0Gate && !phase0Gate.allMet) {
    blocks.push({
      blockedFeature: 'Advance to Tier 1 Job Search',
      reason: 'Phase 0 hands-on requirements not met',
      requirements: phase0Gate.requirements.filter(r => !r.met),
      action: 'Complete the hands-on requirements above',
      severity: 'critical'
    });
  }
  
  // Check Tier 1 jobs gate
  const tier1Gate = gates.gates.ready_for_tier1_jobs;
  if (tier1Gate && !tier1Gate.allMet) {
    const portfolioReq = tier1Gate.requirements.find(r => r.id === 'public_portfolio');
    if (portfolioReq && !portfolioReq.met) {
      blocks.push({
        blockedFeature: '"Ready for Tier 1 Jobs" indicator',
        reason: `Only ${portfolioReq.current}/${portfolioReq.required} public portfolio items`,
        requirements: [portfolioReq],
        action: 'Create more incident investigations and document them on GitHub',
        severity: 'high'
      });
    }
  }
  
  return blocks;
}

export function initializeUserGates(): HandsOnGates {
  return {
    currentPhase: 'phase0_foundation',
    gates: {
      phase0_complete: PHASE_0_GATE,
      ready_for_tier1_jobs: TIER1_JOBS_GATE
    }
  };
}

