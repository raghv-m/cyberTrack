import { Shield, Users, Target, TrendingUp } from 'lucide-react';

export default function SecurityGovernance() {
  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Security Governance</h1>
            <p className="text-text-secondary mt-2">Enterprise Security Leadership, Risk Management & Business Alignment</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Executive Summary</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Security governance establishes the framework for managing and directing cybersecurity activities across the organization. 
            It defines accountability, decision-making authority, risk tolerance, and alignment between security objectives and business goals.
          </p>
          <p className="text-text-secondary leading-relaxed">
            This governance model ensures that security investments are prioritized based on risk, compliance obligations are met, 
            and security operations support business enablement rather than impede it.
          </p>
        </div>

        {/* Governance Structure */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Security Leadership & Accountability
          </h2>

          <div className="space-y-6">
            {/* CISO */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-primary">
              <h3 className="text-xl font-bold text-text-primary mb-3">Chief Information Security Officer (CISO)</h3>
              <p className="text-text-secondary mb-3"><strong>Reports to:</strong> Chief Executive Officer (CEO) or Chief Technology Officer (CTO)</p>
              <p className="text-text-secondary mb-3"><strong>Accountability:</strong></p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Overall security strategy and risk posture</li>
                <li>Security budget allocation and ROI justification</li>
                <li>Regulatory compliance and audit readiness</li>
                <li>Board-level security reporting and risk communication</li>
                <li>Security culture and awareness programs</li>
                <li>Incident response leadership and crisis management</li>
              </ul>
            </div>

            {/* Security Architecture */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-text-primary mb-3">Director of Security Architecture</h3>
              <p className="text-text-secondary mb-3"><strong>Reports to:</strong> CISO</p>
              <p className="text-text-secondary mb-3"><strong>Accountability:</strong></p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Security architecture design and standards</li>
                <li>Technology evaluation and vendor selection</li>
                <li>Zero Trust architecture implementation</li>
                <li>Cloud security architecture and controls</li>
                <li>Identity and access management (IAM) strategy</li>
                <li>Encryption and key management frameworks</li>
              </ul>
            </div>

            {/* SOC Manager */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-warning">
              <h3 className="text-xl font-bold text-text-primary mb-3">SOC Manager / Director of Security Operations</h3>
              <p className="text-text-secondary mb-3"><strong>Reports to:</strong> CISO</p>
              <p className="text-text-secondary mb-3"><strong>Accountability:</strong></p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>24/7 security monitoring and threat detection</li>
                <li>Incident response coordination and execution</li>
                <li>SIEM platform management and tuning</li>
                <li>Threat intelligence integration and analysis</li>
                <li>SOC analyst training and skill development</li>
                <li>Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR) metrics</li>
              </ul>
            </div>

            {/* GRC Manager */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-success">
              <h3 className="text-xl font-bold text-text-primary mb-3">GRC Manager (Governance, Risk & Compliance)</h3>
              <p className="text-text-secondary mb-3"><strong>Reports to:</strong> CISO</p>
              <p className="text-text-secondary mb-3"><strong>Accountability:</strong></p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Risk assessment and risk register maintenance</li>
                <li>Compliance program management (ISO 27001, SOC 2, PIPEDA)</li>
                <li>Policy development and lifecycle management</li>
                <li>Third-party risk assessments and vendor security reviews</li>
                <li>Internal audit coordination and remediation tracking</li>
                <li>Security metrics and KPI reporting</li>
              </ul>
            </div>

            {/* Security Engineering */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-danger">
              <h3 className="text-xl font-bold text-text-primary mb-3">Manager of Security Engineering</h3>
              <p className="text-text-secondary mb-3"><strong>Reports to:</strong> Director of Security Architecture</p>
              <p className="text-text-secondary mb-3"><strong>Accountability:</strong></p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Security tool deployment and configuration</li>
                <li>Vulnerability management and patch orchestration</li>
                <li>Endpoint detection and response (EDR) management</li>
                <li>Network security controls (firewalls, IDS/IPS, proxies)</li>
                <li>Security automation and orchestration (SOAR)</li>
                <li>Penetration testing and red team exercises</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Governance Model */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Risk Governance Model
          </h2>

          <div className="space-y-6">
            {/* Risk Appetite Statement */}
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Risk Appetite Statement</h3>
              <div className="bg-tertiary p-6 rounded-lg">
                <p className="text-text-secondary leading-relaxed mb-4">
                  <strong>The organization maintains a LOW to MODERATE risk appetite for cybersecurity threats.</strong>
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We accept minimal residual risk in areas where controls are cost-prohibitive or operationally impractical, 
                  provided that compensating controls are in place and risks are formally accepted by executive leadership.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>Zero tolerance</strong> for risks that could result in:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-2">
                  <li>Unauthorized access to customer data or personally identifiable information (PII)</li>
                  <li>Regulatory non-compliance resulting in fines or legal action</li>
                  <li>Ransomware or destructive malware impacting critical business operations</li>
                  <li>Reputational damage from publicly disclosed security incidents</li>
                </ul>
              </div>
            </div>

            {/* Risk Classification */}
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Risk Classification Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-tertiary">
                      <th className="p-3 border border-border-color text-text-primary">Risk Level</th>
                      <th className="p-3 border border-border-color text-text-primary">Impact</th>
                      <th className="p-3 border border-border-color text-text-primary">Likelihood</th>
                      <th className="p-3 border border-border-color text-text-primary">Response Required</th>
                      <th className="p-3 border border-border-color text-text-primary">Approval Authority</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr>
                      <td className="p-3 border border-border-color"><span className="px-3 py-1 bg-danger text-white rounded-full text-sm font-semibold">Critical</span></td>
                      <td className="p-3 border border-border-color">Severe financial loss, regulatory penalties, business shutdown</td>
                      <td className="p-3 border border-border-color">High (≥50%)</td>
                      <td className="p-3 border border-border-color">Immediate mitigation required within 24 hours</td>
                      <td className="p-3 border border-border-color">CISO + CEO</td>
                    </tr>
                    <tr className="bg-secondary/30">
                      <td className="p-3 border border-border-color"><span className="px-3 py-1 bg-warning text-white rounded-full text-sm font-semibold">High</span></td>
                      <td className="p-3 border border-border-color">Significant financial impact, compliance violations, data breach</td>
                      <td className="p-3 border border-border-color">Medium (25-50%)</td>
                      <td className="p-3 border border-border-color">Mitigation plan within 7 days, implementation within 30 days</td>
                      <td className="p-3 border border-border-color">CISO</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-border-color"><span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold">Medium</span></td>
                      <td className="p-3 border border-border-color">Moderate financial loss, operational disruption, limited data exposure</td>
                      <td className="p-3 border border-border-color">Low-Medium (10-25%)</td>
                      <td className="p-3 border border-border-color">Mitigation plan within 30 days, implementation within 90 days</td>
                      <td className="p-3 border border-border-color">Director of Security</td>
                    </tr>
                    <tr className="bg-secondary/30">
                      <td className="p-3 border border-border-color"><span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold">Low</span></td>
                      <td className="p-3 border border-border-color">Minimal financial impact, minor operational inconvenience</td>
                      <td className="p-3 border border-border-color">Very Low (&lt;10%)</td>
                      <td className="p-3 border border-border-color">Accept or mitigate within 180 days</td>
                      <td className="p-3 border border-border-color">Security Manager</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Business Alignment */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Security & Business Alignment
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Security as a Business Enabler</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Security governance is not a barrier to business operations—it is a strategic enabler that builds customer trust,
                protects intellectual property, and ensures regulatory compliance. Security teams collaborate with business units to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li><strong>Product Development:</strong> Integrate security into SDLC (Secure Development Lifecycle)</li>
                <li><strong>Sales & Marketing:</strong> Provide security certifications (SOC 2, ISO 27001) to win enterprise deals</li>
                <li><strong>Customer Success:</strong> Respond to security questionnaires and RFPs with confidence</li>
                <li><strong>Legal & Compliance:</strong> Ensure data protection laws (PIPEDA, GDPR) are met</li>
                <li><strong>Finance:</strong> Cyber insurance procurement and risk quantification</li>
                <li><strong>HR:</strong> Background checks, security awareness training, insider threat prevention</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Security Investment Prioritization</h3>
              <div className="bg-tertiary p-6 rounded-lg">
                <p className="text-text-secondary mb-4">Security budgets are allocated based on:</p>
                <ol className="list-decimal list-inside text-text-secondary space-y-2 ml-4">
                  <li><strong>Risk Reduction:</strong> Investments that reduce the highest-impact risks first</li>
                  <li><strong>Compliance Requirements:</strong> Mandatory controls for regulatory obligations</li>
                  <li><strong>Business Impact:</strong> Protections for revenue-generating systems and customer data</li>
                  <li><strong>Threat Landscape:</strong> Emerging threats (ransomware, supply chain attacks)</li>
                  <li><strong>Operational Efficiency:</strong> Automation to reduce manual toil and improve MTTR</li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Security Metrics & KPIs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-tertiary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">Operational Metrics</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Mean Time to Detect (MTTD): &lt;15 minutes</li>
                    <li>• Mean Time to Respond (MTTR): &lt;1 hour</li>
                    <li>• False Positive Rate: &lt;5%</li>
                    <li>• Vulnerability Remediation SLA: Critical &lt;7 days</li>
                    <li>• Patch Compliance: &gt;95% within 30 days</li>
                  </ul>
                </div>
                <div className="bg-tertiary p-4 rounded-lg">
                  <h4 className="font-semibold text-text-primary mb-2">Strategic Metrics</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• Security Awareness Training Completion: &gt;98%</li>
                    <li>• Phishing Simulation Click Rate: &lt;3%</li>
                    <li>• Third-Party Risk Assessments: 100% of critical vendors</li>
                    <li>• Audit Findings Remediation: &gt;90% within SLA</li>
                    <li>• Incident Escalation Accuracy: &gt;85%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Committees */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Security Governance Committees</h2>

          <div className="space-y-4">
            <div className="bg-tertiary p-6 rounded-lg">
              <h3 className="text-lg font-bold text-text-primary mb-2">Security Steering Committee</h3>
              <p className="text-text-secondary mb-2"><strong>Frequency:</strong> Quarterly</p>
              <p className="text-text-secondary mb-2"><strong>Members:</strong> CISO, CTO, CFO, General Counsel, VP of Engineering, VP of Operations</p>
              <p className="text-text-secondary mb-2"><strong>Purpose:</strong></p>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Review enterprise risk posture and top risks</li>
                <li>Approve security budget and strategic initiatives</li>
                <li>Oversee compliance program and audit results</li>
                <li>Review major incidents and lessons learned</li>
              </ul>
            </div>

            <div className="bg-tertiary p-6 rounded-lg">
              <h3 className="text-lg font-bold text-text-primary mb-2">Incident Response Committee</h3>
              <p className="text-text-secondary mb-2"><strong>Frequency:</strong> As needed (activated during P1/P2 incidents)</p>
              <p className="text-text-secondary mb-2"><strong>Members:</strong> CISO, SOC Manager, Legal, PR/Communications, IT Operations</p>
              <p className="text-text-secondary mb-2"><strong>Purpose:</strong></p>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Coordinate incident response and containment</li>
                <li>Manage external communications and breach notifications</li>
                <li>Engage law enforcement and forensic investigators</li>
                <li>Document lessons learned and remediation actions</li>
              </ul>
            </div>

            <div className="bg-tertiary p-6 rounded-lg">
              <h3 className="text-lg font-bold text-text-primary mb-2">Change Advisory Board (CAB)</h3>
              <p className="text-text-secondary mb-2"><strong>Frequency:</strong> Weekly</p>
              <p className="text-text-secondary mb-2"><strong>Members:</strong> Security Engineering, IT Operations, DevOps, Application Owners</p>
              <p className="text-text-secondary mb-2"><strong>Purpose:</strong></p>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Review and approve infrastructure and application changes</li>
                <li>Assess security impact of proposed changes</li>
                <li>Ensure rollback plans are in place</li>
                <li>Track change-related incidents and failures</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Governance Framework Diagram */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Security Governance Framework</h2>
          <div className="bg-secondary p-6 rounded-lg font-mono text-sm text-text-secondary overflow-x-auto">
            <pre>{`
┌─────────────────────────────────────────────────────────────────────┐
│                         BOARD OF DIRECTORS                          │
│                    (Oversight & Risk Appetite)                      │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   CEO / Executive Team  │
                    │  (Strategic Direction)  │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │         CISO            │
                    │  (Security Leadership)  │
                    └────────────┬────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
┌───────▼────────┐    ┌─────────▼─────────┐    ┌────────▼────────┐
│   Security     │    │   SOC Manager     │    │  GRC Manager    │
│  Architecture  │    │  (Operations)     │    │ (Risk & Policy) │
└───────┬────────┘    └─────────┬─────────┘    └────────┬────────┘
        │                       │                        │
        │                       │                        │
┌───────▼────────┐    ┌─────────▼─────────┐    ┌────────▼────────┐
│   Security     │    │  Tier 1 Analysts  │    │ Policy Authors  │
│  Engineering   │    │  Tier 2 Analysts  │    │ Risk Analysts   │
│   (Tools)      │    │  Tier 3 Analysts  │    │ Audit Liaisons  │
└────────────────┘    └───────────────────┘    └─────────────────┘

═══════════════════════════════════════════════════════════════════════
                        GOVERNANCE INPUTS
═══════════════════════════════════════════════════════════════════════
│ Regulatory Requirements │ Threat Intelligence │ Business Objectives │
│ Industry Standards      │ Audit Findings      │ Risk Assessments    │
│ Incident Lessons        │ Vulnerability Data  │ Compliance Mandates │
═══════════════════════════════════════════════════════════════════════
            `}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

