//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import express from 'express';
import { searchMoviesByName, searchMovieById } from '../data/movies.js';

const router= express.Router();
router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    res.render('home', {title:'Movie Finder'});
  }
  catch (error){
    res.status(500).render('Error', {error:'Internal Server Error'});
  }
});

router.route('/searchmovies').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.
  try {
    const {searchMoviesByName: title }= req.body;
    if (!title.trim()) {
      res.status(400).render('Error', {error: 'No search term provided'});
    }
    const movies= await searchMoviesByName(title.trim());
    res.render('movieSearchResults', {
      title: 'Movies Found',
      movies: movies,
      searchMoviesByName: title
    });
  }
  catch (error){
    res.status(500).render('Error', {error:'Internal Server Error'});
  }
});

router.route('/movie/:id').get(async(req, res) => {
  //code here for GET a single movie
  try {
    const {id}= req.params;
    const movie= await searchMovieById(id);
    if (!movie|| movie.Response=== 'False') {
      res.status(404).render('Error', {error: 'Movie not found'});
    }
    res.render('movieById', {
      title: movie.Title,
      movie: movie
    });
  }
  catch (error){
    res.status(500).render('Error', {error:'Internal Server Error'});
  }
});

export default router;
