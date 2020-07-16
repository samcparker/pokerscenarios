import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCK4-AUNr_TAU734DgsD9-mEHTLIFdSDyw",
    authDomain: "pokerscenarios-afa35.firebaseapp.com",
    databaseURL: "https://pokerscenarios-afa35.firebaseio.com",
    projectId: "pokerscenarios-afa35",
    storageBucket: "pokerscenarios-afa35.appspot.com",
    messagingSenderId: "359147012056",
    appId: "1:359147012056:web:e6c0de4150c3e6b892bcad",
    measurementId: "G-2GGH1QEY9M"
};
// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

Vue.use(firebase, {name: "firebase"});