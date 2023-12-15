import React from 'react'
import './Banner.css'
import image1 from './image1.png';
function Banner() {
  return (
  <header className="banner" style={{
    backgroundSize: "cover",
    backgroundImage: `url(${image1})`,
    backgroundPosition: "center center"
  }}
  >

<div className="banner-contents">
    <h1 className="banner-title">Movie Name</h1>
    <div className="banner-buttons">
        <button className="banner-button-1">Play</button>
        <button className="banner-button-2">My List</button>
        <h1 className="banner-description">This is a test description</h1>

    </div>

</div>



  </header>



  )
}

export default Banner