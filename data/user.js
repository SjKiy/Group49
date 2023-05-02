//import mongo collections, bcrypt and implement the following data functions
import { ObjectId } from 'mongodb';
import { apartment } from '../config/mongoCollections.js';

import {user} from '../config/mongoCollections.js'
import bcrpytjs from "bcryptjs";
// import e from 'express';


export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  accountType
) => {
  ///add the empty part. for all criteriassss!!!!!!!!!!!!!!!!!
  if (firstName === undefined || firstName === null || lastName === undefined || lastName === null || emailAddress === undefined || emailAddress === null || password === undefined || password === null || accountType === undefined || accountType === null ){
    throw "Error: User field can't be undefined or null"
  }
  if (!firstName || !lastName || !emailAddress || !password || !accountType){
    throw "Error: Missing info in either firstName, lastName, emailAddress, password, accountType Please add";
  }
  if (typeof firstName !== "string"){
    throw "Error: First Name Must be a string.";

  }
  if (typeof lastName !== "string"){
    throw "Error: Last Name Must be a string.";
  }
  if (typeof emailAddress !== "string"){
    throw "Error: Email Must be a string.";
  }
  if (typeof password !== "string"){
    throw "Error: Password Must be a string.";
  }
  if (typeof accountType !== "string"){
    throw "Error: accountType Must be a string.";
  }

  if (firstName.trim === ' '){
    throw "Error: first name cannot be empty"
  }
  if (lastName.trim === ' '){
    throw "Error: Last name cannot be empty"
  }
  if (emailAddress.trim === ' '){
    throw "Error: email address cannot be empty"
  }
  if (password.trim === ' '){
    throw "Error: password cannot be empty"
  }
  if (accountType.trim === ' '){
    throw "Error: accountTypecannot be empty"
  }

  if (firstName.replaceAll(" ", "") === ''){
    throw "Error: First name cannot be empty";
  }
  if (lastName.replaceAll(" ", "") === ''){
    throw "Error: Last name cannot be empty";
  }
  if (emailAddress.replaceAll(" ", "") === ''){
    throw "Error: email address cannot be empty";
  }
  if (password.replaceAll(" ", "") === ''){
    throw "Error: Password cannot be empty";
  }
  if (accountType.replaceAll(" ", "") === ''){
    throw "Error: accountType cannot be empty";
  }


  if (firstName.trim().length < 2 || firstName.trim().length > 25){
    throw "Error: First Name has to have max of 25 characters.";

  }
  if (lastName.trim().length < 2 || lastName.trim().length > 25){
    throw "Error: Last Name has to have max of 25 characters.";

  }
  // let nameREg =/^[a-zA-Z]/;
  let firstSpace = /\s/;
  if (firstName.match(firstSpace)){
    throw "Error: First Name cannot have spaces in name";
  }
  let lastSpace = /\s/;
  if (lastName.match(lastSpace)){
    throw "Error: Last Name cannot have spaces in name";
  }
  let firstNum = /[0-9]/;
  if (firstName.match(firstNum)){
    throw "Error: First Name cannot have numbers in name";
  }
  let lastNum = /[0-9]/;
  if (lastName.match(lastNum)){
    throw "Error: Last Name cannot have numbers in name";
  }

  // if (!emailAddress.toLowerCase().includes(("@"))){
  //   throw "Error: Not valid email";
  //   //adjust this for all .coms, edu, etc

  // }
  //Provided from npm email-validate
  let emailReg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!emailAddress.match(emailReg)){
    throw "Error: Email is not valid.";
  }

  ///this using mongodb keyword comeback
  let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.match(passReg)){
    throw "Error: Password is minimum of 8 characters.  Needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character";
  }



  if (accountType.toLowerCase() !== "landlord" && accountType.toLowerCase() !== "tenant"){
    throw "Error: accountType can be either landlord or user.";
  }
 



  const saltRounds = await bcrpytjs.genSalt(16);
  let newHashPassword = await bcrpytjs.hash(password, saltRounds);

  firstName = firstName.trim();
  lastName = lastName.trim();
  emailAddress = emailAddress.toLowerCase().trim();
  password = password.trim();
  accountType = accountType.trim();

  const userToCreate = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: newHashPassword,
    // password: password,
    accountType: accountType.toLowerCase(),
    apartments: [],
  }
  let emailCheck = await user();
  let dupEmail = await emailCheck.findOne({emailAddress})
  if (dupEmail){
    throw "Error: Duplicate email."
  }
  
  const userCollected = await user();
  let insertUserInfo = await userCollected.insertOne(userToCreate);
  if (!insertUserInfo.acknowledged || !insertUserInfo.insertedId ){
    throw "Error: User was not able to be added";
  }
  const UserID = insertUserInfo.insertedId.toString();
  // const USER =  await get(UserID);
  // const userACollected = await user();

  // return UserID;

  return {insertedUser: true};


};

export const checkUser = async (emailAddress, password) => {

  if (emailAddress === undefined || emailAddress === null || password === undefined || password === null){
    throw "Error: User field can't be undefined or null"
  }
  if (!emailAddress || !password ){
    throw "Error: Missing info in either emailAddress, password Please add";
  }

  if (emailAddress.trim === ' '){
    throw "Error: email address cannot be empty"
  }
  if (password.trim === ' '){
    throw "Error: password cannot be empty"
  }
  
  if (typeof emailAddress !== "string"){
    throw "Error: Email Must be a string.";
  }
  if (typeof password !== "string"){
    throw "Error: Email Must be a string.";
  }

  if (emailAddress.replaceAll(" ", "") === ''){
    throw "Error: email address cannot be empty";
  }
  if (password.replaceAll(" ", "") === ''){
    throw "Error: Password cannot be empty";
  }

  // if (!emailAddress.toLowerCase().includes(("@"))){
  //   throw "Error: Not valid email";
  //   //adjust this for all .coms, edu, etc
  // }

  //Provided from npm email-validate
  let emailReg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!emailAddress.match(emailReg)){
    throw "Error: Email is not valid.";
  }


  ///this using mongodb keyword comeback
  let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.match(passReg)){
    throw "Error: Password is minimum of 8 characters.  Needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character";
  }


  // const saltRounds = await bcrpytjs.genSalt(16);
  // let newHashPassword = await bcrpytjs.hash(password, saltRounds);

  emailAddress = emailAddress.toLowerCase().trim();
  password = password.trim();
  
  // const userCreated = {
  //   firstName: firstName,
  //   lastName: lastName,
  //   emailAddress: emailAddress,
  //   password: newHashPassword,
  //   // password: password,
  //   accountType: accountType.toLowerCase()
  // }

  let queryEmail = await user();
  let Email = await queryEmail.findOne({emailAddress})
  if (!Email){
    throw "Either the email address or password is invalid.";
  }

  // const usersCollected = await user();

  let passwordComp = Email.password;
  passwordComp = await bcrpytjs.compare(password, passwordComp);
  if (!passwordComp){
    throw "Error: Either the email address or password is invalid";
  }
  else{
    //the passwords match your function will return the following fields of the user: firstName, lastName, emailAddress, accountType which will be stored in the session from the route, (DO NOT RETURN THE PASSWORD!!!!)
    let afterCheck = {_id: Email._id, firstName: Email.firstName, lastName: Email.lastName, emailAddress: Email.emailAddress, accountType: Email.accountType};
    return afterCheck;
  }



  // return [Email.firstName, Email.lastName, Email.emailAddress, Email.accountType];



};

export const getAptByUser = async (id) => {
  //returns apt object that is assigned to given tenant
  return {rentRemaining: 1000, rentDate: "Nov 12"}
};


