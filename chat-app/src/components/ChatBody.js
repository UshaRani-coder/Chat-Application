import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { ChatContext } from '../Context/ChatContext.js'
import logo from "../Assets/chat.png"
function ChatBody() {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  return (
    <div className="chat-body">
      <div className="default">
        <h3>🎉 Welcome to <span><img src={logo} alt="chat-logo" width={"20px"} />Chatverse</span>, {currentUser.displayName}🎉</h3>
        <p>We're excited to have you join us. Start chatting with your friends, share your thoughts, and make new connections.</p>
        <p>Happy chatting! 🚀</p>
      </div>
      {/* <div className="receiver-chat-wrapper">
    <div className="receiver-chat">
      <div className="chatbox">Hey,How are you?</div>
      <div className="receiver">
      <div className="img"></div>
      <span className="time">Just now</span>
    </div>
    </div>
    </div>
     <div className="sender-chat-wrapper">
    <div className="sender-chat">
     <div className="sender">
      <div className="img"></div>
      <div className="time">Just now</div>
     </div>
     <div className="chatbox">I'm good!!</div>
    </div>
    </div> */}
   {/* <div className="receiver-chat-wrapper">
    <div className="receiver-chat">
      <div className="chatbox">Hey,How are you?</div>
      <div className="receiver">
      <div className="img"></div>
      <span className="time">Just now</span>
    </div>
    </div>
    </div>
    <div className="sender-chat-wrapper">
    <div className="sender-chat">
     <div className="sender">
      <div className="img"></div>
      <div className="time">Just now</div>
     </div>
     <div className="chatbox">I'm good!!</div>
    </div>
    </div>
    <div className="receiver-chat-wrapper">
    <div className="receiver-chat">
      <div className="chatbox">Hey,How are you?</div>
      <div className="receiver">
      <div className="img"></div>
      <span className="time">Just now</span>
    </div>
    </div>
    </div>
    <div className="sender-chat-wrapper">
    <div className="sender-chat">
     <div className="sender">
      <div className="img"></div>
      <div className="time">Just now</div>
     </div>
     <div className="chatbox">I'm good!!</div>
    </div>
    </div>
    <div className="receiver-chat-wrapper">
    <div className="receiver-chat">
      <div className="chatbox">Hey,How are you?</div>
      <div className="receiver">
      <div className="img"></div>
      <span className="time">Just now</span>
    </div>
    </div>
    </div>
    <div className="sender-chat-wrapper">
    <div className="sender-chat">
     <div className="sender">
      <div className="img"></div>
      <div className="time">Just now</div>
     </div>
     <div className="chatbox">I'm good!!</div>
    </div>
    </div> */}
    </div>
  )
}

export default ChatBody
