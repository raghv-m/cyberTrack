import { Link } from 'react-router-dom';
import {
  Shield, Target, TrendingUp, Award, Zap, CheckCircle, ArrowRight,
  Code, BookOpen, Briefcase, Activity, BarChart3, Flame, Clock, Users
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#121417] relative overflow-hidden">
      {/* Technical Grid Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0, 240, 255, 1) 40px, rgba(0, 240, 255, 1) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0, 240, 255, 1) 40px, rgba(0, 240, 255, 1) 41px)
          `
        }}></div>
      </div>

      {/* Circuit Pattern Overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0">
        <svg className="w-full h-full">
          <defs>
            <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#00F0FF" />
              <circle cx="150" cy="50" r="2" fill="#00F0FF" />
              <circle cx="50" cy="150" r="2" fill="#00F0FF" />
              <circle cx="150" cy="150" r="2" fill="#00F0FF" />
              <line x1="50" y1="50" x2="150" y2="50" stroke="#00F0FF" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="50" y2="150" stroke="#00F0FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Glowing Orbs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-cyber-blue/10 rounded-full blur-[120px] animate-neon-pulse"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-cyber-gold/10 rounded-full blur-[120px] animate-neon-pulse" style={{ animationDelay: '1.5s' }}></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#121417]/80 backdrop-blur-xl border-b border-cyber-blue/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-cyber-blue" />
              <span className="text-2xl font-bold text-white">
                Cyber<span className="text-cyber-blue">Track</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-6 py-2 text-white hover:text-cyber-blue transition-colors font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn-gold px-6 py-2 font-semibold"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: Hero Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <Zap className="w-4 h-4 text-cyber-blue animate-pulse" />
              <span className="text-sm font-medium text-cyber-blue">AI-Powered Career Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-white">Break into</span>
              <br />
              <span className="text-gradient-blue">Cybersecurity</span>
              <br />
              <span className="text-white">with Confidence</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl text-[#A0A0A8] leading-relaxed max-w-xl">
              Your personal roadmap from zero to hired. Track skills, labs, certs, and job apps—all in one sleek, hacker-noir dashboard.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="btn-gold px-8 py-4 text-lg font-semibold flex items-center gap-2 group"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              >
                Sign In
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple border-2 border-[#121417]"></div>
                  ))}
                </div>
                <span className="text-sm text-[#A0A0A8]">500+ aspiring hackers</span>
              </div>
              <div className="h-6 w-px bg-[#A0A0A8]/20"></div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-cyber-gold" />
                <span className="text-sm text-[#A0A0A8]">7-day avg streak</span>
              </div>
            </div>
          </div>

          {/* Right: 3D Isometric Dashboard Mockup */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Floating Card Stack */}
            <div className="relative" style={{ perspective: '1000px' }}>
              {/* Card 3 (Back) */}
              <div
                className="absolute top-8 left-8 w-full h-[500px] bg-[#1E2024]/80 backdrop-blur-xl rounded-2xl border border-cyber-purple/30 shadow-[0_0_40px_rgba(179,102,255,0.2)]"
                style={{ transform: 'rotateY(-5deg) rotateX(5deg) scale(0.95)' }}
              ></div>

              {/* Card 2 (Middle) */}
              <div
                className="absolute top-4 left-4 w-full h-[500px] bg-[#1E2024]/90 backdrop-blur-xl rounded-2xl border border-cyber-gold/30 shadow-[0_0_40px_rgba(255,184,0,0.2)]"
                style={{ transform: 'rotateY(3deg) rotateX(-3deg) scale(0.97)' }}
              ></div>

              {/* Card 1 (Front - Main Dashboard) */}
              <div className="relative w-full h-[500px] bg-[#1E2024]/95 backdrop-blur-xl rounded-2xl border-2 border-cyber-blue/40 shadow-[0_0_60px_rgba(0,240,255,0.3)] p-6 overflow-hidden">
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyber-blue/20 via-transparent to-cyber-gold/20 pointer-events-none"></div>

                {/* Mock Dashboard Content */}
                <div className="relative z-10 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-6 h-6 text-cyber-blue" />
                      <span className="text-lg font-bold text-white">Career Health</span>
                    </div>
                    <div className="text-3xl font-black text-gradient-gold">75%</div>
                  </div>

                  {/* Progress Ring */}
                  <div className="flex justify-center py-6">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="8" fill="none" />
                        <circle
                          cx="64" cy="64" r="60"
                          stroke="url(#neon-gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray="377"
                          strokeDashoffset="94"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))' }}
                        />
                        <defs>
                          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00F0FF" />
                            <stop offset="100%" stopColor="#FFB800" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-cyber-blue">12</div>
                      <div className="text-xs text-[#A0A0A8]">Labs Done</div>
                    </div>
                    <div className="bg-cyber-gold/10 border border-cyber-gold/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-cyber-gold">15h</div>
                      <div className="text-xs text-[#A0A0A8]">Practice</div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3 pt-4">
                    {[
                      { label: 'Network Security', progress: 80, color: 'cyber-blue' },
                      { label: 'Incident Response', progress: 60, color: 'cyber-purple' },
                      { label: 'Malware Analysis', progress: 40, color: 'cyber-gold' }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-white font-medium">{item.label}</span>
                          <span className="text-[#A0A0A8]">{item.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-${item.color} to-${item.color}/60 rounded-full`}
                            style={{
                              width: `${item.progress}%`,
                              boxShadow: `0 0 10px rgba(0, 240, 255, 0.5)`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass p-6 text-center hover:scale-105 transition-all duration-200">
              <div className="text-4xl font-bold text-gradient-blue mb-2">100%</div>
              <div className="text-sm text-[#A0A0A8] uppercase tracking-wide">Evidence-Based</div>
            </div>
            <div className="glass p-6 text-center hover:scale-105 transition-all duration-200">
              <div className="text-4xl font-bold text-gradient-gold mb-2">60/40</div>
              <div className="text-sm text-[#A0A0A8] uppercase tracking-wide">Hands-On Ratio</div>
            </div>
            <div className="glass p-6 text-center hover:scale-105 transition-all duration-200">
              <div className="text-4xl font-bold text-cyber-purple mb-2">60+</div>
              <div className="text-sm text-[#A0A0A8] uppercase tracking-wide">Skills Tracked</div>
            </div>
            <div className="glass p-6 text-center hover:scale-105 transition-all duration-200">
              <div className="text-4xl font-bold text-cyber-green mb-2">24/7</div>
              <div className="text-sm text-[#A0A0A8] uppercase tracking-wide">Progress Sync</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-gold/10 border border-cyber-gold/30">
              <Target className="w-4 h-4 text-cyber-gold" />
              <span className="text-sm font-medium text-cyber-gold uppercase tracking-wide">How It Works</span>
            </div>
            <h2 className="text-5xl font-black text-white">
              Your Career Journey, <span className="text-gradient-blue">Simplified</span>
            </h2>
            <p className="text-xl text-[#A0A0A8] max-w-3xl mx-auto">
              Three steps to go from zero to cybersecurity professional
            </p>
          </div>

          {/* Flow Cards with Arrows */}
          <div className="relative grid md:grid-cols-3 gap-8">
            {/* Arrow 1 */}
            <div className="hidden md:block absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-0">
              <ArrowRight className="w-12 h-12 text-cyber-blue/30" />
            </div>
            {/* Arrow 2 */}
            <div className="hidden md:block absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-0">
              <ArrowRight className="w-12 h-12 text-cyber-gold/30" />
            </div>

            {/* Step 1 */}
            <div className="relative z-10 bg-[#1E2024]/60 backdrop-blur-xl rounded-2xl p-8 border border-cyber-blue/30 shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:shadow-[0_0_50px_rgba(0,240,255,0.25)] hover:scale-105 transition-all duration-300 group">
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyber-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-cyber-blue/20 flex items-center justify-center border border-cyber-blue/40 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  <Target className="w-8 h-8 text-cyber-blue" />
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/30">
                  <span className="text-xs font-bold text-cyber-blue uppercase tracking-wide">Step 1</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white">Set Your Target</h3>

                {/* Description */}
                <p className="text-[#A0A0A8] leading-relaxed">
                  Choose your dream role (SOC Analyst, Pentester, etc.). We generate a personalized roadmap with skills, certs, and labs.
                </p>

                {/* Progress Bar */}
                <div className="pt-4">
                  <div className="w-full h-2 bg-cyber-blue/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full animate-shimmer"
                      style={{
                        width: '100%',
                        boxShadow: '0 0 10px rgba(0, 240, 255, 0.6)'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Pill Badge */}
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyber-blue/5 border border-cyber-blue/20">
                  <Zap className="w-3 h-3 text-cyber-blue" />
                  <span className="text-xs text-cyber-blue font-semibold">AI Powered</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 bg-[#1E2024]/60 backdrop-blur-xl rounded-2xl p-8 border border-cyber-purple/30 shadow-[0_0_30px_rgba(179,102,255,0.15)] hover:shadow-[0_0_50px_rgba(179,102,255,0.25)] hover:scale-105 transition-all duration-300 group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyber-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-cyber-purple/20 flex items-center justify-center border border-cyber-purple/40 shadow-[0_0_20px_rgba(179,102,255,0.3)]">
                  <Code className="w-8 h-8 text-cyber-purple" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30">
                  <span className="text-xs font-bold text-cyber-purple uppercase tracking-wide">Step 2</span>
                </div>

                <h3 className="text-2xl font-bold text-white">Track Your Progress</h3>

                <p className="text-[#A0A0A8] leading-relaxed">
                  Log daily practice, complete labs, earn certs. Our dashboard shows exactly where you stand and what's next.
                </p>

                <div className="pt-4">
                  <div className="w-full h-2 bg-cyber-purple/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full animate-shimmer"
                      style={{
                        width: '75%',
                        boxShadow: '0 0 10px rgba(179, 102, 255, 0.6)'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyber-purple/5 border border-cyber-purple/20">
                  <Activity className="w-3 h-3 text-cyber-purple" />
                  <span className="text-xs text-cyber-purple font-semibold">Tracked</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 bg-[#1E2024]/60 backdrop-blur-xl rounded-2xl p-8 border border-cyber-gold/30 shadow-[0_0_30px_rgba(255,184,0,0.15)] hover:shadow-[0_0_50px_rgba(255,184,0,0.25)] hover:scale-105 transition-all duration-300 group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyber-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-cyber-gold/20 flex items-center justify-center border border-cyber-gold/40 shadow-[0_0_20px_rgba(255,184,0,0.3)]">
                  <Award className="w-8 h-8 text-cyber-gold" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-gold/10 border border-cyber-gold/30">
                  <span className="text-xs font-bold text-cyber-gold uppercase tracking-wide">Step 3</span>
                </div>

                <h3 className="text-2xl font-bold text-white">Land the Job</h3>

                <p className="text-[#A0A0A8] leading-relaxed">
                  Export your portfolio, track applications, and showcase your hands-on skills to employers. Get hired with confidence.
                </p>

                <div className="pt-4">
                  <div className="w-full h-2 bg-cyber-gold/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyber-gold to-yellow-400 rounded-full animate-shimmer"
                      style={{
                        width: '50%',
                        boxShadow: '0 0 10px rgba(255, 184, 0, 0.6)'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyber-gold/5 border border-cyber-gold/20">
                  <Briefcase className="w-3 h-3 text-cyber-gold" />
                  <span className="text-xs text-cyber-gold font-semibold">Career Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="relative z-10 py-20 px-6 bg-[#1E2024]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black text-white">
              Built for <span className="text-gradient-gold">Aspiring Hackers</span>
            </h2>
            <p className="text-xl text-[#A0A0A8] max-w-3xl mx-auto">
              Whether you're starting from scratch or leveling up, CyberTrack adapts to your journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-cyber-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Complete Beginners</h3>
              <p className="text-[#A0A0A8]">
                Start from zero with guided roadmaps and structured learning paths
              </p>
            </div>

            <div className="glass p-8 hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 bg-cyber-purple/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-cyber-purple" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Career Switchers</h3>
              <p className="text-[#A0A0A8]">
                Transition from IT or other fields with targeted skill development
              </p>
            </div>

            <div className="glass p-8 hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 bg-cyber-gold/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-cyber-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Self-Learners</h3>
              <p className="text-[#A0A0A8]">
                Stay organized and motivated with progress tracking and accountability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-6xl font-black text-white">
            Ready to <span className="text-gradient-blue">Level Up?</span>
          </h2>
          <p className="text-2xl text-[#A0A0A8]">
            Join 500+ aspiring hackers building real cybersecurity careers
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/signup"
              className="btn-gold px-10 py-5 text-xl font-bold flex items-center gap-2 group"
            >
              Start Free Today
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <p className="text-sm text-[#A0A0A8]">
            No credit card required • 🍁 Made in Canada
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-cyber-blue/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyber-blue" />
                <span className="text-xl font-bold text-white">CyberTrack</span>
              </div>
              <p className="text-sm text-[#A0A0A8]">
                Your path into cybersecurity, step by step.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Product</h4>
              <div className="space-y-2">
                <Link to="/roadmap" className="block text-sm text-[#A0A0A8] hover:text-cyber-blue transition-colors">Roadmap</Link>
                <Link to="/changelog" className="block text-sm text-[#A0A0A8] hover:text-cyber-blue transition-colors">Changelog</Link>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Company</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-sm text-[#A0A0A8] hover:text-cyber-blue transition-colors">About</Link>
                <Link to="/contact" className="block text-sm text-[#A0A0A8] hover:text-cyber-blue transition-colors">Contact</Link>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Legal</h4>
              <div className="space-y-2">
                <Link to="/privacy" className="block text-sm text-[#A0A0A8] hover:text-cyber-blue transition-colors">Privacy</Link>
                <Link to="/terms" className="block text-sm text-[#A0A0A8] hover:text-cyber-blue transition-colors">Terms</Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-cyber-blue/10 text-center">
            <p className="text-sm text-[#A0A0A8]">
              © 2024 CyberTrack. Made with ❤️ in Canada 🍁 by Raghav Mahajan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
