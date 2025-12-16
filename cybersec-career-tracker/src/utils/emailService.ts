import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'raaghvv0508@gmail.com',
    pass: 'uarz syfm uhrs gekj'
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
          <a href="http://localhost:5174/daily-log" class="cta-button">Log Today's Progress</a>
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
