import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
function Chats() {
  const [chats,setChats] = useState()

  const {currentUser} = useContext(AuthContext)
  return (
    <div className="chats-wrapper">
    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>

    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>

    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>

    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>
    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>
    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>
    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>
    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>
    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>
    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>
    <div className='chats'>
      <div className="chats-image"></div>
      <div className="user-chat-info">
        <span className="user-name">Rani</span>
        <p>Helloo</p>
      </div>
    </div>

    </div>
  )
}

export default Chats
