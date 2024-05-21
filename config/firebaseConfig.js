// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKznxY_--EfK6phP-DLYXDqrImqDmodBg ",
  authDomain: "Job-Finder-2024.firebaseapp.com",
  databaseURL: "https://console.firebase.google.com/project/job-finder-2024-d6c90/database/job-finder-2024-d6c90-default-rtdb/data/~2F",
  projectId: "job-finder-2024-d6c90",
  storageBucket: "gs://job-finder-2024-d6c90.appspot.com",
  messagingSenderId: "342543296301 ",
  // appId: "1:57740172690:web:92559c6fc081c9b49fb54b"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);