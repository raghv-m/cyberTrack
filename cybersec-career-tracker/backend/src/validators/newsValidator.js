const { param, query } = require('express-validator');

/**
 * Validation rules for getting news article by ID
 */
const getNewsArticleRules = [
  param('articleId')
    .notEmpty()
    .withMessage('Article ID is required')
    .isLength({ min: 20, max: 50 })
    .withMessage('Invalid article ID format')
];

/**
 * Validation rules for getting latest news
 */
const getLatestNewsRules = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a positive integer'),
  
  query('category')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Category must be less than 50 characters')
];

/**
 * Validation rules for searching news
 */
const searchNewsRules = [
  query('q')
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

/**
 * Validation rules for getting trending news
 */
const getTrendingNewsRules = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

module.exports = {
  getNewsArticleRules,
  getLatestNewsRules,
  searchNewsRules,
  getTrendingNewsRules
};