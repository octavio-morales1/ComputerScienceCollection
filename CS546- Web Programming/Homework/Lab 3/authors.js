//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json
import axios from 'axios';
//you must use axios to get the data
import{
    idChecker,
    idHelper,
    ageChecker,
    ageHelper,
    stateChecker,
    stateHelper,
    homeChecker,
    homeHelper,
    bookChecker,
    bookHelper
} from './helpers.js';

const getAuthorById = async (id) => {
    await idChecker(id);
    return idHelper(id);
};

const searchAuthorsByAge = async (age) => {
    await ageChecker(age);
    return ageHelper(age);
};
    
const getBooksByState = async (state) => {
    await stateChecker(state);
    return stateHelper(state);
};

const searchAuthorsByHometown = async (town, state) => {
    await homeChecker(town, state);
    return homeHelper(town, state);
};

const getAuthorBooks = async (authorid) => {
    await bookChecker(authorid);
    return bookHelper(authorid);
};

export{getAuthorById, searchAuthorsByAge, getBooksByState, searchAuthorsByHometown, getAuthorBooks};
