# CyberPath Pro Backend Deployment Guide

## Overview
This guide provides instructions for deploying the CyberPath Pro backend services to production environments. The backend consists of multiple components that need to be deployed and configured properly.

## Prerequisites
1. Node.js 18.x or higher
2. Firebase CLI installed globally
3. Google Cloud account with billing enabled
4. Domain name for production deployment
5. SSL certificate for HTTPS
6. Gmail account with App Password for email notifications

## Deployment Architecture
The backend uses a hybrid deployment approach:
- **Frontend**: Deployed to Firebase Hosting
- **Backend API**: Deployed to a custom server (VPS/Cloud VM)
- **Cloud Functions**: Deployed to Firebase Functions
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **News Scrapers**: Scheduled tasks on the backend server

## Environment Setup

### 1. Firebase Project Setup
1. Create a new Firebase project in the Firebase Console
2. Enable Firebase Authentication (Email/Password and Google providers)
3. Enable Firestore Database
4. Enable Cloud Functions
5. Generate Firebase Admin SDK service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file securely

### 2. Environment Variables Configuration
Create `.env` files for each component:

#### Backend Server (.env)
```bash
# Gmail Configuration
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key_with_escaped_newlines
FIREBASE_CLIENT_EMAIL=your_service_account_email

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Cron Secret
CRON_SECRET=generate_a_secure_random_string

# Server Configuration
PORT=3000
NODE_ENV=production

# Frontend URL
FRONTEND_URL=https://yourdomain.com
```

#### Cloud Functions (.env)
```bash
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Firebase Configuration
GCLOUD_PROJECT=your_project_id

# OpenAI API
OPENAI_API_KEY=your_openai_api_key
```

### 3. News Scraper Configuration
The news scraper requires Python 3.8+ with the following packages:
```bash
pip install feedparser requests python-dotenv google-cloud-firestore
```

## Deployment Steps

### 1. Backend API Server Deployment
1. Clone the repository to your server:
   ```bash
   git clone https://github.com/your-repo/cybersec-career-tracker.git
   cd cybersec-career-tracker/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Set up process manager (PM2 recommended):
   ```bash
   npm install -g pm2
   pm2 start server.js --name cybertrack-backend
   pm2 startup
   pm2 save
   ```

6. Configure reverse proxy (Nginx example):
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. Set up SSL with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d api.yourdomain.com
   ```

### 2. Cloud Functions Deployment
1. Navigate to the functions directory:
   ```bash
   cd ../functions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. Deploy to Firebase:
   ```bash
   firebase deploy --only functions
   ```

### 3. News Scraper Deployment
1. Set up a cron job to run the scraper daily:
   ```bash
   # Edit crontab
   crontab -e
   
   # Add this line to run at 2 AM daily
   0 2 * * * cd /path/to/cybersec-career-tracker/scrapers && python fetch_real_news.py
   ```

2. Alternatively, use the API endpoint to trigger manually:
   ```bash
   curl -X POST https://api.yourdomain.com/api/refresh-news \
        -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
   ```

### 4. Frontend Deployment
1. Navigate to the root directory:
   ```bash
   cd ..
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Build the frontend:
   ```bash
   npm run build
   ```

4. Deploy to Firebase Hosting:
   ```bash
   firebase deploy --only hosting
   ```

## Security Considerations

### 1. API Security
- All API endpoints require authentication via Firebase ID tokens
- Rate limiting is implemented to prevent abuse
- Input validation is enforced on all endpoints
- CORS is restricted to allowed origins

### 2. Data Security
- Firestore Security Rules restrict data access to authorized users
- Sensitive data is stored encrypted where possible
- Regular backups are performed for critical data

### 3. Network Security
- All communications use HTTPS
- Firewall rules restrict access to necessary ports only
- Regular security audits are performed

### 4. Credential Management
- Never commit credentials to version control
- Use environment variables for all secrets
- Rotate credentials regularly
- Use least privilege principle for service accounts

## Monitoring and Maintenance

### 1. Logging
- Structured logging is implemented throughout the application
- Logs are collected and analyzed for monitoring
- Error logs are sent to administrators

### 2. Health Checks
- Health check endpoint at `/` provides system status
- Automated monitoring can ping this endpoint
- Alerting is configured for critical failures

### 3. Updates and Maintenance
- Regular dependency updates to patch security vulnerabilities
- Monitor Firebase quotas and usage
- Backup procedures for critical data
- Test disaster recovery procedures regularly

### 4. Performance Monitoring
- Monitor API response times
- Track database query performance
- Optimize slow endpoints
- Scale infrastructure as needed

## Troubleshooting

### Common Issues

#### 1. Authentication Failures
- Verify Firebase Admin SDK credentials
- Check token expiration
- Ensure correct project ID configuration

#### 2. Email Delivery Issues
- Verify Gmail App Password
- Check spam/junk folders
- Ensure sender reputation is good

#### 3. Firestore Connection Issues
- Verify Firebase project configuration
- Check network connectivity
- Ensure proper IAM permissions

#### 4. News Scraper Failures
- Check Python dependencies
- Verify network connectivity
- Review error logs for specific issues

### Debugging Steps
1. Check application logs:
   ```bash
   pm2 logs cybertrack-backend
   ```

2. Test API endpoints locally:
   ```bash
   curl -X GET http://localhost:3000/
   ```

3. Verify Firebase configuration:
   ```bash
   firebase --project your-project-id list
   ```

4. Check environment variables:
   ```bash
   echo $FIREBASE_PROJECT_ID
   ```

## Scaling Considerations

### Horizontal Scaling
- Backend API can be scaled horizontally behind a load balancer
- Cloud Functions automatically scale based on demand
- Firestore scales automatically with usage

### Vertical Scaling
- Increase server resources (CPU, RAM) as needed
- Monitor resource utilization regularly
- Optimize database queries for performance

### Geographic Distribution
- Use Firebase's global CDN for static assets
- Consider regional deployments for global users
- Implement proper caching strategies

## Backup and Recovery

### Data Backup
- Firebase automatically backs up Firestore data
- Export data regularly using Firebase CLI:
  ```bash
  firebase firestore:export gs://your-bucket-name/backups/
  ```

### Disaster Recovery
- Maintain offsite backups of critical data
- Document recovery procedures
- Test recovery procedures regularly
- Keep backup credentials secure

## Support and Maintenance Schedule

### Regular Maintenance Tasks
- Weekly: Review logs and error reports
- Monthly: Update dependencies and security patches
- Quarterly: Review and update security policies
- Annually: Perform full security audit

### Support Channels
- GitHub Issues for bug reports
- Email support for critical issues
- Community forums for general questions

## Contact Information
For deployment assistance or issues, contact:
- **Primary Contact**: Raghav Mahajan
- **Email**: raaghvv0508@gmail.com
- **GitHub**: https://github.com/raghv-m