import React, { useState } from 'react'
import Image from '../Assets/image.png'
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { auth } from "../firebase"
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../firebase"
import { doc,setDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom';

function Register() {
  // State to manage error handling
  const [err,setErr] = useState(false);
  const navigate = useNavigate();
 async function handleSubmit(e){
    e.preventDefault();
    //extracting the form input values
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // Creating a new user with email and password
    try{
      const res = await createUserWithEmailAndPassword(auth,email,password)
      // Reference to Firebase Storage using the user's name
      const storageRef = ref(storage, name);
      // Creating an upload task for the selected file
      const uploadTask = uploadBytesResumable(storageRef, file);
     // Handling events during the upload task 
      uploadTask.on(
        (error) => {
         // If there's an error during upload, set error state to true
          setErr(true)
        }, 
        
        () => { 
         // If upload is successful, get the download URL
         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
           // Updating user profile with name and photoURL
           await updateProfile(res.user, {
               displayName: name,
               photoURL: downloadURL,
           });
           // Adding a new document in the "users" collection in Firestore
           await setDoc(doc(db, "users", res.user.uid), {
               uid: res.user.uid,
               name,
               email,
               photoURL: downloadURL,
           });

           await setDoc(doc(db,"userChats",res.user.uid),{})
           navigate("/")
       });
        }
      )
    }
    catch(err){
      // If there's an error in creating the user, set error state to true
      setErr(true)
    }
    
  }
  return (
    <div>
      <div className="form-container">
        <div className="form-wrapper">
          <span className='logo'>ChitChat</span>
          <span className='title'>Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text"  placeholder='name' />
            <input type="email" placeholder='email' />
            <input type="password" placeholder='password' />
            <input type="file" style={{display:'none'}} id='file'/>
            <label htmlFor="file">
              <img style={{width:"20px"}} src={Image} alt="" />
              <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
            { err && <span>You got some error</span> }
          </form>
          <p>Do you have an account? Login</p>
        </div>
      </div>
    </div>
  )
}

export default Register
