import React from 'react'
import ChatNavbar from './ChatNavbar'
import Input from './Input'
import ChatBody from './ChatBody'
import { useState } from 'react'
function ChatContainer(props) {
  const [loader, setLoader] = useState(false)
  const width = window.innerWidth
  const isWideScreen = width >= 768
  return (
    <div className={`${isWideScreen || props.toggleChat ? 'show' : 'hide'}`}>
      <ChatNavbar {...props} />
      <ChatBody loader={loader} setLoader={setLoader} />
      <Input loader={loader} setLoader={setLoader} />
    </div>
  )
}

export default ChatContainer
