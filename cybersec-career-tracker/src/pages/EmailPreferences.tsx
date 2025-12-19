import React, { useState, useEffect } from 'react';
import { Bell, Mail, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface EmailPreferences {
  welcomeEmails: boolean;
  dailyReminders: boolean;
  incidentNotifications: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

const EmailPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<EmailPreferences>({
    welcomeEmails: true,
    dailyReminders: true,
    incidentNotifications: true,
    weeklyDigest: false,
    marketingEmails: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'emailPreferences', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPreferences(docSnap.data() as EmailPreferences);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    try {
      setSaving(true);
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'emailPreferences', user.uid);
      await setDoc(docRef, preferences);

      setMessage({ type: 'success', text: 'Email preferences saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      setMessage({ type: 'error', text: 'Failed to save preferences. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const togglePreference = (key: keyof EmailPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-secondary">Loading preferences...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Email Preferences</h1>
        <p className="text-text-secondary">Manage your email notification settings</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
        }`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="glass rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-3">
            <Mail className="text-primary" size={24} />
            <div>
              <h3 className="font-semibold text-text-primary">Welcome Emails</h3>
              <p className="text-sm text-text-secondary">Receive a welcome email when you sign up</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.welcomeEmails}
              onChange={() => togglePreference('welcomeEmails')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="text-primary" size={24} />
            <div>
              <h3 className="font-semibold text-text-primary">Daily Reminders</h3>
              <p className="text-sm text-text-secondary">Get daily reminders at 11:11 AM and PM (Edmonton time)</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.dailyReminders}
              onChange={() => togglePreference('dailyReminders')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-warning" size={24} />
            <div>
              <h3 className="font-semibold text-text-primary">Incident Notifications</h3>
              <p className="text-sm text-text-secondary">Receive updates on incident reports you submit</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.incidentNotifications}
              onChange={() => togglePreference('incidentNotifications')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={savePreferences}
          disabled={saving}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

export default EmailPreferences;

