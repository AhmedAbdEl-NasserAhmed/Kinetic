import { initializeApp } from "firebase/app";
import { getAuth } from "/firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDX663bOMLRjBjL-ZJz3-YIZhIn0Qdqycc",
  authDomain: "kinetic-10c16.firebaseapp.com",
  projectId: "kinetic-10c16",
  storageBucket: "kinetic-10c16.appspot.com",
  messagingSenderId: "863732884295",
  appId: "1:863732884295:web:6da03a2a25228198b1a262",
  measurementId: "G-4NNVFQY12D",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
