import React, { useState } from 'react'
import {  onAuthStateChanged } from "firebase/auth";
import './index.css';
import Chatroom from "./Chatroom"
import SignIn from "./SignIn"
import { auth } from "./firebase-config";

function App() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) { 
      setUser(user);
    } else {
      setUser(null)
      }
    }
  );
  return (
    <div className="App">
     <div className="overlay">
     {user ? 
      <Chatroom /> : 
      <SignIn />
      }
     </div>
    </div>
  )
}
export default App