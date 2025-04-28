// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAupIxSPwB5uo4u1-zZgKUiE1AV04vRdrA",
  authDomain: "carsignal-nt131.firebaseapp.com",
  databaseURL: "https://carsignal-nt131-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carsignal-nt131",
  storageBucket: "carsignal-nt131.firebasestorage.app",
  messagingSenderId: "644200017743",
  appId: "1:644200017743:web:bbc3c455269f92ad58df3a",
  measurementId: "G-7XZKZNPD8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export những gì cần thiết
export { db, ref, set, onValue };


