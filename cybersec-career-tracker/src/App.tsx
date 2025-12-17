import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import DailyLog from './pages/DailyLog'
import Roadmap from './pages/Roadmap'
import SkillsMatrix from './pages/SkillsMatrix'
import Notifications from './pages/Notifications'
import Portfolio from './pages/Portfolio'
import JobApplications from './pages/JobApplications'
import Settings from './pages/Settings'
import TodoList from './pages/TodoList'
import LearningPlatforms from './pages/LearningPlatforms'
import Resources from './pages/Resources'
import News from './pages/News'
import IncidentReports from './pages/IncidentReports'
import IncidentReportForm from './pages/IncidentReportForm'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LandingPage from './pages/LandingPage'
import Layout from './components/Layout'
import DailyPrompt from './components/DailyPrompt'

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
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
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

