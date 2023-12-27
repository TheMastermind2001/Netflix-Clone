
//This files extracts the different genres vs ids


const axios=require("axios");

const fetchData=async(link)=>{
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmFjZmVkMTZkYjU4OTQ0ZjcxNTU2ZDg4Nzg3NmM5ZiIsInN1YiI6IjY1N2MzYTIxZWM4YTQzMDEzNzAxMWE4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.quPsXIOlk4hXg-MXVPn5_FW9G3NW9c6j-54LWVyylVA'; 
    const options = {
        method: 'get',
        url: link,
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
        // console.log(response.data);
        return response.data.genres || [];
    } 
    catch (error) {
        console.error('Error fetching data:', error);
    }
}






async function processData(){
    const arr1=[];
    try{
        const arr=await fetchData("https://api.themoviedb.org/3/genre/movie/list?language=en",i);
        for(var i=0;i<arr.length;i++){
            arr1.push(arr[i]);
        }
       
        const mapGenreId={};
        const mapIdGenre={};
    
        for(var i=0;i<arr1.length;i++){
            mapGenreId[arr1[i].name]=arr1[i].id;
            mapIdGenre[arr1[i].id]=arr1[i].name;

        }

        // console.log(mapIdGenre);
        // module.exports = { mapGenreId,mapIdGenre };
        return {mapGenreId,mapIdGenre};
    }
    catch(error){
        console.error('Error fetching data:', error);
    }

   
}

module.exports=processData();


















