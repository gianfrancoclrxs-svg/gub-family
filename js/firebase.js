import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "secret",
  authDomain: "gub-family.firebaseapp.com",
  projectId: "gub-family",
  storageBucket: "gub-family.firebasestorage.app",
  messagingSenderId: "68913044649",
  appId: "1:68913044649:web:1893ee43eb17bac9951db8",
  measurementId: "G-FMMEQ71SHV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);