import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { doc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase.js'
import { ChatContext } from '../Context/ChatContext.js'

function Chats(props) {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch, setIsChatSelected, users, setDeleteChat } =
    useContext(ChatContext)

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
      return unsubscribeFunctions.push(unsubUser)
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

  function handleDelete(chatId) {
    setDeleteChat(true)
    const docRef = doc(db, 'userChats', currentUser.uid)
    // Remove the chat from the UI
    const updatedChats = chats.filter((chat) => chat[0] !== chatId)
    setChats(updatedChats)
    // Delete the chat document from Firestore
    updateDoc(docRef, {
      [chatId]: deleteField(),
    })
      .then(() => {
        console.log('Document successfully deleted!')
        setDeleteChat(false)
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error removing document: ', error)
      })
  }

  return (
    <div className="chats-wrapper">
      {chats
        .filter((chat) => chat[0].includes('userInfo_'))
        .sort((a, b) => {
          const dateKeyA = Object.keys(a[1]).find((key) =>
            key.startsWith('date_'),
          )
          const dateKeyB = Object.keys(b[1]).find((key) =>
            key.startsWith('date_'),
          )
          const dateA = a[1][dateKeyA]
          const dateB = b[1][dateKeyB]
          return dateB - dateA
        })
        .map((chat, i) => (
          <div className="chats" key={i} onClick={() => handleSelect(chat[1])}>
            <div
              className="user-chat-info"
              onClick={() => props.setToggleChat((prevState) => !prevState)}
            >
              <img src={chat[1].photoURL} alt="" />
              <span className="user-name">{chat[1].displayName}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="#99a7b6"
              width={'10px'}
              onClick={() => {
                handleDelete(chat[0])
              }}
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </div>
        ))}
    </div>
  )
}

export default Chats
