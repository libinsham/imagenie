import { create } from "zustand";

/**
 * Client-side auth state cache. This is NOT the source of truth for
 * authentication (that's server-side sessions/JWT via lib/auth.js) — it
 * just mirrors the current user client-side so components can read it
 * without prop-drilling. Populate `setUser` after a successful login call.
 */
export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clear: () => set({ user: null }),
}));
