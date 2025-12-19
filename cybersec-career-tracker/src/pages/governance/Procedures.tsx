import { ClipboardList, UserPlus, UserMinus, Search, Shield, RefreshCw, GitBranch } from 'lucide-react';
import { useState } from 'react';

export default function Procedures() {
  const [selectedProcedure, setSelectedProcedure] = useState('user-onboarding');

  const procedures = [
    { id: 'user-onboarding', name: 'User Access Onboarding', icon: UserPlus },
    { id: 'user-offboarding', name: 'User Access Offboarding', icon: UserMinus },
    { id: 'log-collection', name: 'Log Collection & Correlation', icon: ClipboardList },
    { id: 'alert-triage', name: 'Alert Triage Process', icon: Search },
    { id: 'incident-investigation', name: 'Incident Investigation Protocol', icon: Shield },
    { id: 'vulnerability-remediation', name: 'Vulnerability Remediation', icon: RefreshCw },
    { id: 'patch-management', name: 'Patch Management Workflow', icon: RefreshCw },
    { id: 'change-control', name: 'Change Control Process', icon: GitBranch },
  ];

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <ClipboardList className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Security Procedures & Protocols</h1>
            <p className="text-text-secondary mt-2">Step-by-Step Operational Procedures for Security Operations</p>
          </div>
        </div>

        {/* Procedure Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-lg p-4 sticky top-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">Procedure Library</h3>
              <div className="space-y-2">
                {procedures.map((procedure) => {
                  const Icon = procedure.icon;
                  return (
                    <button
                      key={procedure.id}
                      onClick={() => setSelectedProcedure(procedure.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                        selectedProcedure === procedure.id
                          ? 'bg-primary text-white'
                          : 'bg-tertiary text-text-secondary hover:bg-secondary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{procedure.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Procedure Content */}
          <div className="lg:col-span-3">
            {selectedProcedure === 'user-onboarding' && <UserOnboardingProcedure />}
            {selectedProcedure === 'user-offboarding' && <UserOffboardingProcedure />}
            {selectedProcedure === 'log-collection' && <LogCollectionProcedure />}
            {selectedProcedure === 'alert-triage' && <AlertTriageProcedure />}
            {selectedProcedure === 'incident-investigation' && <IncidentInvestigationProcedure />}
            {selectedProcedure === 'vulnerability-remediation' && <VulnerabilityRemediationProcedure />}
            {selectedProcedure === 'patch-management' && <PatchManagementProcedure />}
            {selectedProcedure === 'change-control' && <ChangeControlProcedure />}
          </div>
        </div>
      </div>
    </div>
  );
}

