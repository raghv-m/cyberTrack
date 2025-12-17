const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Email transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'raaghvv0508@gmail.com',
    pass: 'uarz syfm uhrs gekj' // App password
  }
});

// Helper function to send email
async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: '"CyberTrack 🛡️" <raaghvv0508@gmail.com>',
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}: ${subject}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// 1. Send Welcome Email on User Signup
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const email = user.email;
  const displayName = user.displayName || 'Cybersecurity Enthusiast';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00d4ff 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #00d4ff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛡️ Welcome to CyberTrack!</h1>
        </div>
        <div class="content">
          <h2>Hey ${displayName}! 👋</h2>
          <p>Welcome to <strong>CyberTrack</strong> - your AI-powered cybersecurity career companion!</p>
          
          <h3>🚀 Get Started:</h3>
          <ol>
            <li><strong>Complete Onboarding:</strong> Tell us about your goals and experience</li>
            <li><strong>Get Your Roadmap:</strong> AI will generate a personalized learning path</li>
            <li><strong>Start Logging:</strong> Track your daily progress (theory + hands-on)</li>
            <li><strong>Build Portfolio:</strong> Document your security investigations</li>
          </ol>

          <h3>📧 Daily Reminders:</h3>
          <p>You'll receive study reminders at <strong>11:11 AM</strong> and <strong>11:11 PM</strong> (Edmonton time) to keep you on track!</p>

          <a href="https://cybertrack.vercel.app/app/dashboard" class="button">Go to Dashboard</a>

          <p>Questions? Reply to this email anytime!</p>
          
          <p>Happy hacking! 🔐<br>
          <strong>Raghav Mahajan</strong><br>
          Creator of CyberTrack</p>
        </div>
        <div class="footer">
          <p>Made with ❤️ in Canada 🍁</p>
          <p><a href="https://linkedin.com/in/raghav-mahajan-cybersec">LinkedIn</a> | <a href="https://github.com/raghv-m">GitHub</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail(email, '🛡️ Welcome to CyberTrack - Let\'s Build Your Cybersecurity Career!', html);
});

// 2. Process Email Queue (Scheduled every 5 minutes)
exports.processEmailQueue = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
  const now = admin.firestore.Timestamp.now();
  
  const queueSnapshot = await db.collection('emailQueue')
    .where('status', '==', 'pending')
    .where('scheduledFor', '<=', now)
    .limit(50)
    .get();

  const promises = queueSnapshot.docs.map(async (doc) => {
    const emailData = doc.data();
    
    const result = await sendEmail(emailData.to, emailData.subject, emailData.html);
    
    if (result.success) {
      await doc.ref.update({
        status: 'sent',
        sentAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } else {
      const retryCount = (emailData.retryCount || 0) + 1;
      if (retryCount >= 3) {
        await doc.ref.update({ status: 'failed', retryCount, error: result.error });
      } else {
        await doc.ref.update({ retryCount, lastError: result.error });
      }
    }
  });

  await Promise.all(promises);
  console.log(`Processed ${queueSnapshot.size} emails from queue`);
});

// 3. Send Daily Reminder at 11:11 AM (Edmonton timezone = America/Edmonton)
exports.sendDailyReminder1111AM = functions.pubsub.schedule('11 11 * * *')
  .timeZone('America/Edmonton')
  .onRun(async (context) => {
    await sendDailyReminders('morning');
  });

// 4. Send Daily Reminder at 11:11 PM (Edmonton timezone)
exports.sendDailyReminder1111PM = functions.pubsub.schedule('11 23 * * *')
  .timeZone('America/Edmonton')
  .onRun(async (context) => {
    await sendDailyReminders('evening');
  });

