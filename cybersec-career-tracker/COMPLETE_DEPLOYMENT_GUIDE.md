# 🚀 Complete Deployment Guide - CyberTrack

This guide covers deploying the entire CyberTrack application including frontend, backend, Firebase Functions, and email automation.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [Deploy Firebase Cloud Functions](#deploy-firebase-cloud-functions)
4. [Deploy Frontend (Vercel)](#deploy-frontend-vercel)
5. [Deploy Backend (Render)](#deploy-backend-render)
6. [Configure Email Automation](#configure-email-automation)
7. [Testing](#testing)
8. [Monitoring](#monitoring)

---

## 1. Prerequisites

### Required Accounts
- ✅ Firebase account (free tier is sufficient)
- ✅ Vercel account (for frontend hosting)
- ✅ Render account (for backend API)
- ✅ Gmail account (for email sending)
- ✅ GitHub account (for code repository)

### Required Tools
```bash
# Install Node.js (v18+)
node --version

# Install Firebase CLI
npm install -g firebase-tools

# Install Vercel CLI (optional)
npm install -g vercel

# Install Git
git --version
```

---

## 2. Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name: `cybertrack-prod`
4. Enable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Authentication
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** (configure OAuth consent screen)

### Step 3: Create Firestore Database
1. Go to **Firestore Database**
2. Click "Create database"
3. Start in **production mode**
4. Choose location: `us-central1` (or closest to you)

### Step 4: Set Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /emailPreferences/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /legalAcceptances/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Daily logs
    match /dailyLogs/{logId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Incident reports
    match /incidentReports/{reportId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Email queue (Cloud Functions only)
    match /emailQueue/{emailId} {
      allow read, write: if false; // Only Cloud Functions can access
    }
  }
}
```

### Step 5: Get Firebase Config
1. Go to **Project Settings** > **General**
2. Scroll to "Your apps"
3. Click **Web** icon (</>)
4. Register app: `cybertrack-web`
5. Copy the Firebase config object

### Step 6: Update Frontend Config
Edit `cybersec-career-tracker/src/config/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 3. Deploy Firebase Cloud Functions

### Step 1: Initialize Firebase in Project
```bash
cd cybersec-career-tracker
firebase login
firebase init
```

Select:
- ✅ Functions
- ✅ Firestore
- Choose existing project: `cybertrack-prod`
- Language: JavaScript
- ESLint: No
- Install dependencies: Yes

### Step 2: Configure Environment Variables
```bash
cd functions
cp .env.example .env
```

Edit `.env`:
```bash
GMAIL_USER=raaghvv0508@gmail.com
GMAIL_APP_PASSWORD=uarz syfm uhrs gekj
FROM_EMAIL=raaghvv0508@gmail.com
FROM_NAME=CyberTrack
ADMIN_EMAIL=raaghvv0508@gmail.com
APP_URL=https://cybertrack.vercel.app
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Deploy Functions
```bash
# Deploy all functions
firebase deploy --only functions

# Or deploy specific functions
firebase deploy --only functions:sendWelcomeEmail,sendDailyReminder1111AM
```

### Step 5: Verify Deployment
1. Go to Firebase Console > Functions
2. Verify all 8 functions are deployed
3. Check logs for any errors

---

## 4. Deploy Frontend (Vercel)

### Step 1: Push to GitHub
```bash
cd cybersec-career-tracker
git add .
git commit -m "Add Firebase Functions and Incident Reports"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import from GitHub: `raghv-m/cyberTrack`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `cybersec-career-tracker`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Set Environment Variables
In Vercel project settings > Environment Variables:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 4: Deploy
Click "Deploy" and wait for build to complete.

---

## 5. Deploy Backend (Render)

### Step 1: Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" > "Web Service"
3. Connect GitHub repository: `raghv-m/cyberTrack`
4. Configure:
   - **Name**: `cybertrack-backend`
   - **Root Directory**: `cybersec-career-tracker/backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

### Step 2: Set Environment Variables
```
GMAIL_USER=raaghvv0508@gmail.com
GMAIL_APP_PASSWORD=uarz syfm uhrs gekj
FIREBASE_PROJECT_ID=your_project_id
```

### Step 3: Deploy
Click "Create Web Service" and wait for deployment.

---

## 6. Configure Email Automation

### Gmail App Password Setup
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to "App passwords"
4. Generate password for "Mail"
5. Copy the 16-character password
6. Use this in `GMAIL_APP_PASSWORD` environment variable

### Test Email Sending
```bash
# Test welcome email
firebase functions:shell
> sendWelcomeEmail({email: 'your-email@example.com', displayName: 'Test User'})
```

---

## 7. Testing

### Test Incident Report Submission
1. Go to https://cybertrack.vercel.app
2. Sign up / Log in
3. Navigate to "Incident Reports"
4. Click "New Report"
5. Fill out form and submit
6. Check email for confirmation

### Test Daily Reminders
Scheduled functions run automatically at 11:11 AM and 11:11 PM Edmonton time.

To test manually:
```bash
firebase functions:shell
> sendDailyReminder1111AM()
```

---

## 8. Monitoring

### Firebase Console
- **Functions**: View execution count, errors, logs
- **Firestore**: Monitor database usage
- **Authentication**: Track user signups

### Vercel Dashboard
- **Deployments**: View build logs
- **Analytics**: Track page views
- **Logs**: Real-time function logs

### Render Dashboard
- **Logs**: View backend API logs
- **Metrics**: CPU, memory usage

---

## 🎉 Deployment Complete!

Your CyberTrack application is now fully deployed with:
- ✅ Frontend on Vercel
- ✅ Backend on Render
- ✅ Firebase Cloud Functions for email automation
- ✅ Firestore database
- ✅ Firebase Authentication
- ✅ Incident Report system
- ✅ Legal pages (Terms, Privacy Policy)

**Live URL**: https://cybertrack.vercel.app

---

**Made with ❤️ in Canada 🍁 by Raghav Mahajan**

