
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ0fRDY1lH2JQ4sEm3aj2-AFB_euuKshE",
  authDomain: "hootme-d1162.firebaseapp.com",
  databaseURL: "https://hootme-d1162-default-rtdb.firebaseio.com",
  projectId: "hootme-d1162",
  storageBucket: "hootme-d1162.firebasestorage.app",
  messagingSenderId: "723961409172",
  appId: "1:723961409172:web:4962b1b428fe8178738e81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
