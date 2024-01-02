import React from 'react'

function Login() {
  return (
    <div>
      <div className="form-container">
        <div className="form-wrapper">
          <span className='logo'>ChitChat</span>
          <span className='title'>Login</span>
          <form action="">
            <input type="email" placeholder='email' />
            <input type="password" placeholder='password' />
            <button>Sign In</button>
            <p>You don't have an account? Register</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
