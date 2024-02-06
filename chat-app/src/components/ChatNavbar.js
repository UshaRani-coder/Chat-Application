import React from 'react'
import videocallIcon from '../Assets/cam-recorder.png'
import moreIcon from '../Assets/more.png'
function ChatNavbar() {
  return (
    <div className='chat-navbar'>
      <span>Name</span>
      <div className="icons">
      <img src={videocallIcon} alt="video-call" width={'20px'}/>
      <img src={moreIcon} alt="more" width={'20px'} />
      </div>
    </div>
  )
}

export default ChatNavbar