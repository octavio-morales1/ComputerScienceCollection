/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { 
  objChecker,
  objHelper,
  nestedChecker,
  nestedHelper,
  mergChecker,
  mergeHelper
} from './helpers.js';

let objectStats = (arrObjects) => {
  //Code goes here
  objChecker(arrObjects);
  return objHelper(arrObjects);
};

let nestedObjectsDiff = (obj1, obj2) => {
  //Code goes here
  nestedChecker(obj1, obj2);
  return nestedHelper(obj1, obj2);
};

let mergeAndSumValues = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
  mergChecker(...args);
  return mergeHelper(...args);
};

export {objectStats, nestedObjectsDiff, mergeAndSumValues};
