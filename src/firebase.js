import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyURkO684YYQb00PEhP-uUlAtaemjelT8",
  authDomain: "empathetic-proxy-s2c2-feminist.firebaseapp.com",
  databaseURL: "https://empathetic-proxy-s2c2-feminist-default-rtdb.firebaseio.com",
  projectId: "empathetic-proxy-s2c2-feminist",
  storageBucket: "empathetic-proxy-s2c2-feminist.appspot.com",
  messagingSenderId: "698383867503",
  appId: "1:698383867503:web:a20291c6e177440bc8f79a",
  measurementId: "G-1T6L7C4D8P"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);