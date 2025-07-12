// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU0-FvV3gLhyeUAW8GdbQKnXrxY5GSn5o",
  authDomain: "auth-c739d.firebaseapp.com",
  projectId: "auth-c739d",
  storageBucket: "auth-c739d.firebasestorage.app",
  messagingSenderId: "909392042251",
  appId: "1:909392042251:web:6f7aa382b789c148e5ea0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);