// User Onboarding Procedure
function UserOnboardingProcedure() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <UserPlus className="w-8 h-8 text-success" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">User Access Onboarding Procedure</h2>
          <p className="text-sm text-text-secondary">SOP-IAM-001 | Version 2.1 | Owner: IT Operations</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Purpose</h3>
          <p className="leading-relaxed">
            This procedure defines the steps for provisioning access to new employees, contractors, and third parties. 
            Proper onboarding ensures users have the access they need while maintaining security and compliance.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Prerequisites</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>HR has completed background check and employment verification</li>
            <li>Manager has submitted access request ticket with business justification</li>
            <li>User's role and department are documented in HRIS</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Procedure Steps</h3>
          
          <div className="space-y-4">
            <div className="bg-tertiary p-4 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold text-text-primary mb-2">Step 1: Create User Account (IT Operations)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Verify access request ticket is approved by manager</li>
                <li>Create Active Directory / Azure AD account with naming convention: firstname.lastname@cybertrack.ca</li>
                <li>Assign user to appropriate security groups based on role (see RBAC matrix)</li>
                <li>Generate temporary password (16 characters, random)</li>
                <li>Enable MFA enrollment requirement</li>
                <li>Set password expiration to 90 days</li>
                <li>Document account creation in ticketing system</li>
              </ol>
            </div>

            <div className="bg-tertiary p-4 rounded-lg border-l-4 border-secondary">
              <h4 className="font-semibold text-text-primary mb-2">Step 2: Provision Email and Collaboration Tools (IT Operations)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Create Microsoft 365 mailbox (50 GB quota for standard users)</li>
                <li>Add user to appropriate Teams channels and SharePoint sites</li>
                <li>Provision Slack account and add to relevant channels</li>
                <li>Grant access to Zoom for video conferencing</li>
                <li>Configure email signature with company branding</li>
              </ol>
            </div>

            <div className="bg-tertiary p-4 rounded-lg border-l-4 border-success">
              <h4 className="font-semibold text-text-primary mb-2">Step 3: Provision Application Access (IT Operations)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Review role-based access requirements from access request</li>
                <li>Grant access to SaaS applications via SSO (Okta/Azure AD)</li>
                <li>For developers: Grant access to GitHub, AWS/Azure, CI/CD tools</li>
                <li>For SOC analysts: Grant access to SIEM, EDR, threat intelligence platforms</li>
                <li>For finance: Grant access to accounting and ERP systems</li>
                <li>Document all access grants in access control spreadsheet</li>
              </ol>
            </div>

            <div className="bg-tertiary p-4 rounded-lg border-l-4 border-warning">
              <h4 className="font-semibold text-text-primary mb-2">Step 4: Hardware Provisioning (IT Operations)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Issue laptop (MacBook Pro or Dell Latitude) with asset tag</li>
                <li>Install standard software image with security tools (EDR, VPN, encryption)</li>
                <li>Configure full disk encryption (FileVault or BitLocker)</li>
                <li>Enroll device in MDM (Jamf or Intune)</li>
                <li>Provide YubiKey for MFA (hardware security key)</li>
                <li>Document asset assignment in CMDB</li>
              </ol>
            </div>

            <div className="bg-tertiary p-4 rounded-lg border-l-4 border-danger">
              <h4 className="font-semibold text-text-primary mb-2">Step 5: Security Training (Security Team)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Enroll user in security awareness training platform (KnowBe4)</li>
                <li>Assign mandatory training modules (phishing, password security, data protection)</li>
                <li>Schedule live security orientation session (30 minutes)</li>
                <li>Provide security policy acknowledgment form for signature</li>
                <li>Track training completion in LMS</li>
              </ol>
            </div>

            <div className="bg-tertiary p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-text-primary mb-2">Step 6: Welcome Email and Documentation (IT Operations)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Send welcome email with temporary password (via secure channel)</li>
                <li>Include links to IT knowledge base and support portal</li>
                <li>Provide VPN setup instructions and credentials</li>
                <li>Share employee handbook and security policies</li>
                <li>Schedule IT onboarding call for first day</li>
              </ol>
            </div>

            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h4 className="font-semibold text-text-primary mb-2">Step 7: Verification and Closeout (IT Operations)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Verify user can log in successfully</li>
                <li>Confirm MFA is enrolled and working</li>
                <li>Test access to all provisioned applications</li>
                <li>Update access request ticket with completion notes</li>
                <li>Close ticket and notify manager</li>
              </ol>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">SLA</h3>
          <div className="bg-tertiary p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Standard Onboarding:</strong> Complete within 24 hours of request approval</li>
              <li><strong>Expedited Onboarding:</strong> Complete within 4 hours (requires VP approval)</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Roles & Responsibilities</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Manager:</strong> Submit access request with business justification</li>
            <li><strong>IT Operations:</strong> Provision accounts, hardware, and applications</li>
            <li><strong>Security Team:</strong> Enroll in training and verify compliance</li>
            <li><strong>HR:</strong> Coordinate onboarding timeline and background checks</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

