// This data file should export all functions using the ES6 standard as shown in the lecture code
//This is literally my code from previous labs just updated so it doesn't have the odd names. Well specifically for reviews this was painful. I want to sleep.

import { ObjectId } from 'mongodb';
import { products } from '../config/mongoCollections.js';

const createReview= async (productId, title, reviewerName, review, rating) => {
  if(!productId) {
    throw 'Error: Product ID must be provided';
  }
  if(!title) {
    throw 'Error: Title must be provided';
  }
  if(!reviewerName) {
    throw 'Error: Reviewer name must be provided';
  }
  if(!review) {
    throw 'Error: Review must be provided';
  }
  if(rating=== undefined) {
    throw 'Error: Rating must be provided';
  }

  if(typeof productId!== 'string' || !ObjectId.isValid(productId)) {
    throw 'Error: Invalid product ID';
  }
  if(typeof title!== 'string' || title.trim()=== '') {
    throw 'Error: Invalid title';
  }
  if(typeof reviewerName!== 'string' || reviewerName.trim()=== '') {
    throw 'Error: Invalid reviewer name';
  }
  if(typeof review!== 'string' || review.trim()=== '') {
    throw 'Error: Invalid review';
  }
  if(typeof rating!== 'number' || rating < 1|| rating > 5) {
    throw 'Error: Invalid rating';
  }

  const productCollection= await products();
  const product= await productCollection.findOne({ _id: new ObjectId(productId) });
  if(!product) {
    throw 'Error: No product with that ID';
  }

  const newReview= {
    _id: new ObjectId(),
    title: title.trim(),
    reviewDate: new Date().toLocaleDateString('en-US'), //painful to learn this :(
    reviewerName: reviewerName.trim(),
    review: review.trim(),
    rating,
  };

  const updateInfo= await productCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $push: { reviews: newReview } }
  );

  if(!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw 'Error: Update failed';
  }

  return newReview;
};


const getAllReviews= async (productId) => {
  if(!productId) {
    throw 'Error: Product ID must be provided';
  }
  if(typeof productId !== 'string' || !ObjectId.isValid(productId)) {
    throw 'Error: Invalid product ID';
  }
  const productCollection= await products();
  const product= await productCollection.findOne({ _id: new ObjectId(productId) }, { projection: { reviews: 1 } });
  if(!product) {
    throw 'Error: No product with that ID';
  }
  return product.reviews;
};

const getReview= async (reviewId) => {
  if(!reviewId) {
    throw 'Error: Review ID must be provided';
  }
  if(typeof reviewId !== 'string' || !ObjectId.isValid(reviewId)) {
    throw 'Error: Invalid review ID';
  }

  const productCollection= await products();
  const product= await productCollection.findOne({ 'reviews._id': new ObjectId(reviewId) }, { projection: { reviews: { $elemMatch: { _id: new ObjectId(reviewId) } } } });
  if(!product || !product.reviews || !product.reviews.length) {
    throw 'Error: No review with that ID';
  }

  return product.reviews[0];
};

const updateReview= async (reviewId, updateObject) => {
  if(!reviewId) {
    throw 'Error: Review ID must be provided';
  }
  if(typeof reviewId !== 'string' || !ObjectId.isValid(reviewId)) {
    throw 'Error: Invalid review ID';
  }
  const productCollection= await products();
  const updateData= {};
  if(updateObject.title) {
    if(typeof updateObject.title !== 'string' || updateObject.title.trim() === '') {
      throw 'Error: Invalid title';
    }
    //also painful to learn but it helps so much for the future
    updateData['reviews.$.title']= updateObject.title.trim();
  }

  if(updateObject.reviewerName) {
    if(typeof updateObject.reviewerName !== 'string' || updateObject.reviewerName.trim() === '') {
      throw 'Error: Invalid reviewer name';
    }
    updateData['reviews.$.reviewerName']= updateObject.reviewerName.trim();
  }

  if(updateObject.review) {
    if(typeof updateObject.review !== 'string' || updateObject.review.trim() === '') {
      throw 'Error: Invalid review';
    }
    updateData['reviews.$.review']= updateObject.review.trim();
  }

  if(updateObject.rating !== undefined) {
    if(typeof updateObject.rating !== 'number' || updateObject.rating < 1 || updateObject.rating > 5 || Math.floor(updateObject.rating * 10) !== updateObject.rating * 10) {
      throw 'Error: Invalid rating';
    }
    updateData['reviews.$.rating']= updateObject.rating;
  }

  if(Object.keys(updateData).length === 0) {
    throw 'Error: No fields to update';
  }

  updateData['reviews.$.reviewDate']= new Date().toLocaleDateString('en-US');

  const updateInfo= await productCollection.updateOne(
    { 'reviews._id': new ObjectId(reviewId) },
    { $set: updateData }
  );

  if(!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw 'Error: Update failed';
  }

  const updatedProduct= await productCollection.findOne({ 'reviews._id': new ObjectId(reviewId) });
  return updatedProduct;
};

const removeReview= async (reviewId) => {
  if(!reviewId) {
    throw 'Error: Review ID must be provided';
  }

  if(!ObjectId.isValid(reviewId)) {
    throw 'Error: Invalid review ID';
  }

  const productCollection= await products();
  const product= await productCollection.findOne({ 'reviews._id': new ObjectId(reviewId) });
  if(!product) {
    throw 'Error: Product not found';
  }
  const updateInfo= await productCollection.updateOne(
    { _id: product._id },
    { $pull: { reviews: { _id: new ObjectId(reviewId) } } }
  );

  if(!updateInfo.matchedCount && !updateInfo.modifiedCount) {
    throw 'Error: Update failed';
  }
  const updatedProduct= await productCollection.findOne({ _id: product._id });
  if(!updatedProduct) {
    throw 'Error: Product not found after update';
  }
  return updatedProduct;
};

export { createReview, getAllReviews, getReview, updateReview, removeReview };

