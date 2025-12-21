const express = require('express');
const router = express.Router();

// Import middleware
const { authenticate, authorize, rateLimit } = require('../middleware/auth');

// Import validators
const { 
  updateUserProfileRules, 
  updateUserPreferencesRules, 
  updateUserRoleRules 
} = require('../validators/userValidator');

const { 
  generateCurriculumRules, 
  updateCurriculumProgressRules, 
  logDailyProgressRules,
  getDailyLogsRules
} = require('../validators/curriculumValidator');

const { 
  addPortfolioItemRules, 
  updatePortfolioItemRules,
  addJobApplicationRules,
  updateJobApplicationRules
} = require('../validators/portfolioValidator');

const { 
  sendNotificationRules,
  markNotificationAsReadRules,
  deleteNotificationRules,
  getUserNotificationsRules
} = require('../validators/notificationsValidator');

const { 
  getNewsArticleRules,
  getLatestNewsRules,
  searchNewsRules,
  getTrendingNewsRules
} = require('../validators/newsValidator');

// Import controllers
const { 
  getUserProfile, 
  updateUserProfile, 
  getUserPreferences, 
  updateUserPreferences,
  getAllUsers,
  updateUserRole
} = require('../controllers/userController');

const { 
  generateCurriculum,
  getCurrentCurriculum,
  updateCurriculumProgress,
  logDailyProgress,
  getDailyLogs
} = require('../controllers/curriculumController');

const { 
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
} = require('../controllers/portfolioController');

const { 
  sendNotification,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getNotificationStats
} = require('../controllers/notificationsController');

const { 
  getLatestNews,
  getTrendingNews,
  getNewsArticle,
  refreshNews,
  searchNews,
  getNewsCategories
} = require('../controllers/newsController');

// Apply rate limiting to all API routes
router.use(rateLimit());

// User routes
router.get('/users/profile', authenticate, getUserProfile);
router.put('/users/profile', authenticate, updateUserProfileRules, updateUserProfile);
router.get('/users/preferences', authenticate, getUserPreferences);
router.put('/users/preferences', authenticate, updateUserPreferencesRules, updateUserPreferences);
router.get('/users', authenticate, authorize(['admin']), getAllUsers);
router.put('/users/role', authenticate, authorize(['admin']), updateUserRoleRules, updateUserRole);

// Curriculum routes
router.post('/curriculum/generate', authenticate, generateCurriculumRules, generateCurriculum);
router.get('/curriculum', authenticate, getCurrentCurriculum);
router.put('/curriculum/progress', authenticate, updateCurriculumProgressRules, updateCurriculumProgress);
router.post('/curriculum/logs', authenticate, logDailyProgressRules, logDailyProgress);
router.get('/curriculum/logs', authenticate, getDailyLogsRules, getDailyLogs);

// Portfolio routes
router.post('/portfolio/items', authenticate, addPortfolioItemRules, addPortfolioItem);
router.put('/portfolio/items/:itemId', authenticate, updatePortfolioItemRules, updatePortfolioItem);
router.get('/portfolio/items', authenticate, getUserPortfolio);
router.get('/portfolio/items/:itemId', authenticate, getPortfolioItem);
router.delete('/portfolio/items/:itemId', authenticate, deletePortfolioItem);

// Job application routes
router.post('/portfolio/applications', authenticate, addJobApplicationRules, addJobApplication);
router.put('/portfolio/applications/:appId', authenticate, updateJobApplicationRules, updateJobApplication);
router.get('/portfolio/applications', authenticate, getUserJobApplications);
router.get('/portfolio/applications/:appId', authenticate, getJobApplication);
router.delete('/portfolio/applications/:appId', authenticate, deleteJobApplication);

// Notification routes
router.post('/notifications/send', authenticate, authorize(['admin']), sendNotificationRules, sendNotification);
router.get('/notifications', authenticate, getUserNotificationsRules, getUserNotifications);
router.put('/notifications/:notificationId/read', authenticate, markNotificationAsReadRules, markNotificationAsRead);
router.put('/notifications/read-all', authenticate, markAllNotificationsAsRead);
router.delete('/notifications/:notificationId', authenticate, deleteNotificationRules, deleteNotification);
router.get('/notifications/stats', authenticate, getNotificationStats);

// News routes
router.get('/news/latest', getLatestNewsRules, getLatestNews);
router.get('/news/trending', getTrendingNewsRules, getTrendingNews);
router.get('/news/search', searchNewsRules, searchNews);
router.get('/news/categories', getNewsCategories);
router.get('/news/:articleId', getNewsArticleRules, getNewsArticle);
router.post('/news/refresh', authenticate, authorize(['admin']), refreshNews);

module.exports = router;