// User Offboarding Procedure
function UserOffboardingProcedure() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <UserMinus className="w-8 h-8 text-danger" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">User Access Offboarding Procedure</h2>
          <p className="text-sm text-text-secondary">SOP-IAM-002 | Version 2.0 | Owner: IT Operations</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Purpose</h3>
          <p className="leading-relaxed">
            This procedure ensures secure and complete removal of access when employees, contractors, or third parties leave the organization.
            Proper offboarding prevents unauthorized access and protects company data.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Procedure Steps</h3>

          <div className="space-y-4">
            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-danger">
              <h4 className="font-semibold text-text-primary mb-2">Step 1: Immediate Access Revocation (Within 1 Hour of Termination)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Disable Active Directory / Azure AD account immediately</li>
                <li>Revoke all VPN and remote access credentials</li>
                <li>Disable email account (forward to manager for 30 days)</li>
                <li>Revoke access to all SaaS applications via SSO</li>
                <li>Disable MFA tokens and hardware keys</li>
                <li>Revoke API keys and service accounts owned by user</li>
              </ol>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-warning">
              <h4 className="font-semibold text-text-primary mb-2">Step 2: Physical Asset Collection (Within 24 Hours)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Collect laptop, desktop, monitors, and peripherals</li>
                <li>Retrieve access badges, key cards, and building keys</li>
                <li>Collect mobile devices (phones, tablets)</li>
                <li>Retrieve hardware security keys (YubiKey, etc.)</li>
                <li>Document all collected assets in asset management system</li>
              </ol>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold text-text-primary mb-2">Step 3: Data Backup & Transfer (Within 3 Days)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Backup user's email to PST file (store for 1 year)</li>
                <li>Transfer ownership of Google Drive / OneDrive files to manager</li>
                <li>Transfer ownership of shared documents and folders</li>
                <li>Archive user's home directory to secure storage</li>
                <li>Document data transfer completion in ticket</li>
              </ol>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-success">
              <h4 className="font-semibold text-text-primary mb-2">Step 4: Access Review & Cleanup (Within 7 Days)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Review and remove user from all security groups</li>
                <li>Remove from distribution lists and shared mailboxes</li>
                <li>Revoke database access and application permissions</li>
                <li>Remove from GitHub, GitLab, and code repositories</li>
                <li>Remove from cloud platforms (AWS, Azure, GCP)</li>
                <li>Update access control matrix and documentation</li>
              </ol>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Critical Timing</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Immediate (0-1 hour):</strong> Disable all electronic access</li>
            <li><strong>Same Day (0-24 hours):</strong> Collect physical assets</li>
            <li><strong>Within 3 Days:</strong> Complete data backup and transfer</li>
            <li><strong>Within 7 Days:</strong> Final access review and cleanup</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

// Log Collection Procedure
function LogCollectionProcedure() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardList className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Log Collection & Correlation Procedure</h2>
          <p className="text-sm text-text-secondary">SOP-SOC-001 | Version 1.5 | Owner: SOC Team</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Purpose</h3>
          <p className="leading-relaxed">
            Centralized log collection enables security monitoring, incident investigation, and compliance reporting.
            This procedure defines how logs are collected, normalized, and stored in the SIEM.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Log Sources to Collect</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Network Devices:</strong> Firewalls, routers, switches, IDS/IPS</li>
            <li><strong>Endpoints:</strong> Windows Event Logs, Linux syslogs, macOS logs</li>
            <li><strong>Servers:</strong> Web servers (Apache, Nginx), application servers, databases</li>
            <li><strong>Cloud:</strong> AWS CloudTrail, Azure Activity Logs, GCP Audit Logs</li>
            <li><strong>Applications:</strong> SaaS apps (Okta, Office 365, Salesforce)</li>
            <li><strong>Security Tools:</strong> EDR, antivirus, DLP, email gateway</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Collection Methods</h3>
          <div className="space-y-4">
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">Syslog (Network Devices & Linux)</h4>
              <p className="text-sm">Configure devices to forward logs to SIEM via syslog (UDP 514 or TCP 6514 with TLS)</p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">Windows Event Forwarding (WEF)</h4>
              <p className="text-sm">Use WEF to collect Security, System, and Application logs from Windows endpoints</p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">API Integration (Cloud & SaaS)</h4>
              <p className="text-sm">Use REST APIs to pull logs from cloud platforms and SaaS applications</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Alert Triage Procedure
function AlertTriageProcedure() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-8 h-8 text-warning" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Alert Triage Process</h2>
          <p className="text-sm text-text-secondary">SOP-SOC-002 | Version 2.0 | Owner: SOC Analysts</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Purpose</h3>
          <p className="leading-relaxed">
            Efficient alert triage ensures real threats are identified quickly while reducing false positives.
            This procedure defines how SOC analysts assess and prioritize security alerts.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Triage Steps</h3>
          <div className="space-y-4">
            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-danger">
              <h4 className="font-semibold text-text-primary mb-2">Step 1: Initial Assessment (2 minutes)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Review alert title, severity, and description</li>
                <li>Check if alert is known false positive (whitelist)</li>
                <li>Identify affected asset (hostname, IP, user)</li>
                <li>Note alert timestamp and frequency</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-warning">
              <h4 className="font-semibold text-text-primary mb-2">Step 2: Context Gathering (5 minutes)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Check user's recent activity (logins, file access)</li>
                <li>Review endpoint status (EDR agent, AV status)</li>
                <li>Check for related alerts on same asset</li>
                <li>Query threat intelligence for IOCs</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold text-text-primary mb-2">Step 3: Classification (3 minutes)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li><strong>True Positive:</strong> Confirmed malicious activity → Escalate to incident</li>
                <li><strong>False Positive:</strong> Benign activity → Close and tune rule</li>
                <li><strong>Needs Investigation:</strong> Unclear → Assign to Tier 2 analyst</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Incident Investigation Procedure
