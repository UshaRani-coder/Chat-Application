import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { doc,onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'
import { ChatContext } from '../Context/ChatContext.js'
function Chats() {
  const [chats,setChats] = useState([])

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(()=>{
    const getChats = ()=>{
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (docSnapshot) => {
        console.log("Current data: ", docSnapshot.data());
        setChats(docSnapshot.data());
        //console.log(chats)
      return ()=>{
        unsub();
      };
  });
}
currentUser.uid && getChats();
  },[currentUser.uid])
  function handleSelect(user){
    dispatch({type:"changeUser",payload:user})
  }
 // console.log(Object.entries(chats))
  return (
    
<div className="chats-wrapper">
    {chats && Object.entries(chats)?.map((chat) => {
        const userData = chat[1];
        // Checking if userData contains the userInfo object
        if (userData && userData.uid && userData.photoURL && userData.displayName) {
            return (
                <div className='chats' key={chat[0]} onClick={()=>{handleSelect(userData)}}>
                    <img src={userData.photoURL} alt="" />
                    <div className="user-chat-info">
                        <span className="user-name">{userData.displayName}</span>
                    </div>
                </div>
            );
        } else {
            return null; // Skip rendering if userData or userInfo is missing
        }
    })}
</div>
  )
}

export default Chats
