
"use server";

import { createSession } from "../lib/auth";

// Bridge function between client and server
export async function signIn(idToken: string) {
  return await createSession(idToken);
}
