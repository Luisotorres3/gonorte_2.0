import type { User as FirebaseUser } from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'coach' | 'client';
export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'not_applicable';

export interface ProgressPhoto {
  url: string;
  uploadedAt: Date | Timestamp;
}

export interface TrainingHistoryEntry {
  date: Date | Timestamp;
  routineCompleted: string;
}

export interface CoachUploadedFile {
  url: string;
  fileName: string;
  uploadedAt: Date | Timestamp;
  uploadedBy: string;
  fileType?: string;
  description?: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  role: UserRole;
  
  // Physical data
  weight?: number | null;
  bodyFatPercentage?: number | null;
  progressPhotos?: ProgressPhoto[];
  notes?: string | null;
  
  // Training
  assignedPlanId?: string | null;
  trainingHistory?: TrainingHistoryEntry[];
  
  // Billing
  paymentStatus?: PaymentStatus;
  
  // Timestamps
  registrationDate?: Date | Timestamp;
  lastLoginDate?: Date | Timestamp;
  
  // Files uploaded by coach/admin for this client
  coachUploadedFiles?: CoachUploadedFile[];
}

// Combine FirebaseUser with our custom UserProfile
export type AppUser = FirebaseUser & UserProfile;

// Type for the AuthContext state
export interface AuthContextType {
  currentUser: AppUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
