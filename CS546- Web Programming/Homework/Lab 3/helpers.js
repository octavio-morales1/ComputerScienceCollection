//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
import axios from 'axios';


const authLink = async () => {
    try {
        const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json');
        return data;
    }
    catch (e){
        throw "Error: Failed to get author data";
    }
};

const bookLink = async () => {
    try {
        const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json');
        return data;
    }
    catch (e){
        throw "Error: Failed to get book data";
    }
};

const idChecker = async (id) => {
    if (!id){
        throw "Error: Parameter is empty";
    }
    if(typeof id !== 'string'){
        throw "Error: Parameter is not a string";
    }
    id= id.trim();
    if (id.length === 0){
        throw "Error: Parameter is an empty string (has whitepsace)"
    }
};

const idHelper = async (id) => {
    try {
        id= id.trim();
        const authList= await authLink();
        const single = authList.find(author => author.id === id);
        if(!single){
            throw "Error: Author not found"
        }
        return single;
    }
    catch (e){
        throw e;
    }
};

const ageChecker = async (age) => {
    if(!age){
        throw "Error: Parameter is empty";
    }
    if(typeof age !== 'number'){
        throw "Error: Parameter is not a number";
    }
    if(age%1!==0){
        throw "Error: Parameter is not a whole number";
    }
    if(age<1 || age>100){
        throw "Error: Parameter is not between 1-100";
    }

};

const ageHelper = async (age) => {
    try{
        const authList= await authLink();
        const matches = authList.filter(author => {
            const dob= new Date(author.date_of_birth);
            const aDate= new Date(Date.now() - dob.getTime());
            const calcAge = Math.abs(aDate.getUTCFullYear() - 1970);
            if (calcAge >=age){
                return true;
            }
            return false;
        }).map(single => `${single.first_name} ${single.last_name}`);
        return matches;
    }
    catch(e){
        throw e;
    }
};
const states= ['AL', 'KY', 'OH', 'AK', 'LA', 'OK', 'AZ', 'ME', 'OR', 'AR', 'MD', 'PA', 'AS', 'MA', 'CA', 'MI', 'RI', 'CO', 'MN', 'SC', 'CT', 'MS', 'SD', 'DE', 'MO', 'TN', 'DC', 'MT', 'TX', 'FL', 'NE', 'GA', 'NV', 'UT', 'NH', 'VT', 'HI', 'NJ', 'VA', 'ID', 'NM', 'IL', 'NY', 'WA', 'IN', 'NC', 'WV', 'IA', 'ND', 'WI', 'KS', 'WY'];

const stateChecker = async (state) => {
    if(!state){
        throw "Error: Parameter is empty";
    }
    if(typeof state !== 'string'){
        throw "Error: Parameter is not a string";
    }
    state = state.trim().toUpperCase();
    if(state.length !== 2 || !(states.includes(state))){
        throw "Error: Parameter is not a 2 character long string or is not a valid state";
    }
};

const stateHelper = async (state) => {
    try{
        state = state.trim().toUpperCase();
        const authList= await authLink();
        const bookList= await bookLink();
        const tempAStates= authList.filter(auth => auth.HometownState.toUpperCase() === state);
        const tempBIDS= tempAStates.flatMap(author => author.books);
        return bookList.filter(book => tempBIDS.includes(book.id)).map(book => book.title);
    }
    catch (e){
        throw e;
    }
};

const homeChecker = async (town, state) => {
    if(!town || !state){
        throw "Error: One or both parameters are empty";
    }
    if(typeof town !== 'string'){
        throw "Error: Parameter is not a string.";
    }
    if(town.trim().length === 0){
        throw "Error: Parameter is an empty string.";
    }
    if(typeof state !== 'string'){
        throw "Error: Parameter is not a string.";
    }
    if(state.trim().length !== 2 || !(states.includes(state))){
        throw "Error: Parameter is not a valid state or is not a length of 2";
    }
};

const homeHelper = async (town, state) => {
    try{
        town= town.trim().toLowerCase();
        state= state.trim().toUpperCase();
        const authList= await authLink();
        const matches = authList.filter(auth =>
            (auth.HometownCity.toLowerCase()) === town && (auth.HometownState.toUpperCase()) === state);
        const nameList = matches.map(auth => `${auth.first_name} ${auth.last_name}`).sort((p1, p2) => p1.split(' ')[1].localeCompare(p2.split(' ')[1]));
        return nameList;
    }
    catch (e){
        throw e;
    }
};

const bookChecker = async (authorid) => {
    if(!authorid){
        throw "Error: Parameter is empty"
    }
    if(typeof authorid !== 'string'){
        throw "Error: Parameter is not a string.";
    }
    if(authorid.trim().length === 0){
        throw "Error: Parameter is an empty string.";
    }
    const authList= await authLink();
    const auth= authList.find(p1 => p1.id === authorid.trim());
    if(!auth){
        throw "Error: Parameter is not a valid author id";
    }
};

