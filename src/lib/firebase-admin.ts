
'use server';

import 'server-only';
import admin from 'firebase-admin';
import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;

function initializeFirebaseAdmin() {
  if (!adminApp) {
    if (getApps().some((app) => app?.name === 'admin')) {
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
  }
  return adminApp;
}

export async function getAdminAuth(): Promise<Auth> {
  const app = initializeFirebaseAdmin();
  if (!app) {
    throw new Error("Admin SDK not initialized");
  }
  return admin.auth(app);
}

export async function getAdminDb(): Promise<Firestore> {
  const app = initializeFirebaseAdmin();
  if (!app) {
    throw new Error("Admin SDK not initialized");
  }
  return admin.firestore(app);
}
