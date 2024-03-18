import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext.js";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import { ChatContext } from "../Context/ChatContext.js";
function Chats(props) {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch,setIsChatSelected } = useContext(ChatContext);
  //const [isChatSelected,setIsChatSelected] = useState(false)
  

  useEffect(() => {
    let unsub;
    const getChats = () => {
        unsub = onSnapshot(
            doc(db, "userChats", currentUser.uid),
            (docSnapshot) => {
                console.log(docSnapshot.data());
                setChats(docSnapshot.data());
            }
        );
    };
    if (currentUser.uid) {
        getChats();
    }
    return () => {
        if (unsub) {
            unsub();
        }
    };
}, [currentUser.uid]);

  function handleSelect(user) {
    dispatch({ type: "changeUser", payload: user });
    setIsChatSelected(true)
    
  }
  //console.log(Object.entries(chats));
  return (
    <div className="chats-wrapper">
      {chats &&
        Object.entries(chats)
          // ?.sort((a, b) => {
          //   console.log(a, b);
          //  return  b[1].date - a[1].date;

          // })
          .map((chat) => {
            const userData = chat[1];
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
                  <div
                    className="user-chat-info"
                    onClick={() => {
                      props.setToggleChat((prevState) => !prevState);
                    }}
                  >
                    <span className="user-name">{userData.displayName}</span>
                    {/* {console.log(userData.lastMessage?.text)} */}
                    {/* <span className="last-messege">{userData.lastMessage?.text}</span> */}
                  </div>
                </div>
              );
            }
          })}
    </div>
  );
}

export default Chats;
