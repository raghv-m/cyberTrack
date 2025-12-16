# 🚀 Render Deployment Guide

## 🎯 WHAT TO DEPLOY

**2 Services:**
1. **Backend** (Node.js) - `/backend` folder - Handles emails
2. **Frontend** (Static Site) - Root folder - React app

---

## 🔧 PART 1: Backend Deployment

### Create Web Service on Render

1. Go to https://dashboard.render.com
2. **New +** → **Web Service**
3. Connect GitHub repo
4. Settings:
   - **Name**: `cybertrack-backend`
   - **Root Directory**: `cybersec-career-tracker/backend`
   - **Runtime**: Node
   - **Build**: `npm install`
   - **Start**: `npm start`

### Backend Environment Variables

```
GMAIL_USER=raaghvv0508@gmail.com
GMAIL_APP_PASSWORD=uarz syfm uhrs gekj

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour_Key\n-----END PRIVATE KEY-----
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

CRON_SECRET=random_secret_12345

PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-frontend.onrender.com
```

**Get Firebase Admin credentials:**
- Firebase Console → Project Settings → Service Accounts
- Generate New Private Key → Download JSON
- Copy `project_id`, `private_key`, `client_email`

---

## 🎨 PART 2: Frontend Deployment

### Create Static Site on Render

1. **New +** → **Static Site**
2. Connect GitHub repo
3. Settings:
   - **Name**: `cybertrack-frontend`
   - **Root Directory**: `cybersec-career-tracker`
   - **Build**: `npm install && npm run build`
   - **Publish**: `dist`

### Frontend Environment Variables

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_BACKEND_URL=https://cybertrack-backend.onrender.com
```

**Get Firebase Web credentials:**
- Firebase Console → Project Settings → General
- Your apps → Web app → Copy config

---

## 📧 PART 3: Email Automation (Cron Jobs)

Create 5 Cron Jobs on Render:

**8 AM**: `0 8 * * *`
**12 PM**: `0 12 * * *`
**4 PM**: `0 16 * * *`
**8 PM**: `0 20 * * *`
**12 AM**: `0 0 * * *`

**Command for all:**
```bash
curl -X POST -H "Authorization: Bearer YOUR_CRON_SECRET" https://cybertrack-backend.onrender.com/send-daily-reminders
```

Replace `YOUR_CRON_SECRET` with your actual secret!

---

## ✅ Test

**Backend**: Visit `https://cybertrack-backend.onrender.com/` → Should see `{"status": "ok"}`

**Frontend**: Visit `https://cybertrack-frontend.onrender.com/` → Should see landing page

**Email**: Signup → Check email for welcome message

---

## 📁 Backend Files Created

- `backend/package.json` - Dependencies
- `backend/server.js` - Express server with email endpoints
- `backend/.env.example` - Environment variables template

## 🔗 Endpoints

- `POST /send-welcome-email` - Send welcome email on signup
- `POST /send-daily-reminders` - Send reminders to all users (cron)

---

Made with ❤️ in Canada 🍁 by Raghav Mahajan

