// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWN6XcR4pVu4KO7YHWKvSC3F3oMdfPd30",
  authDomain: "elamar-erp.firebaseapp.com",
  projectId: "elamar-erp",
  storageBucket: "elamar-erp.firebasestorage.app",
  messagingSenderId: "802572455002",
  appId: "1:802572455002:web:0d67fecc8024127f889c63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
