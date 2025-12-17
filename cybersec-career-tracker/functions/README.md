# CyberTrack Firebase Cloud Functions

This directory contains Firebase Cloud Functions for email automation and backend triggers.

## 📋 Functions Overview

### 1. **sendWelcomeEmail** (Auth Trigger)
- **Trigger**: When a new user signs up
- **Action**: Sends welcome email with onboarding steps
- **Email**: Welcome message with dashboard link

### 2. **processEmailQueue** (Scheduled - Every 5 minutes)
- **Trigger**: Runs every 5 minutes
- **Action**: Processes pending emails from `emailQueue` collection
- **Features**: Retry logic (max 3 attempts), error handling

### 3. **sendDailyReminder1111AM** (Scheduled - 11:11 AM Edmonton)
- **Trigger**: Daily at 11:11 AM (America/Edmonton timezone)
- **Action**: Sends morning study reminders
- **Logic**: Different emails for users who logged vs. didn't log today

### 4. **sendDailyReminder1111PM** (Scheduled - 11:11 PM Edmonton)
- **Trigger**: Daily at 11:11 PM (America/Edmonton timezone)
- **Action**: Sends evening study reminders
- **Logic**: Different emails for users who logged vs. didn't log today

### 5. **onIncidentReportSubmitted** (Firestore Trigger)
- **Trigger**: When new incident report is created
- **Action**: 
  - Sends confirmation email to user
  - Sends notification email to admin
- **Email**: Report details and next steps

### 6. **onIncidentReportReviewed** (Firestore Trigger)
- **Trigger**: When incident report status changes
- **Action**: Sends review notification to user
- **Email**: Status (approved/rejected/revision_needed), score, feedback

### 7. **verifyEmail** (Callable Function)
- **Trigger**: Called from frontend
- **Action**: Marks user's email as verified
- **Returns**: Success message

### 8. **unsubscribeFromEmails** (HTTP Function)
- **Trigger**: GET request with userId and token
- **Action**: Unsubscribes user from all emails
- **Returns**: HTML confirmation page

## 🚀 Setup Instructions

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Functions (if not already done)
```bash
firebase init functions
```

### 4. Install Dependencies
```bash
cd functions
npm install
```

### 5. Configure Environment Variables
Create a `.env` file in the `functions/` directory:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- `SENDGRID_API_KEY` (optional - for SendGrid)
- `GMAIL_USER` and `GMAIL_APP_PASSWORD` (for Gmail SMTP)
- `FROM_EMAIL` and `FROM_NAME`
- `ADMIN_EMAIL`
- `APP_URL`

### 6. Deploy Functions
```bash
# Deploy all functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:sendWelcomeEmail
```

## 🧪 Testing Locally

### 1. Start Firebase Emulators
```bash
firebase emulators:start
```

### 2. Test Functions
```bash
# Test in Firebase Functions Shell
firebase functions:shell

# Call a function
sendWelcomeEmail({email: 'test@example.com', displayName: 'Test User'})
```

## 📧 Email Templates

All email templates are embedded in `index.js`. They use inline HTML/CSS for maximum email client compatibility.

### Email Features:
- ✅ Responsive design
- ✅ Inline CSS (works in all email clients)
- ✅ CyberTrack branding
- ✅ Call-to-action buttons
- ✅ "Made in Canada 🍁" footer

## 🔒 Security

- **Authentication**: Callable functions check `context.auth`
- **Email Verification**: Uses Firebase Auth
- **Unsubscribe**: Token-based (implement JWT in production)
- **Rate Limiting**: Firebase automatically rate-limits functions

## 📊 Monitoring

### View Logs
```bash
# Real-time logs
firebase functions:log

# Filter by function
firebase functions:log --only sendWelcomeEmail
```

### Firebase Console
- Go to Firebase Console > Functions
- View execution count, errors, and performance

## 🛠️ Troubleshooting

### Function Not Triggering
1. Check Firebase Console > Functions for errors
2. Verify Firestore rules allow function access
3. Check function logs: `firebase functions:log`

### Email Not Sending
1. Verify Gmail App Password is correct
2. Check Gmail "Less secure app access" settings
3. Review function logs for SMTP errors

### Scheduled Functions Not Running
1. Verify timezone is correct (`America/Edmonton`)
2. Check Firebase Console > Functions > Scheduled
3. Ensure billing is enabled (required for scheduled functions)

## 💰 Pricing

Firebase Cloud Functions pricing:
- **Free Tier**: 2M invocations/month, 400K GB-seconds, 200K CPU-seconds
- **Paid**: $0.40 per million invocations

**Estimated Monthly Cost** (for 100 users):
- Welcome emails: ~100 invocations/month = FREE
- Daily reminders: ~6,000 invocations/month = FREE
- Email queue: ~8,640 invocations/month = FREE
- Incident reports: ~50 invocations/month = FREE

**Total**: FREE (well within free tier)

## 📝 Notes

- Gmail SMTP has a limit of 500 emails/day
- For production with >500 users, use SendGrid or AWS SES
- Scheduled functions require Blaze (pay-as-you-go) plan
- All timestamps use Firestore server timestamps

## 🔗 Resources

- [Firebase Functions Docs](https://firebase.google.com/docs/functions)
- [Nodemailer Docs](https://nodemailer.com/)
- [SendGrid API Docs](https://docs.sendgrid.com/)

---

**Made with ❤️ in Canada 🍁 by Raghav Mahajan**