// Helper function to send daily reminders
async function sendDailyReminders(timeOfDay) {
  const usersSnapshot = await db.collection('users').get();
  
  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data();
    const userId = userDoc.id;
    
    // Check email preferences
    const prefsDoc = await db.collection('users').doc(userId)
      .collection('emailPreferences').doc('default').get();
    
    const prefs = prefsDoc.exists ? prefsDoc.data() : {};
    if (prefs.dailyReminders === false) continue; // Skip if disabled
    
    // Check if user logged today
    const today = new Date().toISOString().split('T')[0];
    const logsSnapshot = await db.collection('dailyLogs')
      .where('userId', '==', userId)
      .where('date', '>=', today)
      .limit(1)
      .get();
    
    const hasLoggedToday = !logsSnapshot.empty;
    
    // Send appropriate email
    if (hasLoggedToday) {
      await sendDailyReminderLogged(userData.email, userData.displayName || 'there', timeOfDay);
    } else {
      await sendDailyReminderNotLogged(userData.email, userData.displayName || 'there', timeOfDay);
    }
  }
  
  console.log(`Sent ${timeOfDay} daily reminders`);
}

// Email template for users who haven't logged today
async function sendDailyReminderNotLogged(email, name, timeOfDay) {
  const greeting = timeOfDay === 'morning' ? 'Good morning' : 'Good evening';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #00d4ff;">🛡️ ${greeting}, ${name}!</h2>
        <p>It's <strong>11:11</strong> - time to make a wish... and log your cybersecurity progress! 🌟</p>
        
        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
          <p style="margin: 0;"><strong>⚠️ You haven't logged your progress today!</strong></p>
        </div>
        
        <p>Even 30 minutes of focused study counts. What did you learn today?</p>
        
        <a href="https://cybertrack.vercel.app/app/daily-log" style="display: inline-block; padding: 12px 30px; background: #00d4ff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Log Your Progress
        </a>
        
        <p style="color: #666; font-size: 14px;">Made with ❤️ in Canada 🍁</p>
      </div>
    </body>
    </html>
  `;
  
  await sendEmail(email, `🛡️ ${greeting}! Time to log your cybersecurity progress`, html);
}

// Email template for users who have logged today
async function sendDailyReminderLogged(email, name, timeOfDay) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #10b981;">✅ Great job, ${name}!</h2>
        <p>You've already logged your progress today! Keep up the momentum! 🚀</p>
        
        <p>Remember: Consistency beats intensity. Small daily wins lead to big career breakthroughs.</p>
        
        <a href="https://cybertrack.vercel.app/app/dashboard" style="display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          View Dashboard
        </a>
        
        <p style="color: #666; font-size: 14px;">Made with ❤️ in Canada 🍁</p>
      </div>
    </body>
    </html>
  `;
  
  await sendEmail(email, '✅ You\'re on track! Keep going!', html);
}

// 5. Send Email When Incident Report is Submitted
exports.onIncidentReportSubmitted = functions.firestore
  .document('incidentReports/{reportId}')
  .onCreate(async (snap, context) => {
    const reportData = snap.data();
    const reportId = context.params.reportId;

    // Send confirmation to user
    const userHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00d4ff;">🛡️ Incident Report Submitted!</h2>
          <p>Hi ${reportData.submittedBy.name},</p>

          <p>Your incident report "<strong>${reportData.incidentTitle}</strong>" has been successfully submitted for review!</p>

          <div style="background: #f0f9ff; border-left: 4px solid #00d4ff; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Report Details:</strong></p>
            <ul style="margin: 10px 0;">
              <li>Type: ${reportData.incidentType}</li>
              <li>Severity: ${reportData.severity}</li>
              <li>Status: Submitted</li>
            </ul>
          </div>

          <h3>What's Next?</h3>
          <ol>
            <li>Our team will review your report within 3-5 business days</li>
            <li>You'll receive feedback and a score (0-100)</li>
            <li>Approved reports can be added to your portfolio</li>
          </ol>

          <a href="https://cybertrack.vercel.app/app/incident-reports" style="display: inline-block; padding: 12px 30px; background: #00d4ff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            View Your Reports
          </a>

          <p>Keep up the great work! 🚀</p>
          <p style="color: #666; font-size: 14px;">Made with ❤️ in Canada 🍁</p>
        </div>
      </body>
      </html>
    `;

    await sendEmail(reportData.submittedBy.email, '🛡️ Incident Report Submitted Successfully', userHtml);

    // Send notification to admin
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #f59e0b;">🔔 New Incident Report Submitted</h2>

          <p><strong>Title:</strong> ${reportData.incidentTitle}</p>
          <p><strong>Type:</strong> ${reportData.incidentType}</p>
          <p><strong>Severity:</strong> ${reportData.severity}</p>
          <p><strong>Submitted by:</strong> ${reportData.submittedBy.name} (${reportData.submittedBy.email})</p>

          <p><strong>Summary:</strong></p>
          <p>${reportData.summary}</p>

          <a href="https://cybertrack.vercel.app/app/incident-report/${reportId}" style="display: inline-block; padding: 12px 30px; background: #f59e0b; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Review Report
          </a>
        </div>
      </body>
      </html>
    `;

    await sendEmail('raaghvv0508@gmail.com', `🔔 New Incident Report: ${reportData.incidentTitle}`, adminHtml);
  });

