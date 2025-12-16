# CyberTrack Backend

Node.js backend for email automation and API endpoints.

## 🚀 Quick Start

### Local Development

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Fill in environment variables in `.env`

4. Start server:
```bash
npm start
```

Server runs on http://localhost:3000

## 📧 Endpoints

### GET /
Health check endpoint
```bash
curl http://localhost:3000/
```

### POST /send-welcome-email
Send welcome email to new user
```bash
curl -X POST http://localhost:3000/send-welcome-email \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","displayName":"John Doe"}'
```

### POST /send-daily-reminders
Send daily reminders to all users (protected by CRON_SECRET)
```bash
curl -X POST http://localhost:3000/send-daily-reminders \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## 🔧 Environment Variables

See `.env.example` for all required variables.

## 📦 Dependencies

- `express` - Web framework
- `nodemailer` - Email sending
- `firebase-admin` - Firestore access
- `cors` - CORS middleware
- `dotenv` - Environment variables

## 🚀 Deployment

See `../DEPLOYMENT.md` for complete deployment instructions.

---

Made with ❤️ in Canada 🍁 by Raghav Mahajan

