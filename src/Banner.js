import React, { useState } from 'react'
import './Banner.css'
import image1 from './image1.png';
import { useEffect } from 'react';
import axios from 'axios';
// import { set } from 'immer/dist/internal';


function Banner() {
  

  function truncate(s,limit){
      var str="";
      for(var i=0;i<Math.min(s.length,limit);i++){
        str=str+s[i];
      }
      for(var i=limit;i<s.length;i++){
        if(s[i]===' '){
          break;
        }
        str=str+s[i];
      }
      str=str+"...";
      return str;
  }

  const[movieArray,setMovieArray]=useState([]);
  const[movieDescription,setMovieDescription]=useState("This is a test description");
  const[movieDetails,setMovieDetails]=useState([]);
  const[posterPath,setPosterPath]=useState('');

  // const handleStateChange=async (response)=>{
  //   await setMovieArray(response.results);
  // }

  const fetchData = async() => {
    // const axios = require('axios');

    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmFjZmVkMTZkYjU4OTQ0ZjcxNTU2ZDg4Nzg3NmM5ZiIsInN1YiI6IjY1N2MzYTIxZWM4YTQzMDEzNzAxMWE4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.quPsXIOlk4hXg-MXVPn5_FW9G3NW9c6j-54LWVyylVA'; // Replace with your TMDb API key
    //or read access token
    //see which one works
    const options = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/trending/all/day',
      params: {
        language: 'en-US',
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await axios(options);
      const responseData = response.data;
      console.log(responseData);
      setMovieArray(response.results);
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      setMovieDetails(response.data.results[randomIndex]);
      const s1=response.data.results[randomIndex]?.overview
      setMovieDescription(truncate(s1,100));
      console.log(typeof(s1));
      
      const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // Use the desired size code if needed

      const fullPosterPath = `${baseImageUrl}${response.data.results[randomIndex]?.backdrop_path}`;
      setPosterPath(fullPosterPath);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  



  useEffect(()=>{
    fetchData();
    console.log(movieArray);
    console.log(movieDetails);
  }, []);

  return (
  <header className="banner" style={{
    backgroundSize: "cover",
    backgroundImage: `url(
    ${posterPath})`,
    backgroundPosition: "center center"
  }}
  >

<div className="banner-contents">
    <h1 className="banner-title">{movieDetails?.title || movieDetails?.original_title}</h1>
    <div className="banner-buttons">
        <button className="banner-button banner-button-1">Play</button>
        <button className="banner-button banner-button-2">My List</button>
        <h1 className="banner-description">{movieDescription}</h1>

    </div>

</div>

<div className="banner-fadeBottom">
  {/* <p>Hi There</p> */}
  {/* <div></div> */}
</div>



  </header>



  )
}

export default Banner