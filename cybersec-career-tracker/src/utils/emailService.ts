import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'raaghvv0508@gmail.com',
    pass: process.env.EMAIL_PASS || 'uarz syfm uhrs gekj'
  }
});

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: 'CyberSecurity Career Tracker <raaghvv0508@gmail.com>',
      to: data.to,
      subject: data.subject,
      html: data.html
    });
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

export function generateDailyReminderEmail(userName: string, streak: number): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #0a0e27; color: #e2e8f0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1a1f3a; border-radius: 10px; padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #00d4ff; margin: 0; }
        .content { line-height: 1.6; }
        .cta-button { display: inline-block; background-color: #00d4ff; color: #0a0e27; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
        .streak { font-size: 48px; color: #10b981; text-align: center; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Daily Check-In Reminder</h1>
        </div>
        <div class="content">
          <p>Hey ${userName}!</p>
          <p>Time to log your daily progress and keep your streak alive! 🔥</p>
          <div class="streak">${streak} Day Streak</div>
          <p><strong>Don't break the chain!</strong> Even 30 minutes of hands-on practice counts.</p>
          <p>Remember: <strong>60% hands-on, 40% theory max</strong></p>
          <a href="http://localhost:5175/daily-log" class="cta-button">Log Today's Progress</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateWeeklySummaryEmail(userName: string, stats: {
  labsCompleted: number;
  toolHours: number;
  theoryPercent: number;
  handsOnPercent: number;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #0a0e27; color: #e2e8f0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1a1f3a; border-radius: 10px; padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #00d4ff; margin: 0; }
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .stat-card { background-color: #2a2f4a; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-value { font-size: 36px; font-weight: bold; color: #00d4ff; }
        .stat-label { font-size: 14px; color: #94a3b8; margin-top: 5px; }
        .warning { background-color: #f59e0b; color: #0a0e27; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Weekly Progress Summary</h1>
        </div>
        <p>Hey ${userName}!</p>
        <p>Here's your progress from the past week:</p>
        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">${stats.labsCompleted}</div>
            <div class="stat-label">Labs Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.toolHours.toFixed(1)}</div>
            <div class="stat-label">Tool Practice Hours</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.handsOnPercent.toFixed(0)}%</div>
            <div class="stat-label">Hands-On Time</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.theoryPercent.toFixed(0)}%</div>
            <div class="stat-label">Theory Time</div>
          </div>
        </div>
        ${stats.theoryPercent > 40 ? `
          <div class="warning">
            ⚠️ <strong>Tutorial Hell Alert!</strong> Your theory time is ${stats.theoryPercent.toFixed(0)}%. Focus more on hands-on labs and tools this week!
          </div>
        ` : ''}
        <p>Keep up the great work! 💪</p>
      </div>
    </body>
    </html>
  `;
}

export function generateMilestoneEmail(userName: string, milestone: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #0a0e27; color: #e2e8f0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1a1f3a; border-radius: 10px; padding: 30px; text-align: center; }
        .celebration { font-size: 72px; margin: 20px 0; }
        h1 { color: #00d4ff; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="celebration">🎉</div>
        <h1>Milestone Unlocked!</h1>
        <p>Congratulations ${userName}!</p>
        <p style="font-size: 24px; color: #10b981; font-weight: bold;">${milestone}</p>
        <p>You're making incredible progress on your cybersecurity journey!</p>
      </div>
    </body>
    </html>
  `;
}

export function generateWelcomeEmail(userName: string, userEmail: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #0a0e27; color: #e2e8f0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%); border-radius: 16px; padding: 40px; border: 2px solid #00d4ff; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #00d4ff; margin: 0 0 10px 0; }
        .header p { color: #94a3b8; margin: 0; }
        .feature-card { background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px; margin-bottom: 20px; }
        .feature-card h3 { color: #00d4ff; margin-top: 0; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #2563eb 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; text-align: center; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #64748b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Welcome to CyberPath Pro!</h1>
          <p>Your cybersecurity career journey starts now</p>
        </div>
        
        <p>Hey ${userName}!</p>
        <p>Welcome to CyberPath Pro - your personal cybersecurity career accelerator. We're excited to help you break into the cybersecurity field with our AI-powered learning platform.</p>
        
        <div class="feature-card">
          <h3>🎯 Your Personalized Learning Path</h3>
          <p>We've created a customized curriculum based on your goals and current skills. Check your dashboard to see your first steps!</p>
        </div>
        
        <div class="feature-card">
          <h3>📊 Track Everything</h3>
          <p>Log your daily progress, track your skills development, and build evidence for your portfolio - all in one place.</p>
        </div>
        
        <div class="feature-card">
          <h3>🤖 AI-Powered Guidance</h3>
          <p>Get personalized recommendations for what to learn next, tailored to your progress and career goals.</p>
        </div>
        
        <div style="text-align: center;">
          <a href="http://localhost:5175/app/onboarding" class="cta-button">Start Your Journey →</a>
        </div>
        
        <div class="footer">
          <p><strong>CyberPath Pro - Cybersecurity Career Tracker</strong></p>
          <p>You're receiving this email because you signed up at ${userEmail}</p>
          <p style="margin-top: 10px;">
            <a href="http://localhost:5175/settings" style="color: #64748b;">Manage notification preferences</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateLoginNotificationEmail(userName: string, loginTime: string, ipAddress: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #0a0e27; color: #e2e8f0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%); border-radius: 16px; padding: 40px; border: 2px solid #10b981; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #10b981; margin: 0 0 10px 0; }
        .security-alert { background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 15px; border-radius: 0 8px 8px 0; margin: 20px 0; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .info-card { background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; }
        .info-label { font-size: 12px; color: #94a3b8; margin-bottom: 5px; }
        .info-value { font-weight: bold; color: #e2e8f0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #64748b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔒 Security Alert</h1>
          <p>New login detected on your account</p>
        </div>
        
        <p>Hey ${userName}!</p>
        <p>We noticed a new login to your CyberPath Pro account. Here are the details:</p>
        
        <div class="security-alert">
          <p>If this wasn't you, please <a href="http://localhost:5175/settings" style="color: #10b981; font-weight: bold;">change your password immediately</a>.</p>
        </div>
        
        <div class="info-grid">
          <div class="info-card">
            <div class="info-label">Login Time</div>
            <div class="info-value">${loginTime}</div>
          </div>
          <div class="info-card">
            <div class="info-label">IP Address</div>
            <div class="info-value">${ipAddress}</div>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>CyberPath Pro - Cybersecurity Career Tracker</strong></p>
          <p>This is an automated security notification</p>
          <p style="margin-top: 10px;">
            <a href="http://localhost:5175/settings" style="color: #64748b;">Manage notification preferences</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateLogoutNotificationEmail(userName: string, logoutTime: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #0a0e27; color: #e2e8f0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%); border-radius: 16px; padding: 40px; border: 2px solid #f59e0b; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #f59e0b; margin: 0 0 10px 0; }
        .info-grid { display: grid; grid-template-columns: 1fr; gap: 15px; margin: 20px 0; }
        .info-card { background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; }
        .info-label { font-size: 12px; color: #94a3b8; margin-bottom: 5px; }
        .info-value { font-weight: bold; color: #e2e8f0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #64748b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>👋 Session Ended</h1>
          <p>You've been logged out of your account</p>
        </div>
        
        <p>Hey ${userName}!</p>
        <p>Your CyberPath Pro session has ended. Here are the details:</p>
        
        <div class="info-grid">
          <div class="info-card">
            <div class="info-label">Logout Time</div>
            <div class="info-value">${logoutTime}</div>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>CyberPath Pro - Cybersecurity Career Tracker</strong></p>
          <p>This is an automated notification</p>
          <p style="margin-top: 10px;">
            <a href="http://localhost:5175/settings" style="color: #64748b;">Manage notification preferences</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateMonthlyProgressEmail(userName: string, stats: {
  totalHours: number;
  labsCompleted: number;
  skillsImproved: number;
  certificationsInProgress: string[];
  nextMilestone: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #0a0e27; color: #e2e8f0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%); border-radius: 16px; padding: 40px; border: 2px solid #8b5cf6; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #8b5cf6; margin: 0 0 10px 0; }
        .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .stat-card { background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px; text-align: center; }
        .stat-value { font-size: 36px; font-weight: bold; color: #8b5cf6; }
        .stat-label { font-size: 14px; color: #94a3b8; margin-top: 5px; }
        .milestone { background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 15px; border-radius: 0 8px 8px 0; margin: 20px 0; }
        .cert-list { margin: 15px 0; padding-left: 20px; }
        .cert-list li { margin-bottom: 8px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #64748b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📈 Monthly Progress Report</h1>
          <p>Your cybersecurity journey recap for this month</p>
        </div>
        
        <p>Hey ${userName}!</p>
        <p>Here's your progress summary for the past month:</p>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">${stats.totalHours}</div>
            <div class="stat-label">Total Hours</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.labsCompleted}</div>
            <div class="stat-label">Labs Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.skillsImproved}</div>
            <div class="stat-label">Skills Improved</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.certificationsInProgress.length}</div>
            <div class="stat-label">Certifications In Progress</div>
          </div>
        </div>
        
        <div class="milestone">
          <h3>🚀 Next Milestone</h3>
          <p>${stats.nextMilestone}</p>
        </div>
        
        <h3>📋 Certifications In Progress</h3>
        ${stats.certificationsInProgress.length > 0 ? `
          <ul class="cert-list">
            ${stats.certificationsInProgress.map(cert => `<li>${cert}</li>`).join('')}
          </ul>
        ` : '<p>No certifications in progress</p>'}
        
        <div class="footer">
          <p><strong>CyberPath Pro - Cybersecurity Career Tracker</strong></p>
          <p>Keep up the great work! Consistency is key.</p>
          <p style="margin-top: 10px;">
            <a href="http://localhost:5175/settings" style="color: #64748b;">Manage notification preferences</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
