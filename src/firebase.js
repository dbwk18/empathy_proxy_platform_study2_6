import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnIfibtvMgmk2VNwVRJUksMhjcQHOBj_I",
  authDomain: "empathy-proxy-platform-1.firebaseapp.com",
  databaseURL: "https://empathy-proxy-platform-1-default-rtdb.firebaseio.com",
  projectId: "empathy-proxy-platform-1",
  storageBucket: "empathy-proxy-platform-1.appspot.com",
  messagingSenderId: "1006599042423",
  appId: "1:1006599042423:web:cb6679adb0fd6487f25d72",
  measurementId: "G-T2V4LHGJNJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);