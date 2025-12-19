import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Bell, CheckCircle, Award, TrendingUp, AlertCircle, Flame } from 'lucide-react';
import { detectReadiness } from '../utils/readinessDetection';

interface Notification {
  id: string;
  type: 'achievement' | 'recommendation' | 'reminder' | 'milestone' | 'readiness';
  title: string;
  message: string;
  icon: React.ReactElement;
  color: string;
  timestamp: Date;
  read: boolean;
}

export default function Notifications() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadNotifications();
    }
  }, [currentUser]);

  const loadNotifications = async () => {
    if (!currentUser) return;

    try {
      const notifs: Notification[] = [];

      // Check gates for achievements
      const gatesDoc = await getDoc(doc(db, 'handsonGates', currentUser.uid));
      if (gatesDoc.exists()) {
        const gates = gatesDoc.data();
        
        if (gates.phase0_complete?.allMet) {
          notifs.push({
            id: 'phase0-complete',
            type: 'achievement',
            title: '🎉 Phase 0 Complete!',
            message: 'You\'ve completed the Foundation phase. Ready for Tier 1!',
            icon: <CheckCircle className="w-6 h-6" />,
            color: 'text-success',
            timestamp: new Date(),
            read: false
          });
        }
      }

      // Check readiness
      const logsQuery = query(
        collection(db, 'dailyLogs'),
        where('userId', '==', currentUser.uid),
        orderBy('date', 'desc'),
        limit(30)
      );
      const logsSnapshot = await getDocs(logsQuery);
      const logs = logsSnapshot.docs.map(doc => doc.data());

      const totalLabs = logs.reduce((sum, log: any) => sum + (log.labsCompleted?.length || 0), 0);
      const totalToolHours = logs.reduce((sum, log: any) => {
        const toolHours = log.toolsPracticed?.reduce((s: number, t: any) => s + (t.duration || 0), 0) || 0;
        return sum + toolHours;
      }, 0);

      const readiness = detectReadiness({
        skillsMatrixAvg: 3.5,
        phase0Complete: gatesDoc.exists() ? gatesDoc.data().phase0_complete?.allMet || false : false,
        portfolioCount: 0,
        verifiedPortfolioCount: 0,
        totalLabsCompleted: totalLabs,
        totalToolHours,
        currentStreak: 0
      });

      if (readiness.certReady) {
        notifs.push({
          id: 'cert-ready',
          type: 'readiness',
          title: '✅ Certification Ready!',
          message: `You're ready for ${readiness.recommendedCert}. Time to schedule your exam!`,
          icon: <Award className="w-6 h-6" />,
          color: 'text-success',
          timestamp: new Date(),
          read: false
        });
      }

      if (readiness.jobReady) {
        notifs.push({
          id: 'job-ready',
          type: 'readiness',
          title: '🚀 Job Ready!',
          message: `You're qualified for ${readiness.recommendedTier} positions. Start applying!`,
          icon: <TrendingUp className="w-6 h-6" />,
          color: 'text-primary',
          timestamp: new Date(),
          read: false
        });
      }

      // Check for next module recommendation
      const goalsDoc = await getDoc(doc(db, 'userGoals', currentUser.uid));
      if (goalsDoc.exists()) {
        const curriculum = goalsDoc.data().generatedCurriculum?.phases || [];
        if (curriculum.length > 0) {
          const nextPhase = curriculum[0];
          notifs.push({
            id: 'next-module',
            type: 'recommendation',
            title: '📚 Next Module',
            message: `Start ${nextPhase.phaseName}: ${nextPhase.skills.slice(0, 2).join(', ')}`,
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'text-primary',
            timestamp: new Date(),
            read: false
          });
        }
      }

      // Check for streak milestone
      const streak = calculateStreak(logs);
      if (streak >= 7) {
        notifs.push({
          id: 'streak-milestone',
          type: 'milestone',
          title: `🔥 ${streak}-Day Streak!`,
          message: `Amazing! You've logged progress for ${streak} consecutive days.`,
          icon: <Flame className="w-6 h-6" />,
          color: 'text-warning',
          timestamp: new Date(),
          read: false
        });
      }

      // Daily reminder
      const today = new Date().toDateString();
      const hasLoggedToday = logs.some((log: any) => {
        const logDate = log.date?.toDate();
        return logDate && logDate.toDateString() === today;
      });

      if (!hasLoggedToday) {
        notifs.push({
          id: 'daily-reminder',
          type: 'reminder',
          title: '⏰ Daily Log Reminder',
          message: 'Don\'t forget to log your progress today!',
          icon: <AlertCircle className="w-6 h-6" />,
          color: 'text-warning',
          timestamp: new Date(),
          read: false
        });
      }

      setNotifications(notifs);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = (logs: any[]) => {
    if (logs.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < logs.length; i++) {
      const logDate = logs[i].date?.toDate();
      if (!logDate) continue;
      
      logDate.setHours(0, 0, 0, 0);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (logDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Notifications</h1>
          <p className="text-text-secondary">Stay updated on your progress and achievements</p>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="glass rounded-lg p-8 text-center">
              <Bell className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
              <p className="text-text-secondary">No new notifications</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
                <div className="flex items-start gap-4">
                  <div className={notif.color}>{notif.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-1">{notif.title}</h3>
                    <p className="text-text-secondary text-sm">{notif.message}</p>
                  </div>
                  <span className="text-xs text-text-tertiary">{notif.timestamp.toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
