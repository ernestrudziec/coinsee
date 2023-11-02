import { FirebaseOptions, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAoBWYCmyHgy89KhEC7SqROaRN629g01r8",
  authDomain: "coinsee-72018.firebaseapp.com",
  projectId: "coinsee-72018",
  storageBucket: "coinsee-72018.appspot.com",
  messagingSenderId: "820511466875",
  appId: "1:820511466875:web:90af44e4c9fb6271fe49de",
  measurementId: "G-GHZG97K1YL",
};

// initialize

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const firestore = getFirestore(app);

export const auth = getAuth(app);
