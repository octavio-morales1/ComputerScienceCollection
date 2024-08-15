//An index file that returns a function that attaches all your routes to your app
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/routes/index.js

//code in lecture notes
import comp from './companies.js';
import ppl from './people.js';

const getStarted = (app) => {
  app.use('/companies', comp);
  app.use('/people', ppl);

  app.use('*', (req, res) => {
    return res.status(404).json({error: 'Not found'});
  });
};

export default getStarted;