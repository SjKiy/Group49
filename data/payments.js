import { payments } from "../config/mongoCollections.js";
import { apartment } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import {user} from '../config/mongoCollections.js'

import * as users from "./user.js";

import * as apt from "./apartment.js";

export const getPaymentsByUser = async () => {
    return [100]
}


export const createpayment = async (
    //should we change the the tenant id to the tenant name? and apartmentId id to apartmentId name?
    tenantId,
    apartmentId,
    paymentAmount,
    date
  ) => {
    ///add the empty part. for all criteriassss!!!!!!!!!!!!!!!!!
    if (tenantId === undefined || tenantId === null || apartmentId === undefined || apartmentId === null || paymentAmount === undefined || paymentAmount === null || date === undefined || date === null){
      throw "Error: User field can't be undefined or null"
    }
    if (!tenantId || !apartmentId || !paymentAmount || !date ){
      throw "Error: Missing info in either tenant, apartmentId, paymentAmount, date Please add";
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
// export { getPaymentsByUser }