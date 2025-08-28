// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIH0rBvxFwy5YlvF6Bxx3IZNb25FobGeA",
  authDomain: "portfolio-f1146.firebaseapp.com",
  databaseURL:
    "https://portfolio-f1146-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "portfolio-f1146",
  storageBucket: "portfolio-f1146.firebasestorage.app",
  messagingSenderId: "1048585418281",
  appId: "1:1048585418281:web:bfeb869535011742dc4e38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app);

export default app;
