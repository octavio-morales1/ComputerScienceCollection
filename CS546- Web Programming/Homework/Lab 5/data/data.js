/*Here, you can export the data functions
to get the comapnies, people, getCompanyByID, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

//most of code from lecture notes
import axios from 'axios';

const getCompanies = async () => {
    const temp= await axios.get("https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json");
    return await temp.data;
};

const getPeople = async () => {
    const temp= await axios.get("https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json");
    return await temp.data;
};

const getCompanyById = async (id) => {
    const allComs = await getCompanies();
    let com = null;
    for (let x = 0; x < allComs.length; x++) {
      if (allComs[x].id === id) {
        com = allComs[x];
        break;
      }
    }
    if (!com) {
      throw 'Error: Company not found';
    }
    return com;
  };
  

const getPersonById = async (id) => {
    const allPpl = await getPeople();
    let ppl = null;
    for (let x = 0; x < allPpl.length; x++) {
      if (allPpl[x].id === id) {
        ppl = allPpl[x];
        break;
      }
    }
    if (!ppl) {
      throw 'Error: Company not found';
    }
    return ppl;
};

export {getCompanies, getPeople, getCompanyById, getPersonById};
