// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics } from "firebase/analytics"; // Optional: if you want to use Analytics

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoxZlZuUK1fTnsYhcpDKH_JKO99m7zxAU",
  authDomain: "gonorte-web.firebaseapp.com",
  projectId: "gonorte-web",
  storageBucket: "gonorte-web.appspot.com", // Corrected: removed 'firebasestorage' from the middle, as per standard config. If yours is different, we might need to adjust.
  messagingSenderId: "428167221576",
  appId: "1:428167221576:web:39614495f7988eb46ce37d",
  measurementId: "G-4WYSLNDNMH"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize and export Firebase services
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const analytics: Analytics | undefined = typeof window !== 'undefined' ? getAnalytics(app) : undefined; // Optional: Initialize Analytics only in client-side environments

export { app, auth, db, storage, analytics };
