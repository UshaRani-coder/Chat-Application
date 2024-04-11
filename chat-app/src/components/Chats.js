import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'
import { ChatContext } from '../Context/ChatContext.js'

function Chats(props) {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch, setIsChatSelected, users } = useContext(ChatContext)

  useEffect(() => {
    let unsubscribe
    let unsubUser
    const unsubscribeFunctions = []

    const getChats = () => {
      const docRef = doc(db, 'userChats', currentUser.uid)
      unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setChats(Object.entries(doc.data()))
        }
      })
    }
    users.map((user) => {
      const docRef = doc(db, 'userChats', user.uid)
      unsubUser = onSnapshot(docRef, (doc) => {
        console.log(doc.data())
        if (doc.exists()) {
          setChats(Object.entries(doc.data()))
        }
      })
      console.log(user)
      unsubscribeFunctions.push(unsubUser)
    })

    if (currentUser.uid) {
      getChats()
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }

      return () => {
        unsubscribeFunctions.forEach((unsubscribe) => unsubscribe())
      }
    }
  }, [currentUser.uid, users])

  function handleSelect(user) {
    dispatch({ type: 'changeUser', payload: user })
    setIsChatSelected(true)
  }

  return (
    <div className="chats-wrapper">
      {chats
        .filter((chat) => chat[0].includes('userInfo_'))
        .map((chat, i) => (
          <div className="chats" key={i} onClick={() => handleSelect(chat[1])}>
            <img src={chat[1].photoURL} alt="" />
            <div
              className="user-chat-info"
              onClick={() => props.setToggleChat((prevState) => !prevState)}
            >
              <span className="user-name">{chat[1].displayName}</span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Chats
