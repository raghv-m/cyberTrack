# CyberPath Pro Backend API Documentation

## Overview
This document describes the backend API endpoints for the CyberPath Pro application. The backend consists of:
1. Express.js server for custom API endpoints
2. Firebase Cloud Functions for serverless operations
3. Python scrapers for news aggregation

## Base URLs
- **Backend API**: `http://localhost:3000` (development) or your deployed URL
- **Cloud Functions**: `https://us-central1-{PROJECT_ID}.cloudfunctions.net` (Firebase default)

## Authentication
Most endpoints require Firebase Authentication. Pass the ID token in the `Authorization` header:
```
Authorization: Bearer {ID_TOKEN}
```

## Endpoints

### Health Check
**GET /**  
Health check endpoint for the backend server.

Response:
```json
{
  "status": "ok",
  "message": "CyberTrack Backend API",
  "endpoints": {
    "health": "GET /",
    "welcomeEmail": "POST /send-welcome-email",
    "dailyReminders": "POST /send-daily-reminders",
    "loginNotification": "POST /send-login-notification"
  }
}
```

### Email Services

#### Send Welcome Email
**POST /send-welcome-email**  
Send a welcome email to a newly registered user.

Body:
```json
{
  "email": "user@example.com",
  "displayName": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "message": "Welcome email sent successfully"
}
```

#### Send Login Notification
**POST /send-login-notification**  
Send a security notification when a user logs in.

Body:
```json
{
  "email": "user@example.com",
  "displayName": "John Doe",
  "loginTime": "2023-12-01T10:00:00Z",
  "ipAddress": "192.168.1.1",
  "device": "Chrome on Windows"
}
```

Response:
```json
{
  "success": true,
  "message": "Login notification sent"
}
```

#### Refresh News
**POST /api/refresh-news**  
Trigger the Python news scraper to fetch latest cybersecurity news.

Response:
```json
{
  "success": true,
  "message": "News refresh triggered successfully"
}
```

## API Endpoints (Authenticated)

### User Management

#### Get User Profile
**GET /api/users/profile**  
Retrieve the authenticated user's profile information.

Response:
```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "displayName": "John Doe",
    "photoURL": "https://example.com/photo.jpg",
    "createdAt": "2023-12-01T10:00:00Z",
    "lastLogin": "2023-12-01T10:00:00Z"
  }
}
```

#### Update User Profile
**PUT /api/users/profile**  
Update the authenticated user's profile information.

Body:
```json
{
  "displayName": "John Smith",
  "photoURL": "https://example.com/new-photo.jpg"
}
```

Response:
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

#### Get User Preferences
**GET /api/users/preferences**  
Retrieve the authenticated user's email and notification preferences.

Response:
```json
{
  "success": true,
  "data": {
    "emailNotifications": true,
    "dailyReminders": true,
    "reminderTime": "09:00",
    "timezone": "America/Edmonton",
    "theme": "dark"
  }
}
```

#### Update User Preferences
**PUT /api/users/preferences**  
Update the authenticated user's email and notification preferences.

Body:
```json
{
  "emailNotifications": false,
  "dailyReminders": true,
  "reminderTime": "14:00",
  "timezone": "America/New_York",
  "theme": "light"
}
```

Response:
```json
{
  "success": true,
  "message": "Preferences updated successfully"
}
```

#### Get All Users (Admin Only)
**GET /api/users**  
Retrieve a list of all users (admin only).

Query Parameters:
- `limit` (optional): Number of users to return (default: 50)
- `offset` (optional): Number of users to skip (default: 0)

Response:
```json
{
  "success": true,
  "data": [
    {
      "uid": "user123",
      "email": "user@example.com",
      "displayName": "John Doe",
      "photoURL": "https://example.com/photo.jpg",
      "disabled": false,
      "createdAt": "2023-12-01T10:00:00Z",
      "lastLogin": "2023-12-01T10:00:00Z"
    }
  ]
}
```

#### Update User Role (Admin Only)
**PUT /api/users/role**  
Update a user's role/permissions (admin only).

Body:
```json
{
  "userId": "targetUserId",
  "roles": ["admin"]
}
```

Response:
```json
{
  "success": true,
  "message": "User role updated successfully"
}
```

### Curriculum & Progress Tracking

#### Generate Curriculum
**POST /api/curriculum/generate**  
Generate a personalized learning curriculum using AI.

Body:
```json
{
  "currentLevel": "beginner",
  "targetTier": "tier1",
  "hoursPerWeek": 10,
  "existingSkills": ["networking basics", "linux fundamentals"]
}
```

Response:
```json
{
  "success": true,
  "message": "Curriculum generated successfully",
  "data": {
    "phases": [
      {
        "phaseNumber": 1,
        "phaseName": "Foundation Phase",
        "startWeek": 1,
        "endWeek": 4,
        "skills": ["Networking Fundamentals", "OSI Model"],
        "tools": ["Wireshark", "Nmap"],
        "labs": ["Network Scanning Lab"],
        "certifications": ["CompTIA Network+"],
        "weeklyHours": 10,
        "aiRecommendations": ["Focus on hands-on labs"]
      }
    ],
    "totalWeeks": 20,
    "personalizedAdvice": "Consistent practice is key"
  }
}
```

#### Get Current Curriculum
**GET /api/curriculum**  
Retrieve the authenticated user's current learning curriculum.

Response:
```json
{
  "success": true,
  "data": {
    "currentTier": "beginner",
    "targetTier": "tier1",
    "startDate": "2023-12-01T10:00:00Z",
    "hoursPerWeek": 10,
    "existingSkills": ["networking basics"],
    "milestones": [],
    "customGoals": [],
    "generatedCurriculum": {
      "generatedAt": "2023-12-01T10:00:00Z",
      "phases": [...],
      "totalWeeks": 20,
      "personalizedAdvice": "Consistent practice is key"
    }
  }
}
```

#### Log Daily Progress
**POST /api/curriculum/logs**  
Log daily learning progress.

Body:
```json
{
  "date": "2023-12-01",
  "theoryHours": 2,
  "handsOnHours": 3,
  "toolsUsed": ["Wireshark"],
  "labsCompleted": ["Packet Analysis Lab"],
  "notes": "Learned about TCP/IP protocols"
}
```

Response:
```json
{
  "success": true,
  "message": "Daily progress logged successfully",
  "data": {
    "id": "log123"
  }
}
```

#### Get Daily Logs
**GET /api/curriculum/logs**  
Retrieve the authenticated user's daily progress logs.

Query Parameters:
- `startDate` (optional): Filter logs from this date (YYYY-MM-DD)
- `endDate` (optional): Filter logs to this date (YYYY-MM-DD)
- `limit` (optional): Number of logs to return (default: 50)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "log123",
      "userId": "user123",
      "date": "2023-12-01",
      "theoryHours": 2,
      "handsOnHours": 3,
      "toolsUsed": ["Wireshark"],
      "labsCompleted": ["Packet Analysis Lab"],
      "notes": "Learned about TCP/IP protocols",
      "createdAt": "2023-12-01T10:00:00Z"
    }
  ]
}
```

### Portfolio Management

#### Add Portfolio Item
**POST /api/portfolio/items**  
Add a new item to the user's portfolio.

Body:
```json
{
  "type": "project",
  "title": "Network Security Assessment",
  "description": "Performed a comprehensive network security assessment",
  "tags": ["networking", "security"],
  "githubUrl": "https://github.com/user/network-assessment",
  "skills": ["Network Security", "Vulnerability Assessment"],
  "tools": ["Nmap", "Wireshark"]
}
```

Response:
```json
{
  "success": true,
  "message": "Portfolio item added successfully",
  "data": {
    "id": "item123"
  }
}
```

#### Update Portfolio Item
**PUT /api/portfolio/items/{itemId}**  
Update an existing portfolio item.

Body:
```json
{
  "title": "Updated Network Security Assessment",
  "description": "Enhanced description with more details"
}
```

Response:
```json
{
  "success": true,
  "message": "Portfolio item updated successfully"
}
```

#### Get User Portfolio Items
**GET /api/portfolio/items**  
Retrieve all portfolio items for the authenticated user.

Query Parameters:
- `limit` (optional): Number of items to return (default: 50)
- `offset` (optional): Number of items to skip (default: 0)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "item123",
      "type": "project",
      "title": "Network Security Assessment",
      "description": "Performed a comprehensive network security assessment",
      "tags": ["networking", "security"],
      "githubUrl": "https://github.com/user/network-assessment",
      "skills": ["Network Security", "Vulnerability Assessment"],
      "tools": ["Nmap", "Wireshark"],
      "verified": false,
      "qualityScore": 0,
      "issues": [],
      "createdAt": "2023-12-01T10:00:00Z",
      "updatedAt": "2023-12-01T10:00:00Z"
    }
  ]
}
```

#### Get Specific Portfolio Item
**GET /api/portfolio/items/{itemId}**  
Retrieve a specific portfolio item.

Response:
```json
{
  "success": true,
  "data": {
    "id": "item123",
    "type": "project",
    "title": "Network Security Assessment",
    "description": "Performed a comprehensive network security assessment",
    "tags": ["networking", "security"],
    "githubUrl": "https://github.com/user/network-assessment",
    "skills": ["Network Security", "Vulnerability Assessment"],
    "tools": ["Nmap", "Wireshark"],
    "verified": false,
    "qualityScore": 0,
    "issues": [],
    "createdAt": "2023-12-01T10:00:00Z",
    "updatedAt": "2023-12-01T10:00:00Z"
  }
}
```

#### Delete Portfolio Item
**DELETE /api/portfolio/items/{itemId}**  
Delete a portfolio item.

Response:
```json
{
  "success": true,
  "message": "Portfolio item deleted successfully"
}
```

#### Add Job Application
**POST /api/portfolio/applications**  
Add a new job application to track.

Body:
```json
{
  "company": "CyberSec Corp",
  "position": "Junior Security Analyst",
  "applicationDate": "2023-12-01",
  "status": "applied",
  "notes": "Applied through company website"
}
```

Response:
```json
{
  "success": true,
  "message": "Job application added successfully",
  "data": {
    "id": "app123"
  }
}
```

#### Update Job Application
**PUT /api/portfolio/applications/{appId}**  
Update an existing job application.

Body:
```json
{
  "status": "interviewing",
  "notes": "Phone interview scheduled for next week"
}
```

Response:
```json
{
  "success": true,
  "message": "Job application updated successfully"
}
```

#### Get User Job Applications
**GET /api/portfolio/applications**  
Retrieve all job applications for the authenticated user.

Query Parameters:
- `limit` (optional): Number of applications to return (default: 50)
- `offset` (optional): Number of applications to skip (default: 0)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "app123",
      "company": "CyberSec Corp",
      "position": "Junior Security Analyst",
      "applicationDate": "2023-12-01",
      "status": "applied",
      "notes": "Applied through company website",
      "documents": [],
      "createdAt": "2023-12-01T10:00:00Z",
      "updatedAt": "2023-12-01T10:00:00Z"
    }
  ]
}
```

#### Get Specific Job Application
**GET /api/portfolio/applications/{appId}**  
Retrieve a specific job application.

Response:
```json
{
  "success": true,
  "data": {
    "id": "app123",
    "company": "CyberSec Corp",
    "position": "Junior Security Analyst",
    "applicationDate": "2023-12-01",
    "status": "applied",
    "notes": "Applied through company website",
    "documents": [],
    "createdAt": "2023-12-01T10:00:00Z",
    "updatedAt": "2023-12-01T10:00:00Z"
  }
}
```

#### Delete Job Application
**DELETE /api/portfolio/applications/{appId}**  
Delete a job application.

Response:
```json
{
  "success": true,
  "message": "Job application deleted successfully"
}
```

### Notifications

#### Send Notification (Admin Only)
**POST /api/notifications/send**  
Send a notification to a specific user (admin only).

Body:
```json
{
  "userId": "targetUserId",
  "title": "Important Update",
  "message": "Please review the new curriculum changes",
  "type": "info",
  "data": {}
}
```

Response:
```json
{
  "success": true,
  "message": "Notification sent successfully",
  "data": {
    "id": "notif123"
  }
}
```

#### Get User Notifications
**GET /api/notifications**  
Retrieve notifications for the authenticated user.

Query Parameters:
- `limit` (optional): Number of notifications to return (default: 50)
- `unreadOnly` (optional): Filter to only unread notifications (true/false)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "notif123",
      "userId": "user123",
      "title": "Important Update",
      "message": "Please review the new curriculum changes",
      "type": "info",
      "data": {},
      "read": false,
      "createdAt": "2023-12-01T10:00:00Z"
    }
  ]
}
```

#### Mark Notification as Read
**PUT /api/notifications/{notificationId}/read**  
Mark a notification as read.

Response:
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

#### Mark All Notifications as Read
**PUT /api/notifications/read-all**  
Mark all notifications as read.

Response:
```json
{
  "success": true,
  "message": "Marked 5 notifications as read"
}
```

#### Delete Notification
**DELETE /api/notifications/{notificationId}**  
Delete a notification.

Response:
```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

#### Get Notification Statistics
**GET /api/notifications/stats**  
Get notification statistics for the authenticated user.

Response:
```json
{
  "success": true,
  "data": {
    "unreadCount": 3
  }
}
```

### News & Resources

#### Get Latest News
**GET /api/news/latest**  
Retrieve the latest cybersecurity news articles.

Query Parameters:
- `limit` (optional): Number of articles to return (default: 50)
- `offset` (optional): Number of articles to skip (default: 0)
- `category` (optional): Filter by category

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "article123",
      "title": "New Cybersecurity Threat Discovered",
      "url": "https://example.com/news/threat-discovered",
      "summary": "Researchers have discovered a new cybersecurity threat targeting enterprise networks.",
      "source": "Cybersecurity News",
      "publishedAt": "2023-12-01T10:00:00Z",
      "scrapedAt": "2023-12-01T10:00:00Z",
      "imageUrl": "https://example.com/news/threat-image.jpg",
      "tags": ["threat", "enterprise", "network"],
      "views": 100,
      "trending": true
    }
  ]
}
```

#### Get Trending News
**GET /api/news/trending**  
Retrieve trending cybersecurity news articles.

Query Parameters:
- `limit` (optional): Number of articles to return (default: 10)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "article123",
      "title": "New Cybersecurity Threat Discovered",
      "url": "https://example.com/news/threat-discovered",
      "summary": "Researchers have discovered a new cybersecurity threat targeting enterprise networks.",
      "source": "Cybersecurity News",
      "publishedAt": "2023-12-01T10:00:00Z",
      "scrapedAt": "2023-12-01T10:00:00Z",
      "imageUrl": "https://example.com/news/threat-image.jpg",
      "tags": ["threat", "enterprise", "network"],
      "views": 100,
      "trending": true
    }
  ]
}
```

#### Search News
**GET /api/news/search**  
Search for cybersecurity news articles.

Query Parameters:
- `q` (required): Search query
- `limit` (optional): Number of articles to return (default: 20)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "article123",
      "title": "New Cybersecurity Threat Discovered",
      "url": "https://example.com/news/threat-discovered",
      "summary": "Researchers have discovered a new cybersecurity threat targeting enterprise networks.",
      "source": "Cybersecurity News",
      "publishedAt": "2023-12-01T10:00:00Z",
      "scrapedAt": "2023-12-01T10:00:00Z",
      "imageUrl": "https://example.com/news/threat-image.jpg",
      "tags": ["threat", "enterprise", "network"],
      "views": 100,
      "trending": true
    }
  ]
}
```

#### Get News Article
**GET /api/news/{articleId}**  
Retrieve a specific news article.

Response:
```json
{
  "success": true,
  "data": {
    "id": "article123",
    "title": "New Cybersecurity Threat Discovered",
    "url": "https://example.com/news/threat-discovered",
    "summary": "Researchers have discovered a new cybersecurity threat targeting enterprise networks.",
    "source": "Cybersecurity News",
    "publishedAt": "2023-12-01T10:00:00Z",
    "scrapedAt": "2023-12-01T10:00:00Z",
    "imageUrl": "https://example.com/news/threat-image.jpg",
    "tags": ["threat", "enterprise", "network"],
    "views": 100,
    "trending": true
  }
}
```

#### Get News Categories
**GET /api/news/categories**  
Retrieve available news categories.

Response:
```json
{
  "success": true,
  "data": ["threat", "enterprise", "network", "malware", "vulnerability"]
}
```

#### Refresh News (Admin Only)
**POST /api/news/refresh**  
Trigger the Python scraper to refresh news articles (admin only).

Response:
```json
{
  "success": true,
  "message": "News refresh triggered successfully"
}
```

## Cloud Functions

### Authentication Triggers
- `sendWelcomeEmail` - Automatically triggered when a new user signs up

### Scheduled Functions
- `sendDailyReminder1111AM` - Sends daily reminders at 11:11 AM (Edmonton time)
- `sendDailyReminder1111PM` - Sends daily reminders at 11:11 PM (Edmonton time)
- `processEmailQueue` - Processes queued emails every 5 minutes

### Firestore Triggers
- `onIncidentReportSubmitted` - Triggered when a new incident report is created
- `onIncidentReportReviewed` - Triggered when an incident report is updated/reviewed

### Callable Functions
- `verifyEmail` - Verifies user email address
- `unsubscribeFromEmails` - Handles email unsubscription requests

## Data Schema

### Users Collection
```
/users/{userId}
- email: string
- displayName: string
- photoURL: string
- createdAt: timestamp
- lastLogin: timestamp
- mfaEnabled: boolean
- mfaMethods: array
- preferences: object
  - emailNotifications: boolean
  - dailyReminders: boolean
  - reminderTime: string
  - timezone: string
  - theme: string
```

### User Goals Collection
```
/userGoals/{userId}
- currentTier: string
- targetTier: string
- targetDate: timestamp
- startDate: timestamp
- weeklyHours: number
- focusAreas: array
- certifications: array
- milestones: array
- customGoals: array
- generatedCurriculum: object
  - generatedAt: timestamp
  - totalWeeks: number
  - phases: array
  - personalizedAdvice: string
```

### Skills Matrix Collection
```
/skillsMatrix/{userId}
- categories: object
- lastUpdated: timestamp
```

### Daily Logs Collection
```
/dailyLogs/{logId}
- userId: string
- date: string (YYYY-MM-DD)
- theoryHours: number
- handsOnHours: number
- toolsUsed: array
- labsCompleted: array
- notes: string
- evidence: array
- createdAt: timestamp
```

### Todos Collection
```
/todos/{userId}
- items: array
  - id: string
  - title: string
  - description: string
  - completed: boolean
  - priority: string
  - category: string
  - dueDate: timestamp
  - source: string
  - phaseNumber: number
  - createdAt: timestamp
- lastUpdated: timestamp
```

### Portfolio Items Collection
```
/portfolioItems/{itemId}
- userId: string
- type: string
- title: string
- description: string
- dateCreated: timestamp
- tags: array
- githubUrl: string
- linkedinUrl: string
- content: string
- skills: array
- tools: array
- verified: boolean
- qualityScore: number
- issues: array
- createdAt: timestamp
```

### Job Applications Collection
```
/jobApplications/{appId}
- userId: string
- company: string
- position: string
- applicationDate: timestamp
- status: string
- notes: string
- documents: array
- createdAt: timestamp
```

### Incident Reports Collection
```
/incidentReports/{reportId}
- incidentTitle: string
- incidentType: string
- severity: string
- summary: string
- detailedDescription: string
- evidence: array
- submittedBy: object
  - uid: string
  - name: string
  - email: string
- submittedAt: timestamp
- status: string
- reviewScore: number
- reviewFeedback: string
- reviewedAt: timestamp
- reviewer: object
```

### News Articles Collection
```
/newsArticles/{articleId}
- title: string
- url: string
- summary: string
- source: string
- publishedAt: timestamp
- scrapedAt: timestamp
- imageUrl: string
- tags: array
- views: number
- trending: boolean
```

### Notifications Collection
```
/notifications/{notificationId}
- userId: string
- title: string
- message: string
- type: string
- data: object
- read: boolean
- createdAt: timestamp
- readAt: timestamp (optional)
```

## Environment Variables

### Backend Server (.env)
```
# Gmail Configuration
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_service_account_email

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Cron Secret
CRON_SECRET=your_random_secret

# Server Configuration
PORT=3000
NODE_ENV=production

# Frontend URL
FRONTEND_URL=https://your-app.com
```

### Cloud Functions (.env)
```
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Firebase Configuration
GCLOUD_PROJECT=your_project_id

# OpenAI API
OPENAI_API_KEY=your_openai_api_key
```

## Error Handling
All API endpoints return appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing or invalid authentication)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message",
  "details": "Additional details (optional)"
}
```