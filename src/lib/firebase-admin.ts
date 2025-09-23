'use server';

import 'server-only';
import admin from 'firebase-admin';
import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

let adminApp: App;
let adminAuth: Auth;
let adminDb: Firestore;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    adminApp = !getApps().length
      ? initializeApp({
          credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
        })
      : admin.app();
    
    adminAuth = adminApp.auth();
    adminDb = adminApp.firestore();
  } catch (error: any) {
     console.error("Firebase Admin SDK initialization error:", error.stack);
     // Provide dummy instances to prevent app crash
    adminApp = {} as App;
    adminAuth = {} as Auth;
    adminDb = {} as Firestore;
  }
} else {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK is not initialized. This is expected for local development if not using server-side Firebase features.");
    // Provide dummy instances if not initialized to prevent app from crashing on import
    adminApp = {} as App;
    adminAuth = {} as Auth;
    adminDb = {} as Firestore;
}


export { adminAuth, adminDb };
