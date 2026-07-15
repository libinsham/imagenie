import { errorResponse } from "@/lib/helpers";

/**
 * Scaffold only. Wire this up once you've picked an auth approach
 * (NextAuth.js, Lucia, custom JWT) — see services/auth.service.js and
 * lib/auth.js for where the actual logic should live.
 */
export async function POST() {
  return errorResponse("Auth is not implemented yet.", 501);
}
