const admin = require('firebase-admin');

/**
 * Authentication middleware to verify Firebase ID tokens
 */
async function authenticate(req, res, next) {
  try {
    // Extract the ID token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Missing or invalid Authorization header' 
      });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Attach the user info to the request object
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Invalid or expired token' 
    });
  }
}

/**
 * Authorization middleware to check if user has required roles
 */
function authorize(roles = []) {
  return async (req, res, next) => {
    try {
      // If no roles specified, just check authentication
      if (roles.length === 0) {
        return next();
      }

      // Get user's custom claims
      const userRecord = await admin.auth().getUser(req.user.uid);
      const userRoles = userRecord.customClaims?.roles || [];
      
      // Check if user has any of the required roles
      const hasRequiredRole = roles.some(role => userRoles.includes(role));
      
      if (!hasRequiredRole) {
        return res.status(403).json({ 
          error: 'Forbidden', 
          message: 'Insufficient permissions' 
        });
      }
      
      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({ 
        error: 'Internal Server Error', 
        message: 'Failed to verify permissions' 
      });
    }
  };
}

/**
 * Rate limiting middleware
 */
function rateLimit(windowMs = 15 * 60 * 1000, maxRequests = 100) {
  const requests = new Map();
  
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const clientRequests = requests.get(clientId) || [];
    
    // Filter out old requests outside the window
    const recentRequests = clientRequests.filter(timestamp => 
      now - timestamp < windowMs
    );
    
    // Check if limit exceeded
    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({ 
        error: 'Too Many Requests', 
        message: 'Rate limit exceeded' 
      });
    }
    
    // Add current request
    recentRequests.push(now);
    requests.set(clientId, recentRequests);
    
    next();
  };
}

module.exports = {
  authenticate,
  authorize,
  rateLimit
};