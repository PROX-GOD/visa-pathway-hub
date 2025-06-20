
// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFmscQC0kOSyxtdwtJiHYasBQ2eIc4k1w",
  authDomain: "springfall-a64fc.firebaseapp.com",
  projectId: "springfall-a64fc",
  storageBucket: "springfall-a64fc.firebasestorage.app",
  messagingSenderId: "543479415577",
  appId: "1:543479415577:web:484c4d8e97e8dafaa03b88",
  measurementId: "G-0D6WJCLVH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, query, orderBy, limit };
