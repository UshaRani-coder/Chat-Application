import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer.js'
import Header from '../components/Header'
import IconsNavbar from '../components/IconsNavbar'

function Home() {
  return (
    <>
    <div>
    <Header />
    </div>
      <div className="home-container">
       <IconsNavbar />
       <Sidebar />
       <ChatContainer />
       
      </div>
    </>
  )
}

export default Home
