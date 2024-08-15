import express from 'express';
import { dbConnection } from './config/mongoConnection.js';
import configRoutes from './routes/index.js';

//although different from the lecture code, it is structured this way as my seed file refused to work.
const app = express();
app.use(express.json());
configRoutes(app);

const main = async () => {
  try {
    await dbConnection();
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } catch (e) {
    console.error('Error: Failed to connect to the database or seed data:', e);
  }
};

main();
