import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBut6yxCZoMaR5yTwLGhs8Oku0_bAiBDSU",
  authDomain: "templete-20d93.firebaseapp.com",
  projectId: "templete-20d93",
  storageBucket: "templete-20d93.firebasestorage.app",
  messagingSenderId: "57402164936",
  appId: "1:57402164936:web:f11049e450b5a94c3307fd"
};

const app = initializeApp(firebaseConfig);




const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };