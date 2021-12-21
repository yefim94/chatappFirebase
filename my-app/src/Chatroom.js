import React, { useState, useEffect ,useRef} from 'react'
import {linkWithPhoneNumber, signOut} from "firebase/auth";
import { db } from "./firebase-config"
import { auth } from "./firebase-config";
import { collection, query, where, getDocs, limit, orderBy, onSnapshot, docs, doc,Timestamp, addDoc} from "firebase/firestore";
const Chatroom = () => {
  const messagesRef = collection(db, "messages")
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("")
  const scrollRef = useRef();

  const addMessage = async (e) => {
    e.preventDefault();
    await addDoc(messagesRef, {
      text: messageText,
      photoURL: photoURL,
      createdAt: Timestamp.fromDate(new Date()),
      uid: uid
    })
    setMessageText("")
  }
  useEffect(() => {
    const getData = async () => {
      const data = query(messagesRef, orderBy("createdAt", "asc"), limit(20))
      onSnapshot(data, (snapshot) => {
        let msg = []
        snapshot.forEach((doc) => {msg.push(doc.data())})
        setMessages(msg)
      })
    }
    getData();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  })
  const {uid, photoURL, displayName} = auth.currentUser;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div style={{width: "100%", height: "100%", flexDirection: "column", display: "Flex", backgroundColor: "transparent"}}>
     <div style={{padding: "1em", display: "flex", justifyContent: "space-between", flex: 0.3, borderBottom: "2px solid white", alignItems: "center" }}>
       <div style={{display: "Flex", alignItems: "center", }}>
       <img width="50px" height="50px" style={{
         borderRadius: "50%",
       }} src={photoURL} />
       <h1 style={{
         color: "#fff",
         fontSize: '1rem',
         marginLeft: "1EM"
       }}>{displayName}</h1>
       </div>
     <button className="sign-out" style={{color: "grey", backgroundColor: "#fff", borderRadius: "5px", height: "50px", border: "1px solid grey", cursor: "pointer"}}onClick={() => signOut(auth)}>Google Logout</button>
     </div>
       <div style={{display: "flex", flexDirection: "column", flex: 2,backgroundColor:"transparent", overflow: "scroll", padding: "0", whiteSpace: "none",alignItems:"flex-start"}}>
       {messages.map((msg,key) => (
         <>
          <div ref={scrollRef} style={{
            display: "flex",
            alignItems: "center"
          }} key={key} className={`${messageClass}`}>
          <img style={{ width: "40px", height: "40px", borderRadius: "50%"}} src={msg.photoURL} />
          <p style={{marginLeft: "17px"}} >{msg.text}</p>
          </div>
         </>
       ))}
       </div>
       <form onSubmit={addMessage} style={{flex: 0.4, display: "flex", alignItems: "center", zIndex: "100", padding: "1em"}}>
       <input onChange={(e) => {
         setMessageText(e.target.value)
       }} value={messageText} type="text" placeholder="type to chat" style={{
         outline: "none",
         width: "100%",
         border: "none",
         borderRadius: "10px",
         padding: "1em"
       }}/>
       </form>
    </div>
  )
}

export default Chatroom 