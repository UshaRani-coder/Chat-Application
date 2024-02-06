import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../Context/AuthContext.js'
//import userImg from '../Assets/userImg'
function User() {
  const {currentUser} = useContext(AuthContext)
  console.log({currentUser})
  return (
    <div className='user'>
    <div>
      <img className="user-image" src={currentUser.photoURL}  alt={currentUser.photoURL}/>
    <span>{currentUser.displayName}</span>
    </div>
    <div className='logout' onClick={()=>{signOut(auth)
        console.log("loggedout")}}>logout</div>
    </div>
  )
}

export default User
