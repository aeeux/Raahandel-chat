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

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />} //if user is signed in then show ChatRoom, if not then show SignIn
      </section>

    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithGoogle(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const messageRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdArt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'}); //listen to data with a hook, React will observe the changes in realtime.

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <div>

      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  return <p>{text}</p>
}

export default App;
