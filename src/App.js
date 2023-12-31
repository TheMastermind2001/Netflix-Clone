import React, { useEffect, useState } from 'react';
import HomeScreen from './HomeScreen';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "./firebase.js";
// import LoginScreen from './LoginScreen';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginScreen from './LoginScreen';
import {useDispatch, useSelector} from "react-redux";
import {login,logout} from "./features/counter/userSlice";
import userSlice from "./features/counter/userSlice.js"; 
import { selectUser } from './features/counter/userSlice';


function App() {

  // var userstatus=null;
  // const userval=useSelector(selectUser);
  const userval=useSelector(state=>state.user.user)?.id;
  // const userstate=useSelector(state=>state);
  
  // const[userstatus,setuserstatus]=useState(userval);
  const userstatus=userval;
  // const[userstatus,setuserstatus]=useState(null);
  const dispatch = useDispatch();

  const handleLogin = (user) => {
    dispatch(login(user));
  };

  const handleLogout = (user) => {
    dispatch(logout());
  };

  const x=564;


  useEffect(()=>{
    console.log(userval);
    // console.log(userstate);
    // console.log("** "+userval);
    // console.log(login);
    const unsub=onAuthStateChanged(auth, (user) =>{
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // userstatus=user.uid;
        console.log(user);
        // setuserstatus(user.uid);
        console.log(userstatus);
        console.log("logged in "+uid);
        // handleLogin(user);  
        handleLogin(
          {
            id:user.uid,
            email:user.email
          }

        )
      } else {
        console.log("user is signed out");
        handleLogout();
        // setuserstatus(null);
        // User is signed out
      }
    });
    // unsub();
    return unsub;
  },[])


  
  return (
    <div className="app">  

      <Router>
        <Routes>
          
        {!userstatus?
            <Route exact path="/" element={<LoginScreen/>}/>
            :
            <Route exact path="/" element={<HomeScreen />}/>
        }
        </Routes>
      </Router>

    </div>
  );
}

export default App;
