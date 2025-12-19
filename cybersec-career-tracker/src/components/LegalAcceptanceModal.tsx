import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Lock, X } from 'lucide-react';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const LegalAcceptanceModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLegalAcceptance();
  }, []);

  const checkLegalAcceptance = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, 'legalAcceptance', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists() || !docSnap.data().accepted) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Error checking legal acceptance:', error);
      // Show modal if there's an error to be safe
      setIsVisible(true);
    }
  };

  const handleAccept = async () => {
    if (!termsAccepted || !privacyAccepted) {
      alert('Please accept both the Terms of Service and Privacy Policy to continue.');
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      setLoading(true);
      const docRef = doc(db, 'legalAcceptance', user.uid);
      await setDoc(docRef, {
        accepted: true,
        termsAccepted: true,
        privacyAccepted: true,
        acceptedAt: new Date().toISOString(),
        userEmail: user.email,
        version: '1.0' // Track which version of terms they accepted
      });

      setIsVisible(false);
    } catch (error) {
      console.error('Error saving legal acceptance:', error);
      alert('Failed to save your acceptance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-secondary border border-border-color rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-tertiary p-6 border-b border-border-color sticky top-0">
          <div className="flex items-center gap-3">
            <Shield className="text-primary" size={32} />
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Legal Agreement Required</h2>
              <p className="text-text-secondary text-sm">Please review and accept our terms to continue</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Message */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-text-primary">
              Welcome to <strong>CyberTrack</strong>! Before you can access your account, we need you to review and accept our legal agreements.
            </p>
          </div>

          {/* Terms of Service */}
          <div className="bg-tertiary p-5 rounded-lg border border-border-color">
            <div className="flex items-start gap-3 mb-3">
              <FileText className="text-primary mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Terms of Service</h3>
                <p className="text-text-secondary text-sm mb-3">
                  Our Terms of Service outline the rules and regulations for using CyberTrack, including user responsibilities, 
                  acceptable use, and service limitations.
                </p>
                <Link 
                  to="/terms-of-service" 
                  target="_blank"
                  className="text-primary hover:underline text-sm font-semibold inline-flex items-center gap-1"
                >
                  Read Terms of Service →
                </Link>
              </div>
            </div>
            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
              />
              <span className="text-text-primary font-medium">I have read and accept the Terms of Service</span>
            </label>
          </div>

          {/* Privacy Policy */}
          <div className="bg-tertiary p-5 rounded-lg border border-border-color">
            <div className="flex items-start gap-3 mb-3">
              <Lock className="text-primary mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Privacy Policy</h3>
                <p className="text-text-secondary text-sm mb-3">
                  Our Privacy Policy explains how we collect, use, and protect your personal information in compliance with 
                  Canadian privacy laws (PIPEDA).
                </p>
                <Link 
                  to="/privacy-policy" 
                  target="_blank"
                  className="text-primary hover:underline text-sm font-semibold inline-flex items-center gap-1"
                >
                  Read Privacy Policy →
                </Link>
              </div>
            </div>
            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
              />
              <span className="text-text-primary font-medium">I have read and accept the Privacy Policy</span>
            </label>
          </div>

          {/* Important Notice */}
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
            <p className="text-text-secondary text-sm">
              <strong className="text-warning">Important:</strong> By accepting these agreements, you acknowledge that you have read, 
              understood, and agree to be bound by these terms. You must accept both agreements to use CyberTrack.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-tertiary p-6 border-t border-border-color flex justify-end gap-3">
          <button
            onClick={handleAccept}
            disabled={!termsAccepted || !privacyAccepted || loading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Saving...' : 'Accept and Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalAcceptanceModal;

