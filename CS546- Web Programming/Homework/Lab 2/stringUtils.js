/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { 
  swapChecker,
  swapHelper,
  longChecker,
  longHelper,
  paliChecker,
  paliHelper
} from './helpers.js';

let swapChars = (string1, string2) => {
  //code goes here
  swapChecker(string1,string2);
  return swapHelper(string1,string2);
};

let longestCommonSubstring = (str1, str2) => {
  //code goes here
  longChecker(str1,str2);
  return longHelper(str1,str2);
};

let palindromeOrIsogram = (arrStrings) => {
  //code goes here
  paliChecker(arrStrings);
  return paliHelper(arrStrings);
};

export {swapChars, longestCommonSubstring, palindromeOrIsogram};