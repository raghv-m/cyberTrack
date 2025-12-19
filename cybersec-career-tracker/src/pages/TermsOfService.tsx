import { FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <FileText className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Terms of Service</h1>
            <p className="text-text-secondary mt-2">Last Updated: December 17, 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-lg p-8 text-text-primary space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. Acceptance of Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              By accessing and using CyberTrack ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. Description of Service</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              CyberTrack is an AI-powered cybersecurity career tracking platform that provides:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Personalized learning roadmaps</li>
              <li>Progress tracking and analytics</li>
              <li>Daily study reminders</li>
              <li>Incident report submission and review</li>
              <li>Cybersecurity news aggregation</li>
              <li>Portfolio management tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-text-primary mb-2">3.1 Account Creation</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
              <li>You must provide accurate and complete information</li>
              <li>You must be at least 13 years old to use this Service</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-2">3.2 Account Responsibilities</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>You are responsible for all activities under your account</li>
              <li>You must notify us immediately of any unauthorized use</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. User Content</h2>
            <h3 className="text-xl font-semibold text-text-primary mb-2">4.1 Incident Reports</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
              <li>You retain ownership of incident reports you submit</li>
              <li>By submitting reports, you grant us a non-exclusive license to review, store, and display them</li>
              <li>Reports may be featured publicly if approved and marked as public by you</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-2">4.2 Content Standards</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Content must be accurate and not misleading</li>
              <li>Content must not violate any laws or third-party rights</li>
              <li>Content must not contain malicious code or scripts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. Privacy and Data Protection</h2>
            <p className="text-text-secondary leading-relaxed">
              We collect and use your data as described in our Privacy Policy. By using the Service, you consent to such processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. Email Communications</h2>
            <h3 className="text-xl font-semibold text-text-primary mb-2">6.1 Transactional Emails</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
              <li>We will send you account-related emails (welcome, verification, password reset)</li>
              <li>These cannot be opted out of as they're essential to the Service</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-2">6.2 Marketing and Reminders</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Daily study reminders (11:11 AM & 11:11 PM)</li>
              <li>Weekly progress summaries</li>
              <li>Feature announcements</li>
              <li>You can opt out of these at any time in Settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. Prohibited Uses</h2>
            <p className="text-text-secondary leading-relaxed mb-3">You may not use the Service to:</p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>Violate any laws or regulations</li>
              <li>Impersonate others or provide false information</li>
              <li>Upload malicious code or conduct security testing without permission</li>
              <li>Scrape or systematically collect data from the Service</li>
              <li>Interfere with the proper functioning of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DO NOT GUARANTEE THAT:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>The Service will be uninterrupted or error-free</li>
              <li>Any information provided is accurate or complete</li>
              <li>Using our roadmaps will guarantee employment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. Governing Law</h2>
            <p className="text-text-secondary leading-relaxed">
              These Terms shall be governed by the laws of Alberta, Canada, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. Contact Information</h2>
            <p className="text-text-secondary leading-relaxed">
              For questions about these Terms, contact us at:
            </p>
            <ul className="list-none text-text-secondary space-y-1 ml-4 mt-2">
              <li>Email: <a href="mailto:raaghvv0508@gmail.com" className="text-primary hover:underline">raaghvv0508@gmail.com</a></li>
              <li>Location: Edmonton, Alberta, Canada 🍁</li>
            </ul>
          </section>

          <div className="bg-tertiary border-l-4 border-primary p-4 rounded mt-8">
            <p className="text-text-primary font-semibold">
              By clicking "I Agree" or by using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

