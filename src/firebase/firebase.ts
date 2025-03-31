// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCasANVvaKFFoYTvKnkHccRvpmYtx6ypDc",
  authDomain: "flashcard-app-faf80.firebaseapp.com",
  projectId: "flashcard-app-faf80",
  storageBucket: "flashcard-app-faf80.firebasestorage.app",
  messagingSenderId: "244526609344",
  appId: "1:244526609344:web:903fcda1891195d6084e25",
  measurementId: "G-712QM4GC9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };