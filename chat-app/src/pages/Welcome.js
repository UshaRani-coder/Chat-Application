import React from 'react'
import { useNavigate } from 'react-router-dom'
 import welcomeImage from "../Assets/chat.jpg"
 import logo from "../Assets/chat.png"
function Welcome() {
    const navigate = useNavigate()
  return (
    <div className='welcome-page'>
    <div className='welcome-page-ctn'>
    <img src={welcomeImage}   alt="Welcome-chat" className='welcome-img' />
      <div className='content'>
        <div className="heading">
            <h5><span>W</span>elcome to</h5>
            <h4><img src={logo} alt="chat-logo" width={"25px"} />ChatVerse</h4>
        </div>
        <p>Connecting minds, one message at a time.</p>
      <button className='welcome-btn' onClick={()=>navigate('/register')}>Let's Start <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill='currentColor' viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></button>
      </div>
      </div>
    </div>
  )
}

export default Welcome
