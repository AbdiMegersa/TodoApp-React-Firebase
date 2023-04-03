// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8dEDq-Z6ATg5tNlHbPLtcKeDY-5DrIqs",
  authDomain: "todoapp-4e21a.firebaseapp.com",
  projectId: "todoapp-4e21a",
  storageBucket: "todoapp-4e21a.appspot.com",
  messagingSenderId: "1090395440746",
  appId: "1:1090395440746:web:a7ab9d4017a8283d812c13",
  measurementId: "G-0VHV14YV9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)