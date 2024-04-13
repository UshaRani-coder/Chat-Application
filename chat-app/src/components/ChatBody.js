import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { ChatContext } from '../Context/ChatContext.js'
import { onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import logo from '../Assets/chat.png'
import EmojiPickerComponent from './EmojiPickerComponent.js'
import leftArrow from '../Assets/left-chevron.png'
import rightArrow from '../Assets/right-arrow.png'

function ChatBody({ loader }) {
  const ref = useRef()
  const { currentUser } = useContext(AuthContext)
  const {
    data,
    isChatSelected,
    setIsChatSelected,
    showEmojis,
    setIsEmojiSelected,
    textInputRef,
    text,
    deleteChat,
  } = useContext(ChatContext)
  const [messages, setMessages] = useState([])
  const [selectedMessageId, setSelectedMessageId] = useState(null)

  useEffect(() => {
    if (isChatSelected && data && data.ChatId && currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, 'chats', data.ChatId),
        (docSnapshot) => {
          console.log('docSnapshot:', docSnapshot)
          console.log('docSnapshot data:', docSnapshot.data())
          const messagesData = docSnapshot.data()?.messages
          console.log('Messages from chat:', messagesData)
          if (messagesData) {
            setMessages(messagesData)
            scrollToBottom()
          }
        },

        (error) => {
          console.error('Error fetching document:', error)
        },
      )

      return () => {
        unsubscribe()
        setIsChatSelected(false)
      }
    }
  }, [data.user, currentUser])

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
  }

  // const Day = (seconds) => {
  //   const date = new Date(seconds * 1000);

  //   const _date = date.getDate();
  //   const year = date.getFullYear();
  //   const daysOfWeek = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];

  //   const dayOfWeekIndex = date.getDay();
  //   const dayOfWeekName = daysOfWeek[dayOfWeekIndex];
  //   return `${dayOfWeekName}, ${_date},  ${year}`;
  // };
  function handleDelete(MessegeId) {
    const docRef = doc(db, 'chats', data.ChatId)

    const updatedMesseges = messages.filter(
      (message) => message.id !== MessegeId,
    )
    setMessages(updatedMesseges)
    const updateObject = {
      messages: updatedMesseges,
    }
    updateDoc(docRef, updateObject)
      .then(() => {
        console.log('Document successfully deleted!')
      })
      .catch((error) => {
        console.error('Error removing document: ', error)
      })
  }
  function handleEmojiClick(event) {
    setIsEmojiSelected((prev) => (prev === null ? event.emoji : null))
    textInputRef.current.value = text + event.emoji
  }
  return (
    <div className="chat-body">
      {deleteChat === true ||
        (messages.length === 0 && (
          <div className="default">
            <h3>
              🎉 Welcome to{' '}
              <span>
                <img src={logo} alt="chat-logo" width={'20px'} />
                Chatverse
              </span>
              , {currentUser.displayName}🎉
            </h3>
            <p>
              We're excited to have you join us. Start chatting with your
              friends, share your thoughts, and make new connections.
            </p>
            <p>Happy chatting! 🚀</p>
          </div>
        ))}
      {/* {messages&& messages.time&& messages.time.seconds&&<h5>{Day(messages.time.seconds)}</h5>} */}
      {loader && <div className="loader"></div>}
      {!loader &&
        messages.length > 0 &&
        messages.map((message) => (
          <React.Fragment key={message.id}>
            {message.senderUid === currentUser.uid && (
              <div className="sender-chat-wrapper" key={message.id}>
                <div className="sender-chat">
                  {selectedMessageId === message.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      fill="#0769E9"
                      width={'10px'}
                      cursor={'pointer'}
                      onClick={() => {
                        handleDelete(message.id)
                      }}
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  )}
                  <img
                    src={leftArrow}
                    width={'10px'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedMessageId(message.id)
                    }}
                  ></img>

                  {message.text && (
                    <div className="chatbox">{message.text}</div>
                  )}
                  {message.img && message.type === 'image' && (
                    <img src={message.img} alt="Image" className="send-img" />
                  )}

                  {message.img && message.type === 'video' && (
                    <video
                      controls
                      className="send-video"
                      width="220"
                      height="150"
                    >
                      <source src={message.img} type="video/mp4" />
                    </video>
                  )}
                  {message.img && message.type === 'pdf' && (
                    <iframe
                      src={message.img}
                      title="PDF"
                      width="80%"
                      height="200px"
                      className="pdf"
                    />
                  )}
                  {message.img && message.type === 'textPlain' && (
                    <div>
                      <a href={message.img}>Download TXT File</a>
                    </div>
                  )}
                  <div className="sender">
                    <img
                      src={
                        message.senderUid === currentUser.uid
                          ? currentUser.photoURL
                          : ''
                      }
                      width={'25px'}
                      alt=""
                    />
                    <span className="time">
                      {formatTime(message.time.seconds)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {/* receiver messeges */}
            {message.senderUid === data.user.uid && (
              <div className="receiver-chat-wrapper" key={message.id}>
                <div className="receiver-chat">
                  {selectedMessageId === message.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      fill="#0769E9"
                      width={'10px'}
                      cursor={'pointer'}
                      onClick={() => {
                        handleDelete(message.id)
                      }}
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  )}

                  <img
                    src={rightArrow}
                    style={{ cursor: 'pointer' }}
                    width={'10px'}
                    onClick={() => {
                      setSelectedMessageId(message.id)
                    }}
                  ></img>
                  {message.text && (
                    <div className="chatbox">{message.text}</div>
                  )}

                  {message.img && (
                    <img src={message.img} alt="Image" className="send-img" />
                  )}

                  <div className="receiver">
                    <img
                      src={
                        message.senderUid === data.user.uid
                          ? data.user.photoURL
                          : ''
                      }
                      width={'25px'}
                      alt=""
                    />
                  </div>
                  <span className="time">
                    {formatTime(message.time.seconds)}
                  </span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}

      {messages.length > 0 && showEmojis && (
        <EmojiPickerComponent onEmojiClick={handleEmojiClick} />
      )}
      <div ref={ref}></div>
    </div>
  )
}

export default ChatBody
