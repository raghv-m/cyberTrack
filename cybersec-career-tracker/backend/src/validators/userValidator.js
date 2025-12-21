const { body, query } = require('express-validator');

/**
 * Validation rules for updating user profile
 */
const updateUserProfileRules = [
  body('displayName')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Display name must be between 1 and 100 characters'),
  
  body('photoURL')
    .optional()
    .isURL()
    .withMessage('Photo URL must be a valid URL'),
  
  body('preferences')
    .optional()
    .isObject()
    .withMessage('Preferences must be an object')
];

/**
 * Validation rules for updating user preferences
 */
const updateUserPreferencesRules = [
  body('emailNotifications')
    .optional()
    .isBoolean()
    .withMessage('Email notifications must be a boolean'),
  
  body('dailyReminders')
    .optional()
    .isBoolean()
    .withMessage('Daily reminders must be a boolean'),
  
  body('reminderTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Reminder time must be in HH:MM format'),
  
  body('timezone')
    .optional()
    .isIn([
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Phoenix',
      'America/Los_Angeles',
      'America/Anchorage',
      'Pacific/Honolulu',
      'America/Edmonton',
      'Europe/London',
      'Europe/Paris',
      'Asia/Tokyo',
      'Australia/Sydney'
    ])
    .withMessage('Invalid timezone'),
  
  body('theme')
    .optional()
    .isIn(['light', 'dark'])
    .withMessage('Theme must be either "light" or "dark"')
];

/**
 * Validation rules for admin user role updates
 */
const updateUserRoleRules = [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required'),
  
  body('roles')
    .isArray()
    .withMessage('Roles must be an array')
];

module.exports = {
  updateUserProfileRules,
  updateUserPreferencesRules,
  updateUserRoleRules
};