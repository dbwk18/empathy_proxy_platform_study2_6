import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjn5pvxo5wa2iET0R8y5RqGsOeO4czJyY",
  authDomain: "empathetic-proxy-s1-abortion.firebaseapp.com",
  databaseURL: "https://empathetic-proxy-s1-abortion-default-rtdb.firebaseio.com",
  projectId: "empathetic-proxy-s1-abortion",
  storageBucket: "empathetic-proxy-s1-abortion.appspot.com",
  messagingSenderId: "652753473956",
  appId: "1:652753473956:web:ce5b7f2b324e62ce55b131",
  measurementId: "G-BLS5GGR6D4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);