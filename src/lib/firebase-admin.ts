'use server';
import admin from 'firebase-admin';
import { getApps, initializeApp, cert, App } from 'firebase-admin/app';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

// Use a function to avoid initializing multiple times
const initializeAdminApp = (): App => {
  const adminAppName = 'firebase-admin-app-server'; // Use a unique name
  const existingApp = getApps().find(app => app.name === adminAppName);
  if (existingApp) {
    return existingApp;
  }

  if (serviceAccount) {
    return initializeApp({
      credential: cert(serviceAccount),
    }, adminAppName);
  }
  
  // This is for local development and should not be used in production
  // It will try to use Application Default Credentials
  console.warn("Firebase Admin SDK not initialized with a service account. Using default app initialization for local development. Make sure FIREBASE_SERVICE_ACCOUNT_KEY is set in production.")
  return initializeApp(undefined, adminAppName);
};

export const adminApp = initializeAdminApp();
export const adminAuth = admin.auth(adminApp);
export const adminDb = admin.firestore(adminApp);
