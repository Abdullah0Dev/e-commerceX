import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";

import AsyncStorage, {
  AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgvGBwhIsSKv55z6vXpZ1Cq5R1a1FwmK8",
  authDomain: "abd-commerce.firebaseapp.com",
  projectId: "abd-commerce",
  storageBucket: "abd-commerce.appspot.com",
  messagingSenderId: "115123536066",
  appId: "1:115123536066:web:96016fc1ec80d11ed53b5b",
  measurementId: "G-9TG3CXSNK1",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
 
if (!FIREBASE_AUTH) {
  initializeAuth(FIREBASE_APP, {
   persistence: browserLocalPersistence,
  //  asyncStorage: AsyncStorage as any,
 });
}  