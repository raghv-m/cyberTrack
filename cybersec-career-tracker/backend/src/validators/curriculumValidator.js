const { body, query } = require('express-validator');

/**
 * Validation rules for generating curriculum
 */
const generateCurriculumRules = [
  body('currentLevel')
    .notEmpty()
    .withMessage('Current level is required')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Current level must be beginner, intermediate, or advanced'),
  
  body('targetTier')
    .notEmpty()
    .withMessage('Target tier is required')
    .isIn(['tier1', 'tier2', 'tier3', 'specialist'])
    .withMessage('Target tier must be tier1, tier2, tier3, or specialist'),
  
  body('hoursPerWeek')
    .isInt({ min: 1, max: 100 })
    .withMessage('Hours per week must be between 1 and 100'),
  
  body('existingSkills')
    .optional()
    .isArray()
    .withMessage('Existing skills must be an array')
];

/**
 * Validation rules for updating curriculum progress
 */
const updateCurriculumProgressRules = [
  body('phaseNumber')
    .isInt({ min: 0 })
    .withMessage('Phase number must be a positive integer'),
  
  body('completedItems')
    .isArray()
    .withMessage('Completed items must be an array')
];

/**
 * Validation rules for logging daily progress
 */
const logDailyProgressRules = [
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in YYYY-MM-DD format'),
  
  body('theoryHours')
    .isFloat({ min: 0, max: 24 })
    .withMessage('Theory hours must be between 0 and 24'),
  
  body('handsOnHours')
    .isFloat({ min: 0, max: 24 })
    .withMessage('Hands-on hours must be between 0 and 24'),
  
  body('toolsUsed')
    .optional()
    .isArray()
    .withMessage('Tools used must be an array'),
  
  body('labsCompleted')
    .optional()
    .isArray()
    .withMessage('Labs completed must be an array'),
  
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes must be less than 1000 characters'),
  
  body('evidence')
    .optional()
    .isArray()
    .withMessage('Evidence must be an array')
];

/**
 * Validation rules for getting daily logs
 */
const getDailyLogsRules = [
  query('startDate')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Start date must be in YYYY-MM-DD format'),
  
  query('endDate')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('End date must be in YYYY-MM-DD format'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Limit must be between 1 and 1000')
];

module.exports = {
  generateCurriculumRules,
  updateCurriculumProgressRules,
  logDailyProgressRules,
  getDailyLogsRules
};