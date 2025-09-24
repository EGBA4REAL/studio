
'use server';

import 'server-only';
import admin from 'firebase-admin';
import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;

function initializeFirebaseAdmin() {
  if (getApps().some(app => app.name === 'admin')) {
      adminApp = admin.app('admin');
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      adminApp = initializeApp({
          credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
      }, 'admin');
    } catch (error: any) {
       console.error("Firebase Admin SDK initialization error:", error.stack);
    }
  } else {
      console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK is not initialized.");
  }
  
  if (adminApp) {
      adminAuth = admin.auth(adminApp);
      adminDb = admin.firestore(adminApp);
  } else {
       // Set to dummy objects to prevent app crash on subsequent calls
       adminApp = {} as App;
       adminAuth = {} as Auth;
       adminDb = {} as Firestore;
  }
}

export async function getAdminAuth(): Promise<Auth> {
  if (!adminAuth) {
    initializeFirebaseAdmin();
  }
  return adminAuth!;
}

export async function getAdminDb(): Promise<Firestore> {
  if (!adminDb) {
    initializeFirebaseAdmin();
  }
  return adminDb!;
}
