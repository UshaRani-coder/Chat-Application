import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer.js'
import Header from '../components/Header'

function Home() {
  const [toggleChat, setToggleChat] = useState(false)

  return (
    <>
      {/* <div>{ <Header /> }</div> */}
      <div className="home-container">
        {/* {!toggleChat && ( */}
        <Sidebar toggleChat={toggleChat} setToggleChat={setToggleChat} />
        {/* )} */}
        {/* {toggleChat && ( */}

        <ChatContainer toggleChat={toggleChat} setToggleChat={setToggleChat} />
        {/* )} */}
      </div>
    </>
  )
}

export default Home
