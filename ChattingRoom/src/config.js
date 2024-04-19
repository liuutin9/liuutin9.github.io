// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA4eeIZcQwl8X6kkvLy-M_34gU51b8ih3A",
	authDomain: "chattingroom-72df1.firebaseapp.com",
	projectId: "chattingroom-72df1",
	storageBucket: "chattingroom-72df1.appspot.com",
	messagingSenderId: "156111591206",
	appId: "1:156111591206:web:72df8f47fced011a7ed3e7",
	measurementId: "G-KNPG9N74VZ",
	databaseURL: "https://chattingroom-72df1-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();
export const storage = getStorage();
