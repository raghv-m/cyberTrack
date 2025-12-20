import { db } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit, Timestamp } from 'firebase/firestore';
import { sendEmail, generateWeeklySummaryEmail, generateMilestoneEmail, generateWelcomeEmail, generateLoginNotificationEmail, generateLogoutNotificationEmail, generateMonthlyProgressEmail } from './emailService';

interface EmailConfig {
  to: string;
  subject: string;
  html: string;
}

/**
 * Email Automation Schedule:
 * Sends reminders every 4 hours from 8 AM to 12 AM (midnight)
 * Schedule: 8 AM, 12 PM, 4 PM, 8 PM, 12 AM
 *
 * Setup Instructions:
 * 1. Deploy this as a Cloud Function or backend API endpoint
 * 2. Set up cron jobs to call this function at:
 *    - 0 8 * * * (8 AM)
 *    - 0 12 * * * (12 PM)
 *    - 0 16 * * * (4 PM)
 *    - 0 20 * * * (8 PM)
 *    - 0 0 * * * (12 AM / Midnight)
 * 3. Use Nodemailer with Gmail SMTP:
 *    - Email: raaghvv0508@gmail.com
 *    - App Password: uarz syfm uhrs gekj
 */

// This function should be called by a backend cron job or Cloud Function
// For now, it prepares the email data that can be sent via API
export async function prepareDailyReminderEmails(): Promise<EmailConfig[]> {
  const emails: EmailConfig[] = [];
  
  try {
    // Get all users
    const usersSnapshot = await getDocs(collection(db, 'users'));
    
    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const userData = userDoc.data();
      
      // Check notification settings
      const settingsDoc = await getDoc(doc(db, 'notificationSettings', userId));
      const settings = settingsDoc.data();
      
      if (!settings?.dailyReminders || !settings?.emailNotifications) {
        continue; // Skip if user disabled reminders
      }
      
      // Check if user logged today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const logsQuery = query(
        collection(db, 'dailyLogs'),
        where('userId', '==', userId),
        orderBy('date', 'desc'),
        limit(1)
      );
      
      const logsSnapshot = await getDocs(logsQuery);
      
      if (!logsSnapshot.empty) {
        const lastLog = logsSnapshot.docs[0].data();
        const lastLogDate = lastLog.date?.toDate();
        
        if (lastLogDate) {
          lastLogDate.setHours(0, 0, 0, 0);
          if (lastLogDate.getTime() === today.getTime()) {
            continue; // User already logged today
          }
        }
      }
      
      // Get user's current phase and todos
      const goalsDoc = await getDoc(doc(db, 'userGoals', userId));
      const todosDoc = await getDoc(doc(db, 'todos', userId));
      
      const goals = goalsDoc.data();
      const todos = todosDoc.data()?.items || [];
      const activeTodos = todos.filter((t: any) => !t.completed);
      
      // Prepare email
      const email = generateDailyReminderEmail(
        userData.email,
        userData.displayName || 'there',
        goals,
        activeTodos
      );
      
      emails.push(email);
    }
  } catch (error) {
    console.error('Error preparing daily reminder emails:', error);
  }
  
  return emails;
}

