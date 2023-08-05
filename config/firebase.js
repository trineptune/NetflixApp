// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBhyz9QxnKwwVb1-uAsGgKT-BAp4ZplAM",
  authDomain: "apituan8.firebaseapp.com",
  projectId: "apituan8",
  storageBucket: "apituan8.appspot.com",
  messagingSenderId: "801465630987",
  appId: "1:801465630987:web:e9067f0f53459acc46a20e",
  measurementId: "G-VG93699XCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);
