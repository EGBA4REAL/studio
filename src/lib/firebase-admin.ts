import admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    // This is for local development and should not be used in production
    console.warn("Firebase Admin SDK not initialized. Using default app for local development. Make sure FIREBASE_SERVICE_ACCOUNT_KEY is set in production.")
    admin.initializeApp();
  }
}

export const app = admin.apps[0]!;
