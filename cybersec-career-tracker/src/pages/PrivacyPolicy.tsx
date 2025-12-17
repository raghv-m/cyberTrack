import { Shield, Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Lock className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Privacy Policy</h1>
            <p className="text-text-secondary mt-2">Last Updated: December 17, 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-lg p-8 text-text-primary space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. Introduction</h2>
            <p className="text-text-secondary leading-relaxed">
              CyberTrack ("we," "our," "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-text-primary mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
              <li><strong>Account Information:</strong> Email, name, password (hashed)</li>
              <li><strong>Profile Data:</strong> Career goals, target roles, study preferences</li>
              <li><strong>Learning Data:</strong> Daily logs, topics learned, labs completed, hours studied</li>
              <li><strong>Incident Reports:</strong> Security investigations you submit</li>
              <li><strong>Portfolio Items:</strong> Projects, writeups, GitHub links</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-2">2.2 Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent</li>
              <li><strong>Device Information:</strong> Browser type, OS, IP address</li>
              <li><strong>Cookies:</strong> Session tokens, preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-2">2.3 Third-Party Data</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li><strong>Authentication:</strong> Google OAuth (if you sign in with Google)</li>
              <li><strong>Analytics:</strong> Firebase Analytics for usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. How We Use Your Information</h2>
            <p className="text-text-secondary leading-relaxed mb-3">We use your information to:</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Provide and maintain the Service</li>
              <li>Generate personalized learning roadmaps (AI curriculum)</li>
              <li>Send daily study reminders and progress updates</li>
              <li>Review and provide feedback on incident reports</li>
              <li>Improve our Service and develop new features</li>
              <li>Send important service notifications</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-success mb-2">4.1 We DO NOT Sell Your Data</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              We never sell your personal information to third parties.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-2">4.2 Service Providers</h3>
            <p className="text-text-secondary leading-relaxed mb-2">We may share data with:</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
              <li><strong>Firebase/Google Cloud:</strong> Hosting and database</li>
              <li><strong>Email Service:</strong> Email delivery</li>
              <li><strong>CDN:</strong> Content delivery and security</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-2">4.3 Legal Requirements</h3>
            <p className="text-text-secondary leading-relaxed mb-2">We may disclose data if required by law or to:</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Comply with legal processes</li>
              <li>Protect our rights and safety</li>
              <li>Prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. Data Security</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              We implement industry-standard security measures:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Encryption in transit (HTTPS/TLS)</li>
              <li>Encryption at rest (Firebase)</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-3">
              However, no system is 100% secure. Use strong passwords and enable MFA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. Data Retention</h2>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li><strong>Active Accounts:</strong> Data retained while account is active</li>
              <li><strong>Inactive Accounts:</strong> Data retained for 2 years, then deleted</li>
              <li><strong>Deleted Accounts:</strong> Data permanently deleted within 30 days</li>
              <li><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. Your Rights</h2>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li><strong>Access:</strong> You can export all your data in JSON format from Settings</li>
              <li><strong>Correction:</strong> Update your information anytime in Settings</li>
              <li><strong>Deletion:</strong> Delete your account and data from Settings</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails (link in emails)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. Cookies and Tracking</h2>
            <p className="text-text-secondary leading-relaxed mb-3">We use:</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for Service functionality</li>
              <li><strong>Analytics Cookies:</strong> Firebase Analytics (anonymized)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. Canadian Privacy Compliance (PIPEDA)</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              As a Canadian company, we comply with PIPEDA. You have the right to:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Challenge the accuracy and completeness of your information</li>
              <li>Withdraw consent (where applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. Contact Us</h2>
            <p className="text-text-secondary leading-relaxed mb-2">
              For privacy questions or to exercise your rights:
            </p>
            <ul className="list-none text-text-secondary space-y-1 ml-4">
              <li>Email: <a href="mailto:raaghvv0508@gmail.com" className="text-primary hover:underline">raaghvv0508@gmail.com</a></li>
              <li>Location: Edmonton, Alberta, Canada 🍁</li>
              <li>Response Time: Within 30 days</li>
            </ul>
          </section>

          <div className="bg-tertiary border-l-4 border-success p-4 rounded mt-8">
            <p className="text-text-primary">
              <strong>Last Review Date:</strong> December 17, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

