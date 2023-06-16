import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBgcryG2NZhxBGPpdepY22y6a0ibkvaaeM",
  authDomain: "fitness-app.firebaseapp.com",
  databaseURL: "https://fitness-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-app",
  storageBucket: "fitness-app.appspot.com",
  messagingSenderId: "109229991916",
  appId: "1:109229991916:web:d6ab9a361b95ac2a5842c9",
  measurementId: "G-Y7KKVP7JEK"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
