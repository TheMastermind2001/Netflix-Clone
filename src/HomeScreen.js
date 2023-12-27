import React, { useEffect } from 'react'
import "./HomeScreen.css"
import Nav from './Nav'
import Banner from './Banner'
import Row from './Row'
import axios from 'axios'
import { useState } from 'react'
function HomeScreen() {

  


  return (
    <div className="homeScreen">
        <Nav/>
        
        <Banner/>

        <Row
          title="Top Rated"
          fetchUrl="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
        />

        <Row
          title="Popular"
          fetchUrl="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        />

        <Row
          title="Upcoming"
          fetchUrl="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
        />

        <Row
          title="TV Shows"
          fetchUrl="https://api.themoviedb.org/3/trending/tv/day?language=en-US"
        />





        <div className="last-element"></div>
       
        
        
    </div>
  )
}

export default HomeScreen