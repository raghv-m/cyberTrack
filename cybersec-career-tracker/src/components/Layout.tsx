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
  Newspaper
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userData } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Daily Log', href: '/app/daily-log', icon: BookOpen },
    { name: 'Todo List', href: '/app/todos', icon: CheckSquare },
    { name: 'Roadmap', href: '/app/roadmap', icon: Target },
    { name: 'Skills Matrix', href: '/app/skills', icon: Grid3x3 },
    { name: 'Learning Platforms', href: '/app/platforms', icon: Globe },
    { name: 'Study Resources', href: '/app/resources', icon: FileText },
    { name: 'Cyber News', href: '/app/news', icon: Newspaper },
    { name: 'Portfolio', href: '/app/portfolio', icon: FolderGit2 },
    { name: 'Job Tracker', href: '/app/jobs', icon: Briefcase },
    { name: 'Notifications', href: '/app/notifications', icon: Bell },
    { name: 'Settings', href: '/app/settings', icon: Settings },
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

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-bg-secondary border-r border-border-color
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border-color">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-text-primary">CyberTrack</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-text-tertiary hover:text-text-primary"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User info */}
          <div className="p-6 border-b border-border-color">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold">
                {userData?.displayName?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {userData?.displayName || 'User'}
                </p>
                <p className="text-xs text-text-tertiary truncate">
                  {userData?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth
                        ${isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border-color">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-text-secondary hover:bg-bg-tertiary hover:text-danger transition-smooth"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-bg-secondary border-b border-border-color px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-text-primary"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-text-primary">CyberTrack</span>
            </div>
            <div className="w-6" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

