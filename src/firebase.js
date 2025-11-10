import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
apiKey: "AIzaSyDYew7UIj6nu-bcLWzLWDIoF-WnGVY5qWI",
  authDomain: "quickfund-86ae2.firebaseapp.com",
  databaseURL: "https://quickfund-86ae2-default-rtdb.firebaseio.com",
  projectId: "quickfund-86ae2",
  storageBucket: "quickfund-86ae2.firebasestorage.app",
  messagingSenderId: "276834553588",
  appId: "1:276834553588:web:3b3ca1341740d90f7618a1",
  measurementId: "G-FXG2Z444QP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
