// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDEaRf9ippOVNir1d5J6kxpv-E5tiWF4k",
  authDomain: "poised-backbone-393817.firebaseapp.com",
  projectId: "poised-backbone-393817",
  storageBucket: "poised-backbone-393817.appspot.com",
  messagingSenderId: "647778988979",
  appId: "1:647778988979:web:b7e5a2833b5364f4a0d1c6",
  measurementId: "G-Q3WPL17EG2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)
