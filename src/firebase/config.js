// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAse2X2TJs398rP367Iyp2lSB0QIml-DaI",
  authDomain: "time-tracher-app.firebaseapp.com",
  projectId: "time-tracher-app",
  storageBucket: "time-tracher-app.firebasestorage.app",
  messagingSenderId: "807820079699",
  appId: "1:807820079699:web:a36dc70e7a12201f2ccca6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase app
export default app;