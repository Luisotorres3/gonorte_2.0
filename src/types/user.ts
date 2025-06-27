import type { User as FirebaseUser } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  role: 'admin' | 'coach' | 'client'; // User roles
  // Physical data
  weight?: number | null;
  bodyFatPercentage?: number | null;
  progressPhotos?: Array<{ url: string; uploadedAt: Date }>;
  notes?: string | null;
  // Training
  assignedPlanId?: string | null;
  trainingHistory?: Array<{ date: Date; routineCompleted: string }>;
  // Billing
  paymentStatus?: 'paid' | 'pending' | 'overdue' | 'not_applicable';
  // Timestamps
  registrationDate?: Date;
  lastLoginDate?: Date;
  // Files uploaded by coach/admin for this client
  coachUploadedFiles?: Array<{
    url: string;
    fileName: string;
    uploadedAt: Date; // Will be Timestamp in Firestore, Date in JS
    uploadedBy: string; // UID of admin/coach
    fileType?: string; // e.g., 'pdf', 'jpg', 'png'
    description?: string;
  }>;
}

// Combine FirebaseUser with our custom UserProfile
// We might not need all FirebaseUser fields, but it's good to have them available.
export type AppUser = FirebaseUser & UserProfile;

// Type for the AuthContext state
export interface AuthContextType {
  currentUser: AppUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  userRole: UserProfile['role'] | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // We'll add signup and other functions as needed
}
