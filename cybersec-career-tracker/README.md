# CyberPath Pro - Cybersecurity Career Tracker

## Overview
CyberPath Pro is a comprehensive cybersecurity learning platform that helps users track their progress, build skills, and advance their careers in cybersecurity. The application provides AI-powered curriculum generation, progress tracking, portfolio building, and job application management.

## Prerequisites
1. Node.js 18.x or higher
2. Firebase account
3. OpenAI API key (for AI features)
4. Gmail account with App Password (for email notifications)

## Setup Instructions

### 1. Environment Configuration
1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and fill in your actual credentials:
   ```bash
   # Firebase Configuration (from your Firebase project settings)
   VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # OpenAI API Key (required for AI features)
   VITE_OPENAI_API_KEY=sk-your_actual_openai_api_key

   # Backend API URL
   VITE_BACKEND_URL=http://localhost:3000
   ```

### 2. Firebase Setup
1. Create a new Firebase project at https://console.firebase.google.com/
2. Enable Firebase Authentication (Email/Password and Google providers)
3. Enable Firestore Database
4. Enable Cloud Functions
5. Copy your Firebase project credentials to the `.env` file

### 3. OpenAI API Key
1. Sign up for an OpenAI account at https://platform.openai.com/
2. Create an API key at https://platform.openai.com/api-keys
3. Copy your API key to the `.env` file

### 4. Backend Setup
The backend services are located in the `backend/` directory:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure backend environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### 5. Frontend Setup
1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start backend server
- `npm run dev` - Start backend server with nodemon for development

## Features

### AI-Powered Curriculum Generation
- Personalized learning paths based on your goals and experience
- Phased curriculum with skills, tools, and labs
- Weekly hour commitments and timeline estimates

### Progress Tracking
- Daily logging of theory and hands-on hours
- Skill matrix tracking with proficiency levels
- Evidence-based learning with screenshot submissions

### Portfolio Building
- Project showcase with detailed descriptions
- Job application tracking
- Quality scoring and verification

### Certification Planning
- Roadmaps for Security+ and Google Cybersecurity certificates
- Progress tracking for certification goals
- Study recommendations

### Tier-Based Roles
- Career progression paths for SOC Tier 1, Tier 2, and Specialist roles
- Role-specific skills and tools
- Hands-on gate requirements

### Email Automation
- Welcome emails for new users
- Daily study reminders
- Login/logout notifications
- Weekly progress summaries

### News Aggregation
- Curated cybersecurity news feed
- Trending articles and threats
- Searchable database

## Folder Structure
```
cybersec-career-tracker/
├── backend/                 # Backend API and Cloud Functions
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── middleware/      # Authentication and validation
│   │   ├── validators/      # Input validation
│   │   └── routes/          # API route definitions
│   ├── tests/               # Unit and integration tests
│   └── functions/           # Firebase Cloud Functions
├── public/                  # Static assets
├── scrapers/                # Python news scrapers
├── src/                     # Frontend source code
│   ├── components/          # React components
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   └── contexts/            # React contexts
└── ...
```

## Troubleshooting

### AI Features Not Working
1. Ensure you have a valid OpenAI API key in your `.env` file
2. Check that the API key has credits/billing configured
3. Verify the backend server is running
4. Check browser console for error messages

### Authentication Issues
1. Verify Firebase configuration in `.env` file
2. Ensure Firebase Authentication is enabled in the Firebase Console
3. Check network connectivity to Firebase services

### Email Notifications Not Sending
1. Verify Gmail credentials in backend `.env` file
2. Ensure you're using an App Password, not your regular password
3. Check spam/junk folders for delivered emails

### Backend Server Issues
1. Ensure all required environment variables are set
2. Check Firebase Admin SDK credentials
3. Verify network connectivity to Firebase services

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the MIT License.