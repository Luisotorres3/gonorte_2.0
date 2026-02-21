/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
type UserRole = 'admin' | 'coach' | 'client';

interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
}

interface AuthContextType {
  currentUser: AppUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setCurrentUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setLoading(false);
  }, []);

  const loginWithGoogle = async () => {
    throw new Error('Authentication is currently disabled.');
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    void email;
    void password;
    throw new Error('Authentication is currently disabled.');
  };

  const logout = async () => {
    setCurrentUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    isAuthenticated,
    userRole,
    loginWithGoogle,
    loginWithEmailPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
