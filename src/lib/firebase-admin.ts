'use server';

import 'server-only';
import admin from 'firebase-admin';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

// This is a robust way to initialize the Firebase Admin SDK in a Next.js server environment.
// It checks if the app is already initialized to prevent errors during hot-reloads.
const adminApp = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
    })
  : admin.app();

export const adminAuth = adminApp.auth();
export const adminDb = adminApp.firestore();
