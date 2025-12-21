require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Initialize Firebase Admin (Optional - only needed if backend needs to write to Firebase)
// For now, we'll skip Firebase Admin since the frontend handles all Firebase operations
let db = null;

try {
  // Only initialize if credentials are properly configured
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
    db = admin.firestore();
    console.log('✅ Firebase Admin initialized');
  } else {
    console.log('⚠️  Firebase Admin not configured (optional - frontend handles Firebase)');
  }
} catch (error) {
  console.error('❌ Firebase Admin initialization failed:', error.message);
  console.log('⚠️  Continuing without Firebase Admin (frontend handles Firebase)');
}

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server ready');
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CyberTrack Backend API',
    endpoints: {
      health: 'GET /',
      welcomeEmail: 'POST /send-welcome-email',
      dailyReminders: 'POST /send-daily-reminders',
      loginNotification: 'POST /send-login-notification',
    }
  });
});

// Send welcome email endpoint
app.post('/send-welcome-email', async (req, res) => {
  try {
    const { email, displayName } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const mailOptions = {
      from: `CyberTrack <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '🎉 Welcome to CyberTrack - Your Cybersecurity Journey Starts Now!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00d4ff 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #00d4ff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .badge { background: #ef4444; color: white; padding: 5px 10px; border-radius: 5px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛡️ Welcome to CyberTrack!</h1>
              <p><span class="badge">🍁 Made in Canada</span></p>
            </div>
            <div class="content">
              <h2>Hey ${displayName || 'there'}! 👋</h2>
              <p>You've just taken the first step towards becoming a cybersecurity professional!</p>

              <h3>🚀 Here's what you can do next:</h3>
              <ol>
                <li><strong>Complete your onboarding</strong> to generate your personalized curriculum</li>
                <li><strong>Start logging daily progress</strong> (60% hands-on, 40% theory max)</li>
                <li><strong>Track your skills</strong> in the Skills Matrix</li>
                <li><strong>Build your portfolio</strong> with real projects</li>
              </ol>

              <p><strong>⚠️ Remember:</strong> CyberTrack enforces evidence-based learning to prevent "tutorial hell". You'll need to submit screenshots, writeups, and proof of hands-on work.</p>

              <a href="${process.env.FRONTEND_URL || 'http://localhost:5175'}/app/dashboard" class="button">
                Get Started Now →
              </a>

              <p>Let's build real cybersecurity skills together! 💪</p>
            </div>
            <div class="footer">
              <p><strong>CyberTrack</strong> - Evidence-Based Cybersecurity Learning</p>
              <p>Made with ❤️ in Canada 🍁</p>
              <p>
                <strong>Creator:</strong> Raghav Mahajan<br>
                <a href="https://www.linkedin.com/in/raghav-mahajan-17611b24b">LinkedIn</a> |
                <a href="https://github.com/raghv-m">GitHub</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to: ${email}`);

    res.json({ success: true, message: 'Welcome email sent successfully' });
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    res.status(500).json({ error: 'Failed to send welcome email', details: error.message });
  }
});

