export const questionOne = (index) => {
  // Implement question 1 here
  if(index==0 || index==1){
    return index;
  }
  return questionOne(index-1) + questionOne(index-2); //return result
};

function isPrime(num, div) {
  if(num<=1){
    return false;
  }
  if(div==1){
    return true;
  }
  if(num%div==0){
    return false;
  }
  return isPrime(num, div-1);
}

export const questionTwo = (arr) => {
  // Implement question 2 here
  let help= {};
  for(let x=0; x<arr.length; x++){
    let answ= isPrime(arr[x],arr[x]-1);
    help[arr[x]]= answ;
  }
  return help; //return result
};

export const questionThree = (str) => {
  // Implement question 3 here
  str= str.toLowerCase();
  const cont= ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
  const vow= ["a", "e", "i", "o", "u"];
  const num= ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const pun= [".", ",", "!", "?", "'", "''",":", ";"];
  let c=0;
  let v=0;
  let n=0;
  let space=0;
  let p=0;
  let sp=0;

  for(let x=0; x<str.length; x++){
    if(cont.includes(str[x])){
      c++;
    }
    else if(vow.includes(str[x])){
      v++;
    }
    else if(num.includes(str[x])){
      n++;
    }
    else if(str[x]===" "){
      space++;
    }
    else if(pun.includes(str[x])){
      p++;
    }
    else{
      sp++;
    }
  }

  let ret= {
    consonants: c,
    vowels: v,
    numbers: n,
    spaces: space,
    punctuation: p,
    specialCharacters: sp
  };
  return ret; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here
  let ret= [];
  for(let x=0; x<arr.length; x++){
    if(!(ret.includes(arr[x]))){
      ret.push(arr[x]);
    }
  }
  return ret; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'OCTAVIO',
  lastName: 'MORALES',
  studentId: '20006348'
};
