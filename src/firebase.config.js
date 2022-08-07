// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDB4cQGxP3Gj60irMVkZnkJSbh8lizFbSA",
  authDomain: "broker-ab828.firebaseapp.com",
  projectId: "broker-ab828",
  storageBucket: "broker-ab828.appspot.com",
  messagingSenderId: "353762931861",
  appId: "1:353762931861:web:bc6132f2f93c9ed0e9579c",
  measurementId: "G-RVB0S7Z95J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();