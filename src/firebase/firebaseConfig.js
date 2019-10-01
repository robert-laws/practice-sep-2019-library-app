import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJlP5KYShuBy1RZxFvb_SB-Jfq8LqUdpo",
  authDomain: "library-lesson-plans-2019.firebaseapp.com",
  databaseURL: "https://library-lesson-plans-2019.firebaseio.com",
  projectId: "library-lesson-plans-2019",
  storageBucket: "library-lesson-plans-2019.appspot.com",
  messagingSenderId: "756044551256",
  appId: "1:756044551256:web:9aa7b8476cb664727da62d",
  measurementId: "G-VBW9W9VZ9C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;