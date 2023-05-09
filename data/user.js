//import mongo collections, bcrypt and implement the following data functions
import { ObjectId } from 'mongodb';
import { apartment } from '../config/mongoCollections.js';

import {user} from '../config/mongoCollections.js'
import bcrpytjs from "bcryptjs";
import { getAptbyId } from './apartment.js';
import { getAptbyName } from './apartment.js';
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
    throw "Error: accountType can be either landlord or tenant.";
  }
 



  // const saltRounds = await bcrpytjs.genSalt(16);
  //change 5
  const saltRounds = await bcrpytjs.genSalt(5);
  let newHashPassword = await bcrpytjs.hash(password, saltRounds);

  firstName = firstName.trim();
  lastName = lastName.trim();
  emailAddress = emailAddress.toLowerCase().trim();
  password = password.trim();
  accountType = accountType.trim();

  const userToCreate = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress.toLowerCase(),
    password: newHashPassword,
    // password: password,
    accountType: accountType.toLowerCase(),
    apartments: []
    // apartments: [] i took this out for now cause the update one process in the end
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

  ///return UserID;


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
    let afterCheck = {_id: Email._id.toString(), firstName: Email.firstName, lastName: Email.lastName, emailAddress: Email.emailAddress, accountType: Email.accountType};
    return afterCheck;
  }

};

export const get = async (id) => {
  if (!id){
    throw "Error: Id does not exist";
  }
  if (typeof id !== "string"){
    throw "Error: Id has to be a string";
  }
  if (id.trim() === ' '){
    throw "Error: Id can be empty";
  }
  if (id.replaceAll(" ", "") === ''){
    throw "Error: Id cannot be empty";
  }
  if (id.length === ''){
    throw "Error: Id can't be empty";
  }
  for (let i = 0; i < id.length; i++){
    if (!id && typeof id !== "string" ){
      throw "Error: Id must exist and be a string";
    }
  }
  id = id.trim();
  if (!ObjectId.isValid(id)){
    throw "Error: Invalid Object Id";
  }
  const userCollected = await user();
  const specficUser = await userCollected.findOne({_id: new ObjectId(id)});
  if(!specficUser){
    throw "Error: User not found with that id";
  }
  specficUser._id = specficUser._id.toString();
  return specficUser;
};

export const assignAptToUser = async (id, aptId ) => {
  //returns apt object that is assigned to given tenant
  if (!id){
    throw "Error: Id does not exist";
  }
  if (!aptId){
    throw "Error: Id does not exist";
  }
  if (typeof id !== "string"){
    throw "Error: Id has to be a string";
  }
  if (typeof aptId !== "string"){
    throw "Error: Id has to be a string";
  }
  if (id.trim() === ' '){
    throw "Error: Id can be empty";
  }
    if (aptId.trim() === ' '){
    throw "Error: Id can be empty";
  }
  if (id.replaceAll(" ", "") === ''){
    throw "Error: Id cannot be empty";
  }
  if (aptId.replaceAll(" ", "") === ''){
    throw "Error: Id cannot be empty";
  }
  if (id.length === ''){
    throw "Error: Id can't be empty";
  }
  if (aptId.length === ''){
    throw "Error: Id can't be empty";
  }
  for (let i = 0; i < id.length; i++){
    if (!id && typeof id !== "string" ){
      throw "Error: Id must exist and be a string";
    }
  }
  for (let i = 0; i < aptId.length; i++){
    if (!aptId && typeof aptId !== "string" ){
      throw "Error: Id must exist and be a string";
    }
  }
  id = id.trim();
  aptId = aptId.trim();
  if (!ObjectId.isValid(id)){
    throw "Error: Invalid Object Id";
  }
  if (!ObjectId.isValid(aptId)){
    throw "Error: Invalid Apt Object Id";
  }
  const getUser = await get(id);
  const getApt = await getAptbyId(aptId);

  if(!getUser){
    throw "Error: User not found with that id";
  }
  if(!getApt){
    throw "Error: Apartment not found with that id";
  }

  let userCollected = await user();
  let aptCollected = await apartment();
  const updateUser = await userCollected.updateOne(
    { _id: new ObjectId(id) },
    { $addToSet: { apartments: new ObjectId(aptId) } } 
  );

  const updateApartment = await aptCollected.updateOne(
    { _id: new ObjectId(aptId) },
    { $addToSet: { tenants: new ObjectId(id).toString() } }
  );

  if (updateUser.modifiedCount === 0 || updateApartment.modifiedCount === 0) {
    throw "Error: Could not assign the apartment to the user";
  }
  // console.log(updateUser.modifiedCount)
  return {insertedUser: true};
};




