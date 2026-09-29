import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.appId,
);

const fallbackConfig = {
  apiKey: 'demo-api-key',
  authDomain: 'demo-project.firebaseapp.com',
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
  messagingSenderId: '0000000000',
  appId: '1:0000000000:web:demo',
};

const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfigured ? firebaseConfig : fallbackConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const authHelpers = {
  signIn: async (email: string, password: string) => {
    if (!firebaseConfigured) {
      throw new Error('FIREBASE CONNECTION REQUIRED');
    }
    return signInWithEmailAndPassword(auth, email, password);
  },
  signOut: async () => signOut(auth),
  onAuthStateChanged,
};
