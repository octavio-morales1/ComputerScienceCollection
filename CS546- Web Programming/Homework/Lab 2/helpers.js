/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

let partChecker = (arrayToPartition, partitionFunc) => {
    if(Array.isArray(arrayToPartition)== false){
        throw "Error: Parameter is not an array";
    }
    if(arrayToPartition.length == 0){
        throw "Error: Array is empty";
    }
    if(arrayToPartition.length < 2){
        throw "Error: Array does not have at least 2 elements";
    }
    if(partitionFunc== false){
        throw "Error: Parameter does not exist";
    }
    if(typeof partitionFunc != "function"){
        throw "Error: Parameter is not a function";
    }
};

let partHelper = (arrayToPartition, partitionFunc) => {
    const arrayFiltered = arrayToPartition.filter(partitionFunc);
    const rem = arrayToPartition.filter((n) =>{
        if(arrayFiltered.includes(n)){
            return false;
        }
        else{
            return true;
        }
    });
    return [arrayFiltered, rem];
};

let shiftChecker = (arr, n) => {
    if(Array.isArray(arr)== false){
        throw "Error: Parameter is not an array";
    }
    if(arr== false){
        throw "Error: Array does not exist";
    }
    if(arr.length < 2){
        throw "Error: Array does not have at least 2 elements";
    }
    if(n == undefined){
        throw "Error: Parameter does not exist";
    }
    if(Number.isInteger(n)== false){
        throw "Error: Parameter is not an integer";
    }
}

let shiftHelper = (arr, n) => {
    if(n<0){
        for(n; n<0; n++){
            arr.push(arr[0]);
            arr.shift();
        }
    }
    else if(n>0){
        for(n; n>0; n--){
            arr.unshift(arr[arr.length-1]);
            arr.pop();
        }
    }
    return arr;
    
}

let oneChecker = (matrix) => {
    if (Array.isArray(matrix) == false){
        throw "Error: Parameter is not the proper type (array)";
    }
    if (matrix.length === 0){
        throw "Error: Matrix is an empty array";
    }
    for(let x = 0; x < matrix.length; x++){
        if (!Array.isArray(matrix[x])){
            throw "Error: One or more elements in the matrix is an empty array";
        }
        if (matrix[x].length == 0){
            throw "Error: Empty array in matrix";
        }
        if (matrix[x].length != matrix[0].length){
            throw "Error: All rows in the matrix do not have the same number of elements";
        }
        for(let y = 0; y < matrix[0].length; y++){
            if ((typeof matrix[x][y] === 'number')== false){
                throw "Error: One or more sub-array elements are not a number";
            }
        }
    }
}

let oneHelper = (matrix) => {
    let rowsToSet = new Array(matrix.length).fill(false);
    let colsToSet = new Array(matrix[0].length).fill(false);
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
            if (matrix[x][y] === 0) {
                rowsToSet[x] = true;
                colsToSet[y] = true;
            }
        }
    }

    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
            if (rowsToSet[x] || colsToSet[y]) {
                matrix[x][y] = 1;
            }
        }
    }
    return matrix;
}

let swapChecker = (string1, string2) => {
    if(!string1 || !string2){
        throw "Error: One or more parameters do not exist";
    }
    if (!(typeof string1 === 'string') || !(typeof string2 === 'string' )){
        throw "Error: One or more elements are not of the string type";
    }
    if (string1.length < 4 || string2.length < 4){
        throw "Error: One or more parameters are not least a length of 4 characters";
    }
}

let swapHelper = (string1, string2) => {
    let str1= string1.slice(0,4);
    let str2= string2.slice(0,4);
    let str3= string1.slice(4, string1.length);
    let str4= string2.slice(4, string2.length);
    return str2 + str3 + " " + str1 + str4;
}
    
let longChecker = (str1, str2) => {
    if (!str1 || !str2){
        throw "Error: One or more parameters do not exist";
    }
    if (!(typeof str1 === 'string') || !(typeof str2 === 'string' )){
        throw "Error: One or more parameters are not the valid string type";
    }
    if (str1.length < 5 || str2.length < 5){
        throw "Error: One or more parameters do not meet the character length requirement";
    }
    if ((str1.indexOf(' ') >= 0) || (str2.indexOf(' ') >= 0)){
        throw "Error: One or more parameters are empty strings or strings with just spaces";
    }
}

