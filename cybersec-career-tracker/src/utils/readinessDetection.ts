export interface ReadinessResult {
  certReady: boolean;
  jobReady: boolean;
  tierAdvancementReady: boolean;
  recommendedCert?: string;
  recommendedTier?: string;
  blockers: string[];
  strengths: string[];
}

export interface UserProgress {
  skillsMatrixAvg: number;
  phase0Complete: boolean;
  portfolioCount: number;
  verifiedPortfolioCount: number;
  totalLabsCompleted: number;
  totalToolHours: number;
  currentStreak: number;
}

export function detectReadiness(progress: UserProgress): ReadinessResult {
  const result: ReadinessResult = {
    certReady: false,
    jobReady: false,
    tierAdvancementReady: false,
    blockers: [],
    strengths: []
  };

  // Certification Readiness
  if (progress.skillsMatrixAvg >= 3 && progress.phase0Complete) {
    result.certReady = true;
    result.recommendedCert = 'CompTIA Security+';
    result.strengths.push('Skills proficiency meets certification requirements');
  } else {
    if (progress.skillsMatrixAvg < 3) {
      result.blockers.push(`Skills proficiency too low (${progress.skillsMatrixAvg.toFixed(1)}/5, need 3+)`);
    }
    if (!progress.phase0Complete) {
      result.blockers.push('Phase 0 foundation not complete');
    }
  }

  // Job Readiness (SOC Tier 1)
  if (
    progress.verifiedPortfolioCount >= 5 &&
    progress.totalLabsCompleted >= 30 &&
    progress.totalToolHours >= 50 &&
    progress.phase0Complete
  ) {
    result.jobReady = true;
    result.recommendedTier = 'SOC Tier 1 Analyst';
    result.strengths.push('Portfolio demonstrates hands-on experience');
    result.strengths.push('Lab completion shows practical skills');
  } else {
    if (progress.verifiedPortfolioCount < 5) {
      result.blockers.push(`Need ${5 - progress.verifiedPortfolioCount} more verified portfolio items`);
    }
    if (progress.totalLabsCompleted < 30) {
      result.blockers.push(`Need ${30 - progress.totalLabsCompleted} more labs completed`);
    }
    if (progress.totalToolHours < 50) {
      result.blockers.push(`Need ${50 - progress.totalToolHours} more tool practice hours`);
    }
  }

  // Tier Advancement Readiness
  if (
    progress.skillsMatrixAvg >= 4 &&
    progress.verifiedPortfolioCount >= 10 &&
    progress.currentStreak >= 30
  ) {
    result.tierAdvancementReady = true;
    result.strengths.push('Consistent daily practice (30+ day streak)');
    result.strengths.push('Advanced skills proficiency');
  }

  return result;
}

export function generateReadinessReport(result: ReadinessResult): string {
  let report = '# Readiness Assessment\n\n';

  if (result.certReady) {
    report += `✅ **Certification Ready**: ${result.recommendedCert}\n\n`;
  } else {
    report += `❌ **Not Certification Ready**\n\n`;
  }

  if (result.jobReady) {
    report += `✅ **Job Ready**: ${result.recommendedTier}\n\n`;
  } else {
    report += `❌ **Not Job Ready**\n\n`;
  }

  if (result.blockers.length > 0) {
    report += '## Blockers\n';
    result.blockers.forEach(blocker => {
      report += `- ${blocker}\n`;
    });
    report += '\n';
  }

  if (result.strengths.length > 0) {
    report += '## Strengths\n';
    result.strengths.forEach(strength => {
      report += `- ${strength}\n`;
    });
  }

  return report;
}
