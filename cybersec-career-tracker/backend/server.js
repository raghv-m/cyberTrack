require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
  console.log('✅ Firebase Admin initialized');
} catch (error) {
  console.error('❌ Firebase Admin initialization failed:', error.message);
}

const db = admin.firestore();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 CyberTrack Backend running on port ${PORT}`);
  console.log(`📧 Email: ${process.env.GMAIL_USER}`);
  console.log(`🔥 Firebase Project: ${process.env.FIREBASE_PROJECT_ID}`);
});

