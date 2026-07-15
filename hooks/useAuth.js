"use client";

import { useAuthContext } from "@/context/AuthContext";

/**
 * Thin convenience wrapper around AuthContext. Exists so components can
 * `import { useAuth } from "@/hooks/useAuth"` alongside the other hooks/
 * instead of reaching into context/ directly.
 */
export function useAuth() {
  return useAuthContext();
}
