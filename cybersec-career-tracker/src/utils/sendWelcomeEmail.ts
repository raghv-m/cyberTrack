// Welcome Email Sender
// This sends a welcome email when user signs up

const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:3000';

export async function sendWelcomeEmail(email: string, displayName: string) {
  try {
    console.log('📧 Sending welcome email to:', email);

    // Call backend API to send email
    const response = await fetch(`${BACKEND_URL}/send-welcome-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, displayName })
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Welcome email sent successfully:', result);

    return { success: true, message: 'Welcome email sent!' };
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    // Don't block signup if email fails
    return { success: false, message: 'Failed to send email (non-blocking)' };
  }
}

