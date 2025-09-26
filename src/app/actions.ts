
"use server";

import { adminAuth, adminDb } from "../lib/firebase-admin";
import { createSession } from "../lib/auth";

// Bridge function between client and server
export async function signIn(idToken: string) {
  return await createSession(idToken, adminAuth, adminDb);
  }
  