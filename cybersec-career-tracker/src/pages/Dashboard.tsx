import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';
import { Flame, TrendingUp, Target, AlertTriangle, Award, Calendar, Wrench, FileText } from 'lucide-react';
import ProgressGates from '../components/ProgressGates';
import { detectReadiness } from '../utils/readinessDetection';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [gates, setGates] = useState<any[]>([]);
  const [tutorialHellAlert, setTutorialHellAlert] = useState(false);
  const [readiness, setReadiness] = useState<any>(null);
  const [stats, setStats] = useState({
    totalLabs: 0,
    totalToolHours: 0,
    portfolioCount: 0,
    avgTheoryPercent: 0
  });

  useEffect(() => {
    if (currentUser) {
      loadDashboardData();
    }
  }, [currentUser]);

  const loadDashboardData = async () => {
    if (!currentUser) return;

    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const logsQuery = query(
        collection(db, 'dailyLogs'),
        where('userId', '==', currentUser.uid),
        where('date', '>=', sevenDaysAgo),
        orderBy('date', 'desc')
      );

      const logsSnapshot = await getDocs(logsQuery);
      const logs = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const currentStreak = calculateStreak(logs);
      setStreak(currentStreak);

      const chartData = prepareWeeklyChartData(logs);
      setWeeklyData(chartData);

      const totalLabs = logs.reduce((sum, log: any) => sum + (log.labsCompleted?.length || 0), 0);
      const totalToolHours = logs.reduce((sum, log: any) => {
        const toolHours = log.toolsPracticed?.reduce((s: number, t: any) => s + (t.duration || 0), 0) || 0;
        return sum + toolHours;
      }, 0);

      const totalTheory = logs.reduce((sum, log: any) => sum + (log.theoryHours || 0), 0);
      const totalHandsOn = logs.reduce((sum, log: any) => sum + (log.handsOnHours || 0), 0);
      const avgTheoryPercent = totalTheory + totalHandsOn > 0
        ? (totalTheory / (totalTheory + totalHandsOn)) * 100
        : 0;

      if (avgTheoryPercent > 50 && logs.length >= 7) {
        setTutorialHellAlert(true);
      }

      setStats({
        totalLabs,
        totalToolHours,
        portfolioCount: 0,
        avgTheoryPercent
      });

      const gatesDoc = await getDoc(doc(db, 'handsonGates', currentUser.uid));
      if (gatesDoc.exists()) {
        const gatesData = gatesDoc.data();
        const formattedGates = [
          {
            name: 'Phase 0: Foundation',
            description: 'Complete foundation requirements',
            unlocked: gatesData.phase0_complete?.allMet || false,
            requirements: [
              {
                name: 'Wireshark Practice',
                current: gatesData.phase0_complete?.wireshark_hours || 0,
                target: 20,
                met: (gatesData.phase0_complete?.wireshark_hours || 0) >= 20
              },
              {
                name: 'Writeups Published',
                current: gatesData.phase0_complete?.writeups_published || 0,
                target: 3,
                met: (gatesData.phase0_complete?.writeups_published || 0) >= 3
              },
              {
                name: 'TryHackMe Rooms',
                current: gatesData.phase0_complete?.tryhackme_rooms || 0,
                target: 15,
                met: (gatesData.phase0_complete?.tryhackme_rooms || 0) >= 15
              }
            ]
          },
          {
            name: 'Ready for Tier 1 Jobs',
            description: 'Meet requirements for SOC Tier 1',
            unlocked: gatesData.ready_for_tier1_jobs?.allMet || false,
            requirements: [
              {
                name: 'Portfolio Items',
                current: gatesData.ready_for_tier1_jobs?.portfolio_items || 0,
                target: 5,
                met: (gatesData.ready_for_tier1_jobs?.portfolio_items || 0) >= 5
              },
              {
                name: 'LinkedIn Updated',
                current: gatesData.ready_for_tier1_jobs?.linkedin_updated ? 1 : 0,
                target: 1,
                met: gatesData.ready_for_tier1_jobs?.linkedin_updated || false
              }
            ]
          }
        ];
        setGates(formattedGates);
      }

      const readinessResult = detectReadiness({
        skillsMatrixAvg: 3.5,
        phase0Complete: gatesDoc.exists() ? gatesDoc.data().phase0_complete?.allMet || false : false,
        portfolioCount: 0,
        verifiedPortfolioCount: 0,
        totalLabsCompleted: totalLabs,
        totalToolHours,
        currentStreak
      });
      setReadiness(readinessResult);

    } catch (error) {
      console.error('Error loading dashboard:', error);
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

  const prepareWeeklyChartData = (logs: any[]) => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const log = logs.find((l: any) => {
        const logDate = l.date?.toDate();
        if (!logDate) return false;
        return logDate.toDateString() === date.toDateString();
      });

      data.push({
        date: dateStr,
        theory: log?.theoryHours || 0,
        handsOn: log?.handsOnHours || 0
      });
    }
    return data;
  };


  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
          <p className="text-text-secondary">Track your progress and stay on target</p>
        </div>

        {/* Tutorial Hell Alert */}
        {tutorialHellAlert && (
          <div className="mb-6 bg-danger bg-opacity-10 border border-danger rounded-lg p-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-danger flex-shrink-0" />
            <div>
              <h3 className="font-bold text-danger">Tutorial Hell Detected!</h3>
              <p className="text-sm text-text-secondary">
                Your theory time is {stats.avgTheoryPercent.toFixed(0)}% this week. Focus on hands-on labs and tools!
              </p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{streak}</h3>
            <p className="text-text-secondary text-sm">Day Streak 🔥</p>
          </div>

          <div className="glass rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-success" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{stats.totalLabs}</h3>
            <p className="text-text-secondary text-sm">Labs Completed</p>
          </div>

          <div className="glass rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{stats.totalToolHours.toFixed(1)}h</h3>
            <p className="text-text-secondary text-sm">Tool Practice</p>
          </div>

          <div className="glass rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-warning" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{stats.avgTheoryPercent.toFixed(0)}%</h3>
            <p className="text-text-secondary text-sm">Theory Time</p>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="glass rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4">Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f4a" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1f3a', border: '1px solid #2a2f4a', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="theory" stroke="#f59e0b" name="Theory Hours" />
              <Line type="monotone" dataKey="handsOn" stroke="#10b981" name="Hands-On Hours" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Readiness Indicators */}
        {readiness && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`glass rounded-lg p-6 ${readiness.certReady ? 'border-2 border-success' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <Award className={`w-6 h-6 ${readiness.certReady ? 'text-success' : 'text-text-tertiary'}`} />
                <h3 className="text-lg font-bold text-text-primary">Certification Readiness</h3>
              </div>
              {readiness.certReady ? (
                <div>
                  <p className="text-success font-semibold mb-2">✅ Ready for {readiness.recommendedCert}</p>
                  <p className="text-sm text-text-secondary">You meet all requirements to take this certification!</p>
                </div>
              ) : (
                <div>
                  <p className="text-warning font-semibold mb-2">Not Ready Yet</p>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {readiness.blockers.slice(0, 2).map((blocker: string, idx: number) => (
                      <li key={idx}>• {blocker}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={`glass rounded-lg p-6 ${readiness.jobReady ? 'border-2 border-success' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <Target className={`w-6 h-6 ${readiness.jobReady ? 'text-success' : 'text-text-tertiary'}`} />
                <h3 className="text-lg font-bold text-text-primary">Job Readiness</h3>
              </div>
              {readiness.jobReady ? (
                <div>
                  <p className="text-success font-semibold mb-2">✅ Ready for {readiness.recommendedTier}</p>
                  <p className="text-sm text-text-secondary">Start applying for SOC Tier 1 positions!</p>
                </div>
              ) : (
                <div>
                  <p className="text-warning font-semibold mb-2">Not Ready Yet</p>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {readiness.blockers.slice(0, 2).map((blocker: string, idx: number) => (
                      <li key={idx}>• {blocker}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Gates */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Progress Gates</h2>
          <ProgressGates gates={gates} />
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-lg p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/app/daily-log')}
              className="px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-smooth text-left font-semibold"
            >
              📝 Log Today's Progress
            </button>
            <button
              onClick={() => navigate('/app/skills')}
              className="px-6 py-4 bg-bg-tertiary border border-border-color text-text-primary rounded-lg hover:bg-bg-secondary transition-smooth text-left font-semibold"
            >
              🎯 Update Skills Matrix
            </button>
            <button
              onClick={() => navigate('/app/portfolio')}
              className="px-6 py-4 bg-bg-tertiary border border-border-color text-text-primary rounded-lg hover:bg-bg-secondary transition-smooth text-left font-semibold"
            >
              💼 Manage Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

