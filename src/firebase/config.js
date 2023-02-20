import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIwBBRK1HwJCqhnaubMLmQdUlcBpB-eXA",
    authDomain: "machi-koro-2021.firebaseapp.com",
    projectId: "machi-koro-2021",
    storageBucket: "machi-koro-2021.appspot.com",
    messagingSenderId: "97300015993",
    appId: "1:97300015993:web:f01e61cca2d8dd4b1e9da8",
    measurementId: "G-B7QD6XJTK5"
  };

//init firebase
firebase.initializeApp(firebaseConfig)

//init firestore service
const projectFirestore = firebase.firestore()

export {projectFirestore}