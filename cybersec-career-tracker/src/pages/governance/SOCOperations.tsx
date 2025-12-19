import { Shield, Users, AlertTriangle, Target } from 'lucide-react';

export default function SOCOperations() {
  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">SOC Operations</h1>
            <p className="text-text-secondary mt-2">Security Operations Center - Tier Structure, Playbooks & Incident Response</p>
          </div>
        </div>

        {/* SOC Overview */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-4">SOC Mission Statement</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The Security Operations Center (SOC) provides 24/7 monitoring, detection, analysis, and response to cybersecurity threats. 
            Our mission is to protect organizational assets, minimize Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR), 
            and continuously improve our security posture through threat intelligence and lessons learned.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-tertiary p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-text-secondary">Continuous Monitoring</div>
            </div>
            <div className="bg-tertiary p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-success mb-2">&lt;15min</div>
              <div className="text-sm text-text-secondary">Mean Time to Detect</div>
            </div>
            <div className="bg-tertiary p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-warning mb-2">&lt;1hr</div>
              <div className="text-sm text-text-secondary">Mean Time to Respond</div>
            </div>
            <div className="bg-tertiary p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-danger mb-2">&lt;5%</div>
              <div className="text-sm text-text-secondary">False Positive Rate</div>
            </div>
          </div>
        </div>

        {/* SOC Tier Structure */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            SOC Tier Structure & Responsibilities
          </h2>

          <div className="space-y-6">
            {/* Tier 1 */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-primary">
              <h3 className="text-xl font-bold text-text-primary mb-3">Tier 1: Security Analyst (Alert Triage & Initial Response)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Primary Responsibilities:</h4>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 ml-4">
                    <li>Monitor SIEM dashboard for security alerts</li>
                    <li>Perform initial triage and classification of alerts</li>
                    <li>Execute predefined playbooks for common scenarios</li>
                    <li>Document findings in ticketing system (ServiceNow)</li>
                    <li>Escalate confirmed incidents to Tier 2</li>
                    <li>Close false positives with justification</li>
                    <li>Maintain alert queue SLA (&lt;15 min response time)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Required Skills:</h4>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 ml-4">
                    <li>Basic understanding of TCP/IP, DNS, HTTP/HTTPS</li>
                    <li>Familiarity with SIEM tools (Splunk, Elastic, QRadar)</li>
                    <li>Log analysis and pattern recognition</li>
                    <li>Incident documentation and ticketing</li>
                    <li>Knowledge of common attack vectors (phishing, malware)</li>
                  </ul>
                  <h4 className="font-semibold text-text-primary mt-3 mb-2">Certifications:</h4>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 ml-4">
                    <li>Security+ (CompTIA)</li>
                    <li>CySA+ (CompTIA Cybersecurity Analyst)</li>
                    <li>GIAC Security Essentials (GSEC)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-text-primary mb-3">Tier 2: Incident Responder (Deep Dive Investigation)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Primary Responsibilities:</h4>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 ml-4">
                    <li>Investigate escalated incidents from Tier 1</li>
                    <li>Perform forensic analysis (memory, disk, network)</li>
                    <li>Correlate events across multiple data sources</li>
                    <li>Identify root cause and attack timeline</li>
                    <li>Contain and eradicate threats</li>
                    <li>Coordinate with IT for remediation actions</li>
                    <li>Escalate critical incidents to Tier 3 or CISO</li>
                    <li>Write detailed incident reports</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Required Skills:</h4>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 ml-4">
                    <li>Advanced log analysis and correlation</li>
                    <li>Malware analysis (static and dynamic)</li>
                    <li>Network traffic analysis (Wireshark, tcpdump)</li>
                    <li>Endpoint forensics (Volatility, FTK, EnCase)</li>
                    <li>Scripting (Python, PowerShell, Bash)</li>
                    <li>MITRE ATT&CK framework mapping</li>
                  </ul>
                  <h4 className="font-semibold text-text-primary mt-3 mb-2">Certifications:</h4>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 ml-4">
                    <li>GCIH (GIAC Certified Incident Handler)</li>
                    <li>GCFA (GIAC Certified Forensic Analyst)</li>
                    <li>CEH (Certified Ethical Hacker)</li>
                    <li>CHFI (Computer Hacking Forensic Investigator)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-success">
              <h3 className="text-xl font-bold text-text-primary mb-3">Tier 3: Threat Hunter / Senior Analyst (Proactive Threat Hunting)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Primary Responsibilities:</h4>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 ml-4">
                    <li>Proactive threat hunting for advanced persistent threats (APTs)</li>
                    <li>Develop custom detection rules and SIEM use cases</li>
                    <li>Analyze threat intelligence and IOCs</li>
                    <li>Reverse engineer malware samples</li>
                    <li>Lead major incident response efforts</li>
                    <li>Mentor Tier 1 and Tier 2 analysts</li>
                    <li>Conduct tabletop exercises and simulations</li>
                    <li>Recommend security architecture improvements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Required Skills:</h4>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 ml-4">
                    <li>Expert-level threat hunting methodologies</li>
                    <li>Advanced malware reverse engineering</li>
                    <li>Threat intelligence analysis (STIX/TAXII, MISP)</li>
                    <li>Custom tool development (Python, Go, C)</li>
                    <li>Cloud security (AWS, Azure, GCP)</li>
                    <li>Red team tactics and adversary emulation</li>
                  </ul>
                  <h4 className="font-semibold text-text-primary mt-3 mb-2">Certifications:</h4>
                  <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 ml-4">
                    <li>GCIA (GIAC Certified Intrusion Analyst)</li>
                    <li>GREM (GIAC Reverse Engineering Malware)</li>
                    <li>OSCP (Offensive Security Certified Professional)</li>
                    <li>CISSP (Certified Information Systems Security Professional)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Classification */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Alert Classification & Severity Levels
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-tertiary">
                  <th className="p-3 border border-border-color text-text-primary">Severity</th>
                  <th className="p-3 border border-border-color text-text-primary">Definition</th>
                  <th className="p-3 border border-border-color text-text-primary">Examples</th>
                  <th className="p-3 border border-border-color text-text-primary">Response SLA</th>
                  <th className="p-3 border border-border-color text-text-primary">Escalation</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary text-sm">
                <tr>
                  <td className="p-3 border border-border-color"><span className="px-3 py-1 bg-danger text-white rounded-full font-semibold">P1 - Critical</span></td>
                  <td className="p-3 border border-border-color">Active breach, data exfiltration, ransomware, system compromise</td>
                  <td className="p-3 border border-border-color">Ransomware encryption, confirmed data breach, C2 communication</td>
                  <td className="p-3 border border-border-color">15 minutes</td>
                  <td className="p-3 border border-border-color">Immediate to Tier 2 + SOC Manager + CISO</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color"><span className="px-3 py-1 bg-warning text-white rounded-full font-semibold">P2 - High</span></td>
                  <td className="p-3 border border-border-color">Suspected compromise, malware detection, privilege escalation</td>
                  <td className="p-3 border border-border-color">Malware on endpoint, suspicious lateral movement, brute force success</td>
                  <td className="p-3 border border-border-color">1 hour</td>
                  <td className="p-3 border border-border-color">Escalate to Tier 2 if unresolved in 2 hours</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color"><span className="px-3 py-1 bg-yellow-500 text-white rounded-full font-semibold">P3 - Medium</span></td>
                  <td className="p-3 border border-border-color">Policy violation, reconnaissance activity, failed attacks</td>
                  <td className="p-3 border border-border-color">Port scanning, failed phishing attempt, policy violation</td>
                  <td className="p-3 border border-border-color">4 hours</td>
                  <td className="p-3 border border-border-color">Escalate if unresolved in 8 hours</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color"><span className="px-3 py-1 bg-blue-500 text-white rounded-full font-semibold">P4 - Low</span></td>
                  <td className="p-3 border border-border-color">Informational alerts, minor anomalies, false positives</td>
                  <td className="p-3 border border-border-color">Unusual login time, software update, configuration change</td>
                  <td className="p-3 border border-border-color">24 hours</td>
                  <td className="p-3 border border-border-color">No escalation required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Incident Escalation Chart */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Incident Escalation Workflow</h2>
          <div className="bg-secondary p-6 rounded-lg font-mono text-sm text-text-secondary overflow-x-auto">
            <pre>{`
┌─────────────────────────────────────────────────────────────────────┐
│                        ALERT GENERATED IN SIEM                      │
│                    (Splunk, Elastic, QRadar, etc.)                  │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   TIER 1 ANALYST        │
                    │  (Initial Triage)       │
                    │  SLA: 15 minutes        │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Is this a TRUE alert?  │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
         ┌──────▼──────┐  ┌─────▼─────┐  ┌──────▼──────┐
         │ FALSE        │  │ CONFIRMED │  │  UNCERTAIN  │
         │ POSITIVE     │  │  THREAT   │  │  (NEEDS     │
         │              │  │           │  │  ANALYSIS)  │
         └──────┬──────┘  └─────┬─────┘  └──────┬──────┘
                │                │                │
         ┌──────▼──────┐  ┌─────▼─────┐  ┌──────▼──────┐
         │ CLOSE TICKET│  │ ESCALATE  │  │ ESCALATE TO │
         │ DOCUMENT    │  │ TO TIER 2 │  │   TIER 2    │
         │ REASON      │  │           │  │             │
         └─────────────┘  └─────┬─────┘  └──────┬──────┘
                                 │                │
                                 └────────┬───────┘
                                          │
                            ┌─────────────▼─────────────┐
                            │   TIER 2 ANALYST          │
                            │  (Deep Investigation)     │
                            │  SLA: 1 hour              │
                            └─────────────┬─────────────┘
                                          │
                            ┌─────────────▼─────────────┐
                            │  Severity Assessment      │
                            └─────────────┬─────────────┘
                                          │
                ┌─────────────────────────┼─────────────────────────┐
                │                         │                         │
         ┌──────▼──────┐          ┌──────▼──────┐          ┌──────▼──────┐
         │ P4 - LOW    │          │ P3 - MEDIUM │          │ P2 - HIGH   │
         │ P3 - MEDIUM │          │ P2 - HIGH   │          │ P1 - CRITICAL│
         └──────┬──────┘          └──────┬──────┘          └──────┬──────┘
                │                         │                         │
         ┌──────▼──────┐          ┌──────▼──────┐          ┌──────▼──────┐
         │ TIER 2      │          │ TIER 2      │          │ ESCALATE TO │
         │ HANDLES     │          │ HANDLES +   │          │ TIER 3 +    │
         │             │          │ NOTIFY MGR  │          │ SOC MANAGER │
         └─────────────┘          └─────────────┘          │ + CISO      │
                                                            └──────┬──────┘
                                                                   │
                                                     ┌─────────────▼─────────────┐
                                                     │   TIER 3 / THREAT HUNTER  │
                                                     │  (Advanced Analysis)      │
                                                     │  + INCIDENT COMMANDER     │
                                                     └─────────────┬─────────────┘
                                                                   │
                                                     ┌─────────────▼─────────────┐
                                                     │  CONTAINMENT & ERADICATION│
                                                     │  RECOVERY & LESSONS LEARNED│
                                                     └───────────────────────────┘
            `}</pre>
          </div>
        </div>

        {/* SOC Playbooks */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            SOC Playbooks for Common Scenarios
          </h2>

          <div className="space-y-6">
            {/* Phishing Playbook */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-warning">
              <h3 className="text-xl font-bold text-text-primary mb-3">Playbook 1: Phishing Email Investigation</h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Trigger:</h4>
                  <p>User reports suspicious email OR email security gateway flags malicious email</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Quarantine email in email gateway (Proofpoint, Mimecast)</li>
                    <li>Extract email headers and analyze sender reputation</li>
                    <li>Check URLs and attachments in sandbox (Any.run, Joe Sandbox)</li>
                    <li>Search SIEM for other users who received the same email</li>
                    <li>If malicious: Block sender domain/IP, delete from all mailboxes</li>
                    <li>If user clicked link: Isolate endpoint, scan for malware, reset credentials</li>
                    <li>Send security awareness reminder to affected users</li>
                    <li>Document IOCs (sender, URLs, file hashes) in threat intelligence platform</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Escalation Criteria:</h4>
                  <p>Escalate to Tier 2 if: Malware detected, credentials compromised, or &gt;10 users affected</p>
                </div>
              </div>
            </div>

            {/* Malware Detection Playbook */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-danger">
              <h3 className="text-xl font-bold text-text-primary mb-3">Playbook 2: Malware Detection on Endpoint</h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Trigger:</h4>
                  <p>EDR alert (CrowdStrike, SentinelOne, Carbon Black) for malware execution</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Isolate endpoint from network via EDR (network containment)</li>
                    <li>Identify malware family and behavior (ransomware, trojan, spyware)</li>
                    <li>Check for lateral movement or C2 communication in SIEM</li>
                    <li>Collect forensic artifacts (memory dump, disk image, process tree)</li>
                    <li>Determine infection vector (email, USB, drive-by download)</li>
                    <li>Remediate: Remove malware, restore from backup if encrypted</li>
                    <li>Reset user credentials and force password change</li>
                    <li>Update EDR signatures and SIEM rules to detect similar threats</li>
                    <li>Conduct post-incident review and update playbook</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Escalation Criteria:</h4>
                  <p>Escalate to Tier 2 immediately if: Ransomware, data exfiltration, or multiple endpoints affected</p>
                </div>
              </div>
            </div>

            {/* Brute Force Playbook */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-warning">
              <h3 className="text-xl font-bold text-text-primary mb-3">Playbook 3: Brute Force Attack</h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Trigger:</h4>
                  <p>Multiple failed login attempts from single IP or against single account</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Identify source IP and target account(s)</li>
                    <li>Check if IP is known malicious (threat intelligence feeds)</li>
                    <li>Block source IP at firewall or WAF</li>
                    <li>Lock targeted account(s) temporarily</li>
                    <li>Notify account owner and require password reset</li>
                    <li>Review authentication logs for successful logins from same IP</li>
                    <li>If successful login found: Investigate for unauthorized access</li>
                    <li>Update firewall rules and rate limiting policies</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Escalation Criteria:</h4>
                  <p>Escalate to Tier 2 if: Successful login detected or privileged account targeted</p>
                </div>
              </div>
            </div>

            {/* Insider Threat Playbook */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-danger">
              <h3 className="text-xl font-bold text-text-primary mb-3">Playbook 4: Suspected Insider Threat</h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Trigger:</h4>
                  <p>Unusual data access, large file downloads, access to unauthorized systems, or HR notification</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>DO NOT alert the suspected user (maintain operational security)</li>
                    <li>Notify SOC Manager and CISO immediately</li>
                    <li>Coordinate with HR and Legal before taking action</li>
                    <li>Review user's access logs, file transfers, email, and web activity</li>
                    <li>Check for data exfiltration (USB, cloud storage, email)</li>
                    <li>If confirmed: Disable account, revoke access, collect evidence</li>
                    <li>Preserve forensic evidence for potential legal action</li>
                    <li>Conduct damage assessment and notify affected parties if required</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Escalation Criteria:</h4>
                  <p>Escalate to CISO + Legal immediately. This is always a P1 incident.</p>
                </div>
              </div>
            </div>

            {/* Ransomware Playbook */}
            <div className="bg-tertiary p-6 rounded-lg border-l-4 border-danger">
              <h3 className="text-xl font-bold text-text-primary mb-3">Playbook 5: Ransomware Incident</h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Trigger:</h4>
                  <p>File encryption detected, ransom note found, or EDR alert for ransomware behavior</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li><strong>IMMEDIATE:</strong> Isolate all affected systems from network</li>
                    <li><strong>IMMEDIATE:</strong> Notify SOC Manager, CISO, and Incident Response Team</li>
                    <li>Identify ransomware variant (ransom note, file extensions, IOCs)</li>
                    <li>Determine scope: How many systems are encrypted?</li>
                    <li>Check backups: Are they intact and not encrypted?</li>
                    <li>Disable user accounts that may be compromised</li>
                    <li>Engage law enforcement (FBI, local police) - DO NOT PAY RANSOM without legal/executive approval</li>
                    <li>Restore from backups after confirming ransomware is eradicated</li>
                    <li>Conduct full forensic investigation to determine entry point</li>
                    <li>Implement additional controls to prevent recurrence</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Escalation Criteria:</h4>
                  <p>This is ALWAYS a P1 Critical incident. Activate full Incident Response Team immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chain of Custody */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Chain of Custody for Digital Evidence</h2>
          <div className="space-y-4 text-text-secondary">
            <p className="leading-relaxed">
              Proper chain of custody ensures that digital evidence is admissible in legal proceedings. All evidence must be
              documented, preserved, and handled according to forensic best practices.
            </p>

            <div className="bg-tertiary p-6 rounded-lg">
              <h3 className="text-lg font-bold text-text-primary mb-3">Evidence Collection Procedure:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
                <li><strong>Identification:</strong> Document what evidence is being collected (disk image, memory dump, logs)</li>
                <li><strong>Preservation:</strong> Create forensic copies using write-blockers; never work on original evidence</li>
                <li><strong>Hashing:</strong> Generate cryptographic hashes (SHA-256) to prove integrity</li>
                <li><strong>Documentation:</strong> Record who collected evidence, when, where, and why</li>
                <li><strong>Storage:</strong> Store in secure, tamper-proof location with restricted access</li>
                <li><strong>Transfer:</strong> Document every person who handles evidence (chain of custody form)</li>
                <li><strong>Analysis:</strong> Work only on forensic copies, never original evidence</li>
                <li><strong>Reporting:</strong> Document findings with timestamps, tools used, and methodology</li>
              </ol>
            </div>

            <div className="bg-warning/20 border-l-4 border-warning p-4 rounded">
              <h3 className="text-lg font-bold text-text-primary mb-2">⚠️ Critical Rules:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Never power off a running system without capturing memory first (volatile data loss)</li>
                <li>Use forensic tools (FTK Imager, dd, EnCase) for evidence collection</li>
                <li>Maintain detailed notes and timestamps for all actions</li>
                <li>Store evidence in encrypted, access-controlled storage</li>
                <li>Coordinate with Legal before sharing evidence externally</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example Case Investigation */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Example Case Investigation: Credential Theft</h2>
          <div className="space-y-4 text-text-secondary text-sm">
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Scenario:</h3>
              <p>SIEM alert: User "john.doe" logged in from unusual location (Russia) at 3:00 AM local time</p>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Investigation Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li><strong>Tier 1 Triage:</strong> Verify user's normal login patterns. John typically logs in from Canada during business hours.</li>
                <li><strong>Initial Assessment:</strong> This is suspicious. Escalate to Tier 2.</li>
                <li><strong>Tier 2 Investigation:</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Check if user is traveling (contact user or manager) - User confirms he is NOT in Russia</li>
                    <li>Review authentication logs: Login used correct password (no failed attempts)</li>
                    <li>Check for MFA: MFA was bypassed using legacy protocol (IMAP)</li>
                    <li>Review user's recent activity: Unusual file downloads from SharePoint 2 days ago</li>
                    <li>Hypothesis: Credentials were stolen via phishing or malware</li>
                  </ul>
                </li>
                <li><strong>Containment:</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Immediately disable user account</li>
                    <li>Terminate all active sessions</li>
                    <li>Block source IP at firewall</li>
                    <li>Reset user's password and require MFA re-enrollment</li>
                  </ul>
                </li>
                <li><strong>Eradication:</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Scan user's endpoint for malware (EDR full scan)</li>
                    <li>Review email for phishing attempts (found credential harvesting email from 3 days ago)</li>
                    <li>Block phishing domain and sender</li>
                    <li>Search for other users who received the same phishing email</li>
                  </ul>
                </li>
                <li><strong>Recovery:</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Re-enable user account after password reset and MFA setup</li>
                    <li>Disable legacy authentication protocols (IMAP, POP3) organization-wide</li>
                    <li>Send security awareness reminder about phishing</li>
                  </ul>
                </li>
                <li><strong>Lessons Learned:</strong>
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Enforce MFA for all protocols (no exceptions)</li>
                    <li>Implement geo-blocking for high-risk countries</li>
                    <li>Improve phishing detection rules in email gateway</li>
                    <li>Conduct phishing simulation training</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">Outcome:</h3>
              <p>Incident contained within 45 minutes. No data exfiltration detected. User credentials secured.
              Organization-wide security improvements implemented.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

