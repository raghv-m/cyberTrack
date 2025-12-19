import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Zap, Target, Award, Code, Briefcase, TrendingUp,
  Clock, CheckCircle, ArrowRight, Flame, BookOpen
} from 'lucide-react';

export default function DashboardNew() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [, setLoading] = useState(true);
  const [careerHealth, setCareerHealth] = useState(75);
  const [stats, setStats] = useState({
    labsCompleted: 12,
    toolPracticeHours: 15.5,
    certsInProgress: 2,
    applicationsSubmitted: 5,
    streak: 7,
  });
  const [nextAction] = useState({
    title: 'Complete Module 3: Network Security',
    type: 'learning',
    dueDate: 'Dec 31',
  });
  const [learningPlan] = useState([
    { id: 1, title: 'Module 1: Network Security', progress: 80, dueDate: 'Oct 18' },
    { id: 2, title: 'Module 2: Incident Response', progress: 60, dueDate: 'Oct 26' },
    { id: 3, title: 'Module 3: Malware Analysis', progress: 40, dueDate: 'Oct 28' },
  ]);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'Completed "Nmap Scan" lab', time: '05:00 / 1.8', date: '254.3.6' },
    { id: 2, action: 'Studied for SOC IV+ role', time: '12:00E 9.0', date: '254.2.6' },
  ]);

  useEffect(() => {
    if (currentUser) {
      loadDashboardData();
    }
  }, [currentUser]);

  const loadDashboardData = async () => {
    if (!currentUser) return;
    try {
      // Load daily logs for stats
      const logsQuery = query(
        collection(db, 'dailyLogs'),
        where('userId', '==', currentUser.uid)
      );
      const logsSnapshot = await getDocs(logsQuery);

      let totalLabs = 0;
      let totalToolHours = 0;
      const recentLogs: any[] = [];

      logsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        totalLabs += data.labsCompleted?.length || 0;
        totalToolHours += data.toolsPracticed?.reduce((sum: number, tool: any) => sum + (tool.hours || 0), 0) || 0;

        // Get recent activity
        if (recentLogs.length < 5) {
          const logDate = data.date?.toDate ? data.date.toDate() : new Date(data.date);
          recentLogs.push({
            id: doc.id,
            action: `Logged ${data.theoryHours + data.handsOnHours} hours`,
            time: `${data.theoryHours}h theory / ${data.handsOnHours}h hands-on`,
            date: logDate.toLocaleDateString()
          });
        }
      });

      // Load job applications
      const jobsQuery = query(
        collection(db, 'users', currentUser.uid, 'jobApplications')
      );
      const jobsSnapshot = await getDocs(jobsQuery);
      const applicationsCount = jobsSnapshot.size;

      // Calculate streak (simplified - count consecutive days with logs)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let streak = 0;
      // This is a simplified streak calculation - you may want to improve this

      // Update stats with real data
      setStats({
        labsCompleted: totalLabs,
        toolPracticeHours: parseFloat(totalToolHours.toFixed(1)),
        certsInProgress: 0, // You'll need to add certification tracking
        applicationsSubmitted: applicationsCount,
        streak: streak || 0,
      });

      // Update recent activity
      if (recentLogs.length > 0) {
        setRecentActivity(recentLogs);
      }

      // Calculate career health based on real data
      const healthScore = Math.min(100, Math.round(
        (totalLabs * 5) + (totalToolHours * 2) + (applicationsCount * 10)
      ));
      setCareerHealth(healthScore || 0);

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setLoading(false);
    }
  };

  // Calculate progress ring
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = circumference - (careerHealth / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#0B0E11] p-6 relative overflow-hidden">
      {/* Hexagonal Grid Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0, 240, 255, 1) 50px, rgba(0, 240, 255, 1) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0, 240, 255, 1) 50px, rgba(0, 240, 255, 1) 51px)
          `
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
            <p className="text-text-secondary">Track your progress & conquer your goals.</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-[#161B22]/60 backdrop-blur-xl rounded-lg border border-cyber-gold/30">
            <Flame className="w-5 h-5 text-cyber-gold" />
            <div>
              <div className="text-xs text-text-muted">Streak</div>
              <div className="text-xl font-bold text-cyber-gold">{stats.streak} days</div>
            </div>
          </div>
        </div>

        {/* Top Grid: Hero Card + Stats */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Hero: Career Health Card */}
          <div className="lg:col-span-2 bg-[#161B22]/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FFD700]/30 shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-all duration-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Career Health</h2>
                <p className="text-text-secondary">Next Target: <span className="text-cyber-gold font-semibold">Security+ Certified</span></p>
                <p className="text-sm text-text-muted">Achieve by: {nextAction.dueDate}</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-gradient-gold">{careerHealth}%</div>
                <div className="text-xs text-text-muted uppercase tracking-wide">Complete</div>
              </div>
            </div>

            {/* Progress Ring */}
            <div className="flex items-center justify-center py-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <defs>
                    <linearGradient id="neon-blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F0FF" />
                      <stop offset="100%" stopColor="#0080FF" />
                    </linearGradient>
                  </defs>
                  {/* Background circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="90"
                    stroke="rgba(0, 240, 255, 0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="90"
                    stroke="url(#neon-blue-gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.6))',
                      transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Next Key Action */}
            <div className="bg-gradient-to-r from-cyber-gold/20 to-cyber-gold/10 border border-cyber-gold/40 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyber-gold/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-cyber-gold" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-text-muted uppercase tracking-wide mb-1">Next Key Action</div>
                <div className="font-semibold text-text-primary">{nextAction.title}</div>
              </div>
              <button
                onClick={() => navigate('/app/roadmap')}
                className="btn-gold px-6 py-2 text-sm"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="space-y-4">
            <div className="stat-card bg-[#161B22]/60 backdrop-blur-xl border border-cyber-blue/20 hover:border-cyber-blue/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <Code className="w-8 h-8 text-cyber-blue" />
                <div className="text-3xl font-bold text-gradient-blue">{stats.labsCompleted}</div>
              </div>
              <div className="stat-card-label">Labs Completed 🔥</div>
            </div>

            <div className="stat-card bg-[#161B22]/60 backdrop-blur-xl border border-cyber-gold/20 hover:border-cyber-gold/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <Clock className="w-8 h-8 text-cyber-gold" />
                <div className="text-3xl font-bold text-gradient-gold">{stats.toolPracticeHours}h</div>
              </div>
              <div className="stat-card-label">Tool Practice</div>
            </div>
          </div>
        </div>

        {/* Middle Grid: Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Award, label: 'Certifications', count: stats.certsInProgress, color: 'purple', route: '/app/certifications' },
            { icon: Code, label: 'Labs/CTFS', count: stats.labsCompleted, color: 'blue', route: '/app/labs' },
            { icon: Briefcase, label: 'Job Applications', count: stats.applicationsSubmitted, color: 'green', route: '/app/jobs' },
            { icon: BookOpen, label: 'Networking', count: 3, color: 'orange', route: '/app/networking' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.route)}
              className="glass p-6 flex flex-col items-center gap-3 hover:scale-105 transition-all duration-200 group"
            >
              <div className={`w-14 h-14 rounded-full bg-cyber-${item.color}/20 flex items-center justify-center group-hover:bg-cyber-${item.color}/30 transition-colors`}>
                <item.icon className={`w-7 h-7 text-cyber-${item.color}`} />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">{item.count}</div>
                <div className="text-sm text-text-muted">{item.label}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Grid: Learning Plan + Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Learning Plan */}
          <div className="bg-[#161B22]/60 backdrop-blur-xl rounded-2xl p-6 border border-cyber-blue/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Learning Plan</h3>
              <button
                onClick={() => navigate('/app/roadmap')}
                className="text-sm text-cyber-blue hover:text-cyber-blue-light transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {learningPlan.map((module) => (
                <div
                  key={module.id}
                  className="glass p-4 hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
                  onClick={() => navigate('/app/roadmap')}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cyber-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyber-blue/30 transition-colors">
                      <BookOpen className="w-5 h-5 text-cyber-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-text-primary mb-1">{module.title}</div>
                      <div className="text-xs text-text-muted">Due: {module.dueDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-cyber-blue">{module.progress}%</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-cyber-blue/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full transition-all duration-1000"
                      style={{
                        width: `${module.progress}%`,
                        boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/app/roadmap')}
              className="btn-secondary w-full mt-4"
            >
              <Target className="w-5 h-5 inline mr-2" />
              View Full Roadmap
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#161B22]/60 backdrop-blur-xl rounded-2xl p-6 border border-cyber-purple/20 shadow-[0_0_15px_rgba(179,102,255,0.1)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Recent Activity</h3>
              <button
                onClick={() => navigate('/app/daily-log')}
                className="text-sm text-cyber-purple hover:text-cyber-purple/80 transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="glass p-4 flex items-start gap-3 hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-cyber-green/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-cyber-green" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-text-primary mb-1">{activity.action}</div>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/app/roadmap')}
              className="btn-secondary w-full mt-4"
            >
              <TrendingUp className="w-5 h-5 inline mr-2" />
              View Roadmap
            </button>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/app/roadmap')}
            className="card-neon-blue p-6 flex items-center justify-between group hover:scale-[1.02] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-cyber-blue/20 flex items-center justify-center group-hover:bg-cyber-blue/30 transition-colors">
                <Target className="w-7 h-7 text-cyber-blue" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-text-primary">View Your Roadmap</div>
                <div className="text-sm text-text-secondary">See your complete learning path</div>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-cyber-blue" />
          </button>

          <button
            onClick={() => navigate('/app/jobs')}
            className="card-gold p-6 flex items-center justify-between group hover:scale-[1.02] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-cyber-gold/20 flex items-center justify-center group-hover:bg-cyber-gold/30 transition-colors">
                <Briefcase className="w-7 h-7 text-cyber-gold" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-text-primary">Export Roadmap</div>
                <div className="text-sm text-text-secondary">Download your career plan</div>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-cyber-gold" />
          </button>
        </div>
      </div>
    </div>
  );
}

