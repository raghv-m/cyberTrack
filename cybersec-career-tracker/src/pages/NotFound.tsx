import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Shield } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyber-purple/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-cyber-blue/10 border-2 border-cyber-blue/30 flex items-center justify-center">
              <Shield className="w-16 h-16 text-cyber-blue" />
            </div>
            <div className="absolute inset-0 rounded-full bg-cyber-blue/20 animate-ping"></div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-black text-transparent bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text mb-4">
          404
        </h1>

        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-[#1E2024]/60 backdrop-blur-xl border border-cyber-blue/30 text-white rounded-xl font-semibold hover:bg-[#1E2024]/80 hover:border-cyber-blue/50 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <button
            onClick={() => navigate('/app/dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-[#1E2024]/40 backdrop-blur-xl rounded-2xl border border-cyber-purple/20">
          <h3 className="text-lg font-semibold text-white mb-3">
            Looking for something specific?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <button
              onClick={() => navigate('/app/roadmap')}
              className="px-4 py-2 bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue rounded-lg hover:bg-cyber-blue/20 transition-colors"
            >
              Roadmap
            </button>
            <button
              onClick={() => navigate('/app/skills')}
              className="px-4 py-2 bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple rounded-lg hover:bg-cyber-purple/20 transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => navigate('/app/daily-log')}
              className="px-4 py-2 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green rounded-lg hover:bg-cyber-green/20 transition-colors"
            >
              Daily Log
            </button>
            <button
              onClick={() => navigate('/app/jobs')}
              className="px-4 py-2 bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold rounded-lg hover:bg-cyber-gold/20 transition-colors"
            >
              Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

