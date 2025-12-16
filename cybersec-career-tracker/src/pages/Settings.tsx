import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User, Bell, Mail, Shield, Download, Trash2 } from 'lucide-react';

export default function Settings() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    targetTier: 'Tier 1',
    hoursPerWeek: 10
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    dailyReminders: true,
    weeklyReports: true,
    milestoneAlerts: true
  });

  useEffect(() => {
    if (currentUser) {
      loadSettings();
    }
  }, [currentUser]);

  const loadSettings = async () => {
    if (!currentUser) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setProfile({
          name: data.name || currentUser.displayName || '',
          email: currentUser.email || '',
          targetTier: data.targetTier || 'Tier 1',
          hoursPerWeek: data.hoursPerWeek || 10
        });
      }

      const notifsDoc = await getDoc(doc(db, 'notificationSettings', currentUser.uid));
      if (notifsDoc.exists()) {
        setNotifications(notifsDoc.data() as any);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    setSaving(true);
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        name: profile.name,
        email: profile.email,
        targetTier: profile.targetTier,
        hoursPerWeek: profile.hoursPerWeek,
        updatedAt: new Date()
      }, { merge: true });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    if (!currentUser) return;

    setSaving(true);
    try {
      await setDoc(doc(db, 'notificationSettings', currentUser.uid), {
        ...notifications,
        updatedAt: new Date()
      });

      alert('Notification settings updated!');
    } catch (error) {
      console.error('Error saving notifications:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    if (!currentUser) return;

    try {
      const data = {
        profile,
        notifications,
        exportedAt: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cybersec-tracker-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data');
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
          <p className="text-text-secondary">Manage your account and preferences</p>
        </div>

        {/* Profile Settings */}
        <div className="glass rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">Profile Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-text-secondary mb-2">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
              />
            </div>

            <div>
              <label className="block text-text-secondary mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-2 bg-bg-tertiary border border-border-color rounded-lg text-text-tertiary"
              />
            </div>

            <div>
              <label className="block text-text-secondary mb-2">Target Tier</label>
              <select
                value={profile.targetTier}
                onChange={(e) => setProfile({ ...profile, targetTier: e.target.value })}
                className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
              >
                <option value="Tier 1">SOC Tier 1</option>
                <option value="Tier 2">SOC Tier 2</option>
                <option value="Tier 3">SOC Tier 3</option>
              </select>
            </div>

            <div>
              <label className="block text-text-secondary mb-2">Hours Per Week</label>
              <input
                type="number"
                value={profile.hoursPerWeek}
                onChange={(e) => setProfile({ ...profile, hoursPerWeek: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
                min="1"
                max="40"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-smooth disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-text-primary">Email Notifications</h3>
                <p className="text-sm text-text-secondary">Receive updates via email</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, emailNotifications: !notifications.emailNotifications })}
                className={`w-12 h-6 rounded-full transition-smooth ${
                  notifications.emailNotifications ? 'bg-success' : 'bg-bg-tertiary'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-text-primary">Daily Reminders</h3>
                <p className="text-sm text-text-secondary">Get reminded to log your progress</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, dailyReminders: !notifications.dailyReminders })}
                className={`w-12 h-6 rounded-full transition-smooth ${
                  notifications.dailyReminders ? 'bg-success' : 'bg-bg-tertiary'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications.dailyReminders ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-text-primary">Weekly Reports</h3>
                <p className="text-sm text-text-secondary">Receive weekly progress summaries</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, weeklyReports: !notifications.weeklyReports })}
                className={`w-12 h-6 rounded-full transition-smooth ${
                  notifications.weeklyReports ? 'bg-success' : 'bg-bg-tertiary'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-text-primary">Milestone Alerts</h3>
                <p className="text-sm text-text-secondary">Get notified of achievements</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, milestoneAlerts: !notifications.milestoneAlerts })}
                className={`w-12 h-6 rounded-full transition-smooth ${
                  notifications.milestoneAlerts ? 'bg-success' : 'bg-bg-tertiary'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications.milestoneAlerts ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <button
              onClick={handleSaveNotifications}
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-smooth disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">Data Management</h2>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="w-full px-6 py-3 bg-bg-secondary border border-border-color text-text-primary rounded-lg hover:bg-bg-tertiary transition-smooth flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export My Data
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  alert('Account deletion feature coming soon');
                }
              }}
              className="w-full px-6 py-3 bg-danger bg-opacity-10 border border-danger text-danger rounded-lg hover:bg-opacity-20 transition-smooth flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

