import { create } from "zustand";

/**
 * General cross-page UI state that doesn't belong to a single component
 * (e.g. a global toast queue, a shared "is navigating" flag). Kept
 * separate from authStore so auth state can be reasoned about in isolation.
 */
export const useAppStore = create((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
}));