export const getAptByUseriD = async (id) => {
  if (!id){
    throw "Error: Id does not exist";
  }
  if (typeof id !== "string"){
    throw "Error: Id has to be a string";
  }
  if (id.trim() === ' '){
    throw "Error: Id can be empty";
  }
  if (id.replaceAll(" ", "") === ''){
    throw "Error: Id cannot be empty";
  }
  if (id.length === ''){
    throw "Error: Id can't be empty";
  }
  for (let i = 0; i < id.length; i++){
    if (!id && typeof id !== "string" ){
      throw "Error: Id must exist and be a string";
    }
  }
  id = id.trim();
  if (!ObjectId.isValid(id)){
    throw "Error: Invalid Object Id";
  }

  let user = await get(id);
  if (!user){
    throw "Error: User does not exist";
  }
  let apartmentId = user.apartments;
  if (!apartmentId || apartmentId.length === 0){
    throw "Error: User does not have an apartment";
    //return [];
  }

  let AptID = apartmentId.map((id) => new ObjectId(id));

  let aptCollected = await apartment();
  let userApartments = await aptCollected.find({ _id: { $in: AptID } }).toArray();
  if (!userApartments){
    throw "Error: Apartment does not exist";
  }
  for (let i = 0; i < userApartments.length; i++){
    userApartments[i]._id = userApartments[i]._id.toString();
    // userApartments[i].tenants = userApartments[i].tenants.toString();
    //come back does it matter if the array of tenant is showing new object id instead of string.
  }

  return userApartments;
  // aptCollected._id.toString();
  // for (let i = 0; i < aptCollected.tenants.length; i++){
  //   userApartments[i]._id.toString();
  // }
  // return userApartments;
  // let aptInfo = await aptCollected.findOne({_id: new ObjectId(aptId)});
  // if (!aptInfo){
  //   throw "Error: Apartment does not exist";
  // }
  // return aptInfo;


  // let userTenant = await user();
  // let userTenantInfo = await userTenant.findOne({_id: new ObjectId(id)});
  // if (!userTenantInfo){
  //   throw "Error: User does not exist";
  // }
  // let aptId = userTenantInfo.apartments;
  // let aptCollected = await apartment();
  // let aptInfo = await aptCollected.findOne({_id: new ObjectId(aptId)});
  // if (!aptInfo){
  //   throw "Error: Apartment does not exist";
  // }
  // return aptInfo;


  // return {rentRemaining: 1000, rentDate: "Nov 12"}
};

//come back to this the landlord Apt is not showing up
export const getAllAptLandlord = async (id) => {
  if (!id){
    throw "Error: Id does not exist";
  }
  if (typeof id !== "string"){
    throw "Error: Id has to be a string";
  }
  if (id.trim() === ' '){
    throw "Error: Id can be empty";
  }
  if (id.replaceAll(" ", "") === ''){
    throw "Error: Id cannot be empty";
  }
  if (id.length === ''){
    throw "Error: Id can't be empty";
  }
  for (let i = 0; i < id.length; i++){
    if (!id && typeof id !== "string" ){
      throw "Error: Id must exist and be a string";
    }
  }
  
  id = id.trim();
  if (!ObjectId.isValid(id)){
    throw "Error: Invalid Object Id";
  }

  let userLandlord = await user();
  let userLandlordInfo = await userLandlord.findOne({_id: new ObjectId(id)});
  if (!userLandlordInfo){   
    throw "Error: User does not exist";
  }
  if (userLandlordInfo.accountType !== "landlord"){
    throw "Error: This is only for landlords";
  }
  const apartmentCollected = await apartment();
  // const landlordApartmentIds = userLandlord.apartments;
  // const landlordApartments = await apartmentCollected.find({_id: {$in: landlordApartmentIds}});

  // return landlordApartments;

  let aptList = await apartmentCollected.find({}).toArray();
  if(aptList.length === 0){
    return [];
  }
  if(!aptList){
    throw "Error: Was not able to capture all apartments";
  }
  aptList = aptList.map((items) =>{ items._id = items._id.toString()
  return items;
  });
  return aptList;

};

export const remove = async (id) => {
  if (!id){
    throw "Error: Id does not exist";
  }
  if (typeof id !== "string"){
    throw "Error: Id has to be a string";
  }
  if (id.trim() === ' '){
    throw "Error: Id can be empty";
  }
  if (id.replaceAll(" ", "") === ''){
    throw "Error: Id cannot be empty";
  }
  if (id.length === ''){
    throw "Error: Id can't be empty";
  }
  for (let i = 0; i < id.length; i++){
    if (!id && typeof id !== "string" ){
      throw "Error: Id must exist and be a string";
    }
  }
  id = id.trim();
  if (!ObjectId.isValid(id)){
    throw "Error: Invalid Object Id";
  }
  const userCollected = await user();
  const deleteSpecficUser = await userCollected.findOneAndDelete({_id: new ObjectId(id)});
  // deleteSpecficBand._id = deleteSpecficBand._id.toString();

  if(!deleteSpecficUser){
    throw "Error: User not found with that id";
  }
  if (deleteSpecficUser.lastErrorObject.n === 0) {
    throw `Error: The deletion of user not successful.`;
  }

  return {delete: true}

};

