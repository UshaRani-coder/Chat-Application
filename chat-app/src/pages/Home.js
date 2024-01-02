import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Header from '../components/Header'
import SideNavbar from '../components/SideNavbar'

function Home() {
  return (
    <>
    <div>
    <Header />
    </div>
      <div className="home-container">
       <SideNavbar />
       <Sidebar />
       <Chat />
       
      </div>
    </>
  )
}

export default Home
