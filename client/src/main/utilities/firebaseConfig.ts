import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDZybclA4zipRKW13ln6NUf1TAsGqbPWZM",
	authDomain: "memorya-c1e3e.firebaseapp.com",
	projectId: "memorya-c1e3e",
	storageBucket: "memorya-c1e3e.appspot.com",
	messagingSenderId: "937621695687",
	appId: "1:937621695687:web:ea2e931da955d2d5c862e2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const projectStorage = firebase.storage();
