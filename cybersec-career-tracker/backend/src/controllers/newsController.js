const admin = require('firebase-admin');
const { spawn } = require('child_process');
const path = require('path');

/**
 * Get latest cybersecurity news articles
 */
async function getLatestNews(req, res) {
  try {
    const { limit = 50, offset = 0, category } = req.query;
    
    let query = admin.firestore().collection('newsArticles')
      .orderBy('publishedAt', 'desc')
      .limit(parseInt(limit));
    
    if (category) {
      query = query.where('category', '==', category);
    }
    
    const snapshot = await query.get();
    
    const articles = [];
    snapshot.forEach(doc => {
      articles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch news articles' 
    });
  }
}

/**
 * Get trending news articles
 */
async function getTrendingNews(req, res) {
  try {
    const { limit = 10 } = req.query;
    
    const snapshot = await admin.firestore().collection('newsArticles')
      .where('trending', '==', true)
      .orderBy('views', 'desc')
      .limit(parseInt(limit))
      .get();
    
    const articles = [];
    snapshot.forEach(doc => {
      articles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching trending news:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch trending news' 
    });
  }
}

/**
 * Get news article by ID
 */
async function getNewsArticle(req, res) {
  try {
    const { articleId } = req.params;
    
    const doc = await admin.firestore().collection('newsArticles').doc(articleId).get();
    
    if (!doc.exists) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'News article not found' 
      });
    }
    
    // Increment view count
    await admin.firestore().collection('newsArticles').doc(articleId).update({
      views: admin.firestore.FieldValue.increment(1)
    });
    
    res.json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data()
      }
    });
  } catch (error) {
    console.error('Error fetching news article:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch news article' 
    });
  }
}

/**
 * Refresh news by triggering Python scraper
 */
async function refreshNews(req, res) {
  try {
    // Only allow admin to trigger refresh
    if (!req.user || !req.user.roles || !req.user.roles.includes('admin')) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'Only administrators can refresh news' 
      });
    }
    
    console.log('📰 News refresh requested...');
    
    // Trigger Python scraper
    const scraperPath = path.join(__dirname, '..', '..', '..', 'scrapers', 'fetch_real_news.py');
    const pythonProcess = spawn('python', [scraperPath]);
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python: ${data}`);
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
    });
    
    pythonProcess.on('close', (code) => {
      console.log(`✅ Python scraper finished with code ${code}`);
    });
    
    res.json({
      success: true,
      message: 'News refresh triggered successfully'
    });
  } catch (error) {
    console.error('Error refreshing news:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to trigger news refresh' 
    });
  }
}

/**
 * Search news articles
 */
async function searchNews(req, res) {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Search query is required' 
      });
    }
    
    // For simplicity, we'll do a basic search in title and summary
    // In production, you might want to use Firestore text search or Algolia
    const snapshot = await admin.firestore().collection('newsArticles')
      .orderBy('publishedAt', 'desc')
      .limit(parseInt(limit) * 2) // Get more results to filter
      .get();
    
    const articles = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const searchText = `${data.title} ${data.summary}`.toLowerCase();
      if (searchText.includes(q.toLowerCase())) {
        articles.push({
          id: doc.id,
          ...data
        });
      }
    });
    
    // Limit to requested amount
    const limitedArticles = articles.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      data: limitedArticles
    });
  } catch (error) {
    console.error('Error searching news articles:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to search news articles' 
    });
  }
}

/**
 * Get news categories
 */
async function getNewsCategories(req, res) {
  try {
    // In a real implementation, you might want to store categories separately
    // For now, we'll extract them from existing articles
    const snapshot = await admin.firestore().collection('newsArticles')
      .orderBy('publishedAt', 'desc')
      .limit(100)
      .get();
    
    const categories = new Set();
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.category) {
        categories.add(data.category);
      }
    });
    
    res.json({
      success: true,
      data: Array.from(categories)
    });
  } catch (error) {
    console.error('Error fetching news categories:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Failed to fetch news categories' 
    });
  }
}

module.exports = {
  getLatestNews,
  getTrendingNews,
  getNewsArticle,
  refreshNews,
  searchNews,
  getNewsCategories
};