import { Activity } from 'lucide-react';

export default function DetectionMonitoring() {
  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Activity className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Detection & Monitoring</h1>
            <p className="text-text-secondary mt-2">SIEM Architecture, Detection Rules & MITRE ATT&CK Mapping</p>
          </div>
        </div>

        {/* SIEM Architecture */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">SIEM Architecture</h2>
          <div className="bg-secondary p-6 rounded-lg font-mono text-xs text-text-secondary overflow-x-auto">
            <pre>{`
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            LOG SOURCES (Data Collection)                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│  Endpoints (EDR)  │  Network (Firewall/IDS)  │  Cloud (AWS/Azure)  │  Identity  │
│  - Windows Logs   │  - Palo Alto             │  - CloudTrail       │  - Azure AD│
│  - Linux Syslog   │  - Cisco ASA             │  - VPC Flow Logs    │  - Okta    │
│  - macOS Logs     │  - Suricata IDS          │  - GuardDuty        │  - AD      │
│  - CrowdStrike    │  - Zeek (Bro)            │  - Security Hub     │            │
└─────────┬───────────────────┬────────────────────┬─────────────────────┬─────────┘
          │                   │                    │                     │
          └───────────────────┴────────────────────┴─────────────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │   LOG AGGREGATION LAYER   │
                          │  (Logstash, Fluentd)      │
                          │  - Parsing & Normalization│
                          │  - Enrichment (GeoIP, TI) │
                          └─────────────┬─────────────┘
                                        │
                          ┌─────────────▼─────────────┐
                          │   SIEM PLATFORM           │
                          │  (Splunk / Elastic Stack) │
                          │  - Indexing & Storage     │
                          │  - Correlation Engine     │
                          │  - Detection Rules        │
                          └─────────────┬─────────────┘
                                        │
                ┌───────────────────────┼───────────────────────┐
                │                       │                       │
    ┌───────────▼──────────┐ ┌─────────▼─────────┐ ┌─────────▼─────────┐
    │  SOC DASHBOARD       │ │  ALERTING         │ │  THREAT INTEL     │
    │  - Real-time Metrics │ │  - Email/Slack    │ │  - MISP           │
    │  - Visualizations    │ │  - PagerDuty      │ │  - STIX/TAXII     │
    │  - Threat Hunting    │ │  - ServiceNow     │ │  - IOC Feeds      │
    └──────────────────────┘ └───────────────────┘ └───────────────────┘
            `}</pre>
          </div>
        </div>

        {/* Log Sources */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Log Sources & Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Endpoint Logs</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Windows Event Logs (Security, System, Application)</li>
                <li>• Sysmon (Process creation, network connections)</li>
                <li>• EDR telemetry (CrowdStrike, SentinelOne)</li>
                <li>• PowerShell script block logging</li>
                <li>• Linux auditd logs</li>
              </ul>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Network Logs</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Firewall allow/deny logs</li>
                <li>• IDS/IPS alerts (Suricata, Snort)</li>
                <li>• DNS query logs</li>
                <li>• Proxy logs (web traffic)</li>
                <li>• VPN connection logs</li>
              </ul>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Cloud Logs</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• AWS CloudTrail (API calls)</li>
                <li>• Azure Activity Logs</li>
                <li>• GCP Audit Logs</li>
                <li>• S3 access logs</li>
                <li>• Lambda function logs</li>
              </ul>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Identity & Access</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Azure AD sign-in logs</li>
                <li>• Okta authentication logs</li>
                <li>• Active Directory logs</li>
                <li>• MFA events</li>
                <li>• Privileged access logs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detection Rules */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Example Detection Rules</h2>
          <div className="space-y-4">
            <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">Rule 1: Brute Force Attack Detection</h3>
              <p className="text-sm text-text-secondary mb-2"><strong>Logic:</strong> &gt;5 failed login attempts from same IP within 5 minutes</p>
              <p className="text-sm text-text-secondary mb-2"><strong>MITRE ATT&CK:</strong> T1110 - Brute Force</p>
              <div className="bg-secondary p-3 rounded font-mono text-xs text-text-secondary mt-2">
                <code>index=auth action=failure | stats count by src_ip | where count &gt; 5</code>
              </div>
            </div>

            <div className="bg-warning/20 border-l-4 border-warning p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">Rule 2: Suspicious PowerShell Execution</h3>
              <p className="text-sm text-text-secondary mb-2"><strong>Logic:</strong> PowerShell with encoded commands or download cradles</p>
              <p className="text-sm text-text-secondary mb-2"><strong>MITRE ATT&CK:</strong> T1059.001 - PowerShell</p>
              <div className="bg-secondary p-3 rounded font-mono text-xs text-text-secondary mt-2">
                <code>EventCode=4104 ScriptBlockText=*-EncodedCommand* OR *DownloadString*</code>
              </div>
            </div>

            <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">Rule 3: Lateral Movement via RDP</h3>
              <p className="text-sm text-text-secondary mb-2"><strong>Logic:</strong> RDP login from internal host to multiple other hosts</p>
              <p className="text-sm text-text-secondary mb-2"><strong>MITRE ATT&CK:</strong> T1021.001 - Remote Desktop Protocol</p>
              <div className="bg-secondary p-3 rounded font-mono text-xs text-text-secondary mt-2">
                <code>EventCode=4624 LogonType=10 | stats dc(dest_host) by src_host | where dc &gt; 3</code>
              </div>
            </div>
          </div>
        </div>

        {/* MITRE ATT&CK Mapping */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">MITRE ATT&CK Coverage</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-tertiary">
                  <th className="p-3 border border-border-color text-text-primary">Tactic</th>
                  <th className="p-3 border border-border-color text-text-primary">Technique</th>
                  <th className="p-3 border border-border-color text-text-primary">Detection Coverage</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <td className="p-3 border border-border-color">Initial Access</td>
                  <td className="p-3 border border-border-color">T1566 - Phishing</td>
                  <td className="p-3 border border-border-color"><span className="text-success">✓ Email gateway + SIEM rules</span></td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color">Execution</td>
                  <td className="p-3 border border-border-color">T1059 - Command and Scripting</td>
                  <td className="p-3 border border-border-color"><span className="text-success">✓ Sysmon + EDR</span></td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color">Persistence</td>
                  <td className="p-3 border border-border-color">T1053 - Scheduled Task/Job</td>
                  <td className="p-3 border border-border-color"><span className="text-success">✓ Windows Event Logs</span></td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color">Privilege Escalation</td>
                  <td className="p-3 border border-border-color">T1078 - Valid Accounts</td>
                  <td className="p-3 border border-border-color"><span className="text-warning">⚠ Partial (UEBA required)</span></td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color">Credential Access</td>
                  <td className="p-3 border border-border-color">T1110 - Brute Force</td>
                  <td className="p-3 border border-border-color"><span className="text-success">✓ Auth logs + correlation</span></td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color">Lateral Movement</td>
                  <td className="p-3 border border-border-color">T1021 - Remote Services</td>
                  <td className="p-3 border border-border-color"><span className="text-success">✓ Network logs + EDR</span></td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color">Exfiltration</td>
                  <td className="p-3 border border-border-color">T1041 - Exfiltration Over C2</td>
                  <td className="p-3 border border-border-color"><span className="text-success">✓ Network monitoring + DLP</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

