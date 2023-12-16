import React, { useState } from 'react'
import './Banner.css'
import image1 from './image1.png';
import { useEffect } from 'react';
// import { set } from 'immer/dist/internal';


function Banner() {
  
  const[movieArray,setMovieArray]=useState([]);
  const[movieDetails,setMovieDetails]=useState([]);


  const handleStateChange=async (response)=>{
    // await setMovieArray(s =>
    //    {
    //     console.log(response.results);
    //     return response.results;
       
    //   });
    // const something=async ()=>{
    //   await setMovieArray(response.results);  
    // }
    await setMovieArray(response.results);
    // await something();

    // console.log(movieArray);
  }


  
  function fetchData(){
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmFjZmVkMTZkYjU4OTQ0ZjcxNTU2ZDg4Nzg3NmM5ZiIsInN1YiI6IjY1N2MzYTIxZWM4YTQzMDEzNzAxMWE4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.quPsXIOlk4hXg-MXVPn5_FW9G3NW9c6j-54LWVyylVA'
      }
    };
    
    fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        handleStateChange(response);
        // console.log(movieArray.results);
        // console.log(movieArray.results.length)
        // const randidx=Math.floor(Math.random() * ( movieArray.results.length));
        // setMovieDetails(movieArray.results[randidx]);
        // console.log(movieArray.results)
        // console.log(movieArray.results.length,randidx,movieArray.results)
      })
      .catch(err => console.error(err));
    
  }
  



  useEffect(()=>{
    

    // async function handleStateChange(response) {
    //   await setMovieArray(response.results);
    //   await console.log(movieArray);
    // }

    
    fetchData();
    // console.log(movieArray);

  },[])

  useEffect(()=>{
    console.log(movieArray);
    console.log("lund");
  },[movieArray])
  // const movebg=movieDetails.
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