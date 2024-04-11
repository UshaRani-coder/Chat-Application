import React from 'react'
import chatIcon from '../Assets/messenger.png'
import phoneIcon from '../Assets/telephone.png'
import statusIcon from '../Assets/status.png'
import star from '../Assets/star.png'
import ArchiveIcon from '../Assets/box.png'
import settingsIcon from '../Assets/settings.png'
function IconsNavbar() {
  return (
    <div className="icons-navbar">
      <div className="top-icons">
        <img src={chatIcon} alt="chats" width={'20px'} />
        <img src={phoneIcon} alt="phone" width={'20px'} />
        <img src={statusIcon} alt="status" width={'20px'} />
      </div>
      <div className="bottom-icons">
        <img src={star} alt="star" width={'20px'} />
        <img src={ArchiveIcon} alt="archives" width={'20px'} />
        <img src={settingsIcon} alt="settings" width={'20px'} />
      </div>
    </div>
  )
}

export default IconsNavbar
