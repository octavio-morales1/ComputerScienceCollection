import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input
console.log(lab1.questionOne(6)); // returns and then outputs: 8
console.log(lab1.questionOne(10)); // returns and then outputs: 55
console.log(lab1.questionOne(4)); // returns and then outputs: 3
console.log(lab1.questionOne(11)); // returns and then outputs: 89
console.log(lab1.questionOne(15)); // returns and then outputs: 610

console.log(lab1.questionTwo([6, 4, 11])); // returns and then outputs: {4: false, 6:false, 11: true} 
console.log(lab1.questionTwo([3])); // returns and then outputs: {3: true} 
console.log(lab1.questionTwo([7, 11, 997])); // returns and then outputs: {7: true, 11: true, 997: true}
console.log(lab1.questionTwo([1, 6, 8, 1982])); // returns and then outputs: {1: false, 6: false, 8: false, 1982: false}
console.log(lab1.questionTwo([])); // returns and then outputs: {}

console.log(lab1.questionThree("")); // returns and then outputs: {consonants: 0, vowels: 0, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0}
console.log(lab1.questionThree("AAAABBBB")); // returns and then outputs: {consonants: 4, vowels: 4, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0}
console.log(lab1.questionThree("@..3")); // returns and then outputs: {consonants: 0, vowels: 0, numbers: 1, spaces: 0, punctuation: 2, specialCharacters: 1}
console.log(lab1.questionThree("I really hate peppermint")); // returns and then outputs: {consonants: 13, vowels: 8, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0}
console.log(lab1.questionThree("I am single for Valentine's Day help me.")); // returns and then outputs: {consonants: 19, vowels: 12, numbers: 0, spaces: 7, punctuation: 2, specialCharacters: 0}

console.log(lab1.questionFour([2, 2, 2, 2, 2, 2])); // returns and then outputs: [2]
console.log(lab1.questionFour([1, 10, "10", 10, 12, "apple"])); // returns and then outputs: [1, 10, '10', 12, 'apple']
console.log(lab1.questionFour(["1", "2", "3", "3", "4"])); // returns and then outputs: ['1', '2', '3', '4']
console.log(lab1.questionFour(["ate"])); // returns and then outputs: ['ate']
console.log(lab1.questionFour([])); // returns and then outputs: []