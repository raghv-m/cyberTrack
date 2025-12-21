const { body, param, query } = require('express-validator');

/**
 * Validation rules for sending a notification
 */
const sendNotificationRules = [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isLength({ min: 20, max: 50 })
    .withMessage('Invalid user ID format'),
  
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  
  body('type')
    .optional()
    .isIn(['info', 'warning', 'success', 'error'])
    .withMessage('Invalid notification type'),
  
  body('data')
    .optional()
    .isObject()
    .withMessage('Data must be an object')
];

/**
 * Validation rules for marking notification as read
 */
const markNotificationAsReadRules = [
  param('notificationId')
    .notEmpty()
    .withMessage('Notification ID is required')
    .isLength({ min: 20, max: 50 })
    .withMessage('Invalid notification ID format')
];

/**
 * Validation rules for deleting a notification
 */
const deleteNotificationRules = [
  param('notificationId')
    .notEmpty()
    .withMessage('Notification ID is required')
    .isLength({ min: 20, max: 50 })
    .withMessage('Invalid notification ID format')
];

/**
 * Validation rules for getting user notifications
 */
const getUserNotificationsRules = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('unreadOnly')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('UnreadOnly must be true or false')
];

module.exports = {
  sendNotificationRules,
  markNotificationAsReadRules,
  deleteNotificationRules,
  getUserNotificationsRules
};