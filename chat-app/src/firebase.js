// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

// our web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAi6Ch-rp6GaaGblZmlAsC-BRm6IgvJPAs',
  authDomain: 'chat-app-afb62.firebaseapp.com',
  projectId: 'chat-app-afb62',
  storageBucket: 'chat-app-afb62.appspot.com',
  messagingSenderId: '637889072350',
  appId: '1:637889072350:web:b082e4bca92e3ca027c64f',
  measurementId: 'G-Z50K360JLF',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// Initialize the authentication ()
export const auth = getAuth(app)
// Initialize the storage
export const storage = getStorage(app)
// Initialize the Firestore database
export const db = getFirestore(app)