export const getUserbyEmail = async (email) => {
  if (!email){
    throw "Error: Must Inlcude Email";
  }
  if (typeof email !== "string"){
    throw "Error: Email has to be a string";
  }
  email = email.trim();
  if (email === ' '){
    throw "Error: Email can be empty";
  }
  if (email.replaceAll(" ", "") === ''){
    throw "Error: Email cannot be empty";
  }
  if (email.length === ''){
    throw "Error: Email can't be empty";
  }
  for (let i = 0; i < email.length; i++){
    if (!email && typeof email !== "string" ){
      throw "Error: Email must exist and be a string";
    }
  }

  const userCollected = await user();
  const specficEmail = await userCollected.findOne({emailAddress: email});
  if(!specficEmail){
      throw "Error: Email not found with that id";
  }
  
  return specficEmail;
};




export const assignApt = async (email, aptNum ) => {
  //returns apt object that is assigned to given tenant
  if (!email){
    throw "Error: Email does not exist";
  }
  if (!aptNum){
    throw "Error: Id does not exist";
  }
  if (typeof aptNum !== "string"){
    throw "Error: Id has to be a string";
  }
  if (typeof email !== "string"){
    throw "Error: Email has to be a string";
  }
  if (email.trim() === ' '){
    throw "Error: Email can be empty";
  }
  if (aptNum.trim() === ' '){
    throw "Error: Id can be empty";
  }

  if (email.replaceAll(" ", "") === ''){
    throw "Error: Email cannot be empty";
  }
  if (aptNum.replaceAll(" ", "") === ''){
    throw "Error: Id cannot be empty";
  }

  if (email.length === ''){
    throw "Error: Email can't be empty";
  }
  if (aptNum.length === ''){
    throw "Error: Id can't be empty";
  }

  for (let i = 0; i < email.length; i++){
    if (!email && typeof email !== "string" ){
      throw "Error: Email must exist and be a string";
    }
  }
  for (let i = 0; i < aptNum.length; i++){
    if (!aptNum && typeof aptNum !== "string" ){
      throw "Error: Id must exist and be a string";
    }
  }
  aptNum = aptNum.trim();
  email = email.trim();

  const getUser = await getUserbyEmail(email);
  const getApt = await getAptbyName(aptNum);

  if(!getUser){
    throw "Error: Email not found with that id";
  }
  if (getUser.emailAddress !== email){
    throw "Error: Email does not match";
  }
  if (getUser.apartments.length !== 0) throw 'Error: This user already has an apartment';
  if(!getApt){
    throw "Error: Apartment not found with that id";
  }

  let userCollected = await user();
  let aptCollected = await apartment();
  const updateUser = await userCollected.updateOne(
    { _id: new ObjectId(getUser._id) },
    { $addToSet: { apartments: new ObjectId(getApt._id) } } 
  );

  const updateApartment = await aptCollected.updateOne(
    { _id: new ObjectId(getApt._id) },
    { $addToSet: { tenants: new ObjectId(getUser._id).toString() } }
  );

  if (updateUser.modifiedCount === 0 || updateApartment.modifiedCount === 0) {
    throw "Error: Could not assign the apartment to the user";
  }
  // console.log(updateUser.modifiedCount)
  return {insertedUser: true};
};



export const getAllTenantLandlord = async (id) => {
  if (!id){
    throw "Error: Id does not exist";
  }
  if (typeof id !== "string"){
    throw "Error: Id has to be a string";
  }
  if (id.trim() === ' '){
    throw "Error: Id can be empty";
  }
  if (id.replaceAll(" ", "") === ''){
    throw "Error: Id cannot be empty";
  }
  if (id.length === ''){
    throw "Error: Id can't be empty";
  }
  for (let i = 0; i < id.length; i++){
    if (!id && typeof id !== "string" ){
      throw "Error: Id must exist and be a string";
    }
  }
  
  id = id.trim();
  if (!ObjectId.isValid(id)){
    throw "Error: Invalid Object Id";
  }

  let userLandlord = await user();
  let userLandlordInfo = await userLandlord.findOne({_id: new ObjectId(id)});
  if (!userLandlordInfo){   
    throw "Error: User does not exist";
  }
  if (userLandlordInfo.accountType !== "landlord"){
    throw "Error: This is only for landlords";
  }
  const userCollected = await user();
  let tenantList = await userCollected.find({accountType: "tenant"}).toArray();
  if(tenantList.length === 0){
    return [];
  }
  if(!tenantList){
    throw "Error: Was not able to capture all apartments";
  }
  tenantList = tenantList.map((items) =>({
    firstName: items.firstName.toString(),
    lastName: items.lastName.toString(),
    email: items.emailAddress.toString(),

    }));
  return tenantList;
  // return {tenantListfirstName}

};


export const createUserSeed = async (
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
    throw "Error: accountType can be either landlord or tenant.";
  }
 



  // const saltRounds = await bcrpytjs.genSalt(16);
  //change 5
  const saltRounds = await bcrpytjs.genSalt(5);
  let newHashPassword = await bcrpytjs.hash(password, saltRounds);

  firstName = firstName.trim();
  lastName = lastName.trim();
  emailAddress = emailAddress.toLowerCase().trim();
  password = password.trim();
  accountType = accountType.trim();

  const userToCreate = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress.toLowerCase(),
    password: newHashPassword,
    // password: password,
    accountType: accountType.toLowerCase(),
    apartments: []
    // apartments: [] i took this out for now cause the update one process in the end
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

  return UserID;




};