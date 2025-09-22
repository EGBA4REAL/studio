import 'server-only';
import { cookies } from 'next/headers';
import type { User } from './types';

const MOCK_USER: User = {
  id: '1',
  name: 'Demo Student',
  email: 'student@naijalearn.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=student@naijalearn.com',
};

const SESSION_COOKIE_NAME = 'naijalearn_session';

export async function getSession(): Promise<User | null> {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (session?.value) {
    try {
      const user = JSON.parse(session.value) as User;
      return user;
    } catch (error) {
      return null;
    }
  }

  return null;
}

export async function createSession() {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(MOCK_USER), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
