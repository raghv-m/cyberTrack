const admin = require('firebase-admin');
const { validationResult } = require('express-validator');

/**
 * Send a notification to a user
 */
async function sendNotification(req, res) {
  try {
    const { userId, title, message, type, data } = req.body;
    
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Validation failed', 
        details: errors.array() 
      });
    }
    
    // Create notification
    const notification = {
      userId: userId,
      title: title,
      message: message,
      type: type || 'info',
      data: data || {},
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Save to Firestore
    const docRef = await admin.firestore().collection('notifications').add(notification);
    
    // Send FCM notification if user has FCM token
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      const fcmToken = userData.fcmToken;
      
      if (fcmToken) {
        try {
          await admin.messaging().send({
            token: fcmToken,
            notification: {
              title: title,
              body: message
            },
            data: {
              notificationId: docRef.id,
              ...data
            }
          });
        } catch (fcmError) {
          console.error('FCM Error:', fcmError);
          // Don't fail the main request if FCM fails
        }
      }
    }
    
    res.json({
      success: true,
      message: 'Notification sent successfully',
      data: { id: docRef.id }
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to send notification' 
    });
  }
}

/**
 * Get user's notifications
 */
async function getUserNotifications(req, res) {
  try {
    const userId = req.user.uid;
    const { limit = 50, unreadOnly = false } = req.query;
    
    let query = admin.firestore().collection('notifications')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit));
    
    if (unreadOnly === 'true') {
      query = query.where('read', '==', false);
    }
    
    const snapshot = await query.get();
    
    const notifications = [];
    snapshot.forEach(doc => {
      notifications.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch notifications' 
    });
  }
}

/**
 * Mark notification as read
 */
async function markNotificationAsRead(req, res) {
  try {
    const userId = req.user.uid;
    const { notificationId } = req.params;
    
    // Check if notification belongs to user
    const notificationDoc = await admin.firestore().collection('notifications').doc(notificationId).get();
    if (!notificationDoc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Notification not found' 
      });
    }
    
    const notificationData = notificationDoc.data();
    if (notificationData.userId !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You can only mark your own notifications as read' 
      });
    }
    
    // Update in Firestore
    await admin.firestore().collection('notifications').doc(notificationId).update({
      read: true,
      readAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to mark notification as read' 
    });
  }
}

/**
 * Mark all notifications as read
 */
async function markAllNotificationsAsRead(req, res) {
  try {
    const userId = req.user.uid;
    
    // Get all unread notifications for user
    const snapshot = await admin.firestore().collection('notifications')
      .where('userId', '==', userId)
      .where('read', '==', false)
      .get();
    
    // Update all in batch
    const batch = admin.firestore().batch();
    snapshot.forEach(doc => {
      batch.update(doc.ref, {
        read: true,
        readAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });
    
    await batch.commit();
    
    res.json({
      success: true,
      message: `Marked ${snapshot.size} notifications as read`
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to mark all notifications as read' 
    });
  }
}

/**
 * Delete a notification
 */
async function deleteNotification(req, res) {
  try {
    const userId = req.user.uid;
    const { notificationId } = req.params;
    
    // Check if notification belongs to user
    const notificationDoc = await admin.firestore().collection('notifications').doc(notificationId).get();
    if (!notificationDoc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Notification not found' 
      });
    }
    
    const notificationData = notificationDoc.data();
    if (notificationData.userId !== userId) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'You can only delete your own notifications' 
      });
    }
    
    // Delete from Firestore
    await admin.firestore().collection('notifications').doc(notificationId).delete();
    
    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to delete notification' 
    });
  }
}

/**
 * Get notification statistics
 */
async function getNotificationStats(req, res) {
  try {
    const userId = req.user.uid;
    
    // Get unread count
    const unreadSnapshot = await admin.firestore().collection('notifications')
      .where('userId', '==', userId)
      .where('read', '==', false)
      .get();
    
    res.json({
      success: true,
      data: {
        unreadCount: unreadSnapshot.size
      }
    });
  } catch (error) {
    console.error('Error fetching notification stats:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch notification stats' 
    });
  }
}

module.exports = {
  sendNotification,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getNotificationStats
};