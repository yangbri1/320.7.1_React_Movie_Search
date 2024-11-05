// import useEffect() hook from React library
import { useState, useEffect } from 'react'
// import some CSS styling
import './App.css'

// import necessary modules -- components
import MovieDisplay from './components/MovieDisplay.jsx';
import Form from './components/Form.jsx';

// root App() component
function App() {

  // initialize OMDB API Key to const variable 
  const apiKey = "ceb7a3c6";

  // create state to carry movie data
  const [movie, setMovie] = useState(null); // Aside: default initial value = "null"

  // utilize an anonymous arrow function to grab movies info
  /* NOTE: ALWAYS require an "async" function in order to use "await" while fetching
  info from the database --- otw only a "Promise" will be returned as response */
  const getMovie = async(searchTerm) => {
    try {

      let response = "";

      // if searchTerm is an empty String -- initial render
      if(searchTerm == ''){

        // setting up constraints -- as from API Docs seems like IMDB # ranges from 1 mil & upward
        let min = 1000000;
        let max = 5000000;

        // use JS Math.random to randomly generate a number
        let randNum = Math.round(Math.random() * (max - min)) + min;
        
        // url filters for IMDB number according to API Documentation
        let url = `http://www.omdbapi.com/?apikey=${apiKey}&i=tt${searchTerm}`
        
        response = await fetch(url);
      }

      else{
        // make fetch HTTP request & store response
        response = await fetch(
        // employ string literals ${} within string interpolation to retrieve movie data pertaining to specific "apiKey" & "searchTerm" constraints
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      }
      
      // parse out JSON response into a JS obj -- stringify?
      const data = await response.json(); 
      // set "Movie" state to previously accepted data
      setMovie(data);
    } catch (err) {
      console.error(err);
    }

    
  };

  /* Diane's way (to use comment out above coditionals & only use the else code block) */
  // useEffect(() => {
  //   const movies = `http://www.omdbapi.com/?apikey=${apikey}&`
  //   const random = Math.floor(Math.random() * movies.length);
  //   getMovie(random);
  // }, []);

  // This will run on the first render but not on subsquent renders
  useEffect(() => {
    getMovie(""); // default was "Clueless"
  }, []); // [] dependency initial render run once

  // pass getMovie function as a prop "moviesearch"
  return (
    // React fragment to hold assortment of HTML/XML tags to DOM later
    // rendering "Form" & "MovieDisplay" components (self-closing tags) to DOM
    // pass movie as props to movie display
    <>
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie}/>  
    </>
  )
}

export default App
