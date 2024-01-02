import React from 'react'
import RightNavbar from './RightNavbar'
import Input from './Input'
import ChatBody from './ChatBody'
function Chat() {
  return (
    <div className='chat'>
      <RightNavbar />
      <ChatBody />
      <Input />
    </div>
  )
}

export default Chat
