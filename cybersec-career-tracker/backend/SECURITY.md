# CyberPath Pro Backend Security Guidelines

## Overview
This document outlines the security measures implemented in the CyberPath Pro backend to protect user data and ensure system integrity.

## Authentication & Authorization

### Firebase Authentication
- Email/Password authentication with secure password hashing
- OAuth 2.0 integration with Google for social login
- Multi-factor authentication (MFA) support
- Session management with secure tokens

### Role-Based Access Control (RBAC)
- Standard users: Access to their own data only
- Admin users: Access to system-wide analytics and user management
- Instructor users: Access to course content and student progress

### Token Security
- Short-lived ID tokens (1 hour)
- Secure token storage in HTTP-only cookies
- CSRF protection for state-changing operations

## Data Protection

### Encryption at Rest
- Firestore automatically encrypts all data at rest
- Sensitive fields additionally encrypted with AES-256
- Key management through Firebase Security Rules

### Encryption in Transit
- All communications over HTTPS/TLS 1.3
- Strict transport security headers
- Certificate pinning for critical services

### Data Minimization
- Collect only necessary user information
- Automatic data purging policies
- User-controlled data deletion

## Input Validation & Sanitization

### API Input Validation
- Schema validation for all incoming requests
- Type checking and format validation
- Size limits for all input fields
- Rate limiting to prevent abuse

### Output Encoding
- HTML entity encoding for user-generated content
- JSON encoding for API responses
- URL encoding for redirects

### XSS Prevention
- Content Security Policy (CSP) headers
- Input sanitization using DOMPurify
- Strict output escaping

## Firestore Security Rules

### Document-Level Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User goals are private to each user
    match /userGoals/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Skills matrix is private to each user
    match /skillsMatrix/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Daily logs are private to each user
    match /dailyLogs/{logId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Todos are private to each user
    match /todos/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Portfolio items are private to each user
    match /portfolioItems/{itemId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Incident reports have controlled access
    match /incidentReports/{reportId} {
      // Users can create and read their own reports
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
        (resource.data.submittedBy.uid == request.auth.uid || 
         request.auth.token.admin == true);
      
      // Only admins can update reports
      allow update: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // News articles are publicly readable
    match /newsArticles/{articleId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}
```

### Field-Level Validation
- Type checking for all fields
- Range validation for numeric values
- Format validation for emails, URLs, dates
- Size limits for text fields

## API Security

### Rate Limiting
- 100 requests per minute per IP for anonymous endpoints
- 1000 requests per minute per user for authenticated endpoints
- Burst allowance for legitimate spikes
- Automatic IP blocking for abuse

### CORS Configuration
```javascript
app.use(cors({
  origin: [
    'https://cyberpathpro.com',
    'https://www.cyberpathpro.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### Input Sanitization
```javascript
const sanitize = require('sanitize-html');

function sanitizeInput(input) {
  return sanitize(input, {
    allowedTags: [],
    allowedAttributes: {}
  });
}
```

## Secret Management

### Environment Variables
All secrets stored in environment variables:
- Gmail credentials
- Firebase Admin SDK keys
- API keys and tokens
- Database connection strings

### Secret Rotation
- Automated rotation for time-sensitive secrets
- Manual rotation for critical credentials
- Emergency revocation procedures

### Storage Security
```
# .env (never committed to repository)
GMAIL_USER=secure@example.com
GMAIL_APP_PASSWORD=app_specific_password
FIREBASE_PROJECT_ID=project-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
FIREBASE_CLIENT_EMAIL=service-account@project-id.iam.gserviceaccount.com
CRON_SECRET=random_secure_string
```

## Email Security

### SPF/DKIM/DMARC
- Proper DNS records for email authentication
- DKIM signing for all outgoing emails
- DMARC policy enforcement

### Content Security
- No executable attachments
- Sanitized HTML content
- Link tracking with redirect validation

### Delivery Security
- TLS encryption for SMTP
- App-specific passwords for Gmail
- Rate limiting to prevent spam

## Logging & Monitoring

### Security Logging
- All authentication attempts
- Failed login attempts
- Privilege escalation events
- Data access patterns

### Log Protection
- Structured logging format
- Log retention policies
- Secure log storage
- Audit trail integrity

### Anomaly Detection
- Unusual login patterns
- Excessive API usage
- Geographic anomalies
- Suspicious data access

## Incident Response

### Breach Detection
- Real-time monitoring
- Automated alerts
- Behavioral analysis
- Threat intelligence integration

### Response Procedures
1. Immediate containment
2. Impact assessment
3. Evidence preservation
4. Stakeholder notification
5. Remediation and recovery
6. Post-incident review

### Communication Plan
- Internal team notification
- Affected user notification
- Regulatory reporting
- Public disclosure (if required)

## Compliance

### GDPR Compliance
- Right to access personal data
- Right to data portability
- Right to erasure
- Data processing agreements

### CCPA Compliance
- Right to know what data is collected
- Right to delete personal information
- Opt-out of data sale (not applicable)
- Non-discrimination for exercise of rights

### Industry Standards
- OWASP Top 10 compliance
- NIST Cybersecurity Framework alignment
- ISO 27001 best practices

## Regular Security Audits

### Automated Testing
- Static code analysis
- Dynamic application security testing (DAST)
- Software composition analysis (SCA)
- Dependency vulnerability scanning

### Manual Reviews
- Penetration testing
- Security code reviews
- Architecture assessments
- Third-party audits

### Continuous Improvement
- Regular security training
- Threat modeling sessions
- Security champion program
- Bug bounty considerations