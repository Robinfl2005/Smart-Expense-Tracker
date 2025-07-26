// firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrJDPXlWhgQSqe3Gfi7_0lD4-qQRAQZig",
  authDomain: "smartexpensetracker-1c2cf.firebaseapp.com",
  projectId: "smartexpensetracker-1c2cf",
  storageBucket: "smartexpensetracker-1c2cf.appspot.com",
  messagingSenderId: "579615978124",
  appId: "1:579615978124:web:687c044645edb4d26541a9",
  measurementId: "G-SSE9KZ5ZPK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };
