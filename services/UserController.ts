// import firebase from "firebase/app";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, Timestamp } from "firebase/firestore";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_AUTH_DOMAIN = process.env.GOOGLE_AUTH_DOMAIN;
const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID;

const config = {
  apiKey: GOOGLE_API_KEY,
  authDomain: GOOGLE_AUTH_DOMAIN,
  projectId: GOOGLE_PROJECT_ID,
};

const app = initializeApp(config);
const db = getFirestore(app);

type updateData = {
  email?: string,

}

const UserController = {
  createUser: async function (email: string) {
    try {
      const userDocRef = await addDoc(collection(db, "users"), {
        email,
        dateCreated: Timestamp,
      });

      // const postsCollection = userDocRef.collection('posts');
      // const postsCollection = addDoc(collection(userDocRef, "prompt"), {
      //   prompt,
      //   data
      // })
      console.log("Document written with ID: ", userDocRef.id);
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