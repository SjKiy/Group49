import { payments } from "../config/mongoCollections.js";
import { apartment } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import {user} from '../config/mongoCollections.js'
import bcrpytjs from "bcryptjs";

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
    if (typeof cardNum !== "string"){
      throw "Error: cardNum must be a string"
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
 
   const saltRounds = await bcrpytjs.genSalt(5);
   let newHashCC = await bcrpytjs.hash(cardNum, saltRounds);

    tenantId = tenantId.trim();
    apartmentId = apartmentId.trim();
    // paymentAmount = paymentAmount.toLowerCase().trim();
    // password = password.trim();
    date = date.trim();
  
    let test = await users.get(tenantId);
    let APTS = await apt.getAptbyId(apartmentId);

    const payToCreate = {
        tenant : new ObjectId(test._id),
        apartmentId: new ObjectId(APTS._id),
        paymentAmount: paymentAmount,
        cardNum: newHashCC,
        // cardNum: cardNum,
        date: date
    }

    const paymentCollect = await payments();
    let insertPayInfo = await paymentCollect.insertOne(payToCreate);
    if (!insertPayInfo.acknowledged || !insertPayInfo.insertedId ){
      throw "Error: Payment was not able to be added";
    }
    const paymentId = insertPayInfo.insertedId.toString();

    return { insertedPay: true, paymentId: paymentId };
};



export const get = async (paymentid) => {
    if (!paymentid){
      throw "Error: Id does not exist";
    }
    if (typeof paymentid !== "string"){
      throw "Error: Id has to be a string";
    }
    if (paymentid.trim() === ' '){
      throw "Error: Id can be empty";
    }
    if (paymentid.replaceAll(" ", "") === ''){
      throw "Error: Id cannot be empty";
    }
    if (paymentid.length === ''){
      throw "Error: Id can't be empty";
    }
    for (let i = 0; i < paymentid.length; i++){
      if (!paymentid && typeof paymentid !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    paymentid = paymentid.trim();
    if (!ObjectId.isValid(paymentid)){
      throw "Error: Invalid Object Id";
    }
    const payCollected = await payments();
    const specficPay = await payCollected.findOne({_id: new ObjectId(paymentid)});
    if(!specficPay){
      throw "Error: User not found with that id";
    }
    specficPay.tenant = specficPay.tenant.toString();
    specficPay.apartmentId = specficPay.apartmentId.toString();
    specficPay._id = specficPay._id.toString();
    return specficPay;
  };

//return all previous payments for a given UserId
export const getPaymentsByUser = async (userId) => {
    if (!userId){
        throw "Error: Id does not exist";
    }
    if (typeof userId !== "string"){
        throw "Error: Id has to be a string";
    }
    if (userId.trim() === ' '){
        throw "Error: Id can be empty";
    }
    if (userId.replaceAll(" ", "") === ''){
        throw "Error: Id cannot be empty";
    }
    if (userId.length === ''){
        throw "Error: Id can't be empty";
    }
    for (let i = 0; i < userId.length; i++){
        if (!userId && typeof userId !== "string" ){
          throw "Error: Id must exist and be a string";
        }
    }
    userId = userId.trim();
    if (!ObjectId.isValid(userId)){
        throw "Error: Invalid Object Id";
    }

    const payCollected = await payments();
    const allPay = await payCollected.find({tenant: new ObjectId(userId)}).toArray();
    if(!allPay){
      throw "Error: User not found with that id";
    }
    // allPay.tenant = allPay.tenant.toString();
    // allPay.apartmentId = allPay.apartmentId.toString();
    // allPay._id = allPay._id.toString();
    //should i return object ids or strings?

    return allPay;

  };
export const getAllPayments = async () => {
    const paymentsCollected = await payments();
    let paymentList = await paymentsCollected.find({}).toArray();
    if(paymentList.length === 0){
      return [];
    }
    if(!paymentList){
      throw "Error: Was not able to capture all payments"
    }
    paymentList = paymentList.map((items) =>{ items._id = items._id.toString()
    return items;
    });
    return paymentList;
  //// need to 
  };

    

//   return [100]