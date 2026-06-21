// CO3: React hooks as lifecycle abstraction (auth state via Context)
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Demo credential — for a real system this would call a secured auth service.
const DEMO_ADMIN = { email: 'admin@college.edu', password: 'admin123' };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = window.localStorage.getItem('cnnbs.user');
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const loggedIn: User = { id: 'u1', name: 'College Admin', email, role: 'admin' };
      setUser(loggedIn);
      window.localStorage.setItem('cnnbs.user', JSON.stringify(loggedIn));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('cnnbs.user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
