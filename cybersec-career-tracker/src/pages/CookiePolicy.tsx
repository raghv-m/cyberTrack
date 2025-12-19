import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cookie, ArrowLeft } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-secondary border-b border-border-color">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <Cookie className="text-primary" size={32} />
            <h1 className="text-3xl font-bold text-text-primary">Cookie Policy</h1>
          </div>
          <p className="text-text-secondary mt-2">Last Updated: December 17, 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="glass rounded-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Introduction</h2>
            <p className="text-text-secondary leading-relaxed">
              This Cookie Policy explains how CyberTrack ("we", "us", or "our") uses cookies and similar tracking technologies 
              when you visit our website and use our services. This policy should be read in conjunction with our{' '}
              <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and{' '}
              <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>.
            </p>
          </section>

          {/* What Are Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. What Are Cookies?</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remain on your device 
              until deleted or they expire).
            </p>
          </section>

          {/* Types of Cookies We Use */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <span className="px-3 py-1 bg-danger text-white rounded-full text-sm">Required</span>
                  Essential Cookies
                </h3>
                <p className="text-text-secondary mb-3">
                  These cookies are necessary for the website to function and cannot be disabled in our systems.
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2">
                  <li><strong>Authentication:</strong> Firebase Auth tokens to keep you logged in</li>
                  <li><strong>Security:</strong> CSRF tokens to prevent cross-site request forgery</li>
                  <li><strong>Session Management:</strong> Session identifiers for maintaining your session</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <span className="px-3 py-1 bg-warning text-white rounded-full text-sm">Functional</span>
                  Functional Cookies
                </h3>
                <p className="text-text-secondary mb-3">
                  These cookies enable enhanced functionality and personalization.
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2">
                  <li><strong>Preferences:</strong> Theme settings (dark/light mode), language preferences</li>
                  <li><strong>User Settings:</strong> Dashboard layout, notification preferences</li>
                  <li><strong>Local Storage:</strong> Cached data for offline functionality</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">Analytics</span>
                  Analytics Cookies
                </h3>
                <p className="text-text-secondary mb-3">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2">
                  <li><strong>Firebase Analytics:</strong> Usage statistics, feature adoption, error tracking</li>
                  <li><strong>Performance Monitoring:</strong> Page load times, API response times</li>
                  <li><strong>User Behavior:</strong> Navigation patterns, feature usage (anonymized)</li>
                </ul>
                <p className="text-text-secondary mt-3 text-sm italic">
                  Note: All analytics data is anonymized and aggregated. We do not track individual users.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Third-Party Cookies</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We use the following third-party services that may set cookies:
            </p>
            <div className="bg-secondary p-6 rounded-lg space-y-3">
              <div>
                <h4 className="font-semibold text-text-primary">Firebase (Google)</h4>
                <p className="text-text-secondary text-sm">Authentication, database, hosting, and analytics services</p>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                   className="text-primary text-sm hover:underline">
                  Google Privacy Policy →
                </a>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Managing Cookies</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              You can control and manage cookies in various ways:
            </p>
            <div className="space-y-4">
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-semibold text-text-primary mb-2">Browser Settings</h4>
                <p className="text-text-secondary text-sm">
                  Most browsers allow you to refuse or delete cookies. Please note that if you choose to block essential cookies, 
                  some parts of our website may not function properly.
                </p>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-semibold text-text-primary mb-2">Opt-Out Links</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" 
                          className="text-primary hover:underline">Google Analytics Opt-out</a></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-tertiary p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Contact Us</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="text-text-secondary space-y-2">
              <p><strong>Email:</strong> <a href="mailto:privacy@cybertrack.ca" className="text-primary hover:underline">privacy@cybertrack.ca</a></p>
              <p><strong>Address:</strong> Edmonton, Alberta, Canada</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border-color mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-text-secondary text-sm">
          <p>© 2025 CyberTrack. Made with ❤️ in Canada 🍁 by Raghav Mahajan</p>
        </div>
      </footer>
    </div>
  );
};

export default CookiePolicy;

