const admin = require('firebase-admin');
const { validationResult } = require('express-validator');
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate personalized curriculum using AI
 */
async function generateCurriculum(req, res) {
  try {
    const userId = req.user.uid;
    const { currentLevel, targetTier, hoursPerWeek, existingSkills } = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Generate curriculum using OpenAI
    const prompt = `
      You are a cybersecurity career advisor. Based on the following user information, create a detailed, personalized curriculum:
      
      Current Level: ${currentLevel}
      Target Role: ${targetTier}
      Hours per Week: ${hoursPerWeek}
      Existing Skills: ${existingSkills.join(', ')}
      
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
    const aiCurriculum = JSON.parse(content);
    
    // Save curriculum to Firestore
    await admin.firestore().collection('userGoals').doc(userId).set({
      currentTier: currentLevel,
      targetTier: targetTier,
      startDate: new Date(),
      hoursPerWeek: hoursPerWeek,
      existingSkills: existingSkills,
      milestones: [],
      customGoals: [],
      generatedCurriculum: {
        generatedAt: admin.firestore.FieldValue.serverTimestamp(),
        ...aiCurriculum
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    
    res.json({
      success: true,
      message: 'Curriculum generated successfully',
      data: aiCurriculum
    });
  } catch (error) {
    console.error('Error generating curriculum:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to generate curriculum' 
    });
  }
}

/**
 * Get user's current curriculum
 */
async function getCurrentCurriculum(req, res) {
  try {
    const userId = req.user.uid;
    
    const curriculumDoc = await admin.firestore().collection('userGoals').doc(userId).get();
    
    if (!curriculumDoc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'No curriculum found for this user' 
      });
    }
    
    res.json({
      success: true,
      data: curriculumDoc.data()
    });
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch curriculum' 
    });
  }
}

/**
 * Update user's curriculum progress
 */
async function updateCurriculumProgress(req, res) {
  try {
    const userId = req.user.uid;
    const { phaseNumber, completedItems } = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Update progress in Firestore
    await admin.firestore().collection('userGoals').doc(userId).set({
      [`generatedCurriculum.phases.${phaseNumber}.completedItems`]: completedItems,
      [`generatedCurriculum.phases.${phaseNumber}.updatedAt`]: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    
    res.json({
      success: true,
      message: 'Curriculum progress updated successfully'
    });
  } catch (error) {
    console.error('Error updating curriculum progress:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to update curriculum progress' 
    });
  }
}

/**
 * Log daily progress
 */
async function logDailyProgress(req, res) {
  try {
    const userId = req.user.uid;
    const { date, theoryHours, handsOnHours, toolsUsed, labsCompleted, notes, evidence } = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Create daily log entry
    const logEntry = {
      userId: userId,
      date: date,
      theoryHours: theoryHours,
      handsOnHours: handsOnHours,
      toolsUsed: toolsUsed || [],
      labsCompleted: labsCompleted || [],
      notes: notes || '',
      evidence: evidence || [],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Save to Firestore
    const docRef = await admin.firestore().collection('dailyLogs').add(logEntry);
    
    // Update user's skills matrix based on activities
    await updateSkillsMatrix(userId, logEntry);
    
    res.json({
      success: true,
      message: 'Daily progress logged successfully',
      data: { id: docRef.id }
    });
  } catch (error) {
    console.error('Error logging daily progress:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to log daily progress' 
    });
  }
}

/**
 * Update skills matrix based on daily activities
 */
async function updateSkillsMatrix(userId, logEntry) {
  try {
    // Get current skills matrix
    const skillsDoc = await admin.firestore().collection('skillsMatrix').doc(userId).get();
    let skillsData = skillsDoc.exists ? skillsDoc.data() : { skills: {} };
    
    // Update skills based on tools used and labs completed
    const toolsAndLabs = [...(logEntry.toolsUsed || []), ...(logEntry.labsCompleted || [])];
    
    for (const item of toolsAndLabs) {
      // Simple skill proficiency increase logic
      // In a real implementation, this would be more sophisticated
      const skillName = item.toLowerCase().replace(/[^a-z0-9]/g, '_');
      
      if (!skillsData.skills[skillName]) {
        skillsData.skills[skillName] = {
          name: item,
          category: 'tools', // Simplified categorization
          proficiency: 1,
          evidence: [logEntry.date],
          lastUpdated: new Date()
        };
      } else {
        // Increment proficiency (capped at 10)
        skillsData.skills[skillName].proficiency = Math.min(
          skillsData.skills[skillName].proficiency + 0.5, 
          10
        );
        skillsData.skills[skillName].evidence.push(logEntry.date);
        skillsData.skills[skillName].lastUpdated = new Date();
      }
    }
    
    // Save updated skills matrix
    await admin.firestore().collection('skillsMatrix').doc(userId).set({
      skills: skillsData.skills,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating skills matrix:', error);
    // Don't fail the main request if skills update fails
  }
}

/**
 * Get daily logs
 */
async function getDailyLogs(req, res) {
  try {
    const userId = req.user.uid;
    const { startDate, endDate, limit = 50 } = req.query;
    
    let query = admin.firestore().collection('dailyLogs')
      .where('userId', '==', userId)
      .orderBy('date', 'desc')
      .limit(parseInt(limit));
    
    if (startDate) {
      query = query.where('date', '>=', startDate);
    }
    
    if (endDate) {
      query = query.where('date', '<=', endDate);
    }
    
    const snapshot = await query.get();
    
    const logs = [];
    snapshot.forEach(doc => {
      logs.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error('Error fetching daily logs:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch daily logs' 
    });
  }
}

module.exports = {
  generateCurriculum,
  getCurrentCurriculum,
  updateCurriculumProgress,
  logDailyProgress,
  getDailyLogs
};