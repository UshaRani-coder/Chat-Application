import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../Context/ChatContext.js'

function ChatNavbar(props) {
  const { data, isChatSelected, setIsChatSelected } = useContext(ChatContext)
  const [userData, setUserData] = useState(' ')
  useEffect(() => {
    isChatSelected && setUserData(data.user)

    return () => {
      setIsChatSelected(false)
    }
  }, [data.user, isChatSelected])

  function goBack() {
    props.setToggleChat((prev) => !prev)
  }

  return (
    <div className="chat-navbar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width={'20px'}
        onClick={goBack}
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
      <div className="user-info">
        {userData?.photoURL ? (
          <img src={userData?.photoURL} alt="second-person" />
        ) : (
          <div className="default-chat-navbar-image"></div>
        )}
        <span>{userData?.displayName}</span>
      </div>
    </div>
  )
}

export default ChatNavbar
