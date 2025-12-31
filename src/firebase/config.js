// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOnlWW-C6gHNn6GXhLuZHgfK44jkgPvhU",
  authDomain: "ecomm-ashop.firebaseapp.com",
  projectId: "ecomm-ashop",
  storageBucket: "ecomm-ashop.firebasestorage.app",
  messagingSenderId: "578906121006",
  appId: "1:578906121006:web:fb3abcb5c33a3ea332d0bf",
  measurementId: "G-90QWYQ0V4T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const fire = getFirestore(app);
export const storage = getStorage(app);
export default app;
