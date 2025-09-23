import admin from 'firebase-admin';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

// Use a function to avoid initializing multiple times
const initializeAdminApp = () => {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  if (serviceAccount) {
    return initializeApp({
      credential: cert(serviceAccount),
    });
  }
  
  // This is for local development and should not be used in production
  console.warn("Firebase Admin SDK not initialized. Using default app for local development. Make sure FIREBASE_SERVICE_ACCOUNT_KEY is set in production.")
  return initializeApp();
};

export const adminApp = initializeAdminApp();
export const adminAuth = admin.auth(adminApp);
export const adminDb = admin.firestore(adminApp);
