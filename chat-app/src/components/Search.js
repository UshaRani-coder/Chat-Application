import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc,doc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import {AuthContext} from "../Context/AuthContext.js"
import { ChatContext } from '../Context/ChatContext.js';
function Search() {
  const [searchUserName,setSearchUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err,setErr] = useState(false)
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  async function handleSearch(){
    const usersRef = collection(db, "users");
    const q = query(
      usersRef, 
      where("displayName", "==", searchUserName)
      );

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setErr(false)
    });

    // If no documents were found, display an error message
    if (querySnapshot.empty) {
        setErr(true);
    }
   setSearchUserName("")
  }
    function handleKeyDown(e){
      if (e.code === "Enter") {
        handleSearch();
        setSearchUserName(""); 
      }
    }
  
    async function handleSelect(user){
      //check whether the Chats in the firestore exists. If not, create
      const combinedId = 
      currentUser.uid > user.uid ? 
      currentUser.uid + user.uid : 
      user.uid + currentUser.uid;
      try{
        const res = await getDoc(doc(db,"chats",combinedId))
        if(!res.exists()){
          //create a chat in Chats collection
          await setDoc(doc(db,"chats",combinedId),{
            messages:[]
          })
        }

        //create user Chats
        console.log(currentUser.uid, user.uid)
        await setDoc(doc(db,"userChats",currentUser.uid),{
        [combinedId + ".userInfo"]:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL
        },
        [combinedId + ".date"]:serverTimestamp()
        });
        
        await setDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
          });

          dispatch({type:"changeUser",payload:user})
      }
      catch(error){
        setErr(true)
      }
    }
    return (
      <>
    <div className='search'>
        <label htmlFor="search-chat"><svg xmlns="http://www.w3.org/2000/svg" width={"20px"} fill='rgba(255, 255, 255, 0.4)' viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></label>
      <input 
      type="text" 
      placeholder='Start or search a new chat' 
      id='search-chat' 
      onChange={e=>setSearchUserName(e.target.value)}
      onKeyDown={handleKeyDown}
      value={searchUserName}
      />
    </div>
    {err && <span style={{color:'red'}}>"User Not Found!"</span>}
    {user && <div className="userChat" onClick={()=>{handleSelect(user)}}>
     <img src={user.photoURL} alt="" />
     <div className="userChatInfo">
      <span>{user.displayName}</span>
     </div>
    </div>}
    </>
  )
}

export default Search
