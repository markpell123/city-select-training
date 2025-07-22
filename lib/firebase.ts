// lib/firebase.ts

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCdGe8REwreIx_ubeyYC7TBAkdce3jl2TA",
  authDomain: "city-select-training.firebaseapp.com",
  projectId: "city-select-training",
  storageBucket: "city-select-training.firebasestorage.app",
  messagingSenderId: "864327585408",
  appId: "1:864327585408:web:4d4f0ea4a7ae6f01b12065",
  measurementId: "G-K440DX4E06"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);