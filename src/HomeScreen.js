import React from 'react'
import "./HomeScreen.css"
import Nav from './Nav'
import Banner from './Banner'
function HomeScreen() {
  return (
    <div className="homeScreen">
        <Nav/>
        <img src="./images/full black bg" alt=""></img>
        <Banner/>
        
        {/*Row*/}
    </div>
  )
}

export default HomeScreen