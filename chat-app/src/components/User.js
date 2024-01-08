import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

function User() {
  return (
    <div className='user'>
    <div>
    <div className="user-image"></div>
    <span>Usha</span>
    </div>
    <div className='logout' onClick={()=>signOut(auth)}>logout</div>
    </div>
  )
}

export default User
