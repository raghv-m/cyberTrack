# 🛡️ Cybersecurity Career Tracker

A comprehensive web application to track your journey from beginner to SOC Analyst (Tier 1, 2, or 3). Features AI-powered curriculum generation, intelligent progress tracking, and personalized recommendations.

## ✨ Features

- **AI Curriculum Generator**: Personalized learning paths based on your goals and available time
- **Daily Progress Logging**: Track topics learned, tools practiced, and labs completed
- **Skills Matrix**: Visual proficiency tracking across all cybersecurity domains
- **Readiness Detection**: Intelligent system that tells you when you're ready for certifications or jobs
- **Smart Recommendations**: AI suggests next topics based on your learning patterns
- **Portfolio Tracker**: Manage your projects and writeups
- **Job Application Tracker**: Track applications and interview progress
- **Notification System**: Daily check-ins, weekly summaries, and milestone celebrations

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn
- Firebase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cybersec-career-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   
   a. Go to [Firebase Console](https://console.firebase.google.com/)
   
   b. Create a new project
   
   c. Enable Authentication:
      - Go to Authentication > Sign-in method
      - Enable Email/Password
      - Enable Google
   
   d. Create Firestore Database:
      - Go to Firestore Database
      - Create database in production mode
      - Start in test mode (we'll add security rules later)
   
   e. Get your Firebase config:
      - Go to Project Settings > General
      - Scroll to "Your apps" section
      - Click the web icon (</>)
      - Copy the firebaseConfig object

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
cybersec-career-tracker/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── contexts/        # React contexts (Auth, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions (AI logic, helpers)
│   ├── data/            # Master knowledge base
│   ├── types/           # TypeScript type definitions
│   ├── config/          # Firebase configuration
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── README.md
```

## 🎯 Usage

### First Time Setup

1. **Sign up** with email/password or Google
2. **Complete onboarding** wizard:
   - Select target tier (Tier 1, 2, or 3)
   - Set target date
   - Choose weekly study hours
   - Select focus areas
   - Pick certifications to pursue
3. **AI generates** your personalized curriculum
4. **Start learning** and log daily progress!

### Daily Workflow

1. **Check Dashboard** for today's recommended topics
2. **Study** according to your curriculum
3. **Log Progress** at end of day:
   - Topics learned
   - Tools practiced
   - Labs completed
   - Hours studied
   - Challenges and wins
4. **Review** readiness indicators to see your progress

## 🧠 AI Features

### Curriculum Generation
The AI analyzes:
- Your target tier requirements
- Current skill levels
- Available study time
- Focus areas and certifications

Then generates:
- Phased learning plan
- Weekly breakdown
- Recommended resources
- Lab exercises
- Milestone timeline

### Readiness Detection
Continuously checks if you meet criteria for:
- Job applications (Tier 1/2/3)
- Certifications (CompTIA, Google, etc.)
- Advanced labs
- Specialized training

### Smart Recommendations
Based on recent activity, suggests:
- Related advanced topics
- Complementary skills
- Next tools to learn
- Relevant labs

## 🔒 Security

- Firebase Authentication with email verification
- Firestore security rules (to be configured)
- Environment variables for sensitive data
- No hardcoded credentials

## 🎨 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Firebase (Auth + Firestore)
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📝 License

MIT License - feel free to use this for your own learning journey!

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📧 Support

For issues or questions, please open a GitHub issue.

---

**Built with ❤️ for aspiring cybersecurity professionals**

