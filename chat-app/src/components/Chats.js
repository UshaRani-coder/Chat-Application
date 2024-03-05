import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext.js";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import { ChatContext } from "../Context/ChatContext.js";
function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (docSnapshot) => {
          console.log("Current data: ", docSnapshot.data());
          setChats(docSnapshot.data());
          return () => {
            unsub();
          };
        }
      );
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  function handleSelect(user) {
    dispatch({ type: "changeUser", payload: user });
  }
  console.log(Object.entries(chats));
  return (
    <div className="chats-wrapper">
      {chats &&
        Object.entries(chats)?.map((chat) => {
          const userData = chat[1];
          const lastMessageText = userData.lastMessage?.text;
          if (
            userData &&
            userData.uid &&
            userData.photoURL &&
            userData.displayName
          ) {
           

            return (
              <div
                className="chats"
                key={chat[0]}
                onClick={() => {
                  handleSelect(userData);
                }}
              >
                <img src={userData.photoURL} alt="" />
                <div className="user-chat-info">
                  <span className="user-name">{userData.displayName}</span>
                </div>
              </div>
            );
          } else if (userData.lastMessage && userData.lastMessage.text){
            
              {console.log(lastMessageText)}
                return (
                <span className="last-message">{lastMessageText}</span>
                
            )
          }
        })}
    </div>
  );
}

export default Chats;
