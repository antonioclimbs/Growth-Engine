// import firebase from "firebase/app";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
// import * as firebase from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, Timestamp, setDoc } from "firebase/firestore";
// const { initializeAppCheck, ReCaptchaV3Provider, ReCaptchaEnterpriseProvider } = require("firebase/app-check");

const firebaseConfig = {
  apiKey: "AIzaSyCK1CTAwI_3ZE2c69sHycgfoorcn7lvyi4",
  authDomain: "growth-engine-384817.firebaseapp.com",
  projectId: "growth-engine-384817",
  storageBucket: "growth-engine-384817.appspot.com",
  messagingSenderId: "483245576152",
  appId: "1:483245576152:web:1e86c5e3c5c8dfc13bacad",
  measurementId: "G-53JBP5DV40"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('growthenginesecretkey'),
//   isTokenAutoRefreshEnabled: true
// });

const UserController = {
  createUser: async function (email: string) {
    try {
      const userDocRef = await setDoc(doc(db, "users"), {
        email,
        dateCreated: Timestamp,
      });

      // const postsCollection = userDocRef.collection('posts');
      // const postsCollection = addDoc(collection(userDocRef, "prompt"), {
      //   prompt,
      //   data
      // })
      console.log("Document written: ", userDocRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  createPrompt: async function (email: string, prompt: string, data: JSON) {
    try {
      const userDocRef = await doc(collection(db, email));
      // const postsCollection = userDocRef.collection('posts');
      const postsCollection = addDoc(collection(userDocRef, "prompt"), {
        prompt,
        data
      })
      console.log("Added prompt to user ", userDocRef.id, "with prompt", postsCollection);
    } catch (e) {
      console.error("Error adding prompt: ", e);
    }

  },

  testCreateController: async function () {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }


  // updateUser: async function (email: string) {
  //   const docRef = doc(db, "users", email);

  //   // update doc
  //   await updateDoc(docRef, {
  //     capital: true
  //   });
  // }
};



/*
  // Create a reference to the users collection
  const usersCollectionRef = firebase.firestore().collection("users");
 
  // Add a new user document with the email as the document ID
  const userDocRef = usersCollectionRef.doc(email);
  await userDocRef.set({});
 
  // Create a reference to the prompts subcollection for the new user document
  const promptsCollectionRef = userDocRef.collection("prompts");
 
  // Add a new prompt document to the prompts subcollection
  const promptData = {
    prompt: prompt,
    data: data,
  };
  const promptDocRef = promptsCollectionRef.doc("prompt1");
  await promptDocRef.set(promptData);
*/

// const db = firebase.firestore();

// db.collection("User")
//   .add(data)
//   .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch((error) => {
//     console.error("Error adding document: ", error);
//   });



export default UserController;