import { NextResponse } from "next/server";

/**
 * Scaffold only — currently a no-op pass-through.
 *
 * TODO once auth is implemented (see lib/auth.js, services/auth.service.js):
 *   - Check for a valid session/JWT on requests to /dashboard/*
 *   - Redirect unauthenticated requests to a login page
 *
 * Example of what that will look like:
 *
 *   export function middleware(request) {
 *     const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
 *     if (isDashboardRoute) {
 *       const token = request.cookies.get("session")?.value;
 *       if (!token) {
 *         return NextResponse.redirect(new URL("/login", request.url));
 *       }
 *     }
 *     return NextResponse.next();
 *   }
 */
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
