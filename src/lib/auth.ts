
"use server";

import { cookies } from "next/headers";
import { auth } from "./fireebase";
import type { Auth } from "firebase/auth";

// Session handling
export async function getSession() {
  const cookieStore = await cookies();
    return cookieStore.get("session")?.value || null;
    }

    // This function no longer imports admin SDK directly.
    // Instead, `actions.ts` will inject the correct adminAuth & adminDb.
    export async function createSession(token: string, adminAuth: any, adminDb: any) {
      const decoded = await adminAuth.verifyIdToken(token);
        await adminDb.collection("sessions").doc(decoded.uid).set({
            createdAt: Date.now(),
              });

                const cookieStore = await cookies();
                  cookieStore.set("session", token, { httpOnly: true, secure: true });
                    return true;
                    }

                    "use server";

                    import { cookies } from "next/headers";
                    import { auth } from "./firebase";
                    import type { Auth } from "firebase/auth";

                    // Session handling
                    export async function getSession() {
                      const cookieStore = await cookies();
                        return cookieStore.get("session")?.value || null;
                        }

                        // This function no longer imports admin SDK directly.
                        // Instead, `actions.ts` will inject the correct adminAuth & adminDb.
                        export async function createSession(token: string, adminAuth: any, adminDb: any) {
                          const decoded = await adminAuth.verifyIdToken(token);
                            await adminDb.collection("sessions").doc(decoded.uid).set({
                                createdAt: Date.now(),
                                  });

                                    const cookieStore = await cookies();
                                      cookieStore.set("session", token, { httpOnly: true, secure: true });
                                        return true;
                                        }
                                        