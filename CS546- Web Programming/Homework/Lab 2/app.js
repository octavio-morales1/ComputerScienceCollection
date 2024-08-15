/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import{
    objectStats,
    nestedObjectsDiff,
    mergeAndSumValues
} from './objectUtils.js';

import{
    swapChars,
    longestCommonSubstring,
    palindromeOrIsogram
} from './stringUtils.js';

import{
    arrayPartition,
    arrayShift,
    matrixOne
} from './arrayUtils.js';

//arrayUtils.js

//arrayPartition
try{
    const arrayToPartition1 = [1, 2, 3, 4, 6]; 
    const partitionFunc1 = (num) => num % 3 === 0; 
    const partitionedArrays1 = arrayPartition(arrayToPartition1, partitionFunc1); // Expected Result: [[3, 6], [1, 2, 4]]
    console.log(partitionedArrays1);
}
catch(e){
    console.error(e);
}
try{
    let arrayToPartition2;
    const partitionFunc2 = (num) => num > 18; 
    const partitionedArrays2 = arrayPartition(arrayToPartition2, partitionFunc2); // Expected Result: "Error: Parameter is not an array"
    console.log(partitionedArrays2);

}
catch(e){
    console.error(e);
}

//arrayShift
try{
    console.log(arrayShift([3,4,5,6,7], -1)); // Expected Result: [4, 5, 6, 7, 3]
}
catch(e){
    console.error(e);
}
try{
    console.log(arrayShift([7,11,15, 1, 1, 1, 1], 4.00000000000001)); // Expected Result: "Error: Parameter is not an integer"
}
catch(e){
    console.error(e);
}

//matrixOne
try{
    console.log(matrixOne([[0,0,0],[0,0,0],[0,0,0]])); // Expected Result: [[1,1,1],[1,1,1],[1,1,1]]
}
catch(e){
    console.error(e);
}
try{
    console.log(matrixOne([[], [], []]));// Expected Result: "Error: Empty array in matrix"
}
catch(e){
    console.error(e);
}


//stringUtils.js

//swapChars
try{
    console.log(swapChars("Octavio", "Morales")); // Expected Result: "Moravio Octales"
}
catch(e){
    console.error(e);
}
try{
    console.log(swapChars("", "Octavio")); //Expected Result: "Error: One or more parameters do not exist"
}
catch(e){
    console.error(e);
}

//longestCommonSubstring
try{
    const str1 = "mmmdaddmmm"; 
    const str2 = "ddddddadd"; 
    const commonSubstring = longestCommonSubstring(str1, str2); // Expected Result: "dadd"
    console.log(commonSubstring);
}
catch(e){
    console.error(e);
}
try{
    const str1 = "abcdef"; 
    const commonSubstring = longestCommonSubstring(str1); // Expected Result: "Error: One or more parameters do not exist"
    console.log(commonSubstring);
}
catch(e){
    console.error(e);
}

//palindromeOrIsogram
try{
    const checkStrings = (["racecar", "help", "me!", "I", "am", "so tired"]); 
    const results = palindromeOrIsogram(checkStrings); 
    console.log(results);
    //returns and then logs: { racecar: 'Palindrome', help: 'Isogram', 'me!': 'Isogram', I: 'Both', am: 'Isogram', 'so tired': 'Isogram' }
}
catch(e){
    console.error(e);
}
try{
    const strings3 = 12; 
    const results3 = palindromeOrIsogram(strings3); 
    console.log(results3);
    // Expected Result: "Error: Argument is not the proper type"
}
catch(e){
    console.error(e);
}


//objectUtils.js


//objectStats
try{
    const arrayOfObjects1 = [ { a: 3, b: 3, c: 3, d: 3, e: 3, f: 3 }, { x: 3, y: 3, z: 3 }, { p: 3, q: 3, r: 3, s: 20.12 }, ]; 
    const statsResult1 = objectStats(arrayOfObjects1); 
    console.log(statsResult1);
    // Expected Result: { mean: '4.317', median: '3.000', mode: 3, range: 17.12, minimum: 3, maximum: 20.12, count: 13, sum: '56.120'}
}
catch(e){
    console.error(e);
}
try{
    const arrayOfObjects2 = [ { p: 10, q: 15, r: 'cat' }, { x: 'dog', y: 8, z: 10 }, { a: 5, b: 5, c: 5 }, ]; 
    const statsResult2 = objectStats(arrayOfObjects2); 
    // Expected Result: "Error: One or more object key values is not a number"
    console.log(statsResult2);
}
catch(e){
    console.error(e);
}

//nestedObjectsDiff
try{
    const obj1 = { key1: "value1", key2: { nestedKey: "nestedValue", arrayKey: [1, 2, 3], }, }; 
    const obj2 = { key1: "value2", key2: { nestedKey: "IamNotOriginal", arrayKey: [1, 2, 3], }, key3: "fakeNews", }; 
    const differences = nestedObjectsDiff(obj1, obj2);
    // Example Output:   { key1: 'value2', key2: { nestedKey: 'IamNotOriginal' }, key3: 'fakeNews'}
    console.log(differences);
}
catch(e){
    console.error(e);
}
try{
    const obj3 = { x: { y: { z: 1 } } }; 
    const differences2 = nestedObjectsDiff(obj3); // Expected Result: "Error: Second parameter must be a non-empty object"
    console.log(differences2);
}
catch(e){
    console.error(e);
}

//mergeAndSumValues
try{
    const object1 = { a: "100000", b: 21, c: "5" };
    const object2 = { b: 23, c: "8", d: "4" };
    const object3 = { a: 56, c: 1, e: 12 };
    const resultMergedAndSummed = mergeAndSumValues(object1, object2, object3);
    console.log(resultMergedAndSummed);
    // Expected Result: { a: 100056, b: 44, c: 14, d: 4, e: 12 }

}
catch(e){
    console.error(e);
}
try{
    const obj10 = { b: "2", c: 3 }; 
    const obj11 = { b: 3, c: 4, d: 5 }; 
    const obj12 = { a: 2, maryland: "goodbye", e: 6 }; 
    const result4 = mergeAndSumValues(obj10, obj11, obj12); // Expected Result: "Error: Value for key "maryland" is not a valid number.""
    console.log(result4);
}
catch(e){
    console.error(e);
}

