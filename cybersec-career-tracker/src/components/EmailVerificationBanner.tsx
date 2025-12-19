import React, { useState, useEffect } from 'react';
import { Mail, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { auth } from '../config/firebase';
import { sendEmailVerification } from 'firebase/auth';

const EmailVerificationBanner: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [isVisible, setIsVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      // Check if user dismissed the banner
      const dismissed = localStorage.getItem('emailVerificationBannerDismissed');
      // Show banner if user is logged in, email is not verified, AND they haven't dismissed it
      setIsVisible(!!currentUser && !currentUser.emailVerified && dismissed !== 'true');
    });

    return () => unsubscribe();
  }, []);

  const handleSendVerification = async () => {
    if (!user) return;

    try {
      setSending(true);
      await sendEmailVerification(user);
      setMessage({ 
        type: 'success', 
        text: 'Verification email sent! Please check your inbox.' 
      });
      setTimeout(() => setMessage(null), 5000);
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to send verification email. Please try again later.' 
      });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setSending(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to not show again until they log out
    localStorage.setItem('emailVerificationBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-warning/20 border-l-4 border-warning">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Mail className="text-warning" size={24} />
            <div className="flex-1">
              <p className="text-text-primary font-semibold">Email Not Verified</p>
              <p className="text-sm text-text-secondary">
                Please verify your email address to access all features and receive important notifications.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSendVerification}
              disabled={sending}
              className="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
            >
              {sending ? 'Sending...' : 'Resend Verification Email'}
            </button>
            <button
              onClick={handleDismiss}
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Dismiss"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {message && (
          <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
            message.type === 'success' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
          }`}>
            {message.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            <span className="text-sm">{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationBanner;

