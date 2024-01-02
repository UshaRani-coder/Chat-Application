import React from 'react'
import Image from '../Assets/image.png'
function Register() {
  return (
    <div>
      <div className="form-container">
        <div className="form-wrapper">
          <span className='logo'>ChitChat</span>
          <span className='title'>Register</span>
          <form action="">
            <input type="text"  placeholder='name' />
            <input type="email" placeholder='email' />
            <input type="password" placeholder='password' />
            <input type="file" style={{display:'none'}} id='file'/>
            <label htmlFor="file">
              <img style={{width:"20px"}} src={Image} alt="" />
              <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
            <p>Do you have an account? Login</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
