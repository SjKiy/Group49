import { payments } from "../config/mongoCollections.js";
import { apartment } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import {user} from '../config/mongoCollections.js'

import * as users from "./user.js";
import * as apt from "./apartment.js";

//cardnum has to hash
export const createpayment = async (
    //should we change the the tenant id to the tenant name? and apartmentId id to apartmentId name?
    tenantId,
    apartmentId,
    paymentAmount,
    cardNum,
    date
  ) => {
    ///add the empty part. for all criteriassss!!!!!!!!!!!!!!!!!
    if (tenantId === undefined || tenantId === null || apartmentId === undefined || apartmentId === null || paymentAmount === undefined || paymentAmount === null || date === undefined || date === null || cardNum === undefined || cardNum === null){
      throw "Error: User field can't be undefined or null"
    }
    if (!tenantId || !apartmentId || !paymentAmount || !cardNum || !date ){
      throw "Error: Missing info in either tenant, apartmentId, paymentAmount, cardNum, date Please add";
    }
    if (typeof tenantId !== "string"){
      throw "Error: tenant  Must be a string.";
    }
    if (typeof apartmentId !== "string"){
      throw "Error: apartmentId  Must be a string.";
    }
    if (typeof paymentAmount !== "number"){
      throw "Error: paymentAmount Must be a number.";
    }
    if (typeof cardNum !== "number"){
      throw "Error: cardNum must be a number"
    }
    if (typeof date !==  "string"){
      throw "Error: date Must be a string.";
    }
   
    if (tenantId.trim === ' '){
      throw "Error: first name cannot be empty"
    }
    if (apartmentId.trim === ' '){
      throw "Error: Last name cannot be empty"
    }
    if (paymentAmount.trim === ' '){
      throw "Error: email address cannot be empty"
    }
    if (cardNum.trim === ' '){
        throw "Error: cardNum cannot be empty"
    }
    if (cardNum.length === 0){
        throw "Error: cardNum cannot be empty"
    }
    // if(cardNum.length !== 16){
    //     throw "Error: cardNum must be 16 digits"
    // }
    if (paymentAmount.length === 0){
        throw "Error: paymentAmount cannot be empty"
    }
    if (date.trim === ' '){
      throw "Error: datecannot be empty"
    }
  
    if (tenantId.replaceAll(" ", "") === ''){
      throw "Error: First name cannot be empty";
    }
    if (apartmentId.replaceAll(" ", "") === ''){
      throw "Error: Last name cannot be empty";
    }
    // if (paymentAmount.replaceAll(" ", "") === ''){
    //   throw "Error: email address cannot be empty";
    // }
    if (date.replaceAll(" ", "") === ''){
      throw "Error: date cannot be empty";
    }
    //add date regex here
  
   // add card validator here... could npm install card-validator
 

    tenantId = tenantId.trim();
    apartmentId = apartmentId.trim();
    // paymentAmount = paymentAmount.toLowerCase().trim();
    // password = password.trim();
    date = date.trim();
  
    let test = await users.get(tenantId);
    let APTS = await apt.getAptbyId(apartmentId);
    // if(!test){
    //     throw "Error: User not found with that id";
    //   }
    //   if(!apt){
    //     throw "Error: Apartment not found with that id";
    //   }
    //   let userCollected = await user();
    //   let aptCollected = await apartment();
    const payToCreate = {
        tenant : new ObjectId(test._id),
        apartmentId: new ObjectId(APTS._id),
        paymentAmount: paymentAmount,
        cardNum: cardNum,
        date: date
    }

    const paymentCollect = await payments();
    let insertPayInfo = await paymentCollect.insertOne(payToCreate);
    if (!insertPayInfo.acknowledged || !insertPayInfo.insertedId ){
      throw "Error: Payment was not able to be added";
    }
    const paymentId = insertPayInfo.insertedId.toString();
    // const USER =  await get(UserID);
    // const userACollected = await user();
  
    // return UserID;  
    return { insertedPay: true, paymentId: paymentId };
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
    const payCollected = await payments();
    const specficPay = await payCollected.findOne({_id: new ObjectId(id)});
    if(!specficPay){
      throw "Error: User not found with that id";
    }
    specficPay.tenant = specficPay.tenant.toString();
    specficPay.apartmentId = specficPay.apartmentId.toString();
    specficPay._id = specficPay._id.toString();
    return specficPay;
  };

//return all previous payments for a given UserId
export const getPaymentsByUser = async (id) => {
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

    const payCollected = await payments();
    const allPay = await payCollected.find({tenant: new ObjectId(id)}).toArray();
    if(!allPay){
      throw "Error: User not found with that id";
    }
    // allPay.tenant = allPay.tenant.toString();
    // allPay.apartmentId = allPay.apartmentId.toString();
    // allPay._id = allPay._id.toString();
    //should i return object ids or strings?

    return allPay;


    

//   return [100]
}