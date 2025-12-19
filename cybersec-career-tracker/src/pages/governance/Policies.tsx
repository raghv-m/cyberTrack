import { FileText, Lock, Shield, Key, Database, Wifi, Users, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function Policies() {
  const [selectedPolicy, setSelectedPolicy] = useState('information-security');

  const policies = [
    { id: 'information-security', name: 'Information Security Policy', icon: Shield },
    { id: 'acceptable-use', name: 'Acceptable Use Policy', icon: FileText },
    { id: 'access-control', name: 'Access Control Policy', icon: Lock },
    { id: 'data-classification', name: 'Data Classification Policy', icon: Database },
    { id: 'password-mfa', name: 'Password & MFA Policy', icon: Key },
    { id: 'encryption', name: 'Encryption & Key Management', icon: Lock },
    { id: 'remote-work', name: 'Remote Work & BYOD Policy', icon: Wifi },
    { id: 'vendor-risk', name: 'Vendor & Third-Party Risk', icon: Users },
    { id: 'logging-monitoring', name: 'Logging & Monitoring Policy', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <FileText className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Security Policies</h1>
            <p className="text-text-secondary mt-2">Enterprise Security Policy Framework - Full Policy Documents</p>
          </div>
        </div>

        {/* Policy Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-lg p-4 sticky top-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">Policy Library</h3>
              <div className="space-y-2">
                {policies.map((policy) => {
                  const Icon = policy.icon;
                  return (
                    <button
                      key={policy.id}
                      onClick={() => setSelectedPolicy(policy.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                        selectedPolicy === policy.id
                          ? 'bg-primary text-white'
                          : 'bg-tertiary text-text-secondary hover:bg-secondary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{policy.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:col-span-3">
            {selectedPolicy === 'information-security' && <InformationSecurityPolicy />}
            {selectedPolicy === 'acceptable-use' && <AcceptableUsePolicy />}
            {selectedPolicy === 'access-control' && <AccessControlPolicy />}
            {selectedPolicy === 'data-classification' && <DataClassificationPolicy />}
            {selectedPolicy === 'password-mfa' && <PasswordMFAPolicy />}
            {selectedPolicy === 'encryption' && <EncryptionPolicy />}
            {selectedPolicy === 'remote-work' && <RemoteWorkPolicy />}
            {selectedPolicy === 'vendor-risk' && <VendorRiskPolicy />}
            {selectedPolicy === 'logging-monitoring' && <LoggingMonitoringPolicy />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Information Security Policy Component
function InformationSecurityPolicy() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Information Security Policy</h2>
          <p className="text-sm text-text-secondary">Version 3.1 | Effective Date: January 1, 2024 | Owner: CISO</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">1. Purpose</h3>
          <p className="leading-relaxed">
            This Information Security Policy establishes the framework for protecting the confidentiality, integrity, and availability 
            of information assets owned or managed by the organization. It defines security responsibilities, acceptable use of systems, 
            and consequences for policy violations.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">2. Scope</h3>
          <p className="leading-relaxed mb-3">
            This policy applies to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>All employees, contractors, vendors, and third parties with access to organizational systems or data</li>
            <li>All information assets including hardware, software, data, networks, and facilities</li>
            <li>All environments: production, staging, development, and corporate IT</li>
            <li>Cloud services, SaaS applications, and on-premises infrastructure</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">3. Policy Statements</h3>
          
          <div className="space-y-4">
            <div className="bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">3.1 Security Governance</h4>
              <p className="text-sm">
                The Chief Information Security Officer (CISO) is responsible for the overall security program, including policy development, 
                risk management, compliance, and incident response. All business units must cooperate with security initiatives and report 
                security concerns immediately.
              </p>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">3.2 Risk Management</h4>
              <p className="text-sm">
                Security risks must be identified, assessed, and mitigated in accordance with the organization's risk appetite. 
                Annual risk assessments are mandatory. Risks that cannot be mitigated must be formally accepted by executive leadership.
              </p>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">3.3 Access Control</h4>
              <p className="text-sm">
                Access to systems and data is granted based on the principle of least privilege. Multi-factor authentication (MFA) is 
                required for all user accounts. Access reviews are conducted quarterly. Terminated employees' access must be revoked 
                within 1 hour of termination notification.
              </p>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">3.4 Data Protection</h4>
              <p className="text-sm">
                All data must be classified according to the Data Classification Policy. Sensitive data (PII, financial, health) must be 
                encrypted at rest and in transit using industry-standard algorithms (AES-256, TLS 1.3). Data retention and disposal 
                procedures must be followed.
              </p>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">3.5 Incident Response</h4>
              <p className="text-sm">
                All security incidents must be reported to the SOC within 15 minutes of discovery. The Incident Response Plan defines 
                roles, escalation procedures, and communication protocols. Post-incident reviews are mandatory for all P1 and P2 incidents.
              </p>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">3.6 Security Awareness</h4>
              <p className="text-sm">
                All employees must complete annual security awareness training. Phishing simulations are conducted quarterly. 
                Employees who fail phishing tests must complete remedial training.
              </p>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">3.7 Compliance</h4>
              <p className="text-sm">
                The organization maintains compliance with ISO 27001, SOC 2, PIPEDA, and other applicable regulations. 
                Internal audits are conducted quarterly. External audits are conducted annually.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">4. Enforcement</h3>
          <p className="leading-relaxed mb-3">
            Violations of this policy may result in:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>First Offense:</strong> Written warning and mandatory security training</li>
            <li><strong>Second Offense:</strong> Suspension of system access and formal disciplinary action</li>
            <li><strong>Severe Violations:</strong> Immediate termination and potential legal action</li>
          </ul>
          <p className="leading-relaxed mt-3">
            Severe violations include: unauthorized data exfiltration, intentional malware deployment, sabotage, or sharing credentials.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">5. Policy Review</h3>
          <p className="leading-relaxed">
            This policy is reviewed annually or after significant security incidents. The CISO is responsible for policy updates. 
            All policy changes require approval from the Security Steering Committee.
          </p>
        </section>

        <div className="bg-primary/50 p-4 rounded-lg mt-6">
          <p className="text-sm text-text-secondary">
            <strong>Approval:</strong> Jane Doe, CISO | <strong>Date:</strong> January 1, 2024 | <strong>Next Review:</strong> January 1, 2025
          </p>
        </div>
      </div>
    </div>
  );
}

// Acceptable Use Policy
function AcceptableUsePolicy() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Acceptable Use Policy (AUP)</h2>
          <p className="text-sm text-text-secondary">Version 2.3 | Effective Date: January 1, 2024 | Owner: CISO</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">1. Purpose</h3>
          <p className="leading-relaxed">
            This policy defines acceptable and unacceptable use of organizational IT resources, including computers, networks,
            email, internet access, and cloud services. The goal is to protect the organization from legal liability, security
            breaches, and reputational damage.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">2. Acceptable Use</h3>
          <p className="leading-relaxed mb-3">Users are authorized to use IT resources for:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Performing job duties and business-related activities</li>
            <li>Professional development and training</li>
            <li>Reasonable personal use during breaks (email, news, non-offensive content)</li>
            <li>Collaboration with colleagues and external partners</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">3. Prohibited Activities</h3>
          <div className="space-y-3">
            <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
              <h4 className="font-semibold text-text-primary mb-2">Strictly Prohibited:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Accessing, storing, or distributing illegal, offensive, or pornographic material</li>
                <li>Unauthorized access to systems, data, or networks (hacking)</li>
                <li>Installing unauthorized software or hardware</li>
                <li>Sharing passwords or credentials with others</li>
                <li>Bypassing security controls (VPN, firewalls, DLP)</li>
                <li>Using company resources for personal financial gain or side businesses</li>
                <li>Sending spam, phishing emails, or malicious content</li>
                <li>Downloading pirated software, movies, or music</li>
                <li>Cryptocurrency mining on company systems</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">4. Email and Communication</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Email is a business tool and may be monitored for security and compliance purposes</li>
            <li>Do not send confidential information via unencrypted email</li>
            <li>Use professional language; avoid offensive or discriminatory content</li>
            <li>Do not auto-forward company email to personal accounts</li>
            <li>Report suspicious emails to security@cybertrack.ca</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">5. Internet and Web Browsing</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Internet access is provided for business purposes; personal use should be minimal</li>
            <li>Accessing illegal, offensive, or high-risk websites is prohibited</li>
            <li>Web traffic is monitored and logged for security analysis</li>
            <li>Use of VPN or proxy services to bypass content filters is prohibited</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">6. Enforcement</h3>
          <p className="leading-relaxed">
            Violations will result in disciplinary action up to and including termination. The organization reserves the right to
            monitor, access, and disclose any information on company systems without prior notice.
          </p>
        </section>

        <div className="bg-primary/50 p-4 rounded-lg mt-6">
          <p className="text-sm text-text-secondary">
            <strong>Approval:</strong> Jane Doe, CISO | <strong>Date:</strong> January 1, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

// Access Control Policy
function AccessControlPolicy() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Access Control Policy</h2>
          <p className="text-sm text-text-secondary">Version 4.0 | Effective Date: January 1, 2024 | Owner: Director of Security Architecture</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">1. Purpose</h3>
          <p className="leading-relaxed">
            This policy establishes requirements for granting, managing, and revoking access to organizational systems and data.
            It ensures that only authorized individuals have access to resources necessary for their job functions.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">2. Principle of Least Privilege</h3>
          <p className="leading-relaxed mb-3">
            Users are granted the minimum level of access required to perform their job duties. Privileged access (admin, root, sudo)
            is restricted to authorized personnel and requires additional approval.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">3. Access Request and Approval</h3>
          <div className="bg-tertiary p-4 rounded-lg">
            <h4 className="font-semibold text-text-primary mb-2">Standard Access:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>Requested via IT ticketing system</li>
              <li>Approved by direct manager</li>
              <li>Provisioned within 24 hours</li>
            </ul>
          </div>
          <div className="bg-tertiary p-4 rounded-lg mt-3">
            <h4 className="font-semibold text-text-primary mb-2">Privileged Access:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>Requested via formal access request form</li>
              <li>Approved by manager + CISO or Director of Security</li>
              <li>Requires business justification</li>
              <li>Reviewed quarterly</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">4. Role-Based Access Control (RBAC)</h3>
          <p className="leading-relaxed mb-3">
            Access is assigned based on predefined roles aligned with job functions:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Employee:</strong> Email, collaboration tools, HR portal</li>
            <li><strong>Developer:</strong> Code repositories, CI/CD, staging environments</li>
            <li><strong>SOC Analyst:</strong> SIEM, EDR, threat intelligence platforms</li>
            <li><strong>System Administrator:</strong> Infrastructure management, privileged access</li>
            <li><strong>Executive:</strong> Business intelligence, financial systems</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">5. Access Reviews</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Quarterly access reviews for all users</li>
            <li>Monthly reviews for privileged accounts</li>
            <li>Managers certify that access is still required</li>
            <li>Unused accounts are disabled after 90 days of inactivity</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">6. Access Revocation</h3>
          <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
            <h4 className="font-semibold text-text-primary mb-2">Immediate Revocation Required:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>Employee termination: Access revoked within 1 hour</li>
              <li>Contractor end of engagement: Access revoked on last day</li>
              <li>Role change: Unnecessary access removed within 24 hours</li>
              <li>Security incident: Access suspended immediately pending investigation</li>
            </ul>
          </div>
        </section>

        <div className="bg-primary/50 p-4 rounded-lg mt-6">
          <p className="text-sm text-text-secondary">
            <strong>Approval:</strong> John Smith, Director of Security Architecture | <strong>Date:</strong> January 1, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

// Data Classification Policy
function DataClassificationPolicy() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Data Classification Policy</h2>
          <p className="text-sm text-text-secondary">Version 3.2 | Effective Date: January 1, 2024 | Owner: GRC Manager</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">1. Purpose</h3>
          <p className="leading-relaxed">
            This policy establishes a framework for classifying data based on sensitivity and criticality. Proper classification
            ensures that appropriate security controls are applied to protect data from unauthorized access, disclosure, or loss.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">2. Data Classification Levels</h3>

          <div className="space-y-4">
            <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
              <h4 className="font-semibold text-text-primary mb-2">🔴 RESTRICTED (Highest Sensitivity)</h4>
              <p className="text-sm mb-2"><strong>Definition:</strong> Data that, if disclosed, could cause severe harm to the organization, customers, or individuals.</p>
              <p className="text-sm mb-2"><strong>Examples:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Customer PII (names, emails, addresses, phone numbers)</li>
                <li>Payment card information (PCI DSS data)</li>
                <li>Health records (PIPEDA protected health information)</li>
                <li>Authentication credentials (passwords, API keys, tokens)</li>
                <li>Encryption keys and certificates</li>
              </ul>
              <p className="text-sm mt-2"><strong>Controls:</strong> AES-256 encryption at rest and TLS 1.3 in transit, MFA required, access logged and monitored, annual access reviews</p>
            </div>

            <div className="bg-warning/20 border-l-4 border-warning p-4 rounded">
              <h4 className="font-semibold text-text-primary mb-2">🟡 CONFIDENTIAL (High Sensitivity)</h4>
              <p className="text-sm mb-2"><strong>Definition:</strong> Data intended for internal use only; unauthorized disclosure could harm the organization.</p>
              <p className="text-sm mb-2"><strong>Examples:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Financial reports and budgets</li>
                <li>Strategic plans and roadmaps</li>
                <li>Employee performance reviews</li>
                <li>Vendor contracts and pricing</li>
                <li>Security architecture diagrams</li>
              </ul>
              <p className="text-sm mt-2"><strong>Controls:</strong> Encryption in transit, access restricted to authorized personnel, quarterly access reviews</p>
            </div>

            <div className="bg-blue-500/20 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold text-text-primary mb-2">🔵 INTERNAL (Moderate Sensitivity)</h4>
              <p className="text-sm mb-2"><strong>Definition:</strong> Data for internal use; disclosure would have minimal impact.</p>
              <p className="text-sm mb-2"><strong>Examples:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Internal policies and procedures</li>
                <li>Employee directory</li>
                <li>Meeting notes and presentations</li>
                <li>Non-sensitive project documentation</li>
              </ul>
              <p className="text-sm mt-2"><strong>Controls:</strong> Access restricted to employees, encryption in transit recommended</p>
            </div>

            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h4 className="font-semibold text-text-primary mb-2">🟢 PUBLIC (No Sensitivity)</h4>
              <p className="text-sm mb-2"><strong>Definition:</strong> Data intended for public disclosure; no harm from unauthorized access.</p>
              <p className="text-sm mb-2"><strong>Examples:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Marketing materials and press releases</li>
                <li>Public website content</li>
                <li>Published research and whitepapers</li>
              </ul>
              <p className="text-sm mt-2"><strong>Controls:</strong> No special controls required</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">3. Data Handling Requirements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-tertiary">
                  <th className="p-3 border border-border-color text-text-primary">Classification</th>
                  <th className="p-3 border border-border-color text-text-primary">Storage</th>
                  <th className="p-3 border border-border-color text-text-primary">Transmission</th>
                  <th className="p-3 border border-border-color text-text-primary">Disposal</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <td className="p-3 border border-border-color font-semibold">Restricted</td>
                  <td className="p-3 border border-border-color">Encrypted databases, access logged</td>
                  <td className="p-3 border border-border-color">TLS 1.3, encrypted email</td>
                  <td className="p-3 border border-border-color">Secure wipe (DoD 5220.22-M)</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color font-semibold">Confidential</td>
                  <td className="p-3 border border-border-color">Encrypted or access-controlled</td>
                  <td className="p-3 border border-border-color">TLS 1.2+</td>
                  <td className="p-3 border border-border-color">Secure deletion</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color font-semibold">Internal</td>
                  <td className="p-3 border border-border-color">Standard file systems</td>
                  <td className="p-3 border border-border-color">TLS recommended</td>
                  <td className="p-3 border border-border-color">Standard deletion</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color font-semibold">Public</td>
                  <td className="p-3 border border-border-color">No restrictions</td>
                  <td className="p-3 border border-border-color">No restrictions</td>
                  <td className="p-3 border border-border-color">Standard deletion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="bg-primary/50 p-4 rounded-lg mt-6">
          <p className="text-sm text-text-secondary">
            <strong>Approval:</strong> Sarah Johnson, GRC Manager | <strong>Date:</strong> January 1, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

// Password & MFA Policy
function PasswordMFAPolicy() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Key className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Password & Multi-Factor Authentication Policy</h2>
          <p className="text-sm text-text-secondary">Version 5.1 | Effective Date: January 1, 2024 | Owner: Director of Security Architecture</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">1. Purpose</h3>
          <p className="leading-relaxed">
            This policy establishes requirements for creating, managing, and protecting passwords and authentication credentials.
            Strong authentication is the first line of defense against unauthorized access.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">2. Password Requirements</h3>
          <div className="bg-tertiary p-4 rounded-lg">
            <h4 className="font-semibold text-text-primary mb-2">Minimum Password Standards:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm ml-4">
              <li><strong>Length:</strong> Minimum 12 characters (16+ recommended)</li>
              <li><strong>Complexity:</strong> Must include uppercase, lowercase, numbers, and special characters</li>
              <li><strong>Expiration:</strong> Passwords expire every 90 days (except for service accounts with MFA)</li>
              <li><strong>History:</strong> Cannot reuse last 10 passwords</li>
              <li><strong>Lockout:</strong> Account locked after 5 failed login attempts for 30 minutes</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">3. Multi-Factor Authentication (MFA)</h3>
          <div className="bg-success/20 border-l-4 border-success p-4 rounded">
            <h4 className="font-semibold text-text-primary mb-2">MFA is REQUIRED for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>All user accounts (no exceptions)</li>
              <li>VPN access</li>
              <li>Cloud service consoles (AWS, Azure, GCP)</li>
              <li>Administrative and privileged accounts</li>
              <li>Remote access to corporate systems</li>
            </ul>
          </div>
          <div className="bg-tertiary p-4 rounded-lg mt-3">
            <h4 className="font-semibold text-text-primary mb-2">Approved MFA Methods (in order of preference):</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
              <li>Hardware security keys (YubiKey, Titan)</li>
              <li>Authenticator apps (Google Authenticator, Microsoft Authenticator, Authy)</li>
              <li>Push notifications (Duo, Okta Verify)</li>
              <li>SMS codes (least preferred, only if no other option available)</li>
            </ol>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">4. Password Management</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use a password manager (1Password, LastPass, Bitwarden) for storing passwords</li>
            <li>Never share passwords via email, chat, or phone</li>
            <li>Never write passwords on paper or store in unencrypted files</li>
            <li>Use unique passwords for each system (no password reuse)</li>
            <li>Report compromised passwords immediately to IT Security</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">5. Service Account Passwords</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Minimum 32 characters, randomly generated</li>
            <li>Stored in enterprise password vault (HashiCorp Vault, CyberArk)</li>
            <li>Rotated every 180 days or after personnel changes</li>
            <li>Access logged and audited</li>
          </ul>
        </section>

        <div className="bg-primary/50 p-4 rounded-lg mt-6">
          <p className="text-sm text-text-secondary">
            <strong>Approval:</strong> John Smith, Director of Security Architecture | <strong>Date:</strong> January 1, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

// Encryption & Key Management Policy
function EncryptionPolicy() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Encryption & Key Management Policy</h2>
          <p className="text-sm text-text-secondary">Version 2.8 | Effective Date: January 1, 2024 | Owner: Director of Security Architecture</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">1. Purpose</h3>
          <p className="leading-relaxed">
            This policy establishes requirements for encrypting data at rest and in transit, and for managing cryptographic keys.
            Encryption protects data confidentiality and integrity in the event of unauthorized access or interception.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">2. Encryption at Rest</h3>
          <div className="bg-tertiary p-4 rounded-lg mb-3">
            <h4 className="font-semibold text-text-primary mb-2">Required for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>All databases containing Restricted or Confidential data</li>
              <li>Laptop and desktop hard drives (full disk encryption)</li>
              <li>Backup media and archives</li>
              <li>Cloud storage (S3, Azure Blob, Google Cloud Storage)</li>
              <li>Mobile devices (phones, tablets)</li>
            </ul>
          </div>
          <div className="bg-tertiary p-4 rounded-lg">
            <h4 className="font-semibold text-text-primary mb-2">Approved Algorithms:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li><strong>AES-256-GCM:</strong> Preferred for all new implementations</li>
              <li><strong>AES-256-CBC:</strong> Acceptable for legacy systems</li>
              <li><strong>ChaCha20-Poly1305:</strong> Acceptable for mobile and IoT devices</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">3. Encryption in Transit</h3>
          <div className="bg-tertiary p-4 rounded-lg mb-3">
            <h4 className="font-semibold text-text-primary mb-2">Required for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>All web traffic (HTTPS with TLS 1.3)</li>
              <li>API communications</li>
              <li>Database connections</li>
              <li>Email (TLS for SMTP, S/MIME for sensitive emails)</li>
              <li>File transfers (SFTP, FTPS, or HTTPS)</li>
              <li>VPN connections (IPsec or WireGuard)</li>
            </ul>
          </div>
          <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
            <h4 className="font-semibold text-text-primary mb-2">Prohibited:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>TLS 1.0 and TLS 1.1 (deprecated)</li>
              <li>SSL 2.0 and SSL 3.0 (insecure)</li>
              <li>Weak cipher suites (RC4, DES, 3DES, MD5)</li>
              <li>Unencrypted protocols (HTTP, FTP, Telnet)</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">4. Key Management</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Encryption keys must be stored separately from encrypted data</li>
            <li>Use Hardware Security Modules (HSMs) or cloud KMS (AWS KMS, Azure Key Vault) for key storage</li>
            <li>Keys must be rotated annually or after suspected compromise</li>
            <li>Key access is logged and audited</li>
            <li>Destroyed keys must be securely wiped and documented</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">5. Certificate Management</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use certificates from trusted Certificate Authorities (Let's Encrypt, DigiCert, GlobalSign)</li>
            <li>Minimum 2048-bit RSA or 256-bit ECC keys</li>
            <li>Certificates expire and renew automatically (90-day validity for Let's Encrypt)</li>
            <li>Monitor certificate expiration and alert 30 days before expiry</li>
          </ul>
        </section>

        <div className="bg-primary/50 p-4 rounded-lg mt-6">
          <p className="text-sm text-text-secondary">
            <strong>Approval:</strong> John Smith, Director of Security Architecture | <strong>Date:</strong> January 1, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

// Remote Work & BYOD Policy
function RemoteWorkPolicy() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Wifi className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Remote Work & BYOD Policy</h2>
          <p className="text-sm text-text-secondary">Version 3.5 | Effective Date: January 1, 2024 | Owner: CISO</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">1. Purpose</h3>
          <p className="leading-relaxed">
            This policy establishes security requirements for remote work and the use of personal devices (BYOD - Bring Your Own Device)
            to access organizational systems and data. Remote work introduces additional security risks that must be mitigated.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">2. Remote Work Requirements</h3>
          <div className="bg-tertiary p-4 rounded-lg mb-3">
            <h4 className="font-semibold text-text-primary mb-2">Mandatory Security Controls:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm ml-4">
              <li><strong>VPN:</strong> All remote access must use corporate VPN with MFA</li>
              <li><strong>Endpoint Security:</strong> Antivirus, EDR, and firewall must be enabled</li>
              <li><strong>Full Disk Encryption:</strong> Required on all laptops and desktops</li>
              <li><strong>Screen Lock:</strong> Auto-lock after 5 minutes of inactivity</li>
              <li><strong>Secure Wi-Fi:</strong> Use WPA3 or WPA2 encryption; avoid public Wi-Fi without VPN</li>
              <li><strong>Physical Security:</strong> Lock devices when unattended; do not leave in vehicles</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">3. BYOD (Bring Your Own Device) Policy</h3>
          <div className="bg-warning/20 border-l-4 border-warning p-4 rounded mb-3">
            <h4 className="font-semibold text-text-primary mb-2">Approved BYOD Use Cases:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>Email access via mobile device (with MDM enrollment)</li>
              <li>Calendar and contacts synchronization</li>
              <li>Collaboration tools (Slack, Teams, Zoom)</li>
              <li>Web-based applications (no local data storage)</li>
            </ul>
          </div>
          <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
            <h4 className="font-semibold text-text-primary mb-2">Prohibited on BYOD:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>Accessing or storing Restricted data (PII, financial, health)</li>
              <li>Connecting to production systems or databases</li>
              <li>Administrative or privileged access</li>
              <li>Downloading confidential documents to personal devices</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">4. Mobile Device Management (MDM)</h3>
          <p className="leading-relaxed mb-3">
            All BYOD devices accessing corporate email or data must be enrolled in MDM (Microsoft Intune, Jamf, VMware Workspace ONE).
          </p>
          <div className="bg-tertiary p-4 rounded-lg">
            <h4 className="font-semibold text-text-primary mb-2">MDM Enforces:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>Device encryption</li>
              <li>PIN/passcode requirements (minimum 6 digits)</li>
              <li>Remote wipe capability in case of loss or theft</li>
              <li>Prohibition of jailbroken/rooted devices</li>
              <li>Automatic OS and app updates</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">5. Lost or Stolen Devices</h3>
          <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
            <p className="font-semibold text-text-primary mb-2">Immediate Actions Required:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
              <li>Report loss/theft to IT Security immediately (security@cybertrack.ca)</li>
              <li>IT will remotely wipe the device within 1 hour</li>
              <li>Change all passwords accessed from the device</li>
              <li>File police report if device was stolen</li>
              <li>Complete incident report form</li>
            </ol>
          </div>
        </section>

        <div className="bg-primary/50 p-4 rounded-lg mt-6">
          <p className="text-sm text-text-secondary">
            <strong>Approval:</strong> Jane Doe, CISO | <strong>Date:</strong> January 1, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

// Vendor & Third-Party Risk Policy
function VendorRiskPolicy() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Vendor & Third-Party Risk Management Policy</h2>
          <p className="text-sm text-text-secondary">Version 2.4 | Effective Date: January 1, 2024 | Owner: GRC Manager</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">1. Purpose</h3>
          <p className="leading-relaxed">
            This policy establishes requirements for assessing and managing security risks associated with third-party vendors,
            suppliers, and service providers. Vendor breaches are a leading cause of data breaches and must be mitigated.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">2. Vendor Risk Classification</h3>
          <div className="space-y-3">
            <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
              <h4 className="font-semibold text-text-primary mb-2">Critical Vendors (High Risk)</h4>
              <p className="text-sm mb-2">Vendors with access to Restricted data or critical systems</p>
              <p className="text-sm"><strong>Examples:</strong> Cloud providers (AWS, Azure), payment processors, HR/payroll systems</p>
              <p className="text-sm mt-2"><strong>Assessment:</strong> Full security assessment, SOC 2 Type II required, annual reviews</p>
            </div>
            <div className="bg-warning/20 border-l-4 border-warning p-4 rounded">
              <h4 className="font-semibold text-text-primary mb-2">Important Vendors (Medium Risk)</h4>
              <p className="text-sm mb-2">Vendors with access to Confidential data or non-critical systems</p>
              <p className="text-sm"><strong>Examples:</strong> SaaS tools (Slack, Zoom), marketing platforms, analytics</p>
              <p className="text-sm mt-2"><strong>Assessment:</strong> Security questionnaire, ISO 27001 or SOC 2 preferred, biennial reviews</p>
            </div>
            <div className="bg-blue-500/20 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold text-text-primary mb-2">Low-Risk Vendors</h4>
              <p className="text-sm mb-2">Vendors with no access to organizational data or systems</p>
              <p className="text-sm"><strong>Examples:</strong> Office supplies, catering, facilities management</p>
              <p className="text-sm mt-2"><strong>Assessment:</strong> Standard contract review, no security assessment required</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">3. Vendor Security Assessment Process</h3>
          <div className="bg-tertiary p-4 rounded-lg">
            <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
              <li><strong>Pre-Engagement:</strong> Vendor completes security questionnaire (SIG, CAIQ, or custom)</li>
              <li><strong>Documentation Review:</strong> Request SOC 2, ISO 27001, PCI DSS, or HIPAA certifications</li>
              <li><strong>Risk Assessment:</strong> GRC team evaluates responses and assigns risk score</li>
              <li><strong>Contract Negotiation:</strong> Include security requirements, SLAs, breach notification, audit rights</li>
              <li><strong>Ongoing Monitoring:</strong> Annual reassessments, continuous monitoring of security posture</li>
            </ol>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">4. Vendor Contract Requirements</h3>
          <p className="leading-relaxed mb-3">All vendor contracts must include:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Data Protection:</strong> Vendor must encrypt data at rest and in transit</li>
            <li><strong>Access Control:</strong> Least privilege access, MFA required</li>
            <li><strong>Breach Notification:</strong> Vendor must notify within 24 hours of suspected breach</li>
            <li><strong>Audit Rights:</strong> Organization can audit vendor security controls annually</li>
            <li><strong>Data Deletion:</strong> Vendor must delete data within 30 days of contract termination</li>
            <li><strong>Subcontractors:</strong> Vendor must disclose and assess subcontractors</li>
            <li><strong>Compliance:</strong> Vendor must comply with PIPEDA, GDPR, and other applicable laws</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">5. Vendor Offboarding</h3>
          <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
            <p className="font-semibold text-text-primary mb-2">When terminating vendor relationship:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
              <li>Revoke all vendor access to systems and data</li>
              <li>Request data deletion certificate from vendor</li>
              <li>Retrieve or destroy all organizational data held by vendor</li>
              <li>Update asset inventory and access control lists</li>
              <li>Document lessons learned and update vendor risk register</li>
            </ol>
          </div>
        </section>

        <div className="bg-primary/50 p-4 rounded-lg mt-6">
          <p className="text-sm text-text-secondary">
            <strong>Approval:</strong> Sarah Johnson, GRC Manager | <strong>Date:</strong> January 1, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

// Logging & Monitoring Policy
function LoggingMonitoringPolicy() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Logging & Monitoring Policy</h2>
          <p className="text-sm text-text-secondary">Version 4.2 | Effective Date: January 1, 2024 | Owner: SOC Manager</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">1. Purpose</h3>
          <p className="leading-relaxed">
            This policy establishes requirements for logging security events, monitoring systems for anomalies, and retaining logs
            for forensic analysis. Comprehensive logging is essential for detecting, investigating, and responding to security incidents.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">2. Logging Requirements</h3>
          <div className="bg-tertiary p-4 rounded-lg mb-3">
            <h4 className="font-semibold text-text-primary mb-2">All systems must log the following events:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm ml-4">
              <li><strong>Authentication:</strong> Successful and failed login attempts, logouts, password changes</li>
              <li><strong>Authorization:</strong> Access granted/denied, privilege escalation, role changes</li>
              <li><strong>Data Access:</strong> Read, write, delete operations on Restricted/Confidential data</li>
              <li><strong>System Changes:</strong> Configuration changes, software installations, user account creation/deletion</li>
              <li><strong>Network Activity:</strong> Firewall blocks, IDS/IPS alerts, VPN connections</li>
              <li><strong>Security Events:</strong> Malware detections, vulnerability scans, security tool alerts</li>
            </ul>
          </div>
          <div className="bg-tertiary p-4 rounded-lg">
            <h4 className="font-semibold text-text-primary mb-2">Log Format Requirements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>Timestamp (UTC with millisecond precision)</li>
              <li>Source IP address and hostname</li>
              <li>User ID or service account</li>
              <li>Event type and severity level</li>
              <li>Outcome (success/failure)</li>
              <li>Detailed description of event</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">3. Log Retention</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-tertiary">
                  <th className="p-3 border border-border-color text-text-primary">Log Type</th>
                  <th className="p-3 border border-border-color text-text-primary">Retention Period</th>
                  <th className="p-3 border border-border-color text-text-primary">Storage Location</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <td className="p-3 border border-border-color">Security logs (SIEM)</td>
                  <td className="p-3 border border-border-color">1 year online, 7 years archive</td>
                  <td className="p-3 border border-border-color">SIEM + S3 Glacier</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color">Authentication logs</td>
                  <td className="p-3 border border-border-color">1 year</td>
                  <td className="p-3 border border-border-color">SIEM</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color">Application logs</td>
                  <td className="p-3 border border-border-color">90 days</td>
                  <td className="p-3 border border-border-color">CloudWatch / Azure Monitor</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color">Network logs (firewall, IDS)</td>
                  <td className="p-3 border border-border-color">6 months</td>
                  <td className="p-3 border border-border-color">SIEM</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color">Audit logs (compliance)</td>
                  <td className="p-3 border border-border-color">7 years</td>
                  <td className="p-3 border border-border-color">S3 Glacier (immutable)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">4. Security Monitoring</h3>
          <div className="bg-tertiary p-4 rounded-lg mb-3">
            <h4 className="font-semibold text-text-primary mb-2">24/7 SOC Monitoring:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>SIEM correlation rules for threat detection</li>
              <li>Real-time alerting for critical security events</li>
              <li>Automated response for known attack patterns</li>
              <li>Threat intelligence integration (MISP, STIX/TAXII)</li>
              <li>User and Entity Behavior Analytics (UEBA)</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">5. Log Protection</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Logs must be stored in tamper-proof, append-only storage</li>
            <li>Log access is restricted to SOC analysts and auditors</li>
            <li>Log integrity is verified using cryptographic hashes</li>
            <li>Logs are encrypted in transit and at rest</li>
            <li>Log deletion requires CISO approval and is documented</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">6. Alert Response SLAs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-tertiary">
                  <th className="p-3 border border-border-color text-text-primary">Severity</th>
                  <th className="p-3 border border-border-color text-text-primary">Response Time</th>
                  <th className="p-3 border border-border-color text-text-primary">Escalation</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <td className="p-3 border border-border-color"><span className="px-2 py-1 bg-danger text-white rounded text-xs">Critical</span></td>
                  <td className="p-3 border border-border-color">15 minutes</td>
                  <td className="p-3 border border-border-color">Immediate escalation to Tier 2 + SOC Manager</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color"><span className="px-2 py-1 bg-warning text-white rounded text-xs">High</span></td>
                  <td className="p-3 border border-border-color">1 hour</td>
                  <td className="p-3 border border-border-color">Escalate to Tier 2 if unresolved in 2 hours</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color"><span className="px-2 py-1 bg-yellow-500 text-white rounded text-xs">Medium</span></td>
                  <td className="p-3 border border-border-color">4 hours</td>
                  <td className="p-3 border border-border-color">Escalate if unresolved in 8 hours</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color"><span className="px-2 py-1 bg-blue-500 text-white rounded text-xs">Low</span></td>
                  <td className="p-3 border border-border-color">24 hours</td>
                  <td className="p-3 border border-border-color">No escalation required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="bg-primary/50 p-4 rounded-lg mt-6">
          <p className="text-sm text-text-secondary">
            <strong>Approval:</strong> Mike Chen, SOC Manager | <strong>Date:</strong> January 1, 2024
          </p>
        </div>
      </div>
    </div>
  );
}

