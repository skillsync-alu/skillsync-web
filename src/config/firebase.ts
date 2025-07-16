// Firebase config and initialization for Skillsync Web
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase web config
const firebaseConfig = {
  apiKey: "AIzaSyDZezs0MTOjWUkR3gxIkyN1ImThRhEPdkQ",
  authDomain: "skillsync-alu.firebaseapp.com",
  projectId: "skillsync-alu",
  //   storageBucket: "skillsync-alu.firebasestorage.app",
  storageBucket: "skillsync-alu.appspot.com",
  messagingSenderId: "878713143490",
  appId: "1:878713143490:web:6cf4323600c81f9cbd7b5b",
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);