function IncidentInvestigationProcedure() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-danger" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Incident Investigation Protocol</h2>
          <p className="text-sm text-text-secondary">SOP-IR-001 | Version 3.0 | Owner: Incident Response Team</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Investigation Phases</h3>
          <div className="space-y-4">
            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-danger">
              <h4 className="font-semibold text-text-primary mb-2">Phase 1: Containment (Immediate)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Isolate affected systems from network</li>
                <li>Disable compromised user accounts</li>
                <li>Block malicious IPs/domains at firewall</li>
                <li>Preserve evidence (memory dumps, disk images)</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-warning">
              <h4 className="font-semibold text-text-primary mb-2">Phase 2: Investigation (1-4 hours)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Analyze logs for initial access vector</li>
                <li>Identify lateral movement and persistence</li>
                <li>Determine scope of compromise</li>
                <li>Extract IOCs (file hashes, IPs, domains)</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-success">
              <h4 className="font-semibold text-text-primary mb-2">Phase 3: Eradication & Recovery</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Remove malware and backdoors</li>
                <li>Patch vulnerabilities exploited</li>
                <li>Reset compromised credentials</li>
                <li>Restore systems from clean backups</li>
                <li>Monitor for re-infection</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Vulnerability Remediation Procedure
function VulnerabilityRemediationProcedure() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <RefreshCw className="w-8 h-8 text-warning" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Vulnerability Remediation Procedure</h2>
          <p className="text-sm text-text-secondary">SOP-VM-001 | Version 1.8 | Owner: Vulnerability Management Team</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Remediation SLAs by Severity</h3>
          <div className="space-y-3">
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded">
              <h4 className="font-semibold text-danger mb-1">Critical (CVSS 9.0-10.0)</h4>
              <p className="text-sm">Remediate within <strong>7 days</strong> | Requires executive approval for exceptions</p>
            </div>
            <div className="bg-warning/10 border-l-4 border-warning p-4 rounded">
              <h4 className="font-semibold text-warning mb-1">High (CVSS 7.0-8.9)</h4>
              <p className="text-sm">Remediate within <strong>30 days</strong> | Requires manager approval for exceptions</p>
            </div>
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <h4 className="font-semibold text-primary mb-1">Medium (CVSS 4.0-6.9)</h4>
              <p className="text-sm">Remediate within <strong>90 days</strong> | Standard remediation process</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Remediation Options</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Patch:</strong> Apply vendor security patch (preferred)</li>
            <li><strong>Upgrade:</strong> Upgrade to non-vulnerable version</li>
            <li><strong>Mitigate:</strong> Apply compensating controls (WAF, firewall rules)</li>
            <li><strong>Accept Risk:</strong> Document business justification (requires approval)</li>
            <li><strong>Decommission:</strong> Remove vulnerable system if no longer needed</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

