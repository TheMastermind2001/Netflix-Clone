import React, { useEffect } from 'react'
import "./Row.css"
import axios from 'axios';
import image1 from './image1.png';
import { useState } from 'react';

function Row({title, fetchUrl}) {
    // const[posterPath,setPosterPath]=useState(image1);
    // const[movieTitle,setMovieTitle]=useState("");

    const[movieArray,setMovieArray]=useState([]);
    const fetchData=async()=>{
        const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmFjZmVkMTZkYjU4OTQ0ZjcxNTU2ZDg4Nzg3NmM5ZiIsInN1YiI6IjY1N2MzYTIxZWM4YTQzMDEzNzAxMWE4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.quPsXIOlk4hXg-MXVPn5_FW9G3NW9c6j-54LWVyylVA'; 
        const options = {
            method: 'get',
            url: fetchUrl,
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
            // return response.data.results;
            setMovieArray(response.data.results);
            
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        fetchData();
    },[fetchUrl])

    const handleClick=(item)=>{
        console.log(item?.title || "random");
    }

    return (
        <div className="row">
            
            <h2 className="row-title" >{title}</h2>
            
            <div className="row-content">

            {movieArray.map((item, index) => (
                <img onClick={()=>{handleClick(item)}} className="row-poster" src={"https://image.tmdb.org/t/p/w500/"+item.backdrop_path} alt={item?.name || "movie"} key={index} /> 
            ))}
            </div>
        </div>
    )
}

export default Row;