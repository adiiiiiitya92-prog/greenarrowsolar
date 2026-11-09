import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// NEXT_PUBLIC_* values must be referenced literally so Next can inline them at build time.
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

function app(): FirebaseApp {
  if (!firebaseConfigured) throw new Error("Firebase is not configured. Fill NEXT_PUBLIC_FIREBASE_* in .env.local");
  return getApps().length ? getApp() : initializeApp(config);
}

export const auth = (): Auth => getAuth(app());
export const db = (): Firestore => getFirestore(app());

export type LeadStatus = "new" | "contacted" | "closed";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  interest: string;
  monthlyBill: number | null;
  message: string;
  page: string;
  status: LeadStatus;
  note: string;
  createdAt: Date | null;
};
