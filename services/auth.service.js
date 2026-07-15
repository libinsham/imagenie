/**
 * Scaffold only — no real auth provider wired up yet (see lib/auth.js).
 * Fill in once you've picked NextAuth.js / Lucia / Clerk / custom JWT.
 */

export async function login(/* email, password */) {
  throw new Error("Not implemented: services/auth.service.js#login");
}

export async function logout(/* sessionToken */) {
  throw new Error("Not implemented: services/auth.service.js#logout");
}
