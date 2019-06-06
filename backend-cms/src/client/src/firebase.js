/*
Import the external libraries:
- dotenv
- firebase
*/
import dotenv from 'dotenv';
import * as Firebase from 'firebase';

// Activatie the dotenv settings from .env file
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "snek-the-museum.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

Firebase.initializeApp(firebaseConfig);
const FStorage = Firebase.storage();

export{
    FStorage, Firebase as default
}