function longHelper(str1, str2) {
    let maxLength = 0;
    let endingIndexStr1 = str1.length;
    const dp = Array.from({ length: str1.length + 1 }, () => Array(str2.length + 1).fill(0));
  
    for (let x = 1; x <= str1.length; x++) {
        for (let y = 1; y <= str2.length; y++) {
            if (str1[x-1] === str2[y-1]) {
                dp[x][y] = dp[x-1][y-1] + 1;
                if (dp[x][y] > maxLength) {
                    maxLength = dp[x][y];
                    endingIndexStr1 = x;
                }
            }
            else {
                dp[x][y] = 0;
            }
        }
    }
  
    if (maxLength === 0) {
        return "";
    }
    else {
        return str1.substring(endingIndexStr1 - maxLength, endingIndexStr1);
    }
}

let paliChecker = (arrStrings) => {
    if (!arrStrings || !Array.isArray(arrStrings)){
        throw "Error: Argument is not the proper type"
    }
    if (arrStrings.length < 2){
        throw "Error: The length of the array argument is not at least 2"
    }
    for(let x = 0; x < arrStrings.length; x++){
        if (typeof arrStrings[x] != 'string'){
            throw "Error: One or more non string elements"
        }
        if(arrStrings[x] == ""){
            throw "Error: One or more parameters are empty strings or strings with just spaces"
        }
    }
};

let isPali = (str) => {
    str= str.toLowerCase().replace(/[\W_]/g, '');
    if(str === str.split('').reverse().join('')){
        return true;
    }
    return false;
}

let isIso = (str) => {
    for(let x=0; x<str.length; x++){
        for(let y=0; y<str.length; y++){
            if(x!=y && str[x]===str[y]){
                return false;
            }
        }
    }
    return true;

}

let paliHelper = (arrStrings) => {
    const all= {};
    for(let x=0; x<arrStrings.length; x++){
        if(isPali(arrStrings[x].replace(/[^a-zA-Z ]/g, "")) && isIso(arrStrings[x].replace(/[^a-zA-Z ]/g, ""))){
            all[arrStrings[x]] = "Both";
        }
        else if(isIso(arrStrings[x].replace(/[^a-zA-Z ]/g, ""))){
            all[arrStrings[x]] = "Isogram";
        }
        else if(isPali(arrStrings[x].replace(/[^a-zA-Z ]/g, ""))){
            all[arrStrings[x]] = "Palindrome";
        }
        else{
            all[arrStrings[x]] = "Neither";
        }
    }
    return all;
}

let eAs = (arr) => {
    let temp= [];
    for(let x=0; x<arr.length; x++){
        temp= temp.concat(Object.values(arr[x]));
    }
    for (let x = 0; x < temp.length; x++) {
        for (let y = 0; y < (temp.length - x - 1); y++) {
            if (temp[y] > temp[y + 1]) {
                let val = temp[y]
                temp[y] = temp[y + 1]
                temp[y + 1] = val
            }
        }
    }
    return temp;
}

let mean = (arr) => {
    let x= arr.length;
    let amt= 0;
    for(let y= 0; y<arr.length; y++){
        amt+= arr[y];
    }
    amt= amt/x;
    return amt.toFixed(3);
}

let median = (arr) => {
    if(arr.length%2==0){
        let amt= (arr[arr.length/2]+arr[1+ (arr.length/2)])/2
        return amt.toFixed(3);
    }
    else{
        return arr[~~(arr.length/2)].toFixed(3);
    }
}

let mode = (arr) => {
    let vals = {};
    let ctr = 0;
    let mode = 0;

    for (let x = 0; x < arr.length; x++) {
        let val = arr[x];
        if (vals[val]){
            vals[val]++;   
        }
        else{
            vals[val]= 1;
        }
        if (vals[val] > ctr) {
            ctr = vals[val];
            mode = val;
        }
    }
    return mode;
}

