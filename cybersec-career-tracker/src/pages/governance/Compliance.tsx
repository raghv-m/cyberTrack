import { CheckCircle, Shield, FileText, Globe, Lock } from 'lucide-react';

export default function Compliance() {
  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <CheckCircle className="w-12 h-12 text-success" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Compliance & Frameworks</h1>
            <p className="text-text-secondary mt-2">ISO 27001, NIST CSF, CIS Controls, SOC 2, PIPEDA Alignment</p>
          </div>
        </div>

        {/* Overview */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Compliance Program Overview</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Our compliance program ensures adherence to industry standards, regulatory requirements, and customer contractual obligations. 
            We maintain continuous compliance through automated controls, regular audits, and a culture of security awareness.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-tertiary p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-success mb-2">5</div>
              <div className="text-sm text-text-secondary">Active Compliance Frameworks</div>
            </div>
            <div className="bg-tertiary p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-text-secondary">Control Implementation Rate</div>
            </div>
            <div className="bg-tertiary p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-warning mb-2">Annual</div>
              <div className="text-sm text-text-secondary">External Audit Frequency</div>
            </div>
          </div>
        </div>

        {/* ISO/IEC 27001 */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            ISO/IEC 27001:2022 - Information Security Management System (ISMS)
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Certification Status</h3>
              <div className="bg-success/20 border-l-4 border-success p-4 rounded">
                <p className="text-text-primary font-semibold">✅ ISO 27001:2022 Certified</p>
                <p className="text-text-secondary text-sm mt-1">Certificate Number: ISO27001-2024-CA-001 | Valid Until: December 2025</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Scope of Certification</h3>
              <p className="text-text-secondary mb-2">
                The ISMS applies to all information assets, systems, and processes supporting the delivery of cloud-based 
                cybersecurity training and career development services, including:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Customer data (PII, learning progress, portfolio items)</li>
                <li>Application infrastructure (web servers, databases, APIs)</li>
                <li>Corporate IT systems (email, file storage, collaboration tools)</li>
                <li>Security operations (SIEM, EDR, vulnerability management)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Annex A Control Implementation</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-tertiary">
                      <th className="p-3 border border-border-color text-text-primary">Control Domain</th>
                      <th className="p-3 border border-border-color text-text-primary">Controls</th>
                      <th className="p-3 border border-border-color text-text-primary">Implemented</th>
                      <th className="p-3 border border-border-color text-text-primary">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr>
                      <td className="p-3 border border-border-color">A.5 Organizational Controls</td>
                      <td className="p-3 border border-border-color">37</td>
                      <td className="p-3 border border-border-color">37/37</td>
                      <td className="p-3 border border-border-color"><span className="text-success">✓ 100%</span></td>
                    </tr>
                    <tr className="bg-secondary/30">
                      <td className="p-3 border border-border-color">A.6 People Controls</td>
                      <td className="p-3 border border-border-color">8</td>
                      <td className="p-3 border border-border-color">8/8</td>
                      <td className="p-3 border border-border-color"><span className="text-success">✓ 100%</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-border-color">A.7 Physical Controls</td>
                      <td className="p-3 border border-border-color">14</td>
                      <td className="p-3 border border-border-color">12/14</td>
                      <td className="p-3 border border-border-color"><span className="text-warning">⚠ 86%</span></td>
                    </tr>
                    <tr className="bg-secondary/30">
                      <td className="p-3 border border-border-color">A.8 Technological Controls</td>
                      <td className="p-3 border border-border-color">34</td>
                      <td className="p-3 border border-border-color">34/34</td>
                      <td className="p-3 border border-border-color"><span className="text-success">✓ 100%</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-text-secondary text-sm mt-3">
                <strong>Note:</strong> Physical controls at A.7 are partially implemented due to cloud-first architecture. 
                Compensating controls include AWS physical security certifications and data center audits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Key ISO 27001 Processes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-tertiary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">Risk Assessment</h4>
                  <p className="text-sm text-text-secondary">Conducted annually and after significant changes. Uses ISO 27005 methodology.</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">Statement of Applicability (SoA)</h4>
                  <p className="text-sm text-text-secondary">Documents which Annex A controls are applicable and justification for exclusions.</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">Internal Audits</h4>
                  <p className="text-sm text-text-secondary">Quarterly audits of ISMS processes and controls by independent internal auditors.</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">Management Review</h4>
                  <p className="text-sm text-text-secondary">Quarterly ISMS performance review by CISO and executive leadership.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NIST CSF */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            NIST Cybersecurity Framework (CSF) 2.0
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Framework Adoption</h3>
              <p className="text-text-secondary mb-4">
                We align our cybersecurity program to the NIST CSF 2.0, which provides a risk-based approach to managing cybersecurity risk. 
                The framework's six core functions guide our security strategy and operations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Core Functions Implementation</h3>
              <div className="space-y-4">
                {/* Govern */}
                <div className="bg-tertiary p-6 rounded-lg border-l-4 border-primary">
                  <h4 className="text-lg font-bold text-text-primary mb-2">GOVERN (GV)</h4>
                  <p className="text-text-secondary mb-3">
                    Establish and monitor the organization's cybersecurity risk management strategy, expectations, and policy.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-text-primary">GV.OC: Organizational Context</p>
                      <p className="text-text-secondary">✓ Security governance structure defined</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">GV.RM: Risk Management Strategy</p>
                      <p className="text-text-secondary">✓ Risk appetite and tolerance established</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">GV.RR: Roles & Responsibilities</p>
                      <p className="text-text-secondary">✓ RACI matrix for security functions</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">GV.PO: Policy</p>
                      <p className="text-text-secondary">✓ 15+ security policies published</p>
                    </div>
                  </div>
                </div>

                {/* Identify */}
                <div className="bg-tertiary p-6 rounded-lg border-l-4 border-secondary">
                  <h4 className="text-lg font-bold text-text-primary mb-2">IDENTIFY (ID)</h4>
                  <p className="text-text-secondary mb-3">
                    Understand the organization's current cybersecurity risks to systems, people, assets, data, and capabilities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-text-primary">ID.AM: Asset Management</p>
                      <p className="text-text-secondary">✓ CMDB with 100% asset inventory</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">ID.RA: Risk Assessment</p>
                      <p className="text-text-secondary">✓ Annual risk assessments + continuous monitoring</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">ID.IM: Improvement</p>
                      <p className="text-text-secondary">✓ Lessons learned from incidents and audits</p>
                    </div>
                  </div>
                </div>

                {/* Protect */}
                <div className="bg-tertiary p-6 rounded-lg border-l-4 border-success">
                  <h4 className="text-lg font-bold text-text-primary mb-2">PROTECT (PR)</h4>
                  <p className="text-text-secondary mb-3">
                    Use safeguards to prevent or reduce cybersecurity risk.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-text-primary">PR.AA: Identity & Access</p>
                      <p className="text-text-secondary">✓ MFA enforced, RBAC implemented</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">PR.DS: Data Security</p>
                      <p className="text-text-secondary">✓ Encryption at rest and in transit</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">PR.PS: Platform Security</p>
                      <p className="text-text-secondary">✓ Hardened configurations, patch management</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">PR.AT: Awareness & Training</p>
                      <p className="text-text-secondary">✓ Annual security training, phishing simulations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue NIST CSF */}
        <div className="glass rounded-lg p-8 mb-6">
          <div className="space-y-4">
            {/* Detect */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-warning">
              <h4 className="text-lg font-bold text-text-primary mb-2">DETECT (DE)</h4>
              <p className="text-text-secondary mb-3">
                Find and analyze possible cybersecurity attacks and compromises.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold text-text-primary">DE.CM: Continuous Monitoring</p>
                  <p className="text-text-secondary">✓ 24/7 SOC with SIEM correlation</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">DE.AE: Adverse Event Analysis</p>
                  <p className="text-text-secondary">✓ Threat intelligence integration</p>
                </div>
              </div>
            </div>

            {/* Respond */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-danger">
              <h4 className="text-lg font-bold text-text-primary mb-2">RESPOND (RS)</h4>
              <p className="text-text-secondary mb-3">
                Take action regarding a detected cybersecurity incident.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold text-text-primary">RS.MA: Incident Management</p>
                  <p className="text-text-secondary">✓ Documented IR playbooks</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">RS.AN: Incident Analysis</p>
                  <p className="text-text-secondary">✓ Forensic investigation procedures</p>
                </div>
              </div>
            </div>

            {/* Recover */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-lg font-bold text-text-primary mb-2">RECOVER (RC)</h4>
              <p className="text-text-secondary mb-3">
                Restore assets and operations affected by a cybersecurity incident.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold text-text-primary">RC.RP: Recovery Planning</p>
                  <p className="text-text-secondary">✓ Business continuity and disaster recovery plans</p>
                </div>
                <div>
                  <p className="font-semibold text-text-primary">RC.CO: Recovery Communications</p>
                  <p className="text-text-secondary">✓ Stakeholder notification procedures</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CIS Controls */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">CIS Critical Security Controls v8</h2>

          <div className="space-y-4">
            <p className="text-text-secondary">
              The CIS Controls provide prioritized, prescriptive actions to protect organizations from known cyber attack vectors.
              We implement all 18 controls with focus on Implementation Groups (IG) 1 and 2.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-tertiary">
                    <th className="p-3 border border-border-color text-text-primary">Control</th>
                    <th className="p-3 border border-border-color text-text-primary">Description</th>
                    <th className="p-3 border border-border-color text-text-primary">Implementation</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr>
                    <td className="p-3 border border-border-color font-semibold">CIS 1</td>
                    <td className="p-3 border border-border-color">Inventory and Control of Enterprise Assets</td>
                    <td className="p-3 border border-border-color"><span className="text-success">✓ Complete</span></td>
                  </tr>
                  <tr className="bg-secondary/30">
                    <td className="p-3 border border-border-color font-semibold">CIS 2</td>
                    <td className="p-3 border border-border-color">Inventory and Control of Software Assets</td>
                    <td className="p-3 border border-border-color"><span className="text-success">✓ Complete</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border-color font-semibold">CIS 3</td>
                    <td className="p-3 border border-border-color">Data Protection</td>
                    <td className="p-3 border border-border-color"><span className="text-success">✓ Complete</span></td>
                  </tr>
                  <tr className="bg-secondary/30">
                    <td className="p-3 border border-border-color font-semibold">CIS 4</td>
                    <td className="p-3 border border-border-color">Secure Configuration of Enterprise Assets and Software</td>
                    <td className="p-3 border border-border-color"><span className="text-success">✓ Complete</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border-color font-semibold">CIS 5</td>
                    <td className="p-3 border border-border-color">Account Management</td>
                    <td className="p-3 border border-border-color"><span className="text-success">✓ Complete</span></td>
                  </tr>
                  <tr className="bg-secondary/30">
                    <td className="p-3 border border-border-color font-semibold">CIS 6</td>
                    <td className="p-3 border border-border-color">Access Control Management</td>
                    <td className="p-3 border border-border-color"><span className="text-success">✓ Complete</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border-color font-semibold">CIS 7</td>
                    <td className="p-3 border border-border-color">Continuous Vulnerability Management</td>
                    <td className="p-3 border border-border-color"><span className="text-success">✓ Complete</span></td>
                  </tr>
                  <tr className="bg-secondary/30">
                    <td className="p-3 border border-border-color font-semibold">CIS 8</td>
                    <td className="p-3 border border-border-color">Audit Log Management</td>
                    <td className="p-3 border border-border-color"><span className="text-success">✓ Complete</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border-color font-semibold">CIS 9-18</td>
                    <td className="p-3 border border-border-color">Email Security, Malware Defenses, Data Recovery, Network Infrastructure, Security Awareness, etc.</td>
                    <td className="p-3 border border-border-color"><span className="text-success">✓ 95% Complete</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SOC 2 */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            SOC 2 Type II - Trust Services Criteria
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Audit Status</h3>
              <div className="bg-success/20 border-l-4 border-success p-4 rounded">
                <p className="text-text-primary font-semibold">✅ SOC 2 Type II Report Available</p>
                <p className="text-text-secondary text-sm mt-1">Audit Period: January 1, 2024 - December 31, 2024 | Auditor: Deloitte Canada</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Trust Services Categories</h3>
              <div className="space-y-4">
                <div className="bg-tertiary p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-text-primary mb-2">Security (Common Criteria)</h4>
                  <p className="text-text-secondary mb-3">
                    The system is protected against unauthorized access (both physical and logical).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-text-secondary">
                    <div>✓ CC1.1: CISO appointed with defined responsibilities</div>
                    <div>✓ CC1.2: Board oversight of security program</div>
                    <div>✓ CC2.1: Internal monitoring of controls</div>
                    <div>✓ CC3.1: Risk assessment process documented</div>
                    <div>✓ CC6.1: Logical access controls implemented</div>
                    <div>✓ CC6.6: Encryption of data at rest and in transit</div>
                    <div>✓ CC7.2: System monitoring for anomalies</div>
                    <div>✓ CC8.1: Change management procedures</div>
                  </div>
                </div>

                <div className="bg-tertiary p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-text-primary mb-2">Availability</h4>
                  <p className="text-text-secondary mb-3">
                    The system is available for operation and use as committed or agreed.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-text-secondary">
                    <div>✓ A1.1: 99.9% uptime SLA</div>
                    <div>✓ A1.2: Disaster recovery plan tested quarterly</div>
                    <div>✓ A1.3: Redundant infrastructure across multiple AZs</div>
                  </div>
                </div>

                <div className="bg-tertiary p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-text-primary mb-2">Confidentiality</h4>
                  <p className="text-text-secondary mb-3">
                    Information designated as confidential is protected as committed or agreed.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-text-secondary">
                    <div>✓ C1.1: Data classification policy</div>
                    <div>✓ C1.2: NDAs with employees and vendors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PIPEDA */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            PIPEDA - Personal Information Protection and Electronic Documents Act (Canada)
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Compliance Statement</h3>
              <p className="text-text-secondary leading-relaxed">
                As a Canadian organization, we comply with PIPEDA's 10 Fair Information Principles for the collection, use,
                and disclosure of personal information in the course of commercial activities.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">PIPEDA Principles Implementation</h3>
              <div className="space-y-3">
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">1. Accountability</p>
                  <p className="text-sm text-text-secondary">CISO designated as Privacy Officer responsible for PIPEDA compliance</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">2. Identifying Purposes</p>
                  <p className="text-sm text-text-secondary">Privacy Policy clearly states purposes for data collection (account creation, learning analytics, progress tracking)</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">3. Consent</p>
                  <p className="text-sm text-text-secondary">Explicit consent obtained during signup; users can withdraw consent and delete accounts</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">4. Limiting Collection</p>
                  <p className="text-sm text-text-secondary">Only collect data necessary for service delivery (email, name, learning progress)</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">5. Limiting Use, Disclosure, and Retention</p>
                  <p className="text-sm text-text-secondary">Data used only for stated purposes; retained for 2 years after account inactivity, then deleted</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">6. Accuracy</p>
                  <p className="text-sm text-text-secondary">Users can update their information anytime in Settings</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">7. Safeguards</p>
                  <p className="text-sm text-text-secondary">Encryption at rest and in transit, MFA, access controls, security monitoring</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">8. Openness</p>
                  <p className="text-sm text-text-secondary">Privacy Policy publicly available; contact information for privacy inquiries provided</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">9. Individual Access</p>
                  <p className="text-sm text-text-secondary">Users can export all their data in JSON format from Settings</p>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <p className="font-semibold text-text-primary">10. Challenging Compliance</p>
                  <p className="text-sm text-text-secondary">Privacy complaints can be submitted to privacy@cybertrack.ca; escalation to Privacy Commissioner of Canada available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

