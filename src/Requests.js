


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer 6a45e3b0bd8941c11d7c276df2dc0192'
    }
  };
  
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));