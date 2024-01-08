// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi6Ch-rp6GaaGblZmlAsC-BRm6IgvJPAs",
  authDomain: "chat-app-afb62.firebaseapp.com",
  projectId: "chat-app-afb62",
  storageBucket: "chat-app-afb62.appspot.com",
  messagingSenderId: "637889072350",
  appId: "1:637889072350:web:b082e4bca92e3ca027c64f",
  measurementId: "G-Z50K360JLF"
};

// Initialize Firebase and export it 
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
