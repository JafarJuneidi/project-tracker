import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAylIMX22qH1h4ZtpUD1yHckus3I4UgAdM",
  authDomain: "project-tracker-2-cedde.firebaseapp.com",
  projectId: "project-tracker-2-cedde",
  storageBucket: "project-tracker-2-cedde.appspot.com",
  messagingSenderId: "646745285794",
  appId: "1:646745285794:web:4e5ec994cd821fd6a023fb",
  measurmentId: "G-CNZ32D0P2S"
});

export default app;

export const auth = firebase.auth();
