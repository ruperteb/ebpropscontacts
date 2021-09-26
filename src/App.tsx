import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  /*  Link, */
  Redirect
} from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

import './App.css';

function App() {


  // const firestoreInstance = getFirestore(useFirebaseApp());

  const [signedIn, setSignedIn] = React.useState(false)

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setSignedIn(true)
      // ...
    } else {
      // User is signed out
      // ...
      setSignedIn(false)
    }
  });

  return (
    // <FirestoreProvider sdk={firestoreInstance}>
    <Router>

      <Switch>
        <Route path="/login">
          {signedIn ? <Redirect to="/dashboard" /> : <Login></Login>}
        </Route>
        <Route path="/dashboard">
          {signedIn ? <Dashboard></Dashboard> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          {signedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}

        </Route>


      </Switch>

    </Router>
    // </FirestoreProvider>
  );
}

export default App;
