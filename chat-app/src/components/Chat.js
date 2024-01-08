import React from 'react'
import ChatNavbar from './ChatNavbar'
import Input from './Input'
import ChatBody from './ChatBody'
function Chat() {
  return (
    <div className='chat'>
      <ChatNavbar />
      <ChatBody />
      <Input />
    </div>
  )
}

export default Chat
