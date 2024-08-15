/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { 
  partChecker,
  partHelper,
  shiftChecker,
  shiftHelper,
  oneChecker,
  oneHelper,
} from './helpers.js';


let arrayPartition = (arrayToPartition, partitionFunc) => {
  //code goes here
  partChecker(arrayToPartition, partitionFunc);
  return partHelper(arrayToPartition, partitionFunc);
};

let arrayShift = (arr, n) => {
  //code goes here
  shiftChecker(arr, n);
  return shiftHelper(arr,n)
};

let matrixOne = (matrix) => {
  //code goes here
  oneChecker(matrix);
  return oneHelper(matrix);
};

export { arrayPartition , arrayShift, matrixOne};
