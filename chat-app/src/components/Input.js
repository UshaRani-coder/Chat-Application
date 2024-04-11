import React, { useState } from 'react'
import Resizer from 'react-image-file-resizer'

import {
  Timestamp,
  arrayUnion,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { nanoid } from 'nanoid'
import { storage } from '../firebase.js'
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { ChatContext } from '../Context/ChatContext.js'

function Input({ setLoader }) {
  const { currentUser } = useContext(AuthContext)
  const {
    data,
    setShowEmojis,
    isEmojiSelected,
    setIsEmojiSelected,
    text,
    setText,
    textInputRef,
    fileInputRef,
  } = useContext(ChatContext)

  const [img, setImg] = useState(null)
  const [imgPreview, setImgPreview] = useState(null)
  // const [loader , setLoader] = useState(false)

  const resizeImage = async (file, maxWidth, maxHeight) => {
    const resizedFile = await new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        'JPEG', // Output format (JPEG, PNG, etc.)
        100, // Quality (0 to 100)
        0, // Rotation angle (0, 90, 180, 270)
        (resizedFile) => {
          console.log('Image resized successfully:', resizedFile)
          resolve(resizedFile)
        },
        'file', // Output type ('file', 'blob', 'base64')
      )
    })

    return resizedFile
  }

  async function handleSend() {
    let uploadTask
    const storageRef = ref(storage, nanoid())
    const messageText = isEmojiSelected ? text + isEmojiSelected : text
    let messageType
    if (img) {
      const fileType = img.type

      if (fileType.startsWith('image/')) {
        messageType = 'image'
        const resizedImage = await resizeImage(img, 500, 500)
        uploadTask = uploadBytesResumable(storageRef, resizedImage)
      } else if (fileType.startsWith('video/')) {
        messageType = 'video'
        uploadTask = uploadBytesResumable(storageRef, img)
      } else if (fileType.startsWith('application/')) {
        messageType = 'pdf'
        uploadTask = uploadBytesResumable(storageRef, img)
      } else if (fileType === 'text/plain') {
        messageType = 'textPlain'
        uploadTask = uploadBytesResumable(storageRef, img)
      }

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track upload progress here
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')

          if (progress < 100) {
            setLoader(true)
          } else {
            setLoader(false)
          }
        },
        (error) => {
          console.log("There's an error during upload", error.message)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            const chatDocRef = doc(db, 'chats', data.ChatId)
            console.log(data.ChatId)
            await updateDoc(chatDocRef, {
              messages: arrayUnion({
                id: nanoid(),
                text: messageText,
                senderUid: currentUser.uid,
                time: Timestamp.now(),
                img: downloadURL || ' ',
                type: messageType,
              }),
            })
            setImgPreview(null)
          } catch (error) {
            console.error('Error:', error.message)
          }
        },
      )
    } else {
      const chatDocRef = doc(db, 'chats', data.ChatId)
      console.log(data.ChatId)
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          id: nanoid(),
          text: messageText,
          senderUid: currentUser.uid,
          time: Timestamp.now(),
        }),
      })
      textInputRef.current.value = ''
      fileInputRef.current.value = null
      setImgPreview(null)
    }
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [`lastMessege_${data.ChatId}`]: {
        messageText,
        [`date_${data.ChatId}`]: serverTimestamp(),
      }
    })
    // await updateDoc(doc(db, "userChats", data.user.uid), {
    //   [data.ChatId + ".lastMessege"]: {
    //     text,
    //   },

    //   [data.ChatId + ".date"]: serverTimestamp(),
    // });
    setIsEmojiSelected(null)
    setShowEmojis(false)
    setText('')
    setImg(null)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSend()
    }
  }
  // Function to handle image selection
  function handleImageSelect(e) {
    const selectedImage = e.target.files[0]
    setImg(selectedImage)

    // Display image preview
    const reader = new FileReader()
    reader.onload = function (event) {
      setImgPreview(event.target.result)
    }
    reader.readAsDataURL(selectedImage)
  }
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        autoFocus
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={textInputRef}
      />
      {imgPreview && (
        <img src={imgPreview} alt="Selected" className="img-preview" />
      )}
      <div className="icons">
        <input
          type="file"
          id="attach"
          style={{ display: 'none' }}
          onChange={handleImageSelect}
          ref={fileInputRef}
        />
        <label htmlFor="attach">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width={'20px'}
          >
            <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
          </svg>
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width={'20px'}
          onClick={() => setShowEmojis((prevState) => !prevState)}
        >
          <path
            fill="#FFD43B"
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
          />
        </svg>
        <button onClick={handleSend}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={'20px'}
            fill="blue"
          >
            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Input