// 6. Send Email When Incident Report is Reviewed
exports.onIncidentReportReviewed = functions.firestore
  .document('incidentReports/{reportId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Only send email if status changed
    if (before.status === after.status) return;

    const reportId = context.params.reportId;
    const status = after.status;

    let statusEmoji = '📝';
    let statusColor = '#00d4ff';
    let message = '';

    if (status === 'approved') {
      statusEmoji = '✅';
      statusColor = '#10b981';
      message = 'Congratulations! Your incident report has been approved and can now be added to your portfolio!';
    } else if (status === 'rejected') {
      statusEmoji = '❌';
      statusColor = '#ef4444';
      message = 'Your incident report needs improvement. Please review the feedback and consider resubmitting.';
    } else if (status === 'revision_needed') {
      statusEmoji = '⚠️';
      statusColor = '#f59e0b';
      message = 'Your incident report needs some revisions. Please review the feedback and update your report.';
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: ${statusColor};">${statusEmoji} Incident Report Reviewed</h2>
          <p>Hi ${after.submittedBy.name},</p>

          <p>Your incident report "<strong>${after.incidentTitle}</strong>" has been reviewed!</p>

          <div style="background: #f0f9ff; border-left: 4px solid ${statusColor}; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Status:</strong> ${status.replace('_', ' ').toUpperCase()}</p>
            ${after.reviewScore ? `<p style="margin: 10px 0 0 0;"><strong>Score:</strong> ${after.reviewScore}/100</p>` : ''}
          </div>

          <p>${message}</p>

          ${after.reviewFeedback ? `
            <h3>Feedback:</h3>
            <p style="background: #f9fafb; padding: 15px; border-radius: 5px;">${after.reviewFeedback}</p>
          ` : ''}

          <a href="https://cybertrack.vercel.app/app/incident-report/${reportId}" style="display: inline-block; padding: 12px 30px; background: ${statusColor}; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            View Report
          </a>

          <p style="color: #666; font-size: 14px;">Made with ❤️ in Canada 🍁</p>
        </div>
      </body>
      </html>
    `;

    await sendEmail(after.submittedBy.email, `${statusEmoji} Incident Report Reviewed: ${after.incidentTitle}`, html);
  });

// 7. Callable Function: Verify Email
exports.verifyEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const userId = context.auth.uid;

  // Update user email preferences
  await db.collection('users').doc(userId)
    .collection('emailPreferences').doc('default')
    .set({ emailVerified: true }, { merge: true });

  return { success: true, message: 'Email verified successfully' };
});

// 8. HTTP Function: Unsubscribe from Emails
exports.unsubscribeFromEmails = functions.https.onRequest(async (req, res) => {
  const userId = req.query.userId;
  const token = req.query.token;

  if (!userId || !token) {
    res.status(400).send('Missing userId or token');
    return;
  }

  // Verify token (in production, use proper JWT verification)
  // For now, simple implementation

  await db.collection('users').doc(userId)
    .collection('emailPreferences').doc('default')
    .set({
      dailyReminders: false,
      weeklyDigest: false,
      marketingEmails: false,
      unsubscribedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f9ff; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #00d4ff; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✅ Unsubscribed Successfully</h1>
        <p>You've been unsubscribed from CyberTrack emails.</p>
        <p>You can update your email preferences anytime in Settings.</p>
        <a href="https://cybertrack.vercel.app/app/settings" style="display: inline-block; padding: 12px 30px; background: #00d4ff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Go to Settings
        </a>
      </div>
    </body>
    </html>
  `);
});

