import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const provider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyAHt7g5rAMUac4SAcDUsOcORe1HFTjODsg",
  authDomain: "cryptotracker-abe7f.firebaseapp.com",
  projectId: "cryptotracker-abe7f",
  storageBucket: "cryptotracker-abe7f.appspot.com",
  messagingSenderId: "23873856459",
  appId: "1:23873856459:web:5902312d508c0ed33e8c4e",
  measurementId: "G-1E2RTMXTNT"
};
export async function signIn () {
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const email = result.user;
    const displayName = result.user;
    const photoURL = result.user;
    const uid = result.user
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)