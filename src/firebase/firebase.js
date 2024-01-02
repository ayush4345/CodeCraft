// Import the functions you need from the SDKs you need
// For our server-side rendering, since we're using NextJS, we can do some optimizations: getApp, getApps
import { initializeApp, getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// We added these imports:
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3dJoc19pqOeoT7m10rXLCAZ9TcLRyDgA",
  authDomain: "leetcode-clone-next.firebaseapp.com",
  projectId: "leetcode-clone-next",
  storageBucket: "leetcode-clone-next.appspot.com",
  messagingSenderId: "292291515903",
  appId: "1:292291515903:web:780cc06329ce09c8ca83ca"
};

// Initialize Firebase
// Original: const app = initializeApp(firebaseConfig);
// We modified:
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// We added:
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };
