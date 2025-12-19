import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/DashboardNew'
import Onboarding from './pages/Onboarding'
import DailyLog from './pages/DailyLog'
import Roadmap from './pages/Roadmap'
import SkillsMatrix from './pages/SkillsMatrix'
import Notifications from './pages/Notifications'
import Portfolio from './pages/Portfolio'
import JobApplications from './pages/JobApplications'
import Settings from './pages/Settings'
import EmailPreferences from './pages/EmailPreferences'
import TodoList from './pages/TodoList'
import LearningPlatforms from './pages/LearningPlatforms'
import Resources from './pages/Resources'
import News from './pages/NewsNew'
import IncidentReports from './pages/IncidentReports'
import IncidentReportForm from './pages/IncidentReportForm'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'
import LandingPage from './pages/LandingPage'
import Layout from './components/Layout'
import DailyPrompt from './components/DailyPrompt'
import SecurityGovernance from './pages/governance/SecurityGovernance'
import Compliance from './pages/governance/Compliance'
import Policies from './pages/governance/Policies'
import Procedures from './pages/governance/Procedures'
import IncidentResponsePage from './pages/governance/IncidentResponse'
import SOCOperations from './pages/governance/SOCOperations'
import DetectionMonitoring from './pages/governance/DetectionMonitoring'
import DataProtection from './pages/governance/DataProtection'
import CloudSecurity from './pages/governance/CloudSecurity'
import NotFound from './pages/NotFound'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  return !currentUser ? <>{children}</> : <Navigate to="/app/dashboard" />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Legal Pages (Public) */}
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />

      {/* Public routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/signup" element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
      } />

      {/* Private routes */}
      <Route path="/app" element={
        <PrivateRoute>
          <>
            <DailyPrompt />
            <Layout />
          </>
        </PrivateRoute>
      }>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="daily-log" element={<DailyLog />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="skills" element={<SkillsMatrix />} />
        <Route path="todos" element={<TodoList />} />
        <Route path="platforms" element={<LearningPlatforms />} />
        <Route path="resources" element={<Resources />} />
        <Route path="news" element={<News />} />
        <Route path="incident-reports" element={<IncidentReports />} />
        <Route path="incident-report-form" element={<IncidentReportForm />} />
        <Route path="incident-report/:id" element={<IncidentReports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="jobs" element={<JobApplications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="email-preferences" element={<EmailPreferences />} />

        {/* Governance & Compliance Routes */}
        <Route path="security-governance" element={<SecurityGovernance />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="policies" element={<Policies />} />
        <Route path="procedures" element={<Procedures />} />
        <Route path="incident-response" element={<IncidentResponsePage />} />
        <Route path="soc-operations" element={<SOCOperations />} />
        <Route path="detection-monitoring" element={<DetectionMonitoring />} />
        <Route path="data-protection" element={<DataProtection />} />
        <Route path="cloud-security" element={<CloudSecurity />} />
      </Route>

      {/* Catch all - 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App

