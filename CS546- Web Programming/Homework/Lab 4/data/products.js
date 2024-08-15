// TODO: Export and implement the following functions in ES6 format
import { prod } from '../config/mongoCollections.js';
import pkg from 'mongodb';
const { ObjectId } = pkg;

const create = async (
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {
  // Checks if all parameters are present
  if (!productName) {
    throw "Error: Product name parameter is not present";
  }
  if (!productDescription) {
    throw "Error: Product description parameter is not present";
  }
  if (!modelNumber) {
    throw "Error: Model number parameter is not present";
  }
  if (price === undefined) {
    throw "Error: Price parameter is not present";
  }
  if (!manufacturer) {
    throw "Error: Manufacturer parameter is not present";
  }
  if (!manufacturerWebsite) {
    throw "Error: Manufacturer website parameter is not present";
  }
  if (!keywords) {
    throw "Error: Keywords parameter is not present";
  }
  if (!categories) {
    throw "Error: Categories parameter is not present";
  }
  if (!dateReleased) {
    throw "Error: Date released parameter is not present";
  }
  if (discontinued === undefined) {
    throw "Error: Discontinued field parameter is not present";
  }

  // Checks if parameters are not strings or empty strings
  if (typeof productName !== 'string' || productName.trim().length === 0) {
    throw "Error: Invalid or empty product name";
  }
  if (typeof productDescription !== 'string' || productDescription.trim().length === 0) {
    throw "Error: Invalid or empty product description";
  }
  if (typeof modelNumber !== 'string' || modelNumber.trim().length === 0) {
    throw "Error: Invalid or empty model number";
  }
  if (typeof manufacturer !== 'string' || manufacturer.trim().length === 0) {
    throw "Error: Invalid or empty manufacturer";
  }
  if (typeof manufacturerWebsite !== 'string' || manufacturerWebsite.trim().length === 0) {
    throw "Error: Invalid or empty manufacturer website";
  }
  if (typeof dateReleased !== 'string' || dateReleased.trim().length === 0) {
    throw "Error: Invalid or empty date released";
  }

  // Check if price is valid
  if (typeof price !== 'number') {
    throw "Error: Price must be a number";
  }
  if (price <= 0) {
    throw "Error: Price must be greater than 0.00";
  }
  if (!/^\d+(\.\d{0,2})?$/.test(price.toString())) {
    throw "Error: Two decimal places present";
  }

  // Check if the url format is valid
  if (!/^http:\/\/www\.[a-zA-Z0-9\-]{5,}\.com$/.test(manufacturerWebsite)) {
    throw "Error: Invalid URL format";
  }  

  // Check if keywords is an array with at least one string element
  if (Array.isArray(keywords)==false || keywords.length === 0) {
    throw "Error: Keywords parameter must be a non-empty array";
  }
  for (let x = 0; x < keywords.length; x++) {
    if (typeof keywords[x] !== 'string' || keywords[x].trim().length === 0) {
        throw "Error: Each keyword in array must be a non-empty string";
    }
  }

  // Check if categories is an array with at least one string element
  if (Array.isArray(categories)==false || categories.length === 0) {
    throw "Error: Categories parameter must be a non-empty array";
  }
  // Check if each category is a non-empty string
  for (let x = 0; x < categories.length; x++) {
    if (typeof categories[x] !== 'string' || categories[x].trim().length === 0) {
        throw "Error: Each category in array must be a non-empty string";
    }
  }

  // Checks if dateReleased if the date is a valid format
  if (!/^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(dateReleased)) {
    throw "Error: Invalid date format (MM/DD/YYYY)";
  }
  // Checks if dateReleased is a valid date
  const parts= /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/.exec(dateReleased);
  const m= parseInt(parts[1], 10);
  const d= parseInt(parts[2], 10);
  const y= parseInt(parts[3], 10);

  // Check for leap year
  const isLeap= (y%4===0);
  let daysInMonth= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if(isLeap==true){
    daysInMonth= [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  if (d > daysInMonth[m - 1]) {
    throw `Error: Invalid date, ${m}/${d}/${y} is not a valid date.`;
  }

  //Next part
  if (typeof discontinued !== 'boolean') {
    throw "Error: Discontinued parameter has to be a boolean type";
  }
  const prods = await prod();
  let help = {
    productName: productName,
    productDescription: productDescription,
    modelNumber: modelNumber,
    price: price,
    manufacturer: manufacturer,
    manufacturerWebsite: manufacturerWebsite,
    keywords: keywords,
    categories: categories,
    dateReleased: dateReleased,
    discontinued: discontinued
  };
  const temp = await prods.insertOne(help);
  if (temp.InsertedCount === 0){
    throw 'Error: Product was unable to be added';
}
  return await get(temp.insertedId.toString());
};

const getAll = async () => {
    const allProds = await prod();
    return await allProds.find({}).toArray();;
};

const get = async (id) => {
  if (!id){
    throw 'Error: id parameter not present';
  }
  if (typeof id !== 'string' || id.trim().length === 0) {
      throw 'Error: id has to be a non-empty string';
  }
  id = id.trim();
  if(ObjectId.isValid(id)==false){
    throw "Error: Invalid id"
  }
  const prodCol = await prod();
  let objID= new ObjectId(id);
  const product= await prodCol.findOne({ _id: objID });
  if (product){
    product._id = product._id.toString();
    return product;
  }
  throw `Error: Product not found with ${id}`;
};

const remove = async (id) => {
  if (!id){
    throw 'Error: id parameter not present';
  }
  if (typeof id !=='string' || id.trim().length=== 0) {
    throw 'Error: id has to be a non-empty string';
  }
  id = id.trim();
  if(ObjectId.isValid(id)==false){
    throw "Error: Invalid id";
  }
  const prodCol= await prod();
  let objID= new ObjectId(id);
  const product= await prodCol.deleteOne({ _id: objID });
  if (product.deletedCount === 0) {
    throw `Error: No product found with ${id}`;
  }
  return {deletedId: id};
};

const rename = async (id, newProductName) => {
  if (!id){
    throw 'Error: id parameter not present';
  }
  if (!newProductName){
    throw 'Error: newProductName parameter is not present';
  }
  if (typeof id !== 'string' || id.trim().length === 0) {
    throw 'Error: id must be a non-empty string';
  }
  if (typeof newProductName!=='string' || newProductName.trim().length=== 0) {
      throw 'Error: newProductName must be a non-empty string';
  }
  id= id.trim();
  newProductName=newProductName.trim();
  if(ObjectId.isValid(id)==false){
    throw "Error: Invalid id";
  }
  const prodCol = await prod();
  let objID= new ObjectId(id);
  const updated = await prodCol.updateOne(
    {_id: objID},
    {$set: {productName: newProductName}}
  );
  if (updated.matchedCount===0) {
      throw `Error: No product found with ${id}`;
  }
  if (updated.modifiedCount===0) {
      throw `Error: Product name was not updated`;
  }
  return await get(id);
};

export {create, getAll, get, remove, rename};
