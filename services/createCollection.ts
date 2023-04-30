import firebase from "firebase/app";
import "firebase/firestore";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const GOOGLE_AUTH_DOMAIN = process.env.GOOGLE_AUTH_DOMAIN
const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID

const config = {
  apiKey: GOOGLE_API_KEY,
  authDomain: GOOGLE_AUTH_DOMAIN,
  projectId: GOOGLE_PROJECT_ID,
};
firebase.initializeApp(config);

// console.log(firebase)

export default async function createCollection(email: string, prompt: string, data: JSON) {

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


  // const db = firebase.firestore();

  // db.collection("User")
  //   .add(data)
  //   .then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch((error) => {
  //     console.error("Error adding document: ", error);
  //   });

}
