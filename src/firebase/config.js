import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
//const analytics = getAnalytics(app);
export const db = getDatabase(app);
export { db };