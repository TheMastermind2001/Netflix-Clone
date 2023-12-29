

// import firebase from "firebase";
// import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

// var firebase = require('firebase');
// console.log("Hi");

const firebaseConfig = {
    apiKey: "AIzaSyAWVHtDoE_N46GR2nSypOOkj4uRUumBzKs",
    authDomain: "netflix-clone-e93d2.firebaseapp.com",
    projectId: "netflix-clone-e93d2",
    storageBucket: "netflix-clone-e93d2.appspot.com",
    messagingSenderId: "230073108046",
    appId: "1:230073108046:web:bae2907e979aaa0847e51f"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  // const auth2=firebase.auth();
  // console.log(auth===auth2);

  export {auth};
  export default db;