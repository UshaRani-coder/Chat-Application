// import React, { useContext, useState ,useEffect} from 'react'
// import { AuthContext } from '../Context/AuthContext.js'
// import { ChatContext } from '../Context/ChatContext.js'
// import { onSnapshot,doc } from 'firebase/firestore'
// import { db } from '../firebase.js'
// import logo from "../Assets/chat.png"
// function ChatBody() {
//   const {currentUser} = useContext(AuthContext)
//   const {data} = useContext(ChatContext)
//   const [messages,setMessages] = useState([])
//   console.log(data.ChatId)
//   useEffect(() => {
//     const getMesseges = ()=>{
//     const unsubscribe = onSnapshot(
//       doc(db, "chats", data.ChatId),
//       (docSnapshot) => {
//         console.log("Messages from chat:", docSnapshot.data().messages);
//         setMessages(docSnapshot.data().messages);
//       }
//     );

//     return () => {
//       unsubscribe();
//     }
//     };
//     data.ChatId && getMesseges();
//   }, [data.ChatId]);
//   return (
//     <div className="chat-body">
//       {!messages && (
//       <div className="default">
//         <h3>🎉 Welcome to <span><img src={logo} alt="chat-logo" width={"20px"} />Chatverse</span>, {currentUser.displayName}🎉</h3>
//         <p>We're excited to have you join us. Start chatting with your friends, share your thoughts, and make new connections.</p>
//         <p>Happy chatting! 🚀</p>
//       </div>
//  )}

//        {messages && messages.map((message)=>{
//        <div className="receiver-chat-wrapper" key={message.senderUid}>
//     <div className={`receiver-chat ${message.senderUid === currentUser.uid && 'owner'} `}>
//       <div className="chatbox">{message.text}</div>
//       <div className="receiver">
//       {/* <div className="img"></div> */}
//       <img src={message.senderUid === currentUser.uid && currentUser.photoURL} width={'25px'} alt="" />
//       <span className="time">{message.time}</span>
//     </div>
//     </div>
//     </div>
//     })}
//     {/*
//      <div className="sender-chat-wrapper">
//     <div className="sender-chat">
//      <div className="sender">
//       <div className="img"></div>
//       <div className="time">Just now</div>
//      </div>
//      <div className="chatbox">I'm good!!</div>
//     </div>
//     </div> */}
//    {/* <div className="receiver-chat-wrapper">
//     <div className="receiver-chat">
//       <div className="chatbox">Hey,How are you?</div>
//       <div className="receiver">
//       <div className="img"></div>
//       <span className="time">Just now</span>
//     </div>
//     </div>
//     </div>
//     <div className="sender-chat-wrapper">
//     <div className="sender-chat">
//      <div className="sender">
//       <div className="img"></div>
//       <div className="time">Just now</div>
//      </div>
//      <div className="chatbox">I'm good!!</div>
//     </div>
//     </div>
//     <div className="receiver-chat-wrapper">
//     <div className="receiver-chat">
//       <div className="chatbox">Hey,How are you?</div>
//       <div className="receiver">
//       <div className="img"></div>
//       <span className="time">Just now</span>
//     </div>
//     </div>
//     </div>
//     <div className="sender-chat-wrapper">
//     <div className="sender-chat">
//      <div className="sender">
//       <div className="img"></div>
//       <div className="time">Just now</div>
//      </div>
//      <div className="chatbox">I'm good!!</div>
//     </div>
//     </div>
//     <div className="receiver-chat-wrapper">
//     <div className="receiver-chat">
//       <div className="chatbox">Hey,How are you?</div>
//       <div className="receiver">
//       <div className="img"></div>
//       <span className="time">Just now</span>
//     </div>
//     </div>
//     </div>
//     <div className="sender-chat-wrapper">
//     <div className="sender-chat">
//      <div className="sender">
//       <div className="img"></div>
//       <div className="time">Just now</div>
//      </div>
//      <div className="chatbox">I'm good!!</div>
//     </div>
//     </div> */}
//     </div>
//   )
// }

// export default ChatBody
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext.js";
import { ChatContext } from "../Context/ChatContext.js";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase.js";
import logo from "../Assets/chat.png";

function ChatBody() {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data && data.ChatId) {
      const unsubscribe = onSnapshot(
        doc(db, "chats", data.ChatId),
        (docSnapshot) => {
          console.log("docSnapshot:", docSnapshot); // Log docSnapshot
          console.log("docSnapshot data:", docSnapshot.data()); // Log docSnapshot data
          const messagesData = docSnapshot.data()?.messages;
          console.log("Messages from chat:", messagesData);
          if (messagesData) {
            setMessages(messagesData);
          }
        },
        (error) => {
          console.error("Error fetching document:", error); // Log any error
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [data]);
 console.log(data.user)
  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  // const Day = (seconds) => {
  //   const date = new Date(seconds * 1000);

  //   const _date = date.getDate();
  //   const year = date.getFullYear();
  //   const daysOfWeek = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];

  //   const dayOfWeekIndex = date.getDay();
  //   const dayOfWeekName = daysOfWeek[dayOfWeekIndex];
  //   return `${dayOfWeekName}, ${_date},  ${year}`;
  // };
  return (
    <div className="chat-body">
      {messages.length === 0 && (
        <div className="default">
          <h3>
            🎉 Welcome to{" "}
            <span>
              <img src={logo} alt="chat-logo" width={"20px"} />
              Chatverse
            </span>
            , {currentUser.displayName}🎉
          </h3>
          <p>
            We're excited to have you join us. Start chatting with your friends,
            share your thoughts, and make new connections.
          </p>
          <p>Happy chatting! 🚀</p>
        </div>
      )}
      {/* {messages&& messages.time&& messages.time.seconds&&<h5>{Day(messages.time.seconds)}</h5>} */}
      {messages.length > 0 &&
        messages.map((message) => (
          // message.senderUid === currentUser.uid && (
          <>
            {message.senderUid === currentUser.uid && (
              <div className="sender-chat-wrapper" key={message.id}>
                <div
                  className={`sender-chat ${
                    message.senderUid === currentUser.uid ? "owner" : ""
                  }`}
                >
                  {message.text && (
                    <div className="chatbox">{message.text}</div>
                  )}
                  {message.img && (
                    <img src={message.img} alt="Image" className="send-img" />
                  )}
                  <div className="sender">
                    <img
                      src={
                        message.senderUid === currentUser.uid
                          ? currentUser.photoURL
                          : ""
                      }
                      width={"25px"}
                      alt=""
                    />
                    <span className="time">
                      {formatTime(message.time.seconds)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {/* receiver messeges */}
            {message.senderUid === data.user.uid && (
              <div className="receiver-chat-wrapper" key={message.id}>
                <div className="receiver-chat">
                  {message.text && (
                    <div className="chatbox">{message.text}</div>
                  )}
                  
                  {message.img && (
                    <img src={message.img} alt="Image" className="send-img" />
                  )}
                  
                  <div className="receiver">
                    <img
                      src={
                        message.senderUid === data.user.uid
                          ? data.user.photoURL
                          : ""
                      }
                      width={"25px"}
                      alt=""
                    />
                  </div>
                  <span className="time">
                      {formatTime(message.time.seconds)}
                    </span>
                </div>
              </div>
            )}

            {/* ); */}
          </>
        ))}
    </div>
  );
}

export default ChatBody;