let objChecker= (arrObjects) => {
    if (!arrObjects || !Array.isArray(arrObjects)) {
        throw "Error: Paramter is not the proper type";
    }  
    for (let x = 0; x < arrObjects.length; x++) {
        if (typeof arrObjects[x] !== "object" || arrObjects[x] === null || Array.isArray(arrObjects[x])) {
            throw "Error: One or more elements in the array is not an object";
        }
    
        if (Object.keys(arrObjects[x]).length < 1) {
            throw "Error: One or more objects in the array is empty or does not have at least 1 key/value pair";
        }
    
        for (let key in arrObjects[x]) {
            if (typeof arrObjects[x][key] !== 'number') {
                throw "Error: One or more object key values is not a number";
            }
            if (!Number.isInteger(arrObjects[x][key])) {
                arrObjects[x][key] = Number(arrObjects[x][key].toFixed(3));
            }
        }
    }   
}

let objHelper= (arrObjects) => {
    let temp= {};
    let arr= eAs(arrObjects);
    temp["mean"]= mean(arr);
    temp["median"]= median(arr);
    temp["mode"]= mode(arr);
    temp["range"]= arr[arr.length-1]-arr[0];
    temp["minimum"]= arr[0];
    temp["maximum"]= arr[arr.length-1];
    temp["count"]= arr.length;
    let amt= 0;
    for(let x=0; x<arr.length; x++){
        amt+= arr[x];
    }
    temp["sum"]= amt.toFixed(3);
    return temp;
}

let nestedChecker= (obj1, obj2) => {
    if (typeof obj1 !== 'object' || Object.keys(obj1).length === 0){
        throw 'Error: First parameter must be a non-empty object';
    }
    if (typeof obj2 !== 'object' || Object.keys(obj2).length === 0){
        throw 'Error: Second parameter must be a non-empty object';
    }
}

let nestedHelper= (obj1, obj2) => {
    const diff= {};
    const keys= new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    keys.forEach(key => {
        const v1 = obj1[key];
        const v2 = obj2[key];
        if ((typeof v1 === 'object') && (v1 !== null) && (typeof v2 === 'object') && (v2 !== null)) {
            const objDiff = nestedHelper(v1, v2);
            if (Object.keys(objDiff).length > 0) {
                diff[key] = objDiff;
            }
        } 
        else if (Array.isArray(v1) && Array.isArray(v2)) {
            if (v1.toString() !== v2.toString()) {
                diff[key] = v2;
            }
        }
        else if (v1 !== v2) {
            diff[key] = v2;
        }
    });
    return diff;
}

let mergChecker = (...args) => {
    for(const obj of args){
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            throw "Error: Each argument must be an object";
        }
        if (Object.keys(obj).length === 0) {
            throw "Error: Each object must have at least one key/value pair.";
        }
        for (const [key, value] of Object.entries(obj)) {
            let numValue;
            if (typeof value === 'string') {
                numValue = Number(value);
            }
            else {
                numValue = value;
            }
            if (isNaN(numValue)) {
                throw `Error: Value for key "${key}" is not a valid number.`;
            }
        }
    }
}

let mergeHelper = (...args) => {
    let result = {};
    for (let obj of args) {
        mergChecker(obj);
        for (let [key, value] of Object.entries(obj)) {
            let numberValue;
            if (typeof value === 'string') {
                numberValue = Number(value);
            }
            else {
                numberValue = value;
            }
            if (result.hasOwnProperty(key)) {
                result[key] += numberValue;
            } else {
                result[key] = numberValue;
            }
        }
    }
    return result;
}
  
export { 
    partChecker,
    partHelper,
    shiftChecker,
    shiftHelper,
    oneChecker,
    oneHelper,
    swapChecker,
    swapHelper,
    longChecker,
    longHelper,
    paliChecker,
    paliHelper,
    objChecker,
    objHelper,
    nestedChecker,
    nestedHelper,
    mergChecker,
    mergeHelper
};
