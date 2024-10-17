import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDgvGBwhIsSKv55z6vXpZ1Cq5R1a1FwmK8",
  authDomain: "abd-commerce.firebaseapp.com",
  projectId: "abd-commerce",
  storageBucket: "abd-commerce.appspot.com",
  messagingSenderId: "115123536066",
  appId: "1:115123536066:web:96016fc1ec80d11ed53b5b",
  measurementId: "G-9TG3CXSNK1"   
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase