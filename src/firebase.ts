import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPWgz5q7OZjTnSaZvvNMsqgiaR4cx2CME",
    authDomain: "first-todo-app-57330.firebaseapp.com",
    projectId: "first-todo-app-57330",
    storageBucket: "first-todo-app-57330.appspot.com",
    messagingSenderId: "1053742254087",
    appId: "1:1053742254087:web:8e8cd02a61d666825302a2"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);