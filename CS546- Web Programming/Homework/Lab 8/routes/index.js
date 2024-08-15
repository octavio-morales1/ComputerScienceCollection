//Here you will import route files and export them as used in previous labs
import movieRoutes from './movies.js'; 
import path from 'path';
import {static as s} from 'express';

const constructorMethod = (app) => {
  app.use('/', movieRoutes);
  app.use('/public', s(path.resolve('public')));
  app.get('/about', (req, res) => {
    res.sendFile(path.resolve('static/about.html'));
  });
  app.use('*', (req, res) => {
    res.status(404).send('Page not found');
  });
};
export default constructorMethod;
