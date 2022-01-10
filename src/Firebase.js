import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpaldDtIeby9T--ob8Iiq_h1CQN1NlA-U",
    authDomain: "ecommerce-640a5.firebaseapp.com",
    projectId: "ecommerce-640a5",
    storageBucket: "ecommerce-640a5.appspot.com",
    messagingSenderId: "994845394996",
    appId: "1:994845394996:web:4f1c57092d8a8059a62261"
};


// init
firebase.initializeApp(firebaseConfig);

// Exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();