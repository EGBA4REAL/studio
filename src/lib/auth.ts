'use server';
import 'server-only';
import { cookies } from 'next/headers';
import type { User } from './types';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

const SESSION_COOKIE_NAME = 'naijalearn_session';

export async function getSession(): Promise<User | null> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    
    // Get user data from Firestore
    const userDoc = await adminDb.collection('users').doc(decodedClaims.uid).get();
    
    if (!userDoc.exists) {
      // This case should ideally not happen if user is created on first login
      return null;
    }

    return userDoc.data() as User;
  } catch (error) {
    console.error('Error verifying session cookie or fetching user:', error);
    // Clear the invalid cookie
    cookies().delete(SESSION_COOKIE_NAME);
    return null;
  }
}

export async function createSession(idToken: string) {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days

    // Check if user exists in Firestore, create if not
    const userRef = adminDb.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      const newUser: User = {
        id: uid,
        name: decodedToken.name || 'Anonymous',
        email: decodedToken.email || '',
        avatarUrl: decodedToken.picture || undefined,
        subscription: { status: 'free' },
      };
      await userRef.set(newUser);
    }
    
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    cookies().set(SESSION_COOKIE_NAME, sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });
}

export async function deleteSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}
