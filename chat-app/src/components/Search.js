import React, { useContext, useState } from 'react'
import searchIcon from '../Assets/search.png'
import { collection, query, where, getDocs, getDoc, setDoc,doc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import {AuthContext} from "../Context/AuthContext.js"
function Search() {
  const [searchUserName,setSearchUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err,setErr] = useState(false)
  const {currentUser} = useContext(AuthContext);

  async function handleSearch(){
    const usersRef = collection(db, "users");
    const q = query(
      usersRef, 
      where("displayName", "==", searchUserName)
      );

      try{  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUser(doc.data())
     });
    } 
    catch(error){
      setErr(true)
    }

  }
    function handleKeyDown(e){
     e.code==="Enter" && handleSearch();
    }
  
    async function handleSelect(){
      //check whether the Chats in the firestore exists. If not, create
      const combinedId = 
      currentUser.uid > user.uid ? 
      currentUser.uid + user.uid : 
      user.uid + currentUser.uid;
      try{
        const res = await getDoc(doc(db,"chats",combinedId))
        if(!res.exists){
          //create a chat in Chats collection
          await setDoc(doc(db,"chats",combinedId),{
            messages:[]
          })
        }

        //create user Chats
        console.log([combinedId + ".userInfo"])
        console.log(currentUser.uid, user.uid)
        await setDoc(doc(db,"userChats",currentUser.uid),{
        [combinedId + ".userInfo"]:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL
        },
        [combinedId + ".date"]:serverTimestamp()
        });
        console.log([combinedId + ".userInfo"])
        await setDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
          });
      }
      catch(error){
        setErr(true)
      }
    }
    return (
      <>
    <div className='search'>
        <label htmlFor="search-chat"><img src={searchIcon} alt="search" width={'20px'} /></label>
      <input 
      type="text" 
      placeholder='Start or search a new chat' 
      id='search-chat' 
      onChange={e=>setSearchUserName(e.target.value)}
      onKeyDown={handleKeyDown}
      />
    </div>
    {err && <span>"User Not Found!"</span>}
    {user && <div className="userChat" onClick={handleSelect}>
     <img src={user.photoURL} alt="" />
     <div className="userChatInfo">
      <span>{user.displayName}</span>
     </div>
    </div>}
    </>
  )
}

export default Search
