//need a create, find user, get user info
import { apartment } from '../config/mongoCollections.js';
import { payments } from '../config/mongoCollections.js';
import { getWorkById } from './workOrder.js';

 import * as pay from './payments.js';
import { get } from './payments.js';

import { ObjectId } from 'mongodb';
import { isNUllOrUndefined } from './dataHelper.js';
import { dateChecker } from './dataHelper.js';

//creates an apartment record in the database
const create = async ( 
    aptNumber,
    rentCost,
    rentRemaining,
    rentDate,
    size,
    bedNum,
    bathNum,
    description,
    isVacant,
    tenants,
    workOrders,
) => {
    //checking null for all inputs
    if (isNUllOrUndefined(aptNumber)) throw 'You must provide an apartment number';
    if (isNUllOrUndefined(rentCost)) throw 'You must provide a rent cost';
    if (isNUllOrUndefined(rentRemaining)) throw 'You must provide a rent remaining';
    if (isNUllOrUndefined(rentDate)) throw 'You must provide a rent due date';
    if (isNUllOrUndefined(size)) throw 'You must provide a size';
    if (isNUllOrUndefined(bedNum)) throw 'You must provide a number of beds';
    if (isNUllOrUndefined(bathNum)) throw 'You must provide a number of baths';
    if (isNUllOrUndefined(description)) throw 'You must provide a description';
    if (isNUllOrUndefined(isVacant)) throw 'You must provide a vacancy status';
    if (isNUllOrUndefined(tenants)) throw 'You must provide a list of tenants';
    if (isNUllOrUndefined(workOrders)) throw 'You must provide a list of work orders';
    // let split = rentDate.split('/');
    // if (split.length != 3) throw 'rentDate should be YYYY/MM/DDDD format'
    // if (parseInt(split[1]) > 12 || parseInt(split[1]) < 1) {
    //   throw 'Month of rentDate is invalid'
    // }
    // if (parseInt(split[2]) < 1 || parseInt(split[2]) > 31) {
    //   throw "Day of rentDate is invalid"
    // }
    // if (parseInt(split[0]) < 1) {
    //   throw "Year of rentDate is invalid"
    // }

    //error checking for aptNumber
    if (dateChecker(rentDate)) throw 'Rent due date must be a valid date';
    if(typeof aptNumber !== 'string') throw 'Apartment number must be a string';
    aptNumber = aptNumber.trim();
    if(aptNumber === "") throw 'You must provide an apartment number';
    if(aptNumber.length > 26) throw 'Apartment number must be less than 26 characters';
    //other then checking for nums should there be any other constaints?
    if(typeof rentCost !== 'number') throw 'Rent cost must be a number';
    if(typeof rentRemaining !== 'number') throw 'Rent remaining must be a number';
    if(typeof size !== 'number') throw 'Size must be a number';
    if(typeof bedNum !== 'number') throw 'Number of beds must be a number';
    if(typeof bathNum !== 'number') throw 'Number of baths must be a number';
    if(bedNum < 0) throw 'Number of beds must be positive';
    if(bathNum < 0) throw 'Number of baths must be positive';
    if(size < 0) throw 'Size must be positive';
    if(rentCost < 0) throw 'Rent cost must be positive';
    if(rentRemaining < 0) throw 'Rent remaining must be positive';
    //error checking for rentDate
    
    //add error checking number of beds and baths, size can't be negative
    //error checking for description
    if(typeof description !== 'string') throw 'Description must be a string';
    description = description.trim();
    if(description === "") throw 'You must provide a description';
    if(description.length > 100) throw 'Description must be less than 100 characters';
    //error checking for isVacant
    if(typeof isVacant !== 'boolean') throw 'Vacancy status must be a boolean';
    //error checking for tenants, for tentants and workorders should I check if they exist or no since the only way to update is on the user side
    if(!Array.isArray(tenants)) throw 'Tenants must be an array';
    if(!Array.isArray(workOrders)) throw 'Work orders must be an array';
    if(tenants.length > bedNum*2 ) throw 'Too many tenants for this apartment';

    


    const aptCollection = await apartment();

    let newApt = {
        aptNumber: aptNumber.toLowerCase(),
        rentCost: rentCost,
        rentRemaining: rentRemaining,
        rentDate: rentDate,
        size: size,
        bedNum: bedNum,
        bathNum: bathNum,
        description: description,
        isVacant: isVacant,
        tenants: tenants,
        workOrders: workOrders,

    };

    
    let aptNum = await apartment();
    let dupAptNum = await aptNum.findOne({aptNumber});

    if(dupAptNum){
      throw "Error: Dupilcate apartment number";
    }

    const insertInfo = await aptCollection.insertOne(newApt);
    if (insertInfo.insertedCount === 0) throw 'Could not add apartment';

    const newId = insertInfo.insertedId;
    let x = await getAptbyId(newId.toString());

    return x


};


