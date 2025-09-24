
'use server';

import 'server-only';
import admin from 'firebase-admin';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

const ADMIN_APP_NAME = 'firebase-admin-app';

function getAdminApp(): admin.app.App {
  if (admin.apps.some((app) => app?.name === ADMIN_APP_NAME)) {
    return admin.app(ADMIN_APP_NAME);
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      return initializeApp(
        {
          credential: cert(serviceAccount),
        },
        ADMIN_APP_NAME
      );
    } catch (error: any) {
        console.error('Firebase Admin SDK initialization error:', error.stack);
        throw new Error('Could not initialize Firebase Admin SDK');
    }
  }

  console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK is not initialized.');
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set.');
}

export async function getAdminAuth(): Promise<Auth> {
  return getAdminApp().auth();
}

export async function getAdminDb(): Promise<Firestore> {
  return getAdminApp().firestore();
}
