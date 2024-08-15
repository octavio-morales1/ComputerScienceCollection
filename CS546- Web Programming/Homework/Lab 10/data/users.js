//import mongo collections, bcrypt and implement the following data functions

import * as mongo from "../config/mongoCollections.js";
import bcrypt from "bcryptjs";


const usersCollection = await mongo.users();
export const registerUser = async (
  firstName,
  lastName,
  username,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  if (!firstName) {
    throw 'First name must be provided.';
  }
  if (!lastName) {
    throw 'Last name must be provided.';
  }
  if (!username) {
    throw 'Username must be provided.';
  }
  if (!password) {
    throw 'Password must be provided.';
  }
  if (!favoriteQuote) {
    throw 'Favorite quote must be provided.';
  }
  if (!themePreference) {
    throw 'Theme preference must be provided.';
  }
  if (!role) {
    throw 'Role must be provided.';
  }
  if (!/^[a-zA-Z]{2,25}$/.test(firstName)) {
    throw 'First name must only contain letters and be between 2 and 25 characters long.';
  }
  if (!/^[a-zA-Z]{2,25}$/.test(lastName)) {
    throw 'Last name must only contain letters and be between 2 and 25 characters long.';
  }
  if (!/^[a-zA-Z]{5,10}$/.test(username)) {
    throw 'Username is not 5-10 characters long.';
  }
  if (favoriteQuote.length < 20) {
    throw 'Favorite quote must be at least 20 characters long.';
  }
  if (favoriteQuote.length > 255) {
      throw 'Favorite quote must not exceed 255 characters.';
  }
  if (!themePreference) {
    throw 'Theme preference must be provided.';
  }
  else {
    const pref=themePreference.toLowerCase();
    if (pref!== 'light' && pref!== 'dark') {
      throw 'Theme preference must be either light or dark.';
    }
  }
  if (!role) {
    throw 'Role must be provided.';
  }
  else {
    const rle = role.toLowerCase();
    if (rle!== 'admin' && rle!== 'user') {
      throw 'Role must be either admin or user.';
    }
  }
  const pp = /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-z])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!pp.test(password)) {
    throw 'Password does not meet requirements: 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.';
  }

  const sameU = await usersCollection.findOne({ username: username.toLowerCase() });
  if (sameU) {
    throw "This username has already been take. Please choose another username";
  }
  const hP= await bcrypt.hash(password, 10);
  const temp= {
    firstName,
    lastName,
    username: username.toLowerCase(),
    password: hP,
    favoriteQuote,
    themePreference: themePreference.toLowerCase(),
    role: role.toLowerCase(),
  };

  const res= await usersCollection.insertOne(temp);
  if (!res.insertedId) {
    return { signupCompleted: false };
  }

  return { signupCompleted: true };
};

export const loginUser = async (username, password) => {
  if (!username) {
    throw 'Username is required.';
  }
  if (!password) {
    throw 'Password is required.';
  }
  if (username.length < 5 || username.length > 20) {
    throw 'Username must be between 5 and 20 characters.';
  }
  const pp = /^(?=.*[@$!%*?&])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!pp.test(password)) {
    throw 'Password does not meet requirements: 8 characters long and include at least a uppercase letter, a lowercase letter, a digit, and a special character.';
  }
  const user = await usersCollection.findOne({ username: username.toLowerCase() });
  if (!user) {
    throw "User not found.";
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw "Incorrect Password.";
  }
  return { 
    firstName: user.firstName, 
    lastName: user.lastName, 
    username: user.username, 
    favoriteQuote: user.favoriteQuote, 
    themePreference: user.themePreference, 
    role: user.role 
  };
};
