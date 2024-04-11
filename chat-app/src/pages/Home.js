import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer.js'
import Header from '../components/Header'
import IconsNavbar from '../components/IconsNavbar'

function Home() {
  const [toggleChat, setToggleChat] = useState(false)
  const [isWideScreen, setIsWideScreen] = useState(false)

  // Check window width on mount and resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsWideScreen(window.innerWidth >= 768);
  //   };

  //   handleResize(); // Initial check
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  return (
    <>
      <div>{/* <Header /> */}</div>
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