// Patch Management Procedure
function PatchManagementProcedure() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <RefreshCw className="w-8 h-8 text-success" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Patch Management Workflow</h2>
          <p className="text-sm text-text-secondary">SOP-PM-001 | Version 2.2 | Owner: IT Operations</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Purpose</h3>
          <p className="leading-relaxed">
            Regular patching reduces attack surface and prevents exploitation of known vulnerabilities.
            This procedure defines the monthly patch cycle for all systems.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Monthly Patch Cycle</h3>
          <div className="space-y-4">
            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold text-text-primary mb-2">Week 1: Patch Release & Testing</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Microsoft Patch Tuesday (2nd Tuesday of month)</li>
                <li>Download patches to WSUS/SCCM server</li>
                <li>Deploy to test environment (Dev/QA servers)</li>
                <li>Run automated tests and monitor for issues</li>
                <li>Document any compatibility problems</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-warning">
              <h4 className="font-semibold text-text-primary mb-2">Week 2: Production Deployment (Non-Critical)</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Deploy to non-critical production servers</li>
                <li>Patch workstations in waves (25% per day)</li>
                <li>Monitor for application issues</li>
                <li>Maintain rollback capability</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-success">
              <h4 className="font-semibold text-text-primary mb-2">Week 3: Critical Systems Patching</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Schedule maintenance windows with stakeholders</li>
                <li>Patch critical production servers (database, web, app)</li>
                <li>Perform post-patch validation</li>
                <li>Update patch compliance dashboard</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-danger">
              <h4 className="font-semibold text-text-primary mb-2">Week 4: Verification & Reporting</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Run compliance scan to verify patch installation</li>
                <li>Identify systems that failed to patch</li>
                <li>Remediate patch failures</li>
                <li>Generate monthly patch compliance report</li>
                <li>Present metrics to management</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Emergency Patching</h3>
          <p className="leading-relaxed mb-2">
            For critical zero-day vulnerabilities (CVSS 9.0+) with active exploitation:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Deploy patch within 24-48 hours (skip testing if necessary)</li>
            <li>Notify CISO and IT leadership</li>
            <li>Apply compensating controls if patch not available</li>
            <li>Document emergency change in change management system</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Patch Compliance Targets</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Critical Patches:</strong> 95% compliance within 7 days</li>
            <li><strong>High Patches:</strong> 90% compliance within 30 days</li>
            <li><strong>Medium Patches:</strong> 85% compliance within 90 days</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

// Change Control Procedure
function ChangeControlProcedure() {
  return (
    <div className="glass rounded-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <GitBranch className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Change Control Process</h2>
          <p className="text-sm text-text-secondary">SOP-CC-001 | Version 3.0 | Owner: Change Advisory Board (CAB)</p>
        </div>
      </div>

      <div className="space-y-6 text-text-secondary">
        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Purpose</h3>
          <p className="leading-relaxed">
            Change control minimizes risk of outages and security incidents caused by unauthorized or poorly planned changes.
            All production changes must follow this process.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Change Types</h3>
          <div className="space-y-3">
            <div className="bg-success/10 border-l-4 border-success p-4 rounded">
              <h4 className="font-semibold text-success mb-1">Standard Change (Pre-Approved)</h4>
              <p className="text-sm">Low-risk, routine changes (e.g., password resets, adding users to groups)</p>
              <p className="text-sm"><strong>Approval:</strong> Automated approval, no CAB review needed</p>
            </div>

            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <h4 className="font-semibold text-primary mb-1">Normal Change (CAB Approval)</h4>
              <p className="text-sm">Medium-risk changes (e.g., software updates, configuration changes)</p>
              <p className="text-sm"><strong>Approval:</strong> Requires CAB review and approval (weekly meeting)</p>
            </div>

            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded">
              <h4 className="font-semibold text-danger mb-1">Emergency Change (Expedited)</h4>
              <p className="text-sm">Urgent changes to fix critical issues or security vulnerabilities</p>
              <p className="text-sm"><strong>Approval:</strong> Emergency CAB (ECAB) approval within 2 hours</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">Change Request Process</h3>
          <div className="space-y-4">
            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold text-text-primary mb-2">Step 1: Submit Change Request</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Create change ticket in ServiceNow/Jira</li>
                <li>Describe change, business justification, and impact</li>
                <li>Identify affected systems and services</li>
                <li>Provide rollback plan</li>
                <li>Estimate downtime (if any)</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-warning">
              <h4 className="font-semibold text-text-primary mb-2">Step 2: CAB Review</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>CAB meets weekly (Thursdays at 2 PM)</li>
                <li>Review change requests for risk and impact</li>
                <li>Approve, reject, or request more information</li>
                <li>Schedule implementation window</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-success">
              <h4 className="font-semibold text-text-primary mb-2">Step 3: Implementation</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Execute change during approved maintenance window</li>
                <li>Follow documented implementation plan</li>
                <li>Perform post-change validation</li>
                <li>Update change ticket with results</li>
              </ul>
            </div>

            <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-danger">
              <h4 className="font-semibold text-text-primary mb-2">Step 4: Post-Implementation Review</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Monitor systems for 24 hours post-change</li>
                <li>Document any issues or unexpected behavior</li>
                <li>Close change ticket with success/failure status</li>
                <li>Conduct lessons learned for failed changes</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-text-primary mb-3">CAB Membership</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Chair:</strong> IT Operations Manager</li>
            <li><strong>Members:</strong> Infrastructure, Security, Development, QA, Business Representatives</li>
            <li><strong>Quorum:</strong> Minimum 5 members required for approval</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