const getActiveWorkOrders = async (aptId) => {
    //returns active work orders for given apt
    
    const apt = await getAptbyId(aptId);
    let res = []
    for (const w of apt.workOrders) {
      // const temp = await getWorkById(w._id.toString());
      const temp = await getWorkById(w._id);
      if (temp.workStatus === 'Open') res.push(temp);
    }
    return res;
    

}

const updateAptRentRemaining = async(paymentid) =>{
  
  if (!paymentid){
    throw "Error: Id huh not exist";
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

  const aptCollected = await apartment();
  // const paymentCollected = await payments();

  let specficPayment = await get(paymentid);
  if (!specficPayment){
    throw "Error: Payment not found";
  }
  let specficApt = await getAptbyId(specficPayment.apartmentId);
  if (!specficApt){
    throw "Error: Apartment not found";
  }
  let newRent = specficApt.rentRemaining - specficPayment.paymentAmount;
  
  const updateInfo = await aptCollected.updateOne({_id: new ObjectId(specficApt._id)}, {$set: {rentRemaining: newRent}});
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount){
    throw "Error: Update failed";
  }
  if (!updateInfo.acknowledged) {
    throw "Error: Rent remaining could not be updated";
  }

  return {update: true};



};

const getAptbyName = async (aptNumber) => {
  if (!aptNumber){
    throw "Error: Must Inlcude Apartment Number";
  }
  if (typeof aptNumber !== "string"){
    throw "Error: Apartment Number has to be a string";
  }
  aptNumber = aptNumber.trim();
  if (aptNumber === ' '){
    throw "Error: Apartment Number can be empty";
  }
  if (aptNumber.replaceAll(" ", "") === ''){
    throw "Error: Apartment Number cannot be empty";
  }
  if (aptNumber.length === ''){
    throw "Error: Apartment Number can't be empty";
  }
  for (let i = 0; i < aptNumber.length; i++){
    if (!aptNumber && typeof aptNumber !== "string" ){
      throw "Error: Apartment Number must exist and be a string";
    }
  }

  const aptCollected = await apartment();
  const specficApt = await aptCollected.findOne({aptNumber: aptNumber});
  if(!specficApt){
      throw "Error: Apartment not found with that id";
  }
  
  return specficApt;
};

const getAptbyId = async (aptId) => {
  
    if (!aptId){
      throw "Error: Id does not exist";
    }
    if (typeof aptId !== "string"){
      throw "Error: Id has to be a string";
    }
    if (aptId.trim() === ' '){
      throw "Error: Id can be empty";
    }
    if (aptId.replaceAll(" ", "") === ''){
      throw "Error: Id cannot be empty";
    }
    if (aptId.length === ''){
      throw "Error: Id can't be empty";
    }
    for (let i = 0; i < aptId.length; i++){
      if (!aptId && typeof aptId !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    aptId = aptId.trim();
    if (!ObjectId.isValid(aptId)){
      throw "Error: Invalid Object Id";
    }

    
    const aptCollected = await apartment();
    const specficApt = await aptCollected.findOne({_id: new ObjectId(aptId)});
    if(!specficApt){
      throw "Error: Apartment not found with that id";
    }
    specficApt._id = specficApt._id.toString();
    return specficApt;
    
  };





export { create, getActiveWorkOrders, getAptbyId, updateAptRentRemaining, getAptbyName}



