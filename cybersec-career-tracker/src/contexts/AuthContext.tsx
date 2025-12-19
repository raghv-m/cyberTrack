import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<{ user: any }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string, displayName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, { displayName });

    // Send email verification
    await sendEmailVerification(user);

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName,
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      mfaEnabled: false,
      mfaMethods: [],
      preferences: {
        emailNotifications: true,
        dailyReminders: true,
        reminderTime: '00:00',
        timezone: 'America/Edmonton',
        theme: 'dark'
      }
    });

    // Initialize user goals
    await setDoc(doc(db, 'userGoals', user.uid), {
      currentTier: 'learning',
      targetTier: '',
      targetDate: null,
      startDate: serverTimestamp(),
      weeklyHours: 0,
      focusAreas: [],
      certifications: [],
      milestones: [],
      customGoals: []
    });

    // Initialize skills matrix
    await setDoc(doc(db, 'skillsMatrix', user.uid), {
      categories: {},
      lastUpdated: serverTimestamp()
    });

    // Initialize readiness indicators
    await setDoc(doc(db, 'readinessIndicators', user.uid), {
      currentReadiness: [],
      history: []
    });
  }

  async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Update last login
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      lastLogin: serverTimestamp()
    }, { merge: true });

    // Send login notification email
    try {
      await fetch('http://localhost:3001/send-login-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || 'User',
          loginTime: new Date().toISOString(),
          device: navigator.userAgent,
          ipAddress: 'Unknown' // Would need external service for real IP
        })
      });
    } catch (error) {
      console.error('Failed to send login notification:', error);
      // Don't block login if email fails
    }
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create user document for new Google users
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        mfaEnabled: false,
        mfaMethods: [],
        preferences: {
          emailNotifications: true,
          dailyReminders: true,
          reminderTime: '00:00',
          timezone: 'America/Edmonton',
          theme: 'dark'
        }
      });

      // Initialize other collections
      await setDoc(doc(db, 'userGoals', user.uid), {
        currentTier: 'learning',
        targetTier: '',
        targetDate: null,
        startDate: serverTimestamp(),
        weeklyHours: 0,
        focusAreas: [],
        certifications: [],
        milestones: [],
        customGoals: []
      });

      await setDoc(doc(db, 'skillsMatrix', user.uid), {
        categories: {},
        lastUpdated: serverTimestamp()
      });

      await setDoc(doc(db, 'readinessIndicators', user.uid), {
        currentReadiness: [],
        history: []
      });
    } else {
      // Update last login
      await setDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp()
      }, { merge: true });
    }

    // Send login notification email
    try {
      await fetch('http://localhost:3001/send-login-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          displayName: user.displayName || 'User',
          loginTime: new Date().toISOString(),
          device: navigator.userAgent,
          ipAddress: 'Unknown' // Would need external service for real IP
        })
      });
    } catch (error) {
      console.error('Failed to send login notification:', error);
      // Don't block login if email fails
    }

    return { user };
  }

  async function logout() {
    // Clear email verification banner dismissal on logout
    localStorage.removeItem('emailVerificationBannerDismissed');
    await firebaseSignOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as User);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

