// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVuZcnx-70AZQgMVAw74KB8AL1eeB6Oh0",
  authDomain: "printooo-722bf.firebaseapp.com",
  projectId: "printooo-722bf",
  storageBucket: "printooo-722bf.firebasestorage.app",
  messagingSenderId: "553018269572",
  appId: "1:553018269572:web:9eee09e2d128c7abfcc7d1",
  measurementId: "G-62VZVC0NCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db=getFirestore(app);
export const storage = getStorage(app);