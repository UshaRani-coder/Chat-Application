import React, { useContext, useState } from 'react'
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../Context/AuthContext.js'
import { ChatContext } from '../Context/ChatContext.js'

function Search() {
  const [searchUserName, setSearchUserName] = useState('')
  // const [users, setUsers] = useState([]);

  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const { dispatch, users, setUsers } = useContext(ChatContext)
  async function handleSearch() {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('displayName', '==', searchUserName))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const foundUsers = []
      snapshot.forEach((doc) => {
        foundUsers.push(doc.data())
      })

      if (foundUsers.length === 0) {
        setErr(true)
      } else {
        setUsers((prev) => [...prev, ...foundUsers])
        setErr(false)
      }
    })

    setSearchUserName('')
    return unsubscribe
  }

  function handleKeyDown(e) {
    if (e.code === 'Enter') {
      handleSearch()
    }
  }

  async function handleSelect(user) {
    console.log(user)
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, 'chats', combinedId))
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {
          messages: [],
        })
      }

      // Get the reference to the document in "userChats" collection
      const currUserChatsDocRef = doc(db, 'userChats', currentUser.uid)
      // Get the current data of the document
      const currUserChatsDocSnapshot = await getDoc(currUserChatsDocRef)
      const currUserData = currUserChatsDocSnapshot.exists()
        ? currUserChatsDocSnapshot.data()
        : {}
      // Update the document by adding new user data
      const updatedCurrUserData = {
        [`userInfo_${combinedId}`]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          [`date_${combinedId}`]: serverTimestamp(),
        },
        ...currUserData, // Spread the existing data to retain it
      }

      const userChatsDocRef = doc(db, 'userChats', user.uid)
      const userChatsDocSnapshot = await getDoc(userChatsDocRef)
      const userData = userChatsDocSnapshot.exists()
        ? userChatsDocSnapshot.data()
        : {}
      const updatedUserData = {
        [`userInfo_${combinedId}`]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          [`date_${combinedId}`]: serverTimestamp(),
        },
        ...userData,
      }

      await setDoc(currUserChatsDocRef, updatedCurrUserData)
      await setDoc(userChatsDocRef, updatedUserData)

      dispatch({ type: 'changeUser', payload: user })
      setUsers([])
    } catch (error) {
      setErr(true)
      console.log("There's an error")
    }
  }

  return (
    <>
      <div className="search">
        <label htmlFor="search-chat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={'20px'}
            fill="rgba(255, 255, 255, 0.4)"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </label>
        <input
          type="text"
          placeholder="Start or search a new chat"
          id="search-chat"
          onChange={(e) => setSearchUserName(e.target.value)}
          onKeyDown={handleKeyDown}
          value={searchUserName}
        />
      </div>
      {err && <span style={{ color: 'red' }}>"User Not Found!"</span>}
      {users.map((user) => (
        <div
          className="userChat"
          key={user.uid}
          onClick={() => {
            handleSelect(user)
          }}
        >
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Search
