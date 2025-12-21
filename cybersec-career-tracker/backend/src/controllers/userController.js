const admin = require('firebase-admin');
const { validationResult } = require('express-validator');

/**
 * Get user profile
 */
async function getUserProfile(req, res) {
  try {
    const userId = req.user.uid;
    
    // Get user data from Firestore
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'User profile not found' 
      });
    }
    
    const userData = userDoc.data();
    
    // Remove sensitive information
    const { passwordHash, ...safeUserData } = userData;
    
    res.json({
      success: true,
      data: safeUserData
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch user profile' 
    });
  }
}

/**
 * Update user profile
 */
async function updateUserProfile(req, res) {
  try {
    const userId = req.user.uid;
    const { displayName, photoURL, preferences } = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Prepare update data
    const updateData = {};
    
    if (displayName !== undefined) {
      updateData.displayName = displayName;
    }
    
    if (photoURL !== undefined) {
      updateData.photoURL = photoURL;
    }
    
    if (preferences !== undefined) {
      updateData.preferences = preferences;
    }
    
    // Update user document in Firestore
    await admin.firestore().collection('users').doc(userId).update({
      ...updateData,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Also update Firebase Auth user record if displayName changed
    if (displayName !== undefined) {
      await admin.auth().updateUser(userId, { displayName });
    }
    
    res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to update user profile' 
    });
  }
}

/**
 * Get user preferences
 */
async function getUserPreferences(req, res) {
  try {
    const userId = req.user.uid;
    
    // Get preferences from Firestore
    const prefsDoc = await admin.firestore()
      .collection('users').doc(userId)
      .collection('preferences').doc('default').get();
    
    if (!prefsDoc.exists) {
      return res.json({
        success: true,
        data: {
          emailNotifications: true,
          dailyReminders: true,
          reminderTime: '09:00',
          timezone: 'America/Edmonton',
          theme: 'dark'
        }
      });
    }
    
    res.json({
      success: true,
      data: prefsDoc.data()
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch user preferences' 
    });
  }
}

/**
 * Update user preferences
 */
async function updateUserPreferences(req, res) {
  try {
    const userId = req.user.uid;
    const preferences = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Update preferences in Firestore
    await admin.firestore()
      .collection('users').doc(userId)
      .collection('preferences').doc('default')
      .set({
        ...preferences,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    
    res.json({
      success: true,
      message: 'Preferences updated successfully'
    });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to update user preferences' 
    });
  }
}

/**
 * Admin: Get all users (admin only)
 */
async function getAllUsers(req, res) {
  try {
    // This endpoint should only be accessible by admins
    // Role checking is done in the authorization middleware
    
    const { limit = 50, offset = 0 } = req.query;
    
    // Get users from Firebase Auth
    const listUsersResult = await admin.auth().listUsers(limit, offset);
    
    // Get additional user data from Firestore
    const usersWithProfiles = [];
    for (const userRecord of listUsersResult.users) {
      const userDoc = await admin.firestore()
        .collection('users').doc(userRecord.uid).get();
      
      usersWithProfiles.push({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        disabled: userRecord.disabled,
        createdAt: userRecord.metadata.creationTime,
        lastLogin: userRecord.metadata.lastSignInTime,
        ...(userDoc.exists ? userDoc.data() : {})
      });
    }
    
    res.json({
      success: true,
      data: usersWithProfiles,
      total: listUsersResult.pageToken ? 'more' : usersWithProfiles.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch users' 
    });
  }
}

/**
 * Admin: Update user role (admin only)
 */
async function updateUserRole(req, res) {
  try {
    const { userId, roles } = req.body;
    
    // Validate input
    if (!userId || !Array.isArray(roles)) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'userId and roles array are required' 
      });
    }
    
    // Update user's custom claims
    await admin.auth().setCustomUserClaims(userId, { roles });
    
    res.json({
      success: true,
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to update user role' 
    });
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
  getAllUsers,
  updateUserRole
};