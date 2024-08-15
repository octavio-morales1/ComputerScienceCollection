//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.

import express from 'express';
import router from './routesApi.js';

const constructorMethod= (app) => {
  app.use('/', router);
  app.use('*', (req, res) => {
    res.redirect("/");
  });
};

export default constructorMethod;

