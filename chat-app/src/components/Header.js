import React from 'react'
import logo from '../Assets/chat.png'
function Header() {
  return (
    <div className='header'>
      <img src={logo} alt="" width={"25px"}/>
      <span>ChitChat</span>
    </div>
  )
}

export default Header
