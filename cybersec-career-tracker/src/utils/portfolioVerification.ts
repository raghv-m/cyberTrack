// Portfolio Verification System - Ensures portfolio items meet quality standards

import { PortfolioItem } from '../types';

export interface PortfolioVerificationChecks {
  hasGitHubLink: boolean;
  isPublic: boolean;
  hasReadme: boolean;
  hasWriteup: boolean;
  wordCount: number;
  meetsMinimumWords: boolean;
  allChecksPassed: boolean;
}

export interface PortfolioVerificationResult {
  verified: PortfolioItem[];
  failed: {
    item: PortfolioItem;
    issues: string[];
    checks: PortfolioVerificationChecks;
  }[];
  count: number;
}

const MIN_PORTFOLIO_WORDS = 300;

export async function verifyPortfolioItems(
  portfolioItems: PortfolioItem[]
): Promise<PortfolioVerificationResult> {
  const verified: PortfolioItem[] = [];
  const failed: {
    item: PortfolioItem;
    issues: string[];
    checks: PortfolioVerificationChecks;
  }[] = [];
  
  for (const item of portfolioItems) {
    const checks = await verifyPortfolioItem(item);
    
    if (checks.allChecksPassed) {
      verified.push(item);
    } else {
      const issues = getVerificationIssues(checks);
      failed.push({
        item,
        issues,
        checks
      });
    }
  }
  
  return { verified, failed, count: verified.length };
}

export async function verifyPortfolioItem(
  item: PortfolioItem
): Promise<PortfolioVerificationChecks> {
  const checks: PortfolioVerificationChecks = {
    hasGitHubLink: false,
    isPublic: false,
    hasReadme: false,
    hasWriteup: false,
    wordCount: 0,
    meetsMinimumWords: false,
    allChecksPassed: false
  };
  
  // Check GitHub link
  checks.hasGitHubLink = !!item.githubUrl && isValidGitHubUrl(item.githubUrl);
  
  if (checks.hasGitHubLink) {
    // In production, use GitHub API to verify
    // For now, check URL pattern and assume public if provided
    checks.isPublic = true; // Would verify via API in production
    checks.hasReadme = true; // Would check via API in production
  }
  
  // Check writeup content
  if (item.content) {
    checks.hasWriteup = item.content.length > 100;
    checks.wordCount = countWords(item.content);
    checks.meetsMinimumWords = checks.wordCount >= MIN_PORTFOLIO_WORDS;
  }
  
  // All checks must pass
  checks.allChecksPassed = 
    checks.hasGitHubLink &&
    checks.isPublic &&
    (checks.hasReadme || checks.hasWriteup) &&
    checks.meetsMinimumWords;
  
  return checks;
}

export function isValidGitHubUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'github.com' && 
           urlObj.pathname.split('/').filter(Boolean).length >= 2;
  } catch {
    return false;
  }
}

export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getVerificationIssues(checks: PortfolioVerificationChecks): string[] {
  const issues: string[] = [];
  
  if (!checks.hasGitHubLink) {
    issues.push('Missing valid GitHub URL');
  }
  
  if (!checks.isPublic) {
    issues.push('Repository is not public');
  }
  
  if (!checks.hasReadme && !checks.hasWriteup) {
    issues.push('Missing README or writeup content');
  }
  
  if (!checks.meetsMinimumWords) {
    issues.push(`Writeup too short (${checks.wordCount}/${MIN_PORTFOLIO_WORDS} words)`);
  }
  
  return issues;
}

export function calculatePortfolioQualityScore(item: PortfolioItem): number {
  let score = 0;
  
  // GitHub link (25 points)
  if (item.githubUrl && isValidGitHubUrl(item.githubUrl)) {
    score += 25;
  }
  
  // Content quality (50 points)
  if (item.content) {
    const wordCount = countWords(item.content);
    if (wordCount >= MIN_PORTFOLIO_WORDS) {
      score += 30;
    } else if (wordCount >= 150) {
      score += 15;
    }
    
    // Bonus for detailed content
    if (wordCount >= 500) {
      score += 10;
    }
    if (wordCount >= 1000) {
      score += 10;
    }
  }
  
  // Tags (10 points)
  if (item.tags && item.tags.length >= 3) {
    score += 10;
  }
  
  // Skills documented (15 points)
  if (item.skills && item.skills.length >= 3) {
    score += 15;
  }
  
  return Math.min(score, 100);
}

export interface PortfolioQualityReport {
  totalItems: number;
  verifiedItems: number;
  averageQualityScore: number;
  readyForJobApplications: boolean;
  recommendations: string[];
}

export async function generatePortfolioQualityReport(
  portfolioItems: PortfolioItem[]
): Promise<PortfolioQualityReport> {
  const verification = await verifyPortfolioItems(portfolioItems);
  
  const qualityScores = portfolioItems.map(calculatePortfolioQualityScore);
  const averageQualityScore = qualityScores.length > 0
    ? Math.round(qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length)
    : 0;
  
  const recommendations: string[] = [];
  
  if (verification.count < 5) {
    recommendations.push(`Create ${5 - verification.count} more portfolio items to meet job readiness requirement`);
  }
  
  if (verification.failed.length > 0) {
    recommendations.push(`Fix ${verification.failed.length} portfolio items that don't meet quality standards`);
  }
  
  if (averageQualityScore < 70) {
    recommendations.push('Improve writeup quality - add more details, screenshots, and technical depth');
  }
  
  return {
    totalItems: portfolioItems.length,
    verifiedItems: verification.count,
    averageQualityScore,
    readyForJobApplications: verification.count >= 5 && averageQualityScore >= 70,
    recommendations
  };
}

