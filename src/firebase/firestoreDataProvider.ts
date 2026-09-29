import { type AuthBindings } from '@refinedev/core';
import { signOut } from 'firebase/auth';
import { auth, firebaseConfigured } from './firebase';

export const authProvider: AuthBindings = {
  login: async ({ username, password }) => {
    if (!firebaseConfigured) {
      return Promise.reject(new Error('FIREBASE CONNECTION REQUIRED'));
    }

    try {
      const email = String(username || '');
      const passwordValue = String(password || '');

      const userCredential = await auth
        .app
        .auth();

      if (userCredential) {
        return Promise.resolve();
      }

      return Promise.reject(new Error('Authentication failed'));
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: async () => {
    try {
      await signOut(auth);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  check: async () => {
    const user = auth.currentUser;
    if (user) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Not authenticated'));
  },
  getPermissions: async () => Promise.resolve(['SUPER_ADMIN']),
  getIdentity: async () => {
    const user = auth.currentUser;
    if (!user) {
      return Promise.resolve(null);
    }

    return Promise.resolve({
      id: user.uid,
      name: user.email || 'Chepseon User',
      email: user.email,
      avatar: user.photoURL || undefined,
    });
  },
};
