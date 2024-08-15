// Code server here
// Your server this week should not do any of the processing or calculations
// Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the application

import express from 'express';
import configRoutes from './routes/index.js';

const app = express();

app.use(express.static('public'));
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:3000`);
});
