const { body, param } = require('express-validator');

/**
 * Validation rules for adding a portfolio item
 */
const addPortfolioItemRules = [
  body('type')
    .notEmpty()
    .withMessage('Portfolio item type is required')
    .isIn(['project', 'investigation', 'research', 'certification', 'achievement'])
    .withMessage('Invalid portfolio item type'),
  
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('dateCreated')
    .optional()
    .isISO8601()
    .withMessage('Date created must be a valid ISO 8601 date'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  
  body('linkedinUrl')
    .optional()
    .isURL()
    .withMessage('LinkedIn URL must be a valid URL'),
  
  body('content')
    .optional()
    .isLength({ max: 5000 })
    .withMessage('Content must be less than 5000 characters'),
  
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  
  body('tools')
    .optional()
    .isArray()
    .withMessage('Tools must be an array')
];

/**
 * Validation rules for updating a portfolio item
 */
const updatePortfolioItemRules = [
  param('itemId')
    .notEmpty()
    .withMessage('Item ID is required')
    .isLength({ min: 20, max: 50 })
    .withMessage('Invalid item ID format'),
  
  body('type')
    .optional()
    .isIn(['project', 'investigation', 'research', 'certification', 'achievement'])
    .withMessage('Invalid portfolio item type'),
  
  body('title')
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('description')
    .optional()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('dateCreated')
    .optional()
    .isISO8601()
    .withMessage('Date created must be a valid ISO 8601 date'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  
  body('linkedinUrl')
    .optional()
    .isURL()
    .withMessage('LinkedIn URL must be a valid URL'),
  
  body('content')
    .optional()
    .isLength({ max: 5000 })
    .withMessage('Content must be less than 5000 characters'),
  
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  
  body('tools')
    .optional()
    .isArray()
    .withMessage('Tools must be an array')
];

/**
 * Validation rules for adding a job application
 */
const addJobApplicationRules = [
  body('company')
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('position')
    .notEmpty()
    .withMessage('Position is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Position must be between 2 and 100 characters'),
  
  body('applicationDate')
    .optional()
    .isISO8601()
    .withMessage('Application date must be a valid ISO 8601 date'),
  
  body('status')
    .optional()
    .isIn(['applied', 'interviewing', 'offer', 'rejected', 'accepted'])
    .withMessage('Invalid application status'),
  
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes must be less than 1000 characters'),
  
  body('documents')
    .optional()
    .isArray()
    .withMessage('Documents must be an array')
];

/**
 * Validation rules for updating a job application
 */
const updateJobApplicationRules = [
  param('appId')
    .notEmpty()
    .withMessage('Application ID is required')
    .isLength({ min: 20, max: 50 })
    .withMessage('Invalid application ID format'),
  
  body('company')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('position')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Position must be between 2 and 100 characters'),
  
  body('applicationDate')
    .optional()
    .isISO8601()
    .withMessage('Application date must be a valid ISO 8601 date'),
  
  body('status')
    .optional()
    .isIn(['applied', 'interviewing', 'offer', 'rejected', 'accepted'])
    .withMessage('Invalid application status'),
  
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes must be less than 1000 characters'),
  
  body('documents')
    .optional()
    .isArray()
    .withMessage('Documents must be an array')
];

module.exports = {
  addPortfolioItemRules,
  updatePortfolioItemRules,
  addJobApplicationRules,
  updateJobApplicationRules
};