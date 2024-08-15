//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//majority of code in lecture notes
//You can import your getPeople() function in the /data/data.js file to return the list of people.  You can also import your getPersonById(id) function and call it in the :/id route.
import {getCompanies, getPeople, getCompanyById, getPersonById} from '../data/data.js';
import {Router} from 'express';
const router = Router();

router.route('/');
router.route('/:id');
// Implement GET Request Method and send a JSON response  See lecture code!
router
  .route('/')
  .get(async (req, res) => {
    try {
      const temp= await getPeople();
        return res.json(temp);
    }
    catch (e) {
      return res.status(500).send(e);
    }
  });


// Implement GET Request Method and send a JSON response See lecture code!
router
  .route('/:id')
  .get(async (req, res) => {
    try {
        const temp= req.params.id;
        if (!temp){
            throw 'Error: You must provide an id to search for';
        }
        if (typeof temp !== 'string'){
            throw 'Error: id must be a string';
        }
        req.params.id = temp.trim();
        if (req.params.id.length === 0){
            throw 'Error: id cannot be an empty string or just spaces';
        }
        if (req.params.id.length !== 36) {
          throw 'Error: id is not valid';
        }
        try{
          const tempList = req.params.id.split('-');
        if (tempList.length !== 5) {
            throw 'Error: id is not valid';
        }
        if (tempList[0].length !== 8 || !tempList[0].match(/^[0-9a-f]{8}$/i)) {
            throw 'Error: id is not valid';
        }
        if (tempList[1].length !== 4 || !tempList[1].match(/^[0-9a-f]{4}$/i)) {
            throw 'Error: id is not valid';
        }
        if (tempList[2].length !== 4 || !tempList[2].match(/^[0-9a-f]{4}$/i)) {
            throw 'Error: id is not valid';
        }
        if (tempList[3].length !== 4 || !tempList[3].match(/^[0-9a-f]{4}$/i)) {
            throw 'Error: id is not valid';
        }
        if (tempList[4].length !== 12 || !tempList[4].match(/^[0-9a-f]{12}$/i)) {
            throw 'Error: id is not valid';
        }
        }
        catch(e){
          throw 'Error: id is not valid';
        }
    }
    catch (e) {
        return res.status(400).json({error: e});
    }
    try {
        const temp2 = await getPersonById(req.params.id);
        return res.json(temp2);
    }
    catch (e) {
        return res.status(404).json(e);
    }
  });
export default router;
