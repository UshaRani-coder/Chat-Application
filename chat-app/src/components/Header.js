import React from 'react'
import logo from '../Assets/chat.png'
function Header() {
  return (
    <div className='header'>
      <img src={logo} alt="" width={"25px"}/>
      <span>ChatVerse</span>
    </div>
  )
}

export default Header
