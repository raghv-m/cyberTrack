import { Database, Shield, Lock, Eye, FileCheck, Trash2, Key, ArrowRight, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import CyberCard from '../../components/ui/CyberCard';
import FlowDiagram from '../../components/ui/FlowDiagram';
import FlowNode from '../../components/ui/FlowNode';

export default function DataProtection() {
  return (
    <div className="min-h-screen bg-[#0B0E11] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <PageHeader
          title="DATA PROTECTION & PRIVACY"
          subtitle="Data Classification, Retention, Encryption & PIPEDA Compliance"
          icon={Database}
          badge="PIPEDA Compliant"
          badgeColor="green"
        />

        {/* Data Classification Flow */}
        <CyberCard variant="blue" className="p-8 mb-8">
          <h2 className="text-2xl font-mono font-black text-white mb-6 flex items-center gap-3">
            <Shield className="w-7 h-7 text-cyber-blue" />
            Data Classification Framework
          </h2>

          <p className="text-text-tertiary font-mono text-sm mb-8">
            Visual flow: Identify Data Type → Assign Classification → Apply Controls → Review & Audit
          </p>

          {/* Classification Flow */}
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4">
            <FlowNode
              title="Identify Data"
              description="Scan & categorize"
              icon={Eye}
              status="active"
              badge="Step 1"
              badgeColor="blue"
            />
            <ArrowRight className="w-6 h-6 text-cyber-blue/50 flex-shrink-0" />
            <FlowNode
              title="Classify"
              description="Assign level"
              icon={FileCheck}
              status="decision"
              badge="Decision"
              badgeColor="gold"
            />
            <ArrowRight className="w-6 h-6 text-cyber-blue/50 flex-shrink-0" />
            <FlowNode
              title="Apply Controls"
              description="Encryption, access"
              icon={Lock}
              status="active"
              badge="Step 2"
              badgeColor="blue"
            />
            <ArrowRight className="w-6 h-6 text-cyber-blue/50 flex-shrink-0" />
            <FlowNode
              title="Monitor & Audit"
              description="Continuous review"
              icon={CheckCircle}
              status="completed"
              badge="Ongoing"
              badgeColor="green"
            />
          </div>

          {/* Classification Levels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-lg bg-cyber-red/10 border-2 border-cyber-red/30 hover:border-cyber-red hover:shadow-[0_0_20px_rgba(255,51,102,0.3)] transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-cyber-red shadow-[0_0_10px_rgba(255,51,102,0.8)]" />
                <h3 className="font-mono font-bold text-cyber-red">RESTRICTED</h3>
              </div>
              <p className="text-xs text-text-tertiary font-mono mb-3">PII, payment data, health records, credentials</p>
              <div className="space-y-1 text-xs font-mono text-text-secondary">
                <p>• AES-256 encryption</p>
                <p>• MFA required</p>
                <p>• Access logging</p>
                <p>• Annual reviews</p>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-cyber-gold/10 border-2 border-cyber-gold/30 hover:border-cyber-gold hover:shadow-neon-gold-sm transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-cyber-gold shadow-neon-gold-sm" />
                <h3 className="font-mono font-bold text-cyber-gold">CONFIDENTIAL</h3>
              </div>
              <p className="text-xs text-text-tertiary font-mono mb-3">Financial reports, contracts, strategic plans</p>
              <div className="space-y-1 text-xs font-mono text-text-secondary">
                <p>• Encryption in transit</p>
                <p>• Restricted access</p>
                <p>• Quarterly reviews</p>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-cyber-blue/10 border-2 border-cyber-blue/30 hover:border-cyber-blue hover:shadow-neon-blue-sm transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-cyber-blue shadow-neon-blue-sm" />
                <h3 className="font-mono font-bold text-cyber-blue">INTERNAL</h3>
              </div>
              <p className="text-xs text-text-tertiary font-mono mb-3">Policies, employee directory, meeting notes</p>
              <div className="space-y-1 text-xs font-mono text-text-secondary">
                <p>• Employee-only access</p>
                <p>• TLS recommended</p>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-cyber-green/10 border-2 border-cyber-green/30 hover:border-cyber-green hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-cyber-green shadow-[0_0_10px_rgba(0,255,136,0.8)]" />
                <h3 className="font-mono font-bold text-cyber-green">PUBLIC</h3>
              </div>
              <p className="text-xs text-text-tertiary font-mono mb-3">Marketing materials, press releases, public website</p>
              <div className="space-y-1 text-xs font-mono text-text-secondary">
                <p>• No special controls</p>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* Data Retention */}
        <CyberCard variant="default" className="p-8 mb-8">
          <h2 className="text-2xl font-mono font-black text-white mb-6 flex items-center gap-3">
            <Trash2 className="w-7 h-7 text-cyber-gold" />
            Data Retention & Disposal
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm font-mono">
              <thead>
                <tr className="bg-cyber-bg-elevated border-b-2 border-cyber-blue/30">
                  <th className="p-4 text-cyber-blue font-bold">Data Type</th>
                  <th className="p-4 text-cyber-blue font-bold">Retention Period</th>
                  <th className="p-4 text-cyber-blue font-bold">Disposal Method</th>
                </tr>
              </thead>
              <tbody className="text-text-tertiary">
                <tr className="border-b border-cyber-blue/10 hover:bg-cyber-bg-elevated/50 transition-colors duration-150">
                  <td className="p-4 text-white">Customer PII</td>
                  <td className="p-4">2 years after account closure</td>
                  <td className="p-4">Secure wipe (DoD 5220.22-M)</td>
                </tr>
                <tr className="border-b border-cyber-blue/10 hover:bg-cyber-bg-elevated/50 transition-colors duration-150">
                  <td className="p-4 text-white">Financial records</td>
                  <td className="p-4">7 years (tax compliance)</td>
                  <td className="p-4">Secure deletion + audit log</td>
                </tr>
                <tr className="border-b border-cyber-blue/10 hover:bg-cyber-bg-elevated/50 transition-colors duration-150">
                  <td className="p-4 text-white">Security logs</td>
                  <td className="p-4">1 year online, 7 years archive</td>
                  <td className="p-4">Automated deletion after retention</td>
                </tr>
                <tr className="border-b border-cyber-blue/10 hover:bg-cyber-bg-elevated/50 transition-colors duration-150">
                  <td className="p-4 text-white">Employee records</td>
                  <td className="p-4">7 years after termination</td>
                  <td className="p-4">Secure shredding (paper) / wipe (digital)</td>
                </tr>
                <tr className="hover:bg-cyber-bg-elevated/50 transition-colors duration-150">
                  <td className="p-4 text-white">Backup data</td>
                  <td className="p-4">90 days (incremental), 1 year (full)</td>
                  <td className="p-4">Overwrite backup media</td>
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

