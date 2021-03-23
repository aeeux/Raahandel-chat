import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyA3CfN1W2acBp1XCfOQbb6r7x84z2od-Do",
  authDomain: "marketplace-superchat.firebaseapp.com",
  projectId: "marketplace-superchat",
  storageBucket: "marketplace-superchat.appspot.com",
  messagingSenderId: "659109377555",
  appId: "1:659109377555:web:cd4417bd47e77dadf5b1e6",
  measurementId: "G-H29WSQDL97"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn /> }
      </section>

    </div>
  );

}

export default App;
