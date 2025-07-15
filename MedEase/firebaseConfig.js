// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeORLwfICrnDDrC4YJQSq6VQLYYupJ3PY",
  authDomain: "medease-e9d0c.firebaseapp.com",
  projectId: "medease-e9d0c",
  storageBucket: "medease-e9d0c.appspot.com",
  messagingSenderId: "339600501822",
  appId: "1:339600501822:web:669dc80e2728d954bf356f"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const FIREBASE_APP = app;
export const FIREBASE_DB = getFirestore(app);
export const FIREBASE_AUTH = auth;
export const FIREBASE_STORAGE = getStorage(app);