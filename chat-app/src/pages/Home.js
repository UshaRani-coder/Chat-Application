import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
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
       <Chat />
       
      </div>
    </>
  )
}

export default Home
