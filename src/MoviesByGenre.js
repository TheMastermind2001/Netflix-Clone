// const { mapGenreId,mapIdGenre } = require('./GenreSeparate');

const processDataGenreSeparate=require('./GenreSeparate');


// import axios from 'axios';
const axios=require("axios");

// const func1=async ()=>{
//     const {mapGenreId,mapIdGenre}=await processDataGenreSeparate;
//     console.log(mapIdGenre);
// }

// console.log(mapIdGenre);
// console.log(mapGenreId);

const fetchData=async(link,pages)=>{
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmFjZmVkMTZkYjU4OTQ0ZjcxNTU2ZDg4Nzg3NmM5ZiIsInN1YiI6IjY1N2MzYTIxZWM4YTQzMDEzNzAxMWE4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.quPsXIOlk4hXg-MXVPn5_FW9G3NW9c6j-54LWVyylVA'; 
    const options = {
        method: 'get',
        url: link,
        params: {
          language: 'en-US',
          page: pages,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
    };
    try {
        const response = await axios(options);
        const responseData = response.data;
        // console.log(response.data);
        return response.data.results || [];
    } 
    catch (error) {
        console.error('Error fetching data:', error);
    }



}



const processData=async()=>{
    const arr=[];
    for(var page=1;page<=10;page++){
        const arr1=await fetchData("https://api.themoviedb.org/3/trending/all/day?language=en-US",page);
        for(var i=0;i<arr1.length;i++){
            arr.push(arr1[i]);
        }
    }
    // console.log(arr.length);

    const moviesByGenres={};
    const {mapGenreId,mapIdGenre}=await processDataGenreSeparate;
    console.log(mapIdGenre);
    for(var i=0;i<arr.length;i++){

        const movieDetail=arr[i];
        if(!movieDetail.hasOwnProperty("genre_ids")){
            continue;
        }
       
        // console.log(mapIdGenre);
        for(var j=0;j<movieDetail["genre_ids"].length;j++){
            const temp=movieDetail["genre_ids"][j];
            const str=temp.toString();
            // console.log(str);
            const genre1=mapIdGenre[str];
            // console.log(typeof genre1);
            if(!moviesByGenres[genre1]){
                moviesByGenres[genre1]=[];
            }
            moviesByGenres[genre1].push(movieDetail);
        }
    }

    // console.log(moviesByGenres);

    module.exports={moviesByGenres};


}

// func1();
processData();



