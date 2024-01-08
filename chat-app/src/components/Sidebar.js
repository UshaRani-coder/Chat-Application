import React from 'react'
import SidebarNavbar from './SidebarNavbar'
import Search from './Search'
import Chats from './Chats'
function Sidebar() {
  return (
    <div className='sidebar'>
      <SidebarNavbar />
      <Search />
      <Chats />
      
    </div>
  )
}

export default Sidebar
