import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgKcJgyfQwvNDQ9umPsmWwfdGwfnf00Dc",
  authDomain: "cybersecurity-85e86.firebaseapp.com",
  projectId: "cybersecurity-85e86",
  storageBucket: "cybersecurity-85e86.firebasestorage.app",
  messagingSenderId: "742492756194",
  appId: "1:742492756194:web:a450c8443a8f1b024c26bb",
  measurementId: "G-BM6468BK2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

