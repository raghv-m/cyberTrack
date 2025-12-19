import { Cloud, Shield, Lock, Network } from 'lucide-react';

export default function CloudSecurity() {
  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Cloud className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text-primary">Cloud Security</h1>
            <p className="text-text-secondary mt-2">Shared Responsibility, IAM, Network Architecture & Best Practices</p>
          </div>
        </div>

        {/* Shared Responsibility Model */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Shared Responsibility Model</h2>
          <div className="bg-secondary p-6 rounded-lg font-mono text-xs text-text-secondary overflow-x-auto">
            <pre>{`
┌─────────────────────────────────────────────────────────────────────┐
│                    CUSTOMER RESPONSIBILITY                          │
│                    (Security IN the Cloud)                          │
├─────────────────────────────────────────────────────────────────────┤
│  • Customer Data (encryption, classification, access control)       │
│  • Application Security (code, dependencies, configurations)        │
│  • Identity & Access Management (IAM policies, MFA, roles)          │
│  • Operating System Patching (EC2, VMs)                             │
│  • Network Configuration (security groups, NACLs, firewalls)        │
│  • Encryption (at rest and in transit)                              │
│  • Logging & Monitoring (CloudTrail, CloudWatch, Azure Monitor)     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    CLOUD PROVIDER RESPONSIBILITY                    │
│                    (Security OF the Cloud)                          │
├─────────────────────────────────────────────────────────────────────┤
│  • Physical Security (data centers, hardware)                       │
│  • Infrastructure (compute, storage, networking hardware)           │
│  • Hypervisor & Virtualization Layer                                │
│  • Managed Service Security (RDS, S3, Lambda)                       │
│  • Global Network Infrastructure                                    │
│  • Compliance Certifications (SOC 2, ISO 27001, PCI DSS)            │
└─────────────────────────────────────────────────────────────────────┘
            `}</pre>
          </div>
        </div>

        {/* IAM Best Practices */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Identity & Access Management (IAM)</h2>
          <div className="space-y-4">
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Principle of Least Privilege</h3>
              <ul className="text-sm text-text-secondary space-y-1 ml-4 list-disc list-inside">
                <li>Grant minimum permissions required for job function</li>
                <li>Use IAM roles instead of long-term credentials</li>
                <li>Implement just-in-time (JIT) access for privileged operations</li>
                <li>Review and revoke unused permissions quarterly</li>
              </ul>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Multi-Factor Authentication (MFA)</h3>
              <ul className="text-sm text-text-secondary space-y-1 ml-4 list-disc list-inside">
                <li>Enforce MFA for all user accounts (no exceptions)</li>
                <li>Require MFA for console access and API calls</li>
                <li>Use hardware MFA (YubiKey) for privileged accounts</li>
                <li>Disable root account and use IAM users/roles</li>
              </ul>
            </div>

            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Service Accounts & Roles</h3>
              <ul className="text-sm text-text-secondary space-y-1 ml-4 list-disc list-inside">
                <li>Use IAM roles for EC2 instances (no hardcoded credentials)</li>
                <li>Rotate access keys every 90 days</li>
                <li>Use AWS Secrets Manager / Azure Key Vault for secrets</li>
                <li>Implement cross-account roles for multi-account access</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Network Architecture */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Secure Network Architecture</h2>
          <div className="bg-secondary p-6 rounded-lg font-mono text-xs text-text-secondary overflow-x-auto">
            <pre>{`
┌─────────────────────────────────────────────────────────────────────┐
│                          INTERNET                                   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                ┌────────────▼────────────┐
                │   WAF / CloudFront      │
                │  (DDoS Protection)      │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │  Application Load       │
                │  Balancer (ALB)         │
                └────────────┬────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌──────▼──────┐
│ Public Subnet  │  │ Public Subnet   │  │ Public      │
│ (Web Tier)     │  │ (Web Tier)      │  │ Subnet      │
│ - NAT Gateway  │  │ - Bastion Host  │  │             │
└───────┬────────┘  └────────┬────────┘  └─────────────┘
        │                    │
┌───────▼────────┐  ┌────────▼────────┐
│ Private Subnet │  │ Private Subnet  │
│ (App Tier)     │  │ (App Tier)      │
│ - EC2/ECS      │  │ - Lambda        │
└───────┬────────┘  └────────┬────────┘
        │                    │
┌───────▼────────┐  ┌────────▼────────┐
│ Private Subnet │  │ Private Subnet  │
│ (Data Tier)    │  │ (Data Tier)     │
│ - RDS          │  │ - ElastiCache   │
│ - No Internet  │  │ - No Internet   │
└────────────────┘  └─────────────────┘

Security Groups: Stateful firewall rules at instance level
NACLs: Stateless firewall rules at subnet level
VPC Flow Logs: Network traffic logging for analysis
            `}</pre>
          </div>
        </div>

        {/* Endpoint Protection */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Endpoint & Workload Protection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">EC2 / Virtual Machines</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Install EDR agent (CrowdStrike, SentinelOne)</li>
                <li>• Enable automatic OS patching</li>
                <li>• Harden configurations (CIS benchmarks)</li>
                <li>• Disable unnecessary services and ports</li>
                <li>• Use encrypted EBS volumes (AES-256)</li>
              </ul>
            </div>
            <div className="bg-tertiary p-4 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">Containers & Serverless</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Scan container images for vulnerabilities</li>
                <li>• Use minimal base images (Alpine, Distroless)</li>
                <li>• Implement runtime protection (Falco, Aqua)</li>
                <li>• Enforce least privilege for Lambda functions</li>
                <li>• Enable VPC integration for Lambda</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cloud Security Best Practices */}
        <div className="glass rounded-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Cloud Security Best Practices</h2>
          <div className="space-y-3">
            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">✓ Enable Logging & Monitoring</h3>
              <p className="text-sm text-text-secondary">CloudTrail, VPC Flow Logs, GuardDuty, Security Hub</p>
            </div>
            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">✓ Encrypt Everything</h3>
              <p className="text-sm text-text-secondary">S3 server-side encryption, RDS encryption, EBS encryption, TLS in transit</p>
            </div>
            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">✓ Implement Network Segmentation</h3>
              <p className="text-sm text-text-secondary">Use VPCs, subnets, security groups, and NACLs to isolate workloads</p>
            </div>
            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">✓ Automate Security</h3>
              <p className="text-sm text-text-secondary">Infrastructure as Code (Terraform, CloudFormation), automated compliance checks</p>
            </div>
            <div className="bg-success/20 border-l-4 border-success p-4 rounded">
              <h3 className="font-semibold text-text-primary mb-2">✓ Regular Backups</h3>
              <p className="text-sm text-text-secondary">Automated snapshots, cross-region replication, tested disaster recovery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

