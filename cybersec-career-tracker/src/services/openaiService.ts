import OpenAI from 'openai';

// Initialize OpenAI client
let openai: OpenAI | null = null;

try {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (apiKey) {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  }
} catch (error) {
  console.warn('OpenAI client initialization failed:', error);
}

export interface CurriculumInput {
  currentLevel: string;
  targetTier: string;
  hoursPerWeek: number;
  existingSkills: string[];
}

export interface GeneratedCurriculum {
  phases: {
    phaseNumber: number;
    phaseName: string;
    startWeek: number;
    endWeek: number;
    skills: string[];
    tools: string[];
    labs: string[];
    certifications: string[];
    weeklyHours: number;
    aiRecommendations: string[];
  }[];
  totalWeeks: number;
  personalizedAdvice: string;
}

export interface SkillAnalysis {
  proficiencyLevel: number;
  strengths: string[];
  weaknesses: string[];
  recommendedNextSteps: string[];
  resources: {
    title: string;
    url: string;
    type: 'course' | 'lab' | 'article' | 'video';
  }[];
}

export interface TodoRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'lab' | 'tool' | 'theory' | 'portfolio' | 'certification';
  estimatedHours: number;
  skillsDeveloped: string[];
}

export interface PortfolioRecommendation {
  projectName: string;
  description: string;
  technologies: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  skillsDeveloped: string[];
  githubRepoStructure: string[];
  learningResources: {
    title: string;
    url: string;
    type: 'tutorial' | 'documentation' | 'video' | 'course';
  }[];
}

/**
 * Generate a personalized cybersecurity curriculum based on user input
 */
export async function generateCurriculum(input: CurriculumInput): Promise<GeneratedCurriculum> {
  try {
    // Check if OpenAI is properly configured
    if (!openai) {
      throw new Error('OpenAI is not properly configured. Please check your API key.');
    }

    const prompt = `
      You are a cybersecurity career advisor. Based on the following user information, create a detailed, personalized curriculum:
      
      Current Level: ${input.currentLevel}
      Target Role: ${input.targetTier}
      Hours per Week: ${input.hoursPerWeek}
      Existing Skills: ${input.existingSkills.join(', ')}
      
      Please provide:
      1. A phased curriculum with 4-5 phases
      2. For each phase:
         - Phase number and descriptive name
         - Start and end weeks
         - Key skills to develop
         - Tools to learn
         - Labs to complete
         - Relevant certifications
         - Weekly hour commitment
         - AI-generated personalized recommendations
      3. Total weeks to complete
      4. Personalized advice for success
      
      Format the response as JSON with this exact structure:
      {
        "phases": [
          {
            "phaseNumber": 1,
            "phaseName": "Example Phase Name",
            "startWeek": 1,
            "endWeek": 4,
            "skills": ["Skill 1", "Skill 2"],
            "tools": ["Tool 1", "Tool 2"],
            "labs": ["Lab 1", "Lab 2"],
            "certifications": ["Cert 1"],
            "weeklyHours": 10,
            "aiRecommendations": ["Recommendation 1", "Recommendation 2"]
          }
        ],
        "totalWeeks": 20,
        "personalizedAdvice": "Personalized advice here"
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity career advisor specializing in creating personalized learning paths.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating curriculum:', error);
    throw new Error(`Failed to generate curriculum: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Analyze user skills and provide recommendations
 */
export async function analyzeSkills(skills: Record<string, any>): Promise<SkillAnalysis> {
  try {
    const skillsList = Object.entries(skills).map(([name, data]) => ({
      name,
      proficiency: data.proficiency
    }));

    const prompt = `
      As a cybersecurity skills analyst, analyze the following skills data and provide a comprehensive assessment:
      
      Skills: ${JSON.stringify(skillsList, null, 2)}
      
      Please provide:
      1. Overall proficiency level (1-10)
      2. Key strengths (top 3 skills)
      3. Areas for improvement (weakest 3 skills)
      4. Recommended next steps
      5. Relevant resources (courses, labs, articles, videos)
      
      Format the response as JSON with this exact structure:
      {
        "proficiencyLevel": 7,
        "strengths": ["Strength 1", "Strength 2", "Strength 3"],
        "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
        "recommendedNextSteps": ["Step 1", "Step 2"],
        "resources": [
          {
            "title": "Resource Title",
            "url": "https://example.com",
            "type": "course"
          }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity skills analyst providing detailed assessments.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing skills:', error);
    throw new Error('Failed to analyze skills');
  }
}

/**
 * Generate personalized todo recommendations based on user progress
 */
export async function generateTodoRecommendations(
  userGoals: any,
  currentSkills: Record<string, any>,
  completedTodos: any[]
): Promise<TodoRecommendation[]> {
  try {
    const prompt = `
      As a cybersecurity productivity coach, generate personalized task recommendations for a user based on:
      
      Current Goals: ${JSON.stringify(userGoals, null, 2)}
      Current Skills: ${JSON.stringify(currentSkills, null, 2)}
      Recently Completed Tasks: ${JSON.stringify(completedTodos.slice(-5), null, 2)}
      
      Please provide 5 specific, actionable tasks that would help the user progress toward their goals.
      Each task should include:
      - Title
      - Detailed description
      - Priority (high/medium/low)
      - Category (lab/tool/theory/portfolio/certification)
      - Estimated hours to complete
      - Skills that will be developed
      
      Format the response as JSON array with this exact structure:
      [
        {
          "title": "Task Title",
          "description": "Detailed description of what to do",
          "priority": "high",
          "category": "lab",
          "estimatedHours": 3,
          "skillsDeveloped": ["Skill 1", "Skill 2"]
        }
      ]
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity productivity coach creating personalized task recommendations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content || '[]';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating todo recommendations:', error);
    throw new Error('Failed to generate todo recommendations');
  }
}

/**
 * Generate portfolio project recommendations
 */
export async function generatePortfolioRecommendations(
  userSkills: Record<string, any>,
  userGoals: any,
  currentProjects: any[]
): Promise<PortfolioRecommendation[]> {
  try {
    const prompt = `
      As a cybersecurity career advisor, generate portfolio project recommendations for a user based on:
      
      Current Skills: ${JSON.stringify(userSkills, null, 2)}
      Career Goals: ${JSON.stringify(userGoals, null, 2)}
      Existing Projects: ${JSON.stringify(currentProjects.map(p => p.title), null, 2)}
      
      Please provide 3 specific, actionable portfolio projects that would help showcase their skills to employers.
      Each project should include:
      - Project name
      - Detailed description
      - Technologies to use
      - Difficulty level (beginner/intermediate/advanced)
      - Estimated hours to complete
      - Skills that will be demonstrated
      - Suggested GitHub repository structure
      - Learning resources (tutorials, documentation, videos, courses)
      
      Format the response as JSON array with this exact structure:
      [
        {
          "projectName": "Project Name",
          "description": "Detailed project description",
          "technologies": ["Tech 1", "Tech 2"],
          "difficulty": "intermediate",
          "estimatedHours": 20,
          "skillsDeveloped": ["Skill 1", "Skill 2"],
          "githubRepoStructure": ["README.md", "src/", "docs/"],
          "learningResources": [
            {
              "title": "Resource Title",
              "url": "https://example.com",
              "type": "tutorial"
            }
          ]
        }
      ]
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity career advisor providing portfolio project recommendations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const content = response.choices[0].message.content || '[]';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating portfolio recommendations:', error);
    throw new Error('Failed to generate portfolio recommendations');
  }
}

/**
 * Generate weekly progress summary and insights
 */
export async function generateWeeklySummary(
  weeklyStats: any,
  skillsProgress: any
): Promise<{ summary: string; insights: string[]; recommendations: string[] }> {
  try {
    const prompt = `
      As a cybersecurity career mentor, analyze the following weekly progress data and provide a summary:
      
      Weekly Statistics: ${JSON.stringify(weeklyStats, null, 2)}
      Skills Progress: ${JSON.stringify(skillsProgress, null, 2)}
      
      Please provide:
      1. A encouraging summary of the week's progress
      2. Key insights about the user's learning patterns
      3. Specific recommendations for the upcoming week
      
      Format the response as JSON with this exact structure:
      {
        "summary": "Encouraging summary of progress",
        "insights": ["Insight 1", "Insight 2"],
        "recommendations": ["Recommendation 1", "Recommendation 2"]
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity career mentor providing progress analysis and guidance.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.6,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating weekly summary:', error);
    throw new Error('Failed to generate weekly summary');
  }
}