import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVYU8DrM0m9QAAavuZVk94O_owf_Ts92g",
  authDomain: "empathetic-proxy-s2-feminist.firebaseapp.com",
  databaseURL: "https://empathetic-proxy-s2-feminist-default-rtdb.firebaseio.com",
  projectId: "empathetic-proxy-s2-feminist",
  storageBucket: "empathetic-proxy-s2-feminist.appspot.com",
  messagingSenderId: "1079642734285",
  appId: "1:1079642734285:web:a738a24255e91191c33384",
  measurementId: "G-4013D115CW"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);