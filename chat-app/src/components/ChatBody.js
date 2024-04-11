import React, { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { ChatContext } from '../Context/ChatContext.js'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase.js'
import logo from '../Assets/chat.png'
import EmojiPickerComponent from './EmojiPickerComponent.js'

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
  } = useContext(ChatContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (isChatSelected && data && data.ChatId && currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, 'chats', data.ChatId),
        (docSnapshot) => {
          console.log('docSnapshot:', docSnapshot) // Log docSnapshot
          console.log('docSnapshot data:', docSnapshot.data()) // Log docSnapshot data
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

  function handleEmojiClick(event) {
    setIsEmojiSelected((prev) => (prev === null ? event.emoji : null))
    textInputRef.current.value = text + event.emoji
  }
  return (
    <div className="chat-body">
      {messages.length === 0 && (
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
            We're excited to have you join us. Start chatting with your friends,
            share your thoughts, and make new connections.
          </p>
          <p>Happy chatting! 🚀</p>
        </div>
      )}
      {/* {messages&& messages.time&& messages.time.seconds&&<h5>{Day(messages.time.seconds)}</h5>} */}
      {loader && <div className="loader"></div>}
      {!loader &&
        messages.length > 0 &&
        messages.map((message) => (
          // message.senderUid === currentUser.uid && (
          <React.Fragment key={message.id}>
            {message.senderUid === currentUser.uid && (
              <div className="sender-chat-wrapper" key={message.id}>
                <div className="sender-chat">
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

            {/* ); */}
          </React.Fragment>
        ))}
      {/* {loader && <div className="loader">Loading...</div>} */}
      {messages.length > 0 && showEmojis && (
        <EmojiPickerComponent onEmojiClick={handleEmojiClick} />
      )}
      <div ref={ref}></div>
    </div>
  )
}

export default ChatBody
