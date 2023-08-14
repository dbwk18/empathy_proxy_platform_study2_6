import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9tsIY7cHq9teBMEDCgI9MqV3od3Nxq5c",
  authDomain: "empathetic-proxy-s1-abortion2.firebaseapp.com",
  databaseURL: "https://empathetic-proxy-s1-abortion2-default-rtdb.firebaseio.com",
  projectId: "empathetic-proxy-s1-abortion2",
  storageBucket: "empathetic-proxy-s1-abortion2.appspot.com",
  messagingSenderId: "640620794453",
  appId: "1:640620794453:web:af71fc88f087ad4e773adc",
  measurementId: "G-Q5D7RE90MQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);