import 'server-only';
import { cookies } from 'next/headers';
import type { User } from './types';
import {Auth, getAuth} from 'firebase-admin/auth';
import {app} from '@/lib/firebase-admin';

const SESSION_COOKIE_NAME = 'naijalearn_session';

async function getFirebaseAuth(): Promise<Auth> {
  return getAuth(app);
}

export async function getSession(): Promise<User | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const auth = await getFirebaseAuth();
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const user: User = {
        id: decodedClaims.uid,
        name: decodedClaims.name || 'Anonymous',
        email: decodedClaims.email || '',
        avatarUrl: decodedClaims.picture || undefined,
    };
    return user;
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
}

export async function createSession(idToken: string) {
    const auth = await getFirebaseAuth();
    const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
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
