//This is literally my code from previous labs just updated so it doesn't have the odd names.

import pkg from 'mongodb';
const { ObjectId }= pkg;
import { products } from '../config/mongoCollections.js';

const create= async (
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
  if(!productName) {
    throw "Error: Product name parameter is not present";
  }
  if(!productDescription) {
    throw "Error: Product description parameter is not present";
  }
  if(!modelNumber) {
    throw "Error: Model number parameter is not present";
  }
  if(price === undefined) {
    throw "Error: Price parameter is not present";
  }
  if(!manufacturer) {
    throw "Error: Manufacturer parameter is not present";
  }
  if(!manufacturerWebsite) {
    throw "Error: Manufacturer website parameter is not present";
  }
  if(!keywords) {
    throw "Error: Keywords parameter is not present";
  }
  if(!categories) {
    throw "Error: Categories parameter is not present";
  }
  if(!dateReleased) {
    throw "Error: Date released parameter is not present";
  }
  if(discontinued === undefined) {
    throw "Error: Discontinued field parameter is not present";
  }

  if(typeof productName !== 'string' || productName.trim().length === 0) {
    throw "Error: Invalid or empty product name";
  }
  if(typeof productDescription !== 'string' || productDescription.trim().length === 0) {
    throw "Error: Invalid or empty product description";
  }
  if(typeof modelNumber !== 'string' || modelNumber.trim().length === 0) {
    throw "Error: Invalid or empty model number";
  }
  if(typeof manufacturer !== 'string' || manufacturer.trim().length === 0) {
    throw "Error: Invalid or empty manufacturer";
  }
  if(typeof manufacturerWebsite !== 'string' || manufacturerWebsite.trim().length === 0) {
    throw "Error: Invalid or empty manufacturer website";
  }
  if(typeof dateReleased !== 'string' || dateReleased.trim().length === 0) {
    throw "Error: Invalid or empty date released";
  }
  if(typeof price !== 'number') {
    throw "Error: Price must be a number";
  }
  if(price <= 0) {
    throw "Error: Price must be greater than 0.00";
  }
  if(!/^\d+(\.\d{0,2})?$/.test(price.toString())) {
    throw "Error: Two decimal places present";
  }

  if(!/^http:\/\/www\.[a-zA-Z0-9\-]{5,}\.com$/.test(manufacturerWebsite)) {
    throw "Error: Invalid URL format";
  }  
  if(Array.isArray(keywords)==false || keywords.length === 0) {
    throw "Error: Keywords parameter must be a non-empty array";
  }
  for (let x= 0; x < keywords.length; x++) {
    if(typeof keywords[x] !== 'string' || keywords[x].trim().length === 0) {
        throw "Error: Each keyword in array must be a non-empty string";
    }
  }
  if(Array.isArray(categories)==false || categories.length === 0) {
    throw "Error: Categories parameter must be a non-empty array";
  }
  for (let x= 0; x< categories.length; x++) {
    if(typeof categories[x] !== 'string' || categories[x].trim().length === 0) {
        throw "Error: Each category in array must be a non-empty string";
    }
  }
  if(!/^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(dateReleased)) {
    throw "Error: Invalid date format (MM/DD/YYYY)";
  }
  const parts= /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/.exec(dateReleased);
  const m= parseInt(parts[1], 10);
  const d= parseInt(parts[2], 10);
  const y= parseInt(parts[3], 10);

  const isLeap= (y%4===0);
  let daysInMonth= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if(isLeap==true){
    daysInMonth= [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  if(d > daysInMonth[m - 1]) {
    throw `Error: Invalid date, ${m}/${d}/${y} is not a valid date.`;
  }

  if(typeof discontinued !== 'boolean') {
    throw "Error: Discontinued parameter has to be a boolean type";
  }
  const productCollection= await products();
  let newProduct= {
    productName: productName,
    productDescription: productDescription,
    modelNumber: modelNumber,
    price: price,
    manufacturer: manufacturer,
    manufacturerWebsite: manufacturerWebsite,
    keywords: keywords,
    categories: categories,
    dateReleased: dateReleased,
    discontinued: discontinued,
    reviews: [],
    averageRating: 0
  };

  const insertInfo= await productCollection.insertOne(newProduct);
  if(insertInfo.insertedCount === 0) {
    throw 'Error: Could not add product';
  }

  return await get(insertInfo.insertedId.toString());
};

const getAll= async () => {
  const productCollection= await products();
  return await productCollection.find({}).toArray();
};

const get= async (productId) => {
  if(!ObjectId.isValid(productId)) {
    throw 'Error: Invalid product ID';
  }
  const productCollection= await products();
  const product= await productCollection.findOne({ _id: new ObjectId(productId) });
  if(!product) {
    throw 'Error: Product not found';
  }
  return product;
};

const remove= async (productId) => {
  if(!productId){
    throw 'Error: id parameter not present';
  }
  if(typeof productId !=='string' || productId.trim().length=== 0) {
    throw 'Error: id has to be a non-empty string';
  }
  productId= productId.trim();
  if(ObjectId.isValid(productId)==false){
    throw "Error: Invalid id";
  }
  const prodCol= await products();
  let objID= new ObjectId(productId);
  const product= await prodCol.deleteOne({ _id: objID });
  if(product.deletedCount === 0) {
    throw `Error: No product found with ${productId}`;
  }
  return { _id: productId, deleted: true };
};

const update= async (
  productId,
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
  if(!ObjectId.isValid(productId)) {
    throw 'Error: Invalid product ID';
  }

  const objId= new ObjectId(productId);

  if(!productName) {
    throw 'Error: Product name must be provided';
  }
  if(!productDescription) {
    throw 'Error: Product description must be provided';
  }
  if(!modelNumber) {
    throw 'Error: Model number must be provided';
  }
  if(price === undefined) {
    throw 'Error: Price must be provided';
  }
  if(!manufacturer) {
    throw 'Error: Manufacturer must be provided';
  }
  if(!manufacturerWebsite) {
    throw 'Error: Manufacturer website must be provided';
  }
  if(!keywords || !Array.isArray(keywords) || keywords.length === 0) {
    throw 'Error: Keywords must be a non-empty array';
  }
  if(!categories|| !Array.isArray(categories) ||categories.length === 0) {
    throw 'Error: Categories must be a non-empty array';
  }
  if(!dateReleased) {
    throw 'Error: Date released must be provided';
  }
  if(discontinued=== undefined) {
    throw 'Error: Discontinued status must be provided';
  }

  const productCollection= await products();
  const existingProduct= await productCollection.findOne({ _id: objId });
  if(!existingProduct){
    throw 'Error: Product not found';
  }

  let updatedProduct= {
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

  const updateInfo= await productCollection.updateOne(
    { _id: objId },
    { $set: updatedProduct }
  );

  if(!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw 'Error: Update failed';
  }
  return await get(objId.toString());
};


export { create, getAll, get, remove, update };
