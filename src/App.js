import React from 'react';
import HomeScreen from './HomeScreen';
import './App.css';
// import LoginScreen from './LoginScreen';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginScreen from './LoginScreen';

function App() {
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
        
        {/* <Routes>
          
        </Routes> */}
      </Router>

    </div>
  );
}

export default App;
