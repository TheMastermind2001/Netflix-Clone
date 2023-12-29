import React, { useReducer, useRef } from 'react';
import "./SignUpScreen.css";
import {auth} from "./firebase.js";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
// const auth = getAuth();

function SignUpScreen({setSignIn}) {

  const emailRef=useRef(null);
  const pwdRef=useRef(null);

  const register=(e)=>{
    e.preventDefault();
    // console.log(auth);
    createUserWithEmailAndPassword(auth, emailRef.current.value, pwdRef.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage);
        alert(errorMessage);
      });
  }

  const signIn=(e)=>{{
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailRef.current.value, pwdRef.current.value)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    })
   .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(errorMessage);
    alert(errorMessage);
    });
  }}

  return (
    <div className="signUpScreen">
      <form className="signupscreen-form">
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email"></input>
        <input ref={pwdRef} placeholder="Password" type="password"></input>

        {/* <button onClick={()=>{
          setSignIn(false)}} type="submit">Sign In</button> */}

        <button onClick={signIn} type="submit">Sign In</button>
        
        
        <div className="signup-last-text">
        <span className="signup-gray">New to Netflix?</span> <span className="signup-link" onClick={register}>Sign Up now.</span>
        </div>
        </form>
    </div>
  )
}

export default SignUpScreen