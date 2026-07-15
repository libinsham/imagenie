/**
 * Auth scaffold — not wired to a real provider yet.
 * Swap this out for NextAuth.js, Lucia, Clerk, etc. once you decide.
 * Kept here so services/repositories have a stable import path
 * (`@/lib/auth`) regardless of which auth library ends up behind it.
 */

export async function getCurrentUser(/* req */) {
  // TODO: decode session/JWT and look up the user.
  return null;
}

export async function requireUser(/* req */) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export async function hashPassword(plainText) {
  // TODO: wire up bcrypt (or argon2) once auth is implemented.
  throw new Error("Not implemented: lib/auth.js#hashPassword");
}

export async function verifyPassword(plainText, hash) {
  throw new Error("Not implemented: lib/auth.js#verifyPassword");
}
