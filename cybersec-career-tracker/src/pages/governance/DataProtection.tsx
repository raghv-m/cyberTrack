import { Database } from 'lucide-react';

export default function DataProtection() {
  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Database className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Data Protection & Privacy</h1>
            <p className="text-text-secondary mt-2">Data Classification, Retention, Encryption & PIPEDA Compliance</p>
          </div>
        </div>

        {/* Data Classification */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Data Classification Framework</h2>
          <div className="space-y-4">
            <div className="bg-danger/20 border-l-4 border-danger p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">🔴 RESTRICTED</h3>
              <p className="text-sm text-text-secondary mb-2">PII, payment data, health records, credentials</p>
              <p className="text-sm text-text-secondary"><strong>Controls:</strong> AES-256 encryption, MFA, access logging, annual reviews</p>
            </div>
            <div className="bg-warning/20 border-l-4 border-warning p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">🟡 CONFIDENTIAL</h3>
              <p className="text-sm text-text-secondary mb-2">Financial reports, contracts, strategic plans</p>
              <p className="text-sm text-text-secondary"><strong>Controls:</strong> Encryption in transit, restricted access, quarterly reviews</p>
            </div>
            <div className="bg-blue-500/20 border-l-4 border-blue-500 p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">🔵 INTERNAL</h3>
              <p className="text-sm text-text-secondary mb-2">Policies, employee directory, meeting notes</p>
              <p className="text-sm text-text-secondary"><strong>Controls:</strong> Employee-only access, TLS recommended</p>
            </div>
            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">🟢 PUBLIC</h3>
              <p className="text-sm text-text-secondary mb-2">Marketing materials, press releases, public website</p>
              <p className="text-sm text-text-secondary"><strong>Controls:</strong> No special controls required</p>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Data Retention & Disposal</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-tertiary">
                  <th className="p-3 border border-border-color text-text-primary">Data Type</th>
                  <th className="p-3 border border-border-color text-text-primary">Retention Period</th>
                  <th className="p-3 border border-border-color text-text-primary">Disposal Method</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <td className="p-3 border border-border-color">Customer PII</td>
                  <td className="p-3 border border-border-color">2 years after account closure</td>
                  <td className="p-3 border border-border-color">Secure wipe (DoD 5220.22-M)</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color">Financial records</td>
                  <td className="p-3 border border-border-color">7 years (tax compliance)</td>
                  <td className="p-3 border border-border-color">Secure deletion + audit log</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color">Security logs</td>
                  <td className="p-3 border border-border-color">1 year online, 7 years archive</td>
                  <td className="p-3 border border-border-color">Automated deletion after retention</td>
                </tr>
                <tr className="bg-secondary/30">
                  <td className="p-3 border border-border-color">Employee records</td>
                  <td className="p-3 border border-border-color">7 years after termination</td>
                  <td className="p-3 border border-border-color">Secure shredding (paper) / wipe (digital)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border-color">Backup data</td>
                  <td className="p-3 border border-border-color">90 days (incremental), 1 year (full)</td>
                  <td className="p-3 border border-border-color">Overwrite backup media</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Encryption Requirements */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Encryption Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Data at Rest</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Databases: AES-256-GCM</li>
                <li>• File storage: AES-256</li>
                <li>• Laptops: BitLocker / FileVault</li>
                <li>• Backups: Encrypted before storage</li>
                <li>• Cloud storage: Server-side encryption (SSE)</li>
              </ul>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Data in Transit</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Web traffic: TLS 1.3</li>
                <li>• APIs: HTTPS with mutual TLS</li>
                <li>• Email: TLS for SMTP, S/MIME for sensitive</li>
                <li>• File transfers: SFTP, FTPS, or HTTPS</li>
                <li>• VPN: IPsec or WireGuard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PIPEDA Compliance */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">PIPEDA Compliance (Canada)</h2>
          <div className="space-y-3">
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">1. Accountability</p>
              <p className="text-sm text-text-secondary">CISO designated as Privacy Officer</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">2. Identifying Purposes</p>
              <p className="text-sm text-text-secondary">Privacy Policy states data collection purposes</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">3. Consent</p>
              <p className="text-sm text-text-secondary">Explicit consent during signup; users can withdraw</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">4. Limiting Collection</p>
              <p className="text-sm text-text-secondary">Only collect necessary data (email, name, progress)</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">5. Limiting Use & Retention</p>
              <p className="text-sm text-text-secondary">Data used only for stated purposes; 2-year retention</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">6. Accuracy</p>
              <p className="text-sm text-text-secondary">Users can update information in Settings</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">7. Safeguards</p>
              <p className="text-sm text-text-secondary">Encryption, MFA, access controls, monitoring</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">8. Openness</p>
              <p className="text-sm text-text-secondary">Privacy Policy publicly available</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">9. Individual Access</p>
              <p className="text-sm text-text-secondary">Users can export all data in JSON format</p>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <p className="font-semibold text-text-primary">10. Challenging Compliance</p>
              <p className="text-sm text-text-secondary">Privacy complaints to privacy@cybertrack.ca</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