const bookHelper = async (authorid) => {
    try{
        authorid= authorid.trim();
        const authList= await authLink();
        const bookList= await bookLink();

        const auth= authList.find(p1 => p1.id === authorid);
        const bok = bookList.filter(b => auth.books.includes(b.id)).map(b => b.title);
        return bok;
    }
    catch (e){
        throw e;
    }
};

const BIDChecker = async (id) => {
    if(typeof id !== 'string'){
        throw "Error: Parameter is not a string";
    }
    if(!id){
        throw "Error: Parameter is empty";
    }
    
    id= id.trim();
    if(id.length===0){
        throw "Error: Parameter is an empty string";
    }
    const bookList = await bookLink();
    const bok = bookList.find(b => b.id === id);
    if(!bok){
        throw "Error: Parameter is not a valid book id"
    }
};

const BIDHelper= async(id) => {
    try{
        id= id.trim();
        const bookList = await bookLink();
        return bookList.find(b => b.id === id);
    }
    catch(e){
        throw e;
    }
}

const pCountChecker = async (min, max) => {
    if (!min || !max){
        throw "Error: One or both parameters are not present"
    }
    if(typeof min !== 'number'){
        throw "Error: min parameter is not a number";
    }
    if(min%1!==0){
        throw "Error: min parameter is not a whole number";
    }
    if(typeof max !== 'number'){
        throw "Error: max parameter is not a number";
    }
    if(max%1!==0){
        throw "Error: max parameter is not a whole number";
    }
    if(min<0 || max <0){
        throw "Error: One or both parameters are negative";
    }
    if(max-min<0){
        throw "Error: min parameter exceeds the value of the max parameter.";
    }

};

const pCountHelper = async (min, max) => {
    try{
        const bookList= await bookLink();
        return bookList.filter(b => b.pageCount >= min && b.pageCount <= max).map(b => b.id);
    }
    catch (e){
        throw e;
    }
};

const yearChecker = async (year) => {
    if(typeof year!== 'number'){
        throw "Error: Parameter is not a number";
    }
    if(!year){
        throw "Error: Parameter is empty";
    }
    if(year%1!==0){
        throw "Error: Parameter is not a whole number";
    }
    if(year<0){
        throw "Error: Parameter is a negative number";
    }
};

//I wanted to keep the streak of filter or find because in my opinion they are both far more efficient, but I couldn't figure it out for the life of me :(
const mmHelper = async () => {
    try {
        const bookList = await bookLink();
        let minPrice = Number.POSITIVE_INFINITY;
        let maxPrice = Number.NEGATIVE_INFINITY;
        let minList = [];
        let maxList = [];
        for (let b of bookList) {
            if (b.price < minPrice) {
                minPrice = b.price;
                minList = [b.id];
            }
            else if (b.price === minPrice) {
                minList.push(b.id);
            }
            if (b.price > maxPrice) {
                maxPrice = b.price;
                maxList = [b.id]; 
            }
            else if (b.price === maxPrice) {
                maxList.push(b.id);
            }
        }
        return { cheapest: minList, mostExpensive: maxList };
    } catch (e) {
        throw e;
    }
};

//doesnt work
const yearHelper = async (year) => {
    const bookList= await bookLink();
    const matches = bookList.filter(b => { const yr = new Date(b.publicationDate).getFullYear();
        return yr === year; });
    if (matches.length === 0) {
        throw "Error: No books found"
    }
    return matches;
};

const pubChecker = async (publisher) => {
    if(typeof publisher !== 'string'){
        throw "Error: Parameter is not a string";
    }
    if(!publisher){
        throw "Error: Parameter is empty.";
    }
    publisher = publisher.trim();
    if(publisher.length === 0){
        throw "Error: Parameter is a non-empty string";
    }
    const bookList= await bookLink();
    const matches= bookList.filter(b=> b.publisher === publisher).map(b => b.id);
    if (matches.length === 0) {
        throw "Error: No books found"
    }
}

const pubHelper = async (publisher) => {
    try {
        publisher = publisher.trim();
        const bookList= await bookLink();
        return bookList.filter(b=> b.publisher === publisher).map(b => b.id);
    } catch (e) {
        throw e;
    }
};

export {
    idChecker,
    idHelper,
    ageChecker,
    ageHelper,
    stateChecker,
    stateHelper,
    homeChecker,
    homeHelper,
    bookChecker,
    bookHelper,
    BIDChecker,
    BIDHelper,
    pCountChecker,
    pCountHelper,
    yearChecker,
    yearHelper,
    mmHelper,
    pubChecker,
    pubHelper
}
