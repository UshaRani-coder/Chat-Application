//import logo from '../Assets/chat.png'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  // State to manage error handling
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    //password validation
    const validatePassword = (password) => {
      const minLength = 8
      const hasUpperCase = /[A-Z]/.test(password)
      const hasLowerCase = /[a-z]/.test(password)
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)
      const hasNumber = /\d/.test(password)
      return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasSpecialChar &&
        hasNumber
      )
    }

    if (data.email == '' || data.password == '') {
      document.querySelector('.alert').style.display = 'block'
      document.querySelector('.alert').textContent =
        'Please fill out the required fields in the form to complete your login'
    } else if (!validatePassword(data.password)) {
      document.querySelector('.alert').style.display = 'block'
      document.querySelector('.alert').textContent =
        'Password must meet the complexity requirements.'
    } else {
      // signing in  with email and password
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, data.email, data.password)
        navigate('/home')

        setData({
          email: '',
          password: '',
        })
      } catch (err) {
        console.error('Error during sign-in:', err)

        setErr(true)

        setData({
          email: '',
          password: '',
        })
      }
    }
  }
  return (
    <div>
      <div className="form-container">
        <div className="alert" style={{ display: 'none' }}>
          alert
        </div>
        <div className="form-wrapper">
          <span className="title">Login</span>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="email"
              placeholder="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button>Sign In</button>
            <p>
              You don't have an account?{' '}
              <Link to="/register" style={{ color: '#057cfc' }}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
