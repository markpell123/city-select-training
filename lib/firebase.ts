import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdGe8REwreIx_ubeyYC7TBAkdce3jl2TA",
  authDomain: "city-select-training.firebaseapp.com",
  projectId: "city-select-training",
  storageBucket: "city-select-training.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);