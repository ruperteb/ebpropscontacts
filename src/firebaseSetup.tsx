
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
/* import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; */

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ebpropscontacts.firebaseapp.com",
  projectId: "ebpropscontacts",
  storageBucket: "ebpropscontacts.appspot.com",
  messagingSenderId: "48645150743",
  appId: "1:48645150743:web:3cd87f2fb6c8cc6e7ee452",
  measurementId: "G-2D782K2WYG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
/* const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider(); */

/* const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}; */

/* const signInWithEmailAndPasswordFunction = async (email:string, password: string) => {
  try {
    await signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}; */

/* const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  }); */

/* const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}; */

/* const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}; */

/* const logout = () => {
  auth.signOut();
}; */

export {
  /*  auth, */
  db,
  /*  signInWithGoogle,
   signInWithEmailAndPassword,
   registerWithEmailAndPassword,
   sendPasswordResetEmail,
   logout, */
};
