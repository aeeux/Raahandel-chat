import React, { useRef, useState } from 'react';
import './App.css';
import logo from './images/råhandel-logo.png'; // logo import
import icon from './images/submit-icon.png'; // submit text icon import

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

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
const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <Header /> : ""}
        {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}

function Header() {


  return(
    <>
      <header>
        <img className="logo" src={logo} />
        <h1 className="logo"></h1>
        <SignOut />
      </header>
    </>
  )

}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Chat</button>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Log ud</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
  <section>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Skriv en besked..." />

      <button className="submitmessage" type="submit" disabled={!formValue}></button>

    </form>
  </section>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img className="profile-img" src={photoURL || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80'} alt="adorable" />
      <p>{text}</p>
    </div>
  </>)
}


export default App;