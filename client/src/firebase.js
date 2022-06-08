// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import 'firebase/firestore'
/*
  -configurar el firestore: https://firebase.google.com/docs/firestore/quickstart
  - delete: https://firebase.google.com/docs/firestore/manage-data/delete-data
  - update: https://firebase.google.com/docs/firestore/manage-data/add-data
  - React Icon: https://react-icons.github.io/react-icons
  - Instagram clone dashboard: https://console.firebase.google.com/u/0/project/instagram-clone-3c0ee/overview

  - Este video creo que puede ayudar: https://www.youtube.com/watch?v=ey4k6mW9ds4&t=4s

  PARA INVESTIGAR: (ten en cuenta que el db es el nombre que le puse yo)
  Esto es asincronico
    --> db.collection()
    --> db.collection().doc()
    --> db.collection().doc().set()
*/
const firebaseConfig = {
  apiKey: "AIzaSyDxxICa5uv3G6rIfm6wS-TrnHlz4ny7n1g",
  authDomain: "instagram-clone-3c0ee.firebaseapp.com",
  projectId: "instagram-clone-3c0ee",
  storageBucket: "instagram-clone-3c0ee.appspot.com",
  messagingSenderId: "608415119773",
  appId: "1:608415119773:web:1a8a07fcaad7f679ce1774",
  measurementId: "G-Y2WLG4TRJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth();
export const db = getFirestore(app)