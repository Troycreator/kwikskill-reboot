// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-BIiv62hMyo5Duj8k7wJT8IMRJgoEBXM",
  authDomain: "backend-f4dbc.firebaseapp.com",
  projectId: "backend-f4dbc",
  storageBucket: "backend-f4dbc.firebasestorage.app",
  messagingSenderId: "767897493750",
  appId: "1:767897493750:web:9637b98b9249b1ccbe8cd7",
  measurementId: "G-FHYDQ2TSD2"
};

// Initialize Firebase with error handling
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Initialize Auth with state monitoring
export const auth = getAuth(app);

// Monitor auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user.uid);
  } else {
    console.log('User is signed out');
  }
});

export default app;
