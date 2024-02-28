import React, { useContext } from 'react'
import videocallIcon from '../Assets/cam-recorder.png'
import moreIcon from '../Assets/more.png'
import { ChatContext } from '../Context/ChatContext.js'

function ChatNavbar() {
  const {data} = useContext(ChatContext)
  return (
    <div className='chat-navbar'>
      <span>{data.user?.displayName}</span>
      <div className="icons">
      <img src={videocallIcon} alt="video-call" width={'20px'}/>
      <img src={moreIcon} alt="more" width={'20px'} />
      </div>
    </div>
  )
}

export default ChatNavbar