// Send daily reminders endpoint (called by cron jobs)
app.post('/send-daily-reminders', async (req, res) => {
  // Verify cron secret
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get all users from Firestore
    const usersSnapshot = await db.collection('users').get();
    let emailsSent = 0;
    let emailsFailed = 0;

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();

      if (!userData.email) continue;

      try {
        const mailOptions = {
          from: `CyberTrack <${process.env.GMAIL_USER}>`,
          to: userData.email,
          subject: '⏰ CyberTrack Reminder - Log Your Progress!',
          html: `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Hey ${userData.displayName || 'there'}! 👋</h2>
                <p>Time to log your cybersecurity progress for today!</p>

                <div style="background: #f0f9ff; border-left: 4px solid #00d4ff; padding: 15px; margin: 20px 0;">
                  <p><strong>Remember the 60/40 rule:</strong></p>
                  <ul>
                    <li>60% hands-on labs and tools</li>
                    <li>40% theory maximum</li>
                  </ul>
                </div>

                <a href="${process.env.FRONTEND_URL || 'http://localhost:5175'}/app/daily-log"
                   style="display: inline-block; padding: 12px 30px; background: #00d4ff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                  Log Progress Now →
                </a>

                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  Made with ❤️ in Canada 🍁<br>
                  <a href="https://www.linkedin.com/in/raghav-mahajan-17611b24b">LinkedIn</a> |
                  <a href="https://github.com/raghv-m">GitHub</a>
                </p>
              </div>
            </body>
            </html>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailsSent++;
      } catch (emailError) {
        console.error(`Failed to send email to ${userData.email}:`, emailError.message);
        emailsFailed++;
      }
    }

    console.log(`✅ Daily reminders sent: ${emailsSent} successful, ${emailsFailed} failed`);
    res.json({
      success: true,
      message: 'Daily reminders sent',
      stats: { sent: emailsSent, failed: emailsFailed }
    });
  } catch (error) {
    console.error('❌ Error sending daily reminders:', error);
    res.status(500).json({ error: 'Failed to send reminders', details: error.message });
  }
});

// Send login notification endpoint
app.post('/send-login-notification', async (req, res) => {
  try {
    const { email, displayName, loginTime, ipAddress, device } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const formattedTime = new Date(loginTime || Date.now()).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Edmonton'
    });

    const mailOptions = {
      from: `CyberTrack Security <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '🔐 New Login to Your CyberTrack Account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
            .header { background: #6366F1; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: #f0f0f0; padding: 15px; border-left: 4px solid #6366F1; margin: 20px 0; }
            .warning { background: #FEF3C7; border-left-color: #F59E0B; }
            .button { display: inline-block; padding: 12px 30px; background: #6366F1; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🔐 New Login Detected</h1>
            </div>
            <div class="content">
              <p>Hi ${displayName || 'there'},</p>

              <p>We detected a new login to your CyberTrack account. If this was you, you can safely ignore this email.</p>

              <div class="info-box">
                <h3 style="margin-top: 0;">Login Details:</h3>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime} (Edmonton Time)</p>
                <p style="margin: 5px 0;"><strong>Device:</strong> ${device || 'Unknown device'}</p>
                <p style="margin: 5px 0;"><strong>IP Address:</strong> ${ipAddress || 'Unknown'}</p>
              </div>

              <div class="info-box warning">
                <h3 style="margin-top: 0;">⚠️ Wasn't you?</h3>
                <p>If you didn't log in at this time, your account may be compromised. Please:</p>
                <ul>
                  <li>Change your password immediately</li>
                  <li>Enable two-factor authentication</li>
                  <li>Review your recent account activity</li>
                </ul>
              </div>

              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/app/settings" class="button">
                Review Account Security →
              </a>

              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                This is an automated security notification from CyberTrack.<br>
                Made with ❤️ in Canada 🍁
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Login notification sent to ${email}`);
    res.json({ success: true, message: 'Login notification sent' });
  } catch (error) {
    console.error('❌ Error sending login notification:', error);
    res.status(500).json({ error: 'Failed to send notification', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 CyberTrack Backend running on port ${PORT}`);
  console.log(`📧 Email: ${process.env.GMAIL_USER}`);
  console.log(`🔥 Firebase Project: ${process.env.FIREBASE_PROJECT_ID}`);
});




// Refresh news endpoint - triggers Python scraper
app.post('/api/refresh-news', async (req, res) => {
  try {
    console.log('📰 News refresh requested...');

    // Trigger Python scraper
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python', ['../scrapers/fetch_real_news.py'], {
      cwd: __dirname
    });

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`✅ Python scraper finished with code ${code}`);
    });

    res.json({
      success: true,
      message: 'News refresh triggered successfully'
    });
  } catch (error) {
    console.error('Error refreshing news:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
