//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
import axios from 'axios';

import{
    BIDChecker,
    BIDHelper,
    pCountChecker,
    pCountHelper,
    yearChecker,
    yearHelper,
    mmHelper,
    pubChecker,
    pubHelper
} from './helpers.js';

const getBookById = async (id) => {
    await BIDChecker(id);
    return BIDHelper(id);
};

const booksByPageCount = async (min, max) => {
    await pCountChecker(min,max);
    return pCountHelper(min,max);
};

const sameYear = async (year) => {
    await yearChecker(year);
    return yearHelper(year);
};

const minMaxPrice = async () => {
    return mmHelper();
};

const searchBooksByPublisher = async (publisher) => {
    await pubChecker(publisher);
    return pubHelper(publisher);
};

export{getBookById, booksByPageCount, sameYear, minMaxPrice, searchBooksByPublisher};
