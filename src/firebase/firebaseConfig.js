// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwXbOxLZiqw0HtW9pJ9BsEnHQZkHTJ1qA",
    authDomain: "naruto-de02c.firebaseapp.com",
    projectId: "naruto-de02c",
    storageBucket: "naruto-de02c.appspot.com",
    messagingSenderId: "43575236621",
    appId: "1:43575236621:web:c61c6b6a0c1047e97c1d44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { app, db  }