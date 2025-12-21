const admin = require('firebase-admin');
const { validationResult } = require('express-validator');

/**
 * Add a new portfolio item
 */
async function addPortfolioItem(req, res) {
  try {
    const userId = req.user.uid;
    const { type, title, description, dateCreated, tags, githubUrl, linkedinUrl, content, skills, tools } = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Create portfolio item
    const portfolioItem = {
      userId: userId,
      type: type,
      title: title,
      description: description,
      dateCreated: dateCreated || new Date().toISOString(),
      tags: tags || [],
      githubUrl: githubUrl || '',
      linkedinUrl: linkedinUrl || '',
      content: content || '',
      skills: skills || [],
      tools: tools || [],
      verified: false,
      qualityScore: 0,
      issues: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Save to Firestore
    const docRef = await admin.firestore().collection('portfolioItems').add(portfolioItem);
    
    res.json({
      success: true,
      message: 'Portfolio item added successfully',
      data: { id: docRef.id }
    });
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to add portfolio item' 
    });
  }
}

/**
 * Update a portfolio item
 */
async function updatePortfolioItem(req, res) {
  try {
    const userId = req.user.uid;
    const { itemId } = req.params;
    const updateData = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Check if item belongs to user
    const itemDoc = await admin.firestore().collection('portfolioItems').doc(itemId).get();
    if (!itemDoc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Portfolio item not found' 
      });
    }
    
    const itemData = itemDoc.data();
    if (itemData.userId !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You can only update your own portfolio items' 
      });
    }
    
    // Prepare update data
    const preparedData = {
      ...updateData,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Remove fields that shouldn't be updated
    delete preparedData.userId;
    delete preparedData.createdAt;
    
    // Update in Firestore
    await admin.firestore().collection('portfolioItems').doc(itemId).update(preparedData);
    
    res.json({
      success: true,
      message: 'Portfolio item updated successfully'
    });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to update portfolio item' 
    });
  }
}

/**
 * Get user's portfolio items
 */
async function getUserPortfolio(req, res) {
  try {
    const userId = req.user.uid;
    const { limit = 50, offset = 0 } = req.query;
    
    const snapshot = await admin.firestore().collection('portfolioItems')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit))
      .get();
    
    const portfolioItems = [];
    snapshot.forEach(doc => {
      portfolioItems.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json({
      success: true,
      data: portfolioItems
    });
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch portfolio items' 
    });
  }
}

/**
 * Get a specific portfolio item
 */
async function getPortfolioItem(req, res) {
  try {
    const userId = req.user.uid;
    const { itemId } = req.params;
    
    const doc = await admin.firestore().collection('portfolioItems').doc(itemId).get();
    
    if (!doc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Portfolio item not found' 
      });
    }
    
    const itemData = doc.data();
    if (itemData.userId !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You can only access your own portfolio items' 
      });
    }
    
    res.json({
      success: true,
      data: {
        id: doc.id,
        ...itemData
      }
    });
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch portfolio item' 
    });
  }
}

/**
 * Delete a portfolio item
 */
async function deletePortfolioItem(req, res) {
  try {
    const userId = req.user.uid;
    const { itemId } = req.params;
    
    // Check if item belongs to user
    const itemDoc = await admin.firestore().collection('portfolioItems').doc(itemId).get();
    if (!itemDoc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Portfolio item not found' 
      });
    }
    
    const itemData = itemDoc.data();
    if (itemData.userId !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You can only delete your own portfolio items' 
      });
    }
    
    // Delete from Firestore
    await admin.firestore().collection('portfolioItems').doc(itemId).delete();
    
    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to delete portfolio item' 
    });
  }
}

/**
 * Add a job application
 */
async function addJobApplication(req, res) {
  try {
    const userId = req.user.uid;
    const { company, position, applicationDate, status, notes, documents } = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Create job application
    const jobApp = {
      userId: userId,
      company: company,
      position: position,
      applicationDate: applicationDate || new Date().toISOString(),
      status: status || 'applied',
      notes: notes || '',
      documents: documents || [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Save to Firestore
    const docRef = await admin.firestore().collection('jobApplications').add(jobApp);
    
    res.json({
      success: true,
      message: 'Job application added successfully',
      data: { id: docRef.id }
    });
  } catch (error) {
    console.error('Error adding job application:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to add job application' 
    });
  }
}

/**
 * Update a job application
 */
async function updateJobApplication(req, res) {
  try {
    const userId = req.user.uid;
    const { appId } = req.params;
    const updateData = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Check if application belongs to user
    const appDoc = await admin.firestore().collection('jobApplications').doc(appId).get();
    if (!appDoc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Job application not found' 
      });
    }
    
    const appData = appDoc.data();
    if (appData.userId !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You can only update your own job applications' 
      });
    }
    
    // Prepare update data
    const preparedData = {
      ...updateData,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Remove fields that shouldn't be updated
    delete preparedData.userId;
    delete preparedData.createdAt;
    
    // Update in Firestore
    await admin.firestore().collection('jobApplications').doc(appId).update(preparedData);
    
    res.json({
      success: true,
      message: 'Job application updated successfully'
    });
  } catch (error) {
    console.error('Error updating job application:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to update job application' 
    });
  }
}

/**
 * Get user's job applications
 */
async function getUserJobApplications(req, res) {
  try {
    const userId = req.user.uid;
    const { limit = 50, offset = 0 } = req.query;
    
    const snapshot = await admin.firestore().collection('jobApplications')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit))
      .get();
    
    const jobApps = [];
    snapshot.forEach(doc => {
      jobApps.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json({
      success: true,
      data: jobApps
    });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch job applications' 
    });
  }
}

/**
 * Get a specific job application
 */
async function getJobApplication(req, res) {
  try {
    const userId = req.user.uid;
    const { appId } = req.params;
    
    const doc = await admin.firestore().collection('jobApplications').doc(appId).get();
    
    if (!doc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Job application not found' 
      });
    }
    
    const appData = doc.data();
    if (appData.userId !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You can only access your own job applications' 
      });
    }
    
    res.json({
      success: true,
      data: {
        id: doc.id,
        ...appData
      }
    });
  } catch (error) {
    console.error('Error fetching job application:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch job application' 
    });
  }
}

/**
 * Delete a job application
 */
async function deleteJobApplication(req, res) {
  try {
    const userId = req.user.uid;
    const { appId } = req.params;
    
    // Check if application belongs to user
    const appDoc = await admin.firestore().collection('jobApplications').doc(appId).get();
    if (!appDoc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Job application not found' 
      });
    }
    
    const appData = appDoc.data();
    if (appData.userId !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You can only delete your own job applications' 
      });
    }
    
    // Delete from Firestore
    await admin.firestore().collection('jobApplications').doc(appId).delete();
    
    res.json({
      success: true,
      message: 'Job application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job application:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to delete job application' 
    });
  }
}

module.exports = {
  addPortfolioItem,
  updatePortfolioItem,
  getUserPortfolio,
  getPortfolioItem,
  deletePortfolioItem,
  addJobApplication,
  updateJobApplication,
  getUserJobApplications,
  getJobApplication,
  deleteJobApplication
};