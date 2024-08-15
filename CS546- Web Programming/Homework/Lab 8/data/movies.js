import axios from 'axios';
const API_KEY = 'CS546';
const BASE_URL = 'http://www.omdbapi.com/';


export const searchMoviesByName= async (title) => {
  /*Function to make an axios call to search the api and return up to 20 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  try {
    const pg1= `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}`;
    const rp1= await axios.get(pg1);
    let movies= rp1.data.Search || [];
    if (rp1.data.totalResults > 10) {
      const url22= `${pg1}&page=2`;
      const rp2= await axios.get(url22);
      movies= movies.concat(rp2.data.Search);
    }
    return movies.slice(0, 20);
  }
  catch (error) {
    console.error('Error searching movies by name:', error);
    throw error;
  }
};

export const searchMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  try{
    const url= `${BASE_URL}?apikey=${API_KEY}&i=${id}`;
    const rp= await axios.get(url);
    return rp.data;
  }
  catch (error){
    console.error('Error searching movie by ID:', error);
    throw error;
  }
};
