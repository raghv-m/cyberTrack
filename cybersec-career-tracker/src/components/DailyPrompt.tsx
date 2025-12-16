import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { BookOpen, X, TrendingUp } from 'lucide-react';

export default function DailyPrompt() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  useEffect(() => {
    checkDailyLog();
  }, [currentUser]);

  const checkDailyLog = async () => {
    if (!currentUser) return;

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const logsQuery = query(
        collection(db, 'dailyLogs'),
        where('userId', '==', currentUser.uid),
        orderBy('date', 'desc'),
        limit(1)
      );

      const logsSnapshot = await getDocs(logsQuery);
      
      if (logsSnapshot.empty) {
        setShowPrompt(true);
        setHasLoggedToday(false);
        return;
      }

      const lastLog = logsSnapshot.docs[0].data();
      const lastLogDate = lastLog.date?.toDate();
      
      if (lastLogDate) {
        lastLogDate.setHours(0, 0, 0, 0);
        const isToday = lastLogDate.getTime() === today.getTime();
        setHasLoggedToday(isToday);
        
        // Show prompt if haven't logged today
        if (!isToday) {
          // Wait 2 seconds after login to show prompt
          setTimeout(() => setShowPrompt(true), 2000);
        }
      } else {
        setShowPrompt(true);
        setHasLoggedToday(false);
      }
    } catch (error) {
      console.error('Error checking daily log:', error);
    }
  };

  const handleLogNow = () => {
    setShowPrompt(false);
    navigate('/daily-log');
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || hasLoggedToday) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl p-8 max-w-md w-full border-2 border-primary/30 animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Welcome Back!</h2>
              <p className="text-text-secondary text-sm">Ready to log your progress?</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-text-tertiary hover:text-text-primary transition-smooth"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text-primary">What did you accomplish today?</h3>
          </div>
          <p className="text-text-secondary text-sm">
            Log your daily progress to:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Track your learning streak
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Update your skills matrix
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Monitor hands-on vs theory ratio
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Stay accountable to your goals
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleLogNow}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-smooth"
          >
            Log Now
          </button>
          <button
            onClick={handleDismiss}
            className="px-6 py-3 bg-bg-tertiary text-text-secondary rounded-lg font-semibold hover:bg-bg-secondary transition-smooth"
          >
            Later
          </button>
        </div>

        <p className="mt-4 text-xs text-text-tertiary text-center">
          Consistency is key to breaking into cybersecurity 🔥
        </p>
      </div>
    </div>
  );
}

