import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext.js";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase.js";
import { ChatContext } from "../Context/ChatContext.js";

function Chats(props) {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch, setIsChatSelected } = useContext(ChatContext);
  

  useEffect(() => {
    let unsub;
    const getChats =  () => {
      const collectionRef = collection(db, "userChats");
      unsub = onSnapshot(collectionRef, (querySnapshot) => {
        const chatArr = [];
        querySnapshot.forEach((doc) => {
          chatArr.push(doc.data());
        });
        setChats(chatArr); 
  
      });
    };

    currentUser.uid && getChats();

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [currentUser.uid]);

  function handleSelect(user) {
    dispatch({ type: "changeUser", payload: user });
    setIsChatSelected(true);
  }

  return (
    <div className="chats-wrapper">
      {chats.map((chat, index) => {
        const userInfoKey = Object.keys(chat).find(key => key.includes("userInfo_"));
        const userInfo = userInfoKey ? chat[userInfoKey] : null;
        console.log(userInfoKey,chat)
        return userInfoKey ? (
          <div className="chats" key={index} onClick={() => handleSelect(userInfo)}>
            <img src={userInfo.photoURL} alt="" />
            <div className="user-chat-info" onClick={() => props.setToggleChat((prevState) => !prevState)}>
              <span className="user-name">{userInfo.displayName}</span>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
  
}

export default Chats;
