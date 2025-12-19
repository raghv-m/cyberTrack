import { AlertTriangle, Users, FileText, TrendingUp } from 'lucide-react';

export default function IncidentResponse() {
  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <AlertTriangle className="w-12 h-12 text-danger" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Incident Response</h1>
            <p className="text-text-secondary mt-2">Playbooks, Escalation Procedures & Case Management</p>
          </div>
        </div>

        {/* Incident Response Lifecycle */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">NIST Incident Response Lifecycle</h2>
          <div className="bg-secondary p-6 rounded-lg font-mono text-xs text-text-secondary overflow-x-auto">
            <pre>{`
┌──────────────────────────────────────────────────────────────────────┐
│                    1. PREPARATION                                    │
│  • Develop IR policies and procedures                               │
│  • Train IR team and conduct tabletop exercises                     │
│  • Deploy monitoring tools (SIEM, EDR, IDS)                          │
│  • Establish communication channels                                  │
└────────────────────────────┬─────────────────────────────────────────┘
                             │
                ┌────────────▼────────────┐
                │  2. DETECTION &         │
                │     ANALYSIS            │
                │  • Monitor alerts       │
                │  • Triage incidents     │
                │  • Determine scope      │
                │  • Classify severity    │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │  3. CONTAINMENT         │
                │  • Short-term: Isolate  │
                │  • Long-term: Patch     │
                │  • Preserve evidence    │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │  4. ERADICATION         │
                │  • Remove malware       │
                │  • Close vulnerabilities│
                │  • Reset credentials    │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │  5. RECOVERY            │
                │  • Restore systems      │
                │  • Verify functionality │
                │  • Monitor for reinfection│
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │  6. LESSONS LEARNED     │
                │  • Post-incident review │
                │  • Update procedures    │
                │  • Improve defenses     │
                └─────────────────────────┘
            `}</pre>
          </div>
        </div>

        {/* Incident Classification */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Incident Severity Classification</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-tertiary">
                  <th className="p-3 border border-border-color text-text-primary">Severity</th>
                  <th className="p-3 border border-border-color text-text-primary">Description</th>
                  <th className="p-3 border border-border-color text-text-primary">Response Time</th>
                  <th className="p-3 border border-border-color text-text-primary">Escalation</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <td className="p-3 border border-border-color">
                    <span className="px-3 py-1 bg-danger text-white rounded-full font-semibold">P1 - Critical</span>
                  </td>
                  <td className="p-3 border border-border-color">Ransomware, data breach, system-wide outage</td>
                  <td className="p-3 border border-border-color">15 minutes</td>
                  <td className="p-3 border border-border-color">CISO + Exec Team</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color">
                    <span className="px-3 py-1 bg-warning text-white rounded-full font-semibold">P2 - High</span>
                  </td>
                  <td className="p-3 border border-border-color">Malware on multiple endpoints, privilege escalation</td>
                  <td className="p-3 border border-border-color">1 hour</td>
                  <td className="p-3 border border-border-color">SOC Manager</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color">
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full font-semibold">P3 - Medium</span>
                  </td>
                  <td className="p-3 border border-border-color">Phishing attempt, single endpoint compromise</td>
                  <td className="p-3 border border-border-color">4 hours</td>
                  <td className="p-3 border border-border-color">Tier 2 Analyst</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color">
                    <span className="px-3 py-1 bg-success text-white rounded-full font-semibold">P4 - Low</span>
                  </td>
                  <td className="p-3 border border-border-color">Policy violation, suspicious activity (unconfirmed)</td>
                  <td className="p-3 border border-border-color">24 hours</td>
                  <td className="p-3 border border-border-color">Tier 1 Analyst</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Incident Response Team */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Incident Response Team (IRT)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Incident Commander</h3>
              <p className="text-sm text-text-secondary">SOC Manager or CISO - Leads response, makes decisions, coordinates team</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Technical Lead</h3>
              <p className="text-sm text-text-secondary">Senior Analyst - Performs forensic analysis, containment, eradication</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Communications Lead</h3>
              <p className="text-sm text-text-secondary">PR/Legal - Handles internal/external communications, regulatory notifications</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Documentation Lead</h3>
              <p className="text-sm text-text-secondary">Analyst - Records timeline, actions taken, evidence collected</p>
            </div>
          </div>
        </div>

        {/* Communication Plan */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Incident Communication Plan</h2>
          <div className="space-y-4">
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Internal Stakeholders</h3>
              <ul className="text-sm text-text-secondary space-y-1 ml-4 list-disc list-inside">
                <li><strong>Executive Team:</strong> Briefed on P1/P2 incidents within 1 hour</li>
                <li><strong>IT Operations:</strong> Notified immediately for containment actions</li>
                <li><strong>Legal/Compliance:</strong> Engaged for data breaches or regulatory incidents</li>
                <li><strong>HR:</strong> Involved for insider threats or employee-related incidents</li>
              </ul>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">External Stakeholders</h3>
              <ul className="text-sm text-text-secondary space-y-1 ml-4 list-disc list-inside">
                <li><strong>Customers:</strong> Notified within 72 hours if PII compromised (PIPEDA requirement)</li>
                <li><strong>Regulators:</strong> Office of the Privacy Commissioner (Canada) for data breaches</li>
                <li><strong>Law Enforcement:</strong> FBI, RCMP for criminal activity (ransomware, fraud)</li>
                <li><strong>Media:</strong> Coordinated through PR team for public incidents</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Post-Incident Review */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Post-Incident Review (Lessons Learned)</h2>
          <div className="space-y-3 text-text-secondary">
            <p className="leading-relaxed">
              Conducted within 5 business days of incident closure. All IRT members participate.
            </p>

            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Review Questions:</h3>
              <ol className="text-sm space-y-1 ml-4 list-decimal list-inside">
                <li>What happened? (Timeline of events)</li>
                <li>How was the incident detected?</li>
                <li>What was the root cause?</li>
                <li>What worked well during the response?</li>
                <li>What could be improved?</li>
                <li>What preventive measures can be implemented?</li>
                <li>Do playbooks need to be updated?</li>
                <li>What training is needed?</li>
              </ol>
            </div>

            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">Deliverables:</h3>
              <ul className="text-sm space-y-1 ml-4 list-disc list-inside">
                <li>Incident report with timeline and actions taken</li>
                <li>Root cause analysis</li>
                <li>Recommendations for improvement</li>
                <li>Updated playbooks and procedures</li>
                <li>Training plan for identified gaps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

