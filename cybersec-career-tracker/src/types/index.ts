// Type definitions for the application

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLogin: Date;
  mfaEnabled: boolean;
  mfaMethods: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  emailNotifications: boolean;
  dailyReminders: boolean;
  reminderTime: string;
  timezone: string;
  theme: string;
}

export interface UserGoals {
  currentTier: string;
  targetTier: string;
  targetDate: Date;
  startDate: Date;
  weeklyHours: number;
  focusAreas: string[];
  certifications: string[];
  milestones: Milestone[];
  customGoals: CustomGoal[];
  generatedCurriculum?: Curriculum;
}

export interface Milestone {
  id: string;
  name: string;
  targetDate: Date;
  completed: boolean;
  completedDate?: Date;
  requirements: string[];
}

export interface CustomGoal {
  id: string;
  description: string;
  deadline: Date;
  completed: boolean;
}

export interface Curriculum {
  generatedAt: Date;
  totalWeeks: number;
  phases: Phase[];
  weeklyBreakdown?: WeeklySchedule[];
}

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

export interface WeeklySchedule {
  week: number;
  topics: string[];
  hours: number;
  goals: string[];
}

export interface DailyLog {
  id: string;
  date: Date;
  topicsLearned: TopicLearned[];
  toolsPracticed: ToolPracticed[];
  labsCompleted: LabCompleted[];
  hoursStudied: number;
  challenges: string;
  wins: string;
  tomorrowGoals: string;
  mood: string;
  energyLevel: number;
}

export interface TopicLearned {
  category: string;
  topic: string;
  proficiency: number;
  timeSpent: number;
}

export interface ToolPracticed {
  toolName: string;
  activity: string;
  duration: number;
  notes: string;
}

export interface LabCompleted {
  labName: string;
  platform: string;
  difficulty: string;
  completed: boolean;
  writeupLink?: string;
}

export interface SkillsMatrix {
  categories: {
    [key: string]: SkillCategory;
  };
  lastUpdated: Date;
}

export interface SkillCategory {
  topics: {
    [key: string]: SkillTopic;
  };
  overallProficiency: number;
  completionPercentage: number;
}

export interface SkillTopic {
  learned: boolean;
  proficiency: number;
  lastPracticed?: Date;
  resources: string[];
  notes: string;
  subtopics?: {
    [key: string]: SkillTopic;
  };
}

export interface ReadinessIndicator {
  id: string;
  type: string;
  title: string;
  description: string;
  progress: number;
  requirements: RequirementStatus[];
  recommendations: string[];
  unlocked: boolean;
  unlockedAt?: Date;
  actioned: boolean;
}

export interface RequirementStatus {
  requirement: string;
  met: boolean;
  details: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  priority: string;
}

export interface PortfolioItem {
  id: string;
  type: string;
  title: string;
  description: string;
  dateCreated: Date;
  tags: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  content: string;
  skills: string[];
  tools: string[];
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  appliedDate: Date;
  status: string;
  jobDescription: string;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  notes: string;
  interviewDates: Date[];
  followUpDate?: Date;
}

