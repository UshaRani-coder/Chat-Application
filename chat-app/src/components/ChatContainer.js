import React from 'react'
import ChatNavbar from './ChatNavbar'
import Input from './Input'
import ChatBody from './ChatBody'
function ChatContainer(props) {
  const width = window.innerWidth;
  const isWideScreen = width >= 768;
  return (
    <div className={`${isWideScreen || props.toggleChat ? 'show' : 'hide'}`}>
      <ChatNavbar {...props} />
      <ChatBody />
      <Input />
    </div>
  )
}

export default ChatContainer