// Send welcome email to new users
export async function sendWelcomeEmail(userEmail: string, userName: string, userId: string): Promise<boolean> {
  try {
    const html = generateWelcomeEmail(userName, userEmail);
    
    const emailData = {
      to: userEmail,
      subject: `🚀 Welcome to CyberPath Pro, ${userName}!`,
      html: html
    };
    
    // Save to email log
    await saveEmailLog(userId, 'welcome', emailData);
    
    // Send email
    return await sendEmail(emailData);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

// Send login notification
export async function sendLoginNotification(userEmail: string, userName: string, userId: string, ipAddress: string): Promise<boolean> {
  try {
    const loginTime = new Date().toLocaleString();
    const html = generateLoginNotificationEmail(userName, loginTime, ipAddress);
    
    const emailData = {
      to: userEmail,
      subject: `🔒 New Login to Your CyberPath Pro Account`,
      html: html
    };
    
    // Save to email log
    await saveEmailLog(userId, 'login', emailData);
    
    // Send email
    return await sendEmail(emailData);
  } catch (error) {
    console.error('Error sending login notification:', error);
    return false;
  }
}

// Send logout notification
export async function sendLogoutNotification(userEmail: string, userName: string, userId: string): Promise<boolean> {
  try {
    const logoutTime = new Date().toLocaleString();
    const html = generateLogoutNotificationEmail(userName, logoutTime);
    
    const emailData = {
      to: userEmail,
      subject: `👋 Your CyberPath Pro Session Has Ended`,
      html: html
    };
    
    // Save to email log
    await saveEmailLog(userId, 'logout', emailData);
    
    // Send email
    return await sendEmail(emailData);
  } catch (error) {
    console.error('Error sending logout notification:', error);
    return false;
  }
}

// Send weekly summary email
export async function sendWeeklySummaryEmail(userEmail: string, userName: string, userId: string, stats: any): Promise<boolean> {
  try {
    const html = generateWeeklySummaryEmail(userName, stats);
    
    const emailData = {
      to: userEmail,
      subject: `📊 Your Weekly Cybersecurity Progress Report`,
      html: html
    };
    
    // Save to email log
    await saveEmailLog(userId, 'weekly_summary', emailData);
    
    // Send email
    return await sendEmail(emailData);
  } catch (error) {
    console.error('Error sending weekly summary email:', error);
    return false;
  }
}

// Send monthly progress email
export async function sendMonthlyProgressEmail(userEmail: string, userName: string, userId: string, stats: any): Promise<boolean> {
  try {
    const html = generateMonthlyProgressEmail(userName, stats);
    
    const emailData = {
      to: userEmail,
      subject: `📈 Your Monthly Cybersecurity Journey Recap`,
      html: html
    };
    
    // Save to email log
    await saveEmailLog(userId, 'monthly_progress', emailData);
    
    // Send email
    return await sendEmail(emailData);
  } catch (error) {
    console.error('Error sending monthly progress email:', error);
    return false;
  }
}

// Save email log to Firestore
async function saveEmailLog(userId: string, type: string, emailData: EmailConfig): Promise<void> {
  try {
    // In a real implementation, you would save this to Firestore
    // For now, we'll just log it
    console.log(`Email log saved for user ${userId}, type: ${type}`);
  } catch (error) {
    console.error('Error saving email log:', error);
  }
}

function generateDailyReminderEmail(
  email: string,
  name: string,
  goals: any,
  activeTodos: any[]
): EmailConfig {
  const currentPhase = goals?.generatedCurriculum?.phases?.[0] || null;
  
  return {
    to: email,
    subject: '🔥 Daily Reminder: Log Your Cybersecurity Progress',
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background-color: #0a0e27;
      color: #e2e8f0;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #1a1f3a 0%, #2a2f4a 100%);
      border-radius: 16px;
      padding: 40px;
      border: 2px solid #00d4ff;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #00d4ff;
      font-size: 28px;
      margin: 0 0 10px 0;
    }
    .header p {
      color: #94a3b8;
      font-size: 16px;
      margin: 0;
    }
    .section {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .section h2 {
      color: #00d4ff;
      font-size: 20px;
      margin: 0 0 15px 0;
    }
    .todo-item {
      background: rgba(255, 255, 255, 0.03);
      border-left: 3px solid #00d4ff;
      padding: 12px;
      margin-bottom: 10px;
      border-radius: 6px;
    }
    .todo-item h3 {
      color: #e2e8f0;
      font-size: 16px;
      margin: 0 0 5px 0;
    }
    .todo-item p {
      color: #94a3b8;
      font-size: 14px;
      margin: 0;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #00d4ff 0%, #2563eb 100%);
      color: white;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }
    .stats {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
    }
    .stat {
      text-align: center;
    }
    .stat-value {
      color: #00d4ff;
      font-size: 32px;
      font-weight: bold;
    }
    .stat-label {
      color: #94a3b8;
      font-size: 14px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: #64748b;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔥 Don't Break Your Streak!</h1>
      <p>Hi ${name}, you haven't logged your progress today</p>
    </div>

    ${currentPhase ? `
    <div class="section">
      <h2>📍 Current Phase: ${currentPhase.phaseName}</h2>
      <p style="color: #94a3b8;">Week ${currentPhase.startWeek} - ${currentPhase.endWeek}</p>
    </div>
    ` : ''}

    ${activeTodos.length > 0 ? `
    <div class="section">
      <h2>✅ Today's Tasks (${activeTodos.length})</h2>
      ${activeTodos.slice(0, 3).map((todo: any) => `
        <div class="todo-item">
          <h3>${todo.title}</h3>
          ${todo.description ? `<p>${todo.description}</p>` : ''}
        </div>
      `).join('')}
      ${activeTodos.length > 3 ? `<p style="color: #94a3b8; margin-top: 10px;">+ ${activeTodos.length - 3} more tasks</p>` : ''}
    </div>
    ` : ''}

    <div style="text-align: center;">
      <a href="http://localhost:5175/daily-log" class="cta-button">
        Log Your Progress Now →
      </a>
    </div>

    <div class="section">
      <h2>💪 Why Log Daily?</h2>
      <ul style="color: #94a3b8; line-height: 1.8;">
        <li>Track your learning streak</li>
        <li>Monitor hands-on vs theory ratio (60/40 enforcement)</li>
        <li>Update your skills matrix automatically</li>
        <li>Stay accountable to your goals</li>
        <li>Build evidence for your portfolio</li>
      </ul>
    </div>

    <div class="footer">
      <p><strong>Cybersecurity Career Tracker</strong></p>
      <p>Consistency is the key to breaking into cybersecurity</p>
      <p style="margin-top: 10px;">
        <a href="http://localhost:5175/settings" style="color: #64748b;">Manage notification preferences</a>
      </p>
    </div>
  </div>
</body>
</html>
    `
  };
}

// Function to send email via API (to be called from frontend or backend)
export async function sendDailyReminderEmail(emailConfig: EmailConfig): Promise<boolean> {
  try {
    // This would call your backend API endpoint that uses Nodemailer
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailConfig)
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

