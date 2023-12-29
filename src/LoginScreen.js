import React, { useState } from 'react'; 
import './LoginScreen.css';
import SignUpScreen from './SignUpScreen';

function LoginScreen() {

  const[signIn,setSignIn]=useState(false);
  return (
    <div className='loginScreen'>
        <div className="loginScreen-background">
            <img className="loginScreen-logo-1" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="netflix-logo-1"></img>
            

            <button onClick={()=>{setSignIn(true)}} className="loginScreen-button">Sign In</button>

            <div className="loginScreen-gradient"></div>
        </div>

        
        <div className="loginScreen-body">

        {signIn? (<SignUpScreen setSignIn={setSignIn}/>) :

        (   
            <>
                <h1>Unlimited Films, TV Programmes and more.</h1>
                <h2>Watch anywhere. Cancel at anytime</h2>
                <h3>Ready to watch? Enter your email address to create or restart your membership.</h3>


                <div className="loginScreen-input">
                     <form className="loginScreen-form">

                        <input type="email" placeholder="Email Address">
                            
                        </input>
                    <button onClick={(event)=>{
                        event.preventDefault(); 
                        setSignIn(true);
                    }} 
                    className="loginScreen-getStarted">
                        GET STARTED
                    </button>
                    </form>

                </div>  
            </>
        )}
        </div>
        



    </div>
  )
}

export default LoginScreen