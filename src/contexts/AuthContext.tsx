import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config'; // Assuming db is your Firestore instance
import type { AppUser, UserProfile, AuthContextType } from '../types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [userRole, setUserRole] = useState<UserProfile['role'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true);
      if (firebaseUser) {
        // User is signed in, now fetch their profile from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userProfileData = userDocSnap.data() as UserProfile;
            // Combine Firebase auth user data with Firestore profile data
            const appUser: AppUser = {
              ...firebaseUser, // from auth
              ...userProfileData, // from firestore (includes role, etc.)
              // Ensure critical fields like uid and email are consistently from firebaseUser or handled
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || userProfileData.displayName,
            };
            setCurrentUser(appUser);
            setUserRole(userProfileData.role);
            setIsAuthenticated(true);
          } else {
            // No profile found in Firestore for this authenticated user.
            // This is an edge case to handle: maybe logout the user, or prompt to create profile.
            // For now, treat as not fully authenticated in app terms.
            console.error("User profile not found in Firestore for UID:", firebaseUser.uid);
            setCurrentUser(firebaseUser as AppUser); // Set basic Firebase user
            setUserRole(null); // Or a default/guest role
            setIsAuthenticated(false); // Or true, depending on how you want to handle this
            // It might be better to sign out the user if a profile is strictly required
            await signOut(auth);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          // Handle error, maybe sign out user
          setCurrentUser(firebaseUser as AppUser); // Set basic Firebase user
          setUserRole(null);
          setIsAuthenticated(false); // Or true
           await signOut(auth); // Sign out on error to be safe
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setUserRole(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle setting the user state
      // Note: After Google sign-in, you MUST ensure a corresponding user profile
      // exists or is created in Firestore with the correct role. This is currently
      // a manual step as per requirements.
    } catch (error) {
      console.error("Google login error:", error);
      setLoading(false);
      // Handle error (e.g., display a message to the user)
    }
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle setting the user state
    } catch (error) {
      console.error("Email/password login error:", error);
      setLoading(false);
      // Handle error (e.g., display a message to the user)
      throw error; // Re-throw to allow form to handle it
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // onAuthStateChanged will handle clearing user state
    } catch (error) {
      console.error("Logout error:", error);
      // Handle error
    } finally {
        setLoading(false);
    }
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
