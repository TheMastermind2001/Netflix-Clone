import React, { useEffect } from 'react';
import HomeScreen from './HomeScreen';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "./firebase.js";
// import LoginScreen from './LoginScreen';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginScreen from './LoginScreen';

function App() {


  useEffect(()=>{
    const unsub=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        // ...
      } else {
        console.log("user is signed out");
        // User is signed out
        // ...
      }
    });
    return unsub;
  },[])


  const user=null;
  return (
    <div className="app">  

      <Router>
        <Routes>
        {!user?
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
