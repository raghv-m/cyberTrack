// Daily Log Validation Rules - Enforces hands-on practice over theory

export const DAILY_LOG_RULES = {
  minHandsOnPercentage: 60, // 60% of time must be hands-on
  maxTheoryPercentage: 40,   // Max 40% theory
  
  minDailyRequirements: {
    // Must meet at least ONE of these
    labsCompleted: 1,
    toolHours: 1.0,
    portfolioItems: 1
  },
  
  evidenceRequired: {
    labs: {
      screenshot: true,
      writeup: true,
      minWriteupWords: 100
    },
    tools: {
      evidence: true, // screenshot or file
      description: true,
      minDescriptionWords: 50,
      minDuration: 0.5 // 30 minutes minimum
    },
    portfolio: {
      githubUrl: true,
      description: true,
      minContentWords: 300
    }
  },
  
  weeklyQuota: {
    minLabs: 2,           // Must complete 2+ labs per week
    minToolHours: 5,      // Must practice tools 5+ hours per week
    minPortfolioItems: 0.5 // Must create 1 portfolio item every 2 weeks
  },
  
  tutorialHellThreshold: {
    consecutiveDays: 7,
    theoryPercentage: 50
  }
};

export interface DailyLogValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  canSubmit: boolean;
  tutorialHellAlert: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error';
}

export interface ValidationWarning {
  type: string;
  message: string;
  severity: 'warning';
}

export interface DailyLogData {
  theoryHours: number;
  handsOnHours: number;
  labsCompleted: LabEntry[];
  toolsPracticed: ToolEntry[];
  portfolioItems: PortfolioEntry[];
}

export interface LabEntry {
  id: string;
  name: string;
  platform: string;
  screenshotUrl?: string;
  writeup?: string;
  difficulty: string;
}

export interface ToolEntry {
  id: string;
  toolName: string;
  activity: string;
  duration: number;
  evidence?: File | string;
  description?: string;
}

export interface PortfolioEntry {
  id: string;
  githubUrl?: string;
  type: string;
  content?: string;
}

export function validateDailyLog(logData: DailyLogData): DailyLogValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Check theory/practice balance
  const totalHours = logData.theoryHours + logData.handsOnHours;
  
  if (totalHours === 0) {
    errors.push({
      field: 'hours',
      message: 'You must log at least some study time',
      severity: 'error'
    });
    return { valid: false, errors, warnings, canSubmit: false, tutorialHellAlert: false };
  }
  
  const theoryPercent = (logData.theoryHours / totalHours) * 100;

  // Allow theory-only sessions, but warn if it's excessive
  if (theoryPercent > DAILY_LOG_RULES.maxTheoryPercentage && logData.handsOnHours > 0) {
    warnings.push({
      type: 'theoryRatio',
      message: `⚠️ Theory time is ${theoryPercent.toFixed(0)}% (recommended max ${DAILY_LOG_RULES.maxTheoryPercentage}%). Try to balance with more hands-on practice to avoid "tutorial hell".`,
      severity: 'warning'
    });
  }

  // If it's 100% theory, give a gentle warning
  if (theoryPercent === 100 && logData.theoryHours > 0) {
    warnings.push({
      type: 'theoryOnly',
      message: '📚 Theory-only session detected. This is okay occasionally, but remember to balance with hands-on labs soon!',
      severity: 'warning'
    });
  }

  // Check minimum hands-on requirements - ONLY if they logged hands-on hours
  if (logData.handsOnHours > 0) {
    const meetsMinimum =
      logData.labsCompleted.length >= DAILY_LOG_RULES.minDailyRequirements.labsCompleted ||
      logData.toolsPracticed.reduce((sum, t) => sum + t.duration, 0) >= DAILY_LOG_RULES.minDailyRequirements.toolHours ||
      logData.portfolioItems.length >= DAILY_LOG_RULES.minDailyRequirements.portfolioItems;

    if (!meetsMinimum) {
      errors.push({
        field: 'handsOn',
        message: '❌ You logged hands-on hours but no evidence. You must complete at least 1 lab OR practice tools for 1 hour OR create a portfolio item',
        severity: 'error'
      });
    }
  }
  
  // Validate lab evidence
  for (const lab of logData.labsCompleted) {
    if (!lab.screenshotUrl) {
      errors.push({
        field: `lab_${lab.id}_screenshot`,
        message: `Lab "${lab.name}" requires completion screenshot URL`,
        severity: 'error'
      });
    }
    
    if (!lab.writeup || lab.writeup.split(' ').length < DAILY_LOG_RULES.evidenceRequired.labs.minWriteupWords) {
      errors.push({
        field: `lab_${lab.id}_writeup`,
        message: `Lab "${lab.name}" requires writeup (min ${DAILY_LOG_RULES.evidenceRequired.labs.minWriteupWords} words)`,
        severity: 'error'
      });
    }
  }
  
  // Validate tool practice evidence
  for (const tool of logData.toolsPracticed) {
    if (!tool.evidence) {
      errors.push({
        field: `tool_${tool.id}_evidence`,
        message: `Tool practice "${tool.toolName}" requires evidence (screenshot/file)`,
        severity: 'error'
      });
    }
    
    if (!tool.description || tool.description.split(' ').length < DAILY_LOG_RULES.evidenceRequired.tools.minDescriptionWords) {
      errors.push({
        field: `tool_${tool.id}_description`,
        message: `Tool practice "${tool.toolName}" requires description (min ${DAILY_LOG_RULES.evidenceRequired.tools.minDescriptionWords} words)`,
        severity: 'error'
      });
    }
    
    if (tool.duration < DAILY_LOG_RULES.evidenceRequired.tools.minDuration) {
      errors.push({
        field: `tool_${tool.id}_duration`,
        message: `Tool practice must be at least ${DAILY_LOG_RULES.evidenceRequired.tools.minDuration} hours (30 minutes)`,
        severity: 'error'
      });
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    canSubmit: errors.length === 0,
    tutorialHellAlert: theoryPercent > 50
  };
}

export function validateImageUrl(url: string): boolean {
  if (!url) return false;
  
  // Check if URL is valid
  try {
    new URL(url);
  } catch {
    return false;
  }
  
  // Check if URL points to an image
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
  const lowerUrl = url.toLowerCase();
  
  return imageExtensions.some(ext => lowerUrl.includes(ext)) || 
         lowerUrl.includes('imgur.com') || 
         lowerUrl.includes('github.com');
}

export function validateGitHubUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'github.com' && urlObj.pathname.split('/').length >= 3;
  } catch {
    return false;
  }
}

