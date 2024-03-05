import React, { useRef, useState } from "react";
import attachIcon from "../Assets/attach.png";
import addImage from "../Assets/upload.png";
import { Timestamp, arrayUnion, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";
import { nanoid } from "nanoid";
import { storage } from "../firebase.js";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.js";
import { ChatContext } from "../Context/ChatContext.js";

function Input() {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const textInputRef = useRef(null);
  const fileInputRef = useRef(null);

  async function handleSend() {
    if (img) {
      const storageRef = ref(storage, nanoid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress here
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log("There's an error during upload", error.message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const chatDocRef = doc(db, "chats", data.ChatId);
            console.log(data.ChatId);
            await updateDoc(chatDocRef, {
              messages: arrayUnion({
                id: nanoid(),
                text,
                senderUid: currentUser.uid,
                time: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (error) {
            console.error("Error:", error.message);
          }
        }
      );
    } else {
      const chatDocRef = doc(db, "chats", data.ChatId);
      console.log(data.ChatId);
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          id: nanoid(),
          text,
          senderUid: currentUser.uid,
          time: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.ChatId + ".lastMessege"] : {
        text
      },
      [data.ChatId + ".date"] : serverTimestamp()
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.ChatId + ".lastMessege"] : {
        text
      },
      
      [data.ChatId + ".date"] : serverTimestamp()
    })
    setText("");
    setImg("");
    textInputRef.current.value = "";
    fileInputRef.current.value = null;
  }

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        autoFocus
        onChange={(e) => setText(e.target.value)}
        ref={textInputRef}
      />
      <div className="icons">
        <input
          type="file"
          id="attach"
          style={{ display: "none" }}
          onChange={(e) => {
            setImg(e.target.files[0]);
          }}
          ref={fileInputRef}
        />
        <label htmlFor="attach">
          <img src={attachIcon} alt="attach" width={"25px"} />
        </label>
        <img src={addImage} alt="add-image" width={"25px"} />
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  );
}

export default Input;
