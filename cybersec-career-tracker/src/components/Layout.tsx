import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  BookOpen,
  Grid3x3,
  Bell,
  Briefcase,
  FolderGit2,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  CheckSquare,
  Globe,
  FileText,
  Newspaper,
  ShieldCheck,
  FileCheck,
  ScrollText,
  AlertTriangle,
  Activity,
  Database,
  Cloud,
  Award
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import EmailVerificationBanner from './EmailVerificationBanner';
import LegalAcceptanceModal from './LegalAcceptanceModal';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userData } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Daily Log', href: '/app/daily-log', icon: BookOpen },
    { name: "Today's Tasks", href: '/app/todos', icon: CheckSquare },
    { name: 'Roadmap', href: '/app/roadmap', icon: Target },
    { name: 'Skills Matrix', href: '/app/skills', icon: Grid3x3 },
    { name: 'Certifications', href: '/app/certifications', icon: Award },
    { name: 'Learning Platforms', href: '/app/platforms', icon: Globe },
    { name: 'Study Resources', href: '/app/resources', icon: FileText },
    { name: 'Cyber News', href: '/app/news', icon: Newspaper },
    { name: 'Incident Reports', href: '/app/incident-reports', icon: Shield },
    { name: 'Portfolio', href: '/app/portfolio', icon: FolderGit2 },
    { name: 'Job Tracker', href: '/app/jobs', icon: Briefcase },
    { name: 'Notifications', href: '/app/notifications', icon: Bell },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const governanceNavigation = [
    { name: 'Security Governance', href: '/app/security-governance', icon: ShieldCheck },
    { name: 'Compliance', href: '/app/compliance', icon: FileCheck },
    { name: 'Policies', href: '/app/policies', icon: ScrollText },
    { name: 'Procedures', href: '/app/procedures', icon: FileText },
    { name: 'Incident Response', href: '/app/incident-response', icon: AlertTriangle },
    { name: 'SOC Operations', href: '/app/soc-operations', icon: Shield },
    { name: 'Detection & Monitoring', href: '/app/detection-monitoring', icon: Activity },
    { name: 'Data Protection', href: '/app/data-protection', icon: Database },
    { name: 'Cloud Security', href: '/app/cloud-security', icon: Cloud },
  ];

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Futuristic Glassmorphic Cyberpunk */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 sm:w-72
        bg-[#0B0E11]/80 backdrop-blur-xl
        border-r border-cyber-blue/20
        shadow-[0_0_30px_rgba(0,163,255,0.1)]
        transform transition-all duration-500 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,163,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,163,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="flex flex-col h-full relative z-10">
          {/* Logo - Cyber HUD Style */}
          <div className="p-6 border-b border-cyber-blue/20 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <Shield className="w-8 h-8 sm:w-9 sm:h-9 text-cyber-blue drop-shadow-[0_0_8px_rgba(0,163,255,0.6)]" />
                  <div className="absolute inset-0 animate-ping opacity-20">
                    <Shield className="w-8 h-8 sm:w-9 sm:h-9 text-cyber-blue" />
                  </div>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black text-white tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    CYBER<span className="text-cyber-blue">TRACK</span>
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse"></div>
                    <span className="text-[8px] sm:text-[10px] text-cyber-green uppercase tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ONLINE
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-cyber-blue transition-colors touch-target"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Scanning line effect */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-scan-line"></div>
          </div>

          {/* Navigation - Cyber Grid Style */}
          <nav className="flex-1 p-3 sm:p-4 overflow-y-auto custom-scrollbar scrollbar-mobile">
            {/* Main Navigation */}
            <ul className="space-y-1.5">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name} className="relative">
                    {/* Status indicator */}
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-cyber-blue shadow-[0_0_8px_rgba(0,163,255,0.8)]' : 'bg-gray-600'
                    }`}></div>

                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        group relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg
                        transition-all duration-300 ease-out
                        border border-transparent
                        ${isActive
                          ? 'bg-cyber-blue/10 border-l-2 border-l-cyber-blue text-cyber-blue shadow-[0_0_20px_rgba(0,163,255,0.15)]'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white hover:border-l-2 hover:border-l-cyber-blue/50'
                        }
                      `}
                    >
                      {/* Icon with glow effect */}
                      <item.icon className={`w-5 h-5 transition-all duration-300 ${
                        isActive
                          ? 'drop-shadow-[0_0_6px_rgba(0,163,255,0.6)]'
                          : 'group-hover:drop-shadow-[0_0_4px_rgba(0,163,255,0.4)]'
                      }`} />

                      {/* Label with monospace font */}
                      <span className={`font-medium tracking-wide transition-all duration-300 ${
                        isActive ? 'font-semibold' : ''
                      }`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {item.name}
                      </span>

                      {/* Active indicator line */}
                      {isActive && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse"></div>
                        </div>
                      )}

                      {/* Hover shimmer effect */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Governance Section - Cyber Grid */}
            <div className="mt-6 pt-6 border-t border-cyber-blue/20 relative">
              {/* Section header with scanning effect */}
              <div className="relative px-4 mb-3">
                <h3 className="text-[10px] font-bold text-cyber-gold uppercase tracking-widest flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  <div className="w-2 h-2 bg-cyber-gold rounded-sm animate-pulse"></div>
                  GOVERNANCE & COMPLIANCE
                </h3>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyber-gold/50 via-cyber-gold/20 to-transparent"></div>
              </div>

              <ul className="space-y-1.5">
                {governanceNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name} className="relative">
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-cyber-gold shadow-[0_0_8px_rgba(255,184,0,0.8)]' : 'bg-gray-600'
                      }`}></div>

                      <Link
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          group relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg
                          transition-all duration-300 ease-out
                          border border-transparent
                          ${isActive
                            ? 'bg-cyber-gold/10 border-l-2 border-l-cyber-gold text-cyber-gold shadow-[0_0_20px_rgba(255,184,0,0.15)]'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white hover:border-l-2 hover:border-l-cyber-gold/50'
                          }
                        `}
                      >
                        <item.icon className={`w-4 h-4 transition-all duration-300 ${
                          isActive
                            ? 'drop-shadow-[0_0_6px_rgba(255,184,0,0.6)]'
                            : 'group-hover:drop-shadow-[0_0_4px_rgba(255,184,0,0.4)]'
                        }`} />

                        <span className={`text-xs font-medium tracking-wide transition-all duration-300 ${
                          isActive ? 'font-semibold' : ''
                        }`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {item.name}
                        </span>

                        {isActive && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyber-gold animate-pulse"></div>
                          </div>
                        )}

                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-gold/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* User ID Card - Bottom */}
          <div className="p-3 sm:p-4 border-t border-cyber-blue/20 relative">
            {/* Scanning line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-scan-line"></div>

            {/* User card */}
            <div className="bg-white/5 backdrop-blur-sm border border-cyber-blue/30 rounded-lg p-3 mb-3 relative overflow-hidden group hover:border-cyber-blue/50 transition-all duration-300">
              {/* Background grid */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `linear-gradient(rgba(0,163,255,0.3) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(0,163,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '10px 10px'
              }}></div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(0,163,255,0.4)]">
                    {userData?.displayName?.charAt(0) || 'U'}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-cyber-green rounded-full border-2 border-[#0B0E11] animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate tracking-wide" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {userData?.displayName || 'User'}
                  </p>
                  <p
                    className="text-[10px] text-gray-400 truncate"
                    title={userData?.email || ''}
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {userData?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="group flex items-center gap-3 px-4 py-3 w-full rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 transition-all duration-300 relative overflow-hidden"
            >
              <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-medium tracking-wide" style={{ fontFamily: 'JetBrains Mono, monospace' }}>LOGOUT</span>

              {/* Hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72 bg-bg-primary min-h-screen">
        {/* Mobile header - Cyberpunk style */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#0B0E11]/90 backdrop-blur-xl border-b border-cyber-blue/20 px-3 sm:px-4 py-2 sm:py-3 shadow-[0_0_20px_rgba(0,163,255,0.1)]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-cyber-blue hover:text-white transition-colors touch-target"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center gap-1 sm:gap-2">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-cyber-blue drop-shadow-[0_0_8px_rgba(0,163,255,0.6)]" />
              <span className="font-bold text-text-primary text-sm sm:text-base">CyberTrack</span>
            </div>
            <div className="w-5 sm:w-6" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Legal Acceptance Modal */}
        <LegalAcceptanceModal />

        {/* Email Verification Banner */}
        <EmailVerificationBanner />

        {/* Page content */}
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

