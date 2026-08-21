// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCT0AGKao1x5vK4NwB4FZ9ZDSh8OwfRhkQ",
    authDomain: "ash-nextjs-auth.firebaseapp.com",
    projectId: "ash-nextjs-auth",
    storageBucket: "ash-nextjs-auth.firebasestorage.app",
    messagingSenderId: "1073925242295",
    appId: "1:1073925242295:web:0f1b71df0c930772d7bc32",
    measurementId: "G-NB4M9TL71X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);