import React, { useState } from 'react'
import Image from '../Assets/image.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import Resizer from 'react-image-file-resizer'

function Register() {
  const resizeImage = async (file, maxWidth, maxHeight) => {
    try {
      console.log('Resizing image...')
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
      console.log('Resized image:', resizedFile)
      return resizedFile
    } catch (error) {
      console.error('Error resizing image:', error)
      return null
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    file: null,
  })
  // State to manage error handling
  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  const [imgLoader, setImgLoader] = useState(false)
  const [Progress, setProgress] = useState(0)
  async function handleSubmit(e) {
    e.preventDefault()

    //password validation
    const validatePassword = (password) => {
      const minLength = 8
      const hasUpperCase = /[A-Z]/.test(password)
      const hasLowerCase = /[a-z]/.test(password)
      const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)
      const hasNumber = /\d/.test(password)
      return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasSpecialChar &&
        hasNumber
      )
    }
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.file == null
    ) {
      document.querySelector('.alert').style.display = 'block'
      document.querySelector('.alert').textContent =
        'Please fill out the required fields in the form to complete your registration'
    } else if (!validatePassword(formData.password)) {
      document.querySelector('.alert').style.display = 'block'
      document.querySelector('.alert').textContent =
        'Password must meet the complexity requirements.'
    } else {
      // Creating a new user with email and password
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        )
        // Reference to Firebase Storage using the user's id
        const storageRef = ref(storage, res.user.uid)
        // Creating an upload task for the selected file
        const resizedImage = await resizeImage(formData.file, 500, 500)
        const uploadTask = uploadBytesResumable(storageRef, resizedImage)

        setImgLoader(true)
        // Handling events during the upload task
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Track upload progress here
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            setProgress(progress)
          },
          (err) => {
            // If there's an error during upload, set error state to true
            setErr(true)
            console.log("There's an error during upload", err.message)
            setImgLoader(false)
          },

          async () => {
            try {
              // If upload is successful, get the download URL
              const downloadURL = await getDownloadURL(storageRef)
              console.log(`The url is ${downloadURL}`)

              // Updating user profile with name and photoURL
              await updateProfile(res.user, {
                displayName: formData.name,
                photoURL: downloadURL,
              })

              // Adding a new document in the "users" collection in Firestore
              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName: formData.name,
                email: formData.email,
                photoURL: downloadURL,
              })
              //navigate to home page after successful sign-up
              navigate('/home')
            } catch (error) {
              console.error('Error:', error.message)
            } finally {
              setImgLoader(false)
            }
          },
        )
      } catch (err) {
        setErr(true)
        // Handle Firebase authentication errors
        if (err.code === 'auth/email-already-in-use') {
          console.error('Error: Email already in use.')
          document.querySelector('.alert').style.display = 'block'
          document.querySelector('.alert').textContent =
            'Email is already in use. Please log in instead.'
          // Direct the user to the login page
          setTimeout(() => {
            navigate('/login')
          }, 3000)
        } else {
          // Handle other Firebase authentication errors
          console.error('Error:', err.message)
        }
      }
    }
  }
  console.log(Progress)
  return (
    <div>
      <div className="form-container">
        <div className="alert" style={{ display: 'none' }}>
          alert
        </div>
        <div className="form-wrapper">
          <span className="title">Register</span>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              placeholder="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <input
              type="file"
              style={{ display: 'none' }}
              id="file"
              onChange={(e) =>
                setFormData({ ...formData, file: e.target.files[0] })
              }
            />
            <label htmlFor="file">
              <img
                style={{ width: '20px', cursor: 'pointer' }}
                src={Image}
                alt=""
              />
              <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
          </form>
          <p>
            Do you have an account?{' '}
            <Link to="/login" style={{ color: '#057cfc' }}>
              Login
            </Link>
          </p>
        </div>
        {imgLoader && (
          <div className="img-loading">
            <span id="img-loading">Image Uploading</span>
            <div className="progress-bar">
              <div style={{ width: `${Progress}%` }}></div>
              <span>{Progress}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
