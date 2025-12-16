import { Link } from 'react-router-dom';
import {
  Shield, Target, TrendingUp, Award, CheckCircle, Globe,
  BookOpen, Zap, Users, Lock, BarChart3, Bell, Github, Linkedin
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-lg border-b border-border-color">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-text-primary">
                Cyber<span className="text-primary">Track</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-6 py-2 text-text-primary hover:text-primary transition-smooth font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-smooth"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* SEO Meta Tags - Add to index.html */}
      {/*
        <title>CyberTrack - Professional Cybersecurity Career Tracker | Made in Canada</title>
        <meta name="description" content="Track your cybersecurity career journey with CyberTrack. Evidence-based learning, hands-on labs, skills matrix, and automated progress tracking. Built in Canada for aspiring security professionals." />
        <meta name="keywords" content="cybersecurity career tracker, security skills matrix, SOC analyst training, penetration testing tracker, cybersecurity learning platform, Canada cybersecurity, hands-on labs tracker" />
        <meta property="og:title" content="CyberTrack - Professional Cybersecurity Career Tracker" />
        <meta property="og:description" content="Evidence-based cybersecurity career tracking platform. Track labs, skills, certifications, and job applications in one place." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://cybertrack.app" />
      */}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="w-16 h-16 text-primary" />
              <h1 className="text-5xl lg:text-7xl font-bold text-text-primary">
                Cyber<span className="text-primary">Track</span>
              </h1>
            </div>

            <p className="text-xl lg:text-2xl text-text-secondary mb-4 max-w-3xl mx-auto">
              The Ultimate Cybersecurity Career Tracking Platform
            </p>

            <p className="text-lg text-text-tertiary mb-8 max-w-2xl mx-auto">
              Evidence-based learning • Hands-on enforcement • Skills matrix • Portfolio builder
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
              <Globe className="w-5 h-5 text-danger" />
              <span className="text-text-secondary font-semibold">🍁 Proudly Made in Canada</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-lg hover:opacity-90 transition-smooth shadow-lg"
              >
                Start Tracking Free
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-bg-secondary border-2 border-primary text-primary rounded-lg font-bold text-lg hover:bg-bg-tertiary transition-smooth"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-text-secondary">Evidence-Based</div>
            </div>
            <div className="glass rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">60/40</div>
              <div className="text-sm text-text-secondary">Hands-On Ratio</div>
            </div>
            <div className="glass rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">60+</div>
              <div className="text-sm text-text-secondary">Skills Tracked</div>
            </div>
            <div className="glass rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-danger mb-2">24/7</div>
              <div className="text-sm text-text-secondary">Progress Sync</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Escape Tutorial Hell
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Stop watching endless videos without building real skills. CyberTrack enforces hands-on practice
              and evidence-based learning to ensure you actually become job-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-lg p-8">
              <div className="w-12 h-12 bg-danger bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-danger" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Tutorial Hell</h3>
              <p className="text-text-secondary">
                Watching courses without doing labs? CyberTrack blocks progress until you submit evidence
                of hands-on work - screenshots, writeups, and proof of practice.
              </p>
            </div>

            <div className="glass rounded-lg p-8">
              <div className="w-12 h-12 bg-warning bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">No Progress Tracking</h3>
              <p className="text-text-secondary">
                Scattered notes across platforms? CyberTrack centralizes everything - daily logs, skills matrix,
                portfolio, certifications, and job applications in one dashboard.
              </p>
            </div>

            <div className="glass rounded-lg p-8">
              <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Unclear Path</h3>
              <p className="text-text-secondary">
                Don't know what to learn next? CyberTrack provides a visual roadmap with phase-by-phase curriculum,
                auto-generated todos, and readiness indicators for certifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-text-secondary">
              Built by cybersecurity professionals, for aspiring security experts
            </p>
          </div>




          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Daily Progress Logs</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Track theory vs hands-on hours with 60/40 enforcement. Submit lab screenshots,
                tool practice evidence, and writeups. Auto-blocks "tutorial hell" behavior.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-success bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-success" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Skills Matrix</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Track proficiency across 60+ cybersecurity skills in 6 categories: Networking, OS,
                Security, Tools, Programming, and Threat Analysis. Auto-updates from daily logs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-warning bg-opacity-20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-warning" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Visual Roadmap</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Phase-by-phase curriculum from beginner to expert. See current phase, locked phases,
                and progress gates. Know exactly what to learn next.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-danger bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-danger" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Portfolio Builder</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Auto-fetch README.md files from your GitHub projects. Track certifications,
                achievements, and build a professional cybersecurity portfolio.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Auto Todo Lists</h3>
              </div>
              <p className="text-text-secondary text-sm">
                AI-generated daily tasks based on your current curriculum phase. Auto-advances
                to next phase when all tasks completed. Never wonder what to do next.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Smart Notifications</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Email reminders every 4 hours (8 AM - 12 AM). Daily login prompts. Achievement
                notifications. Certification readiness alerts. Stay on track 24/7.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-success bg-opacity-20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-success" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Learning Resources</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Curated study materials organized by modules. 14+ learning platforms with direct links.
                Comprehensive beginner-to-expert curriculum with 125+ hours of content.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-warning bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-warning" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Job Tracker</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Track job applications, interviews, and offers. Link to your portfolio and skills matrix.
                Know when you're ready to apply for SOC, pentesting, or other security roles.
              </p>
            </div>

            {/* Feature 9 */}
            <div className="glass rounded-lg p-6 hover:bg-bg-secondary transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-danger bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-danger" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Evidence-Based Gates</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Progress gates require proof of hands-on work. Can't advance without screenshots,
                writeups, and evidence. Prevents fake progress and ensures real skill development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              How CyberTrack Works
            </h2>
            <p className="text-xl text-text-secondary">
              Simple, effective, evidence-based
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Sign Up Free</h3>
              <p className="text-text-secondary text-sm">
                Create your account and complete the onboarding wizard. Set your goals and start date.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Log Daily Progress</h3>
              <p className="text-text-secondary text-sm">
                Submit theory hours, hands-on labs, tool practice, and evidence. System validates 60/40 ratio.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Track Skills & Portfolio</h3>
              <p className="text-text-secondary text-sm">
                Skills matrix auto-updates. Portfolio builds from GitHub. Roadmap shows your progress.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                4
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Land Your Dream Job</h3>
              <p className="text-text-secondary text-sm">
                Get certified, build portfolio, track applications. Become job-ready with proof of skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Start Your Cybersecurity Journey Today
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join aspiring security professionals who are building real skills, not just watching tutorials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/signup"
              className="px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-xl hover:opacity-90 transition-smooth shadow-xl"
            >
              Get Started Free →
            </Link>
          </div>
          <p className="text-text-tertiary text-sm">
            🍁 Made with ❤️ in Canada • No credit card required • Start tracking in 2 minutes
          </p>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-16 bg-bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            About the Creator
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Built with passion by Raghav Mahajan, a cybersecurity enthusiast from Canada 🍁
          </p>

          <div className="glass rounded-lg p-8 mb-8">
            <p className="text-text-secondary mb-6">
              CyberTrack was created to solve the "tutorial hell" problem that many aspiring cybersecurity
              professionals face. This platform enforces evidence-based learning and ensures you build
              real, practical skills instead of just consuming endless theory.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.linkedin.com/in/raghav-mahajan-17611b24b"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[#0077b5] text-white rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center justify-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>

              <a
                href="https://github.com/raghv-m"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[#333] text-white rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                View GitHub Profile
              </a>
            </div>
          </div>

          <p className="text-text-tertiary text-sm">
            💡 Have feedback or suggestions? Connect with me on LinkedIn or GitHub!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-tertiary border-t border-border-color py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-text-primary">CyberTrack</span>
              </div>
              <p className="text-text-secondary text-sm">
                Professional cybersecurity career tracking platform. Evidence-based learning for aspiring security professionals.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-text-primary mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>Daily Progress Logs</li>
                <li>Skills Matrix</li>
                <li>Visual Roadmap</li>
                <li>Portfolio Builder</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-text-primary mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>Learning Platforms</li>
                <li>Study Materials</li>
                <li>Certification Guides</li>
                <li>Career Roadmaps</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-text-primary mb-4">About</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>🍁 Made in Canada</li>
                <li>Built for Security Pros</li>
                <li>Evidence-Based Learning</li>
                <li>100% Free to Start</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border-color pt-8 text-center text-text-tertiary text-sm">
            <p>© 2024 CyberTrack. Made with ❤️ in Canada 🍁</p>
            <p className="mt-2">Empowering the next generation of cybersecurity professionals</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
