"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {
    throw new Error("Not implemented: AuthContext#login — wire up services/auth.service.js first.");
  },
  logout: () => {},
});

/**
 * Scaffold only. `user` will always be null until services/auth.service.js
 * and app/api/auth/* are implemented and this is wired to call them.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (_credentials) => {
    throw new Error("Not implemented: AuthProvider#login");
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
