// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtELus1NfjPIo3ppl2YREGzrzEMng60Vg",
  authDomain: "lms-project-f5acd.firebaseapp.com",
  projectId: "lms-project-f5acd",
  storageBucket: "lms-project-f5acd.appspot.com",
  messagingSenderId: "342554572178",
  appId: "1:342554572178:web:345f2d0ba5f5f8de947d4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
