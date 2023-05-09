import { workOrder } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { isNUllOrUndefined, dateChecker } from "./dataHelper.js";
import { apartment } from '../config/mongoCollections.js';
import * as apartments from './apartment.js';

export const workCreate = async (
    aptNumber,
    workType,
    notes
) => {
    if (isNUllOrUndefined(aptNumber)) throw 'You must provide an apartment number';
    if (isNUllOrUndefined(workType)) throw 'You must provide a work type';
    if (isNUllOrUndefined(notes)) throw 'You must provide notes';
    // if (isNUllOrUndefined(comments)) throw 'You must provide a comment';
    // if (isNUllOrUndefined(dateOpened)) throw 'You must provide a date opened';
    // if (isNUllOrUndefined(dateClosed)) throw 'You must provide a date closed';
    if(typeof workType !== 'string') throw 'Work type must be a string';
    workType = workType.trim();
    if(workType === "") throw 'You must provide a work type';
    if(workType.lenght > 26) throw 'Work type must be less than 100 characters';
    if(typeof aptNumber !== 'string') throw 'Apartment number must be a string';
    aptNumber = aptNumber.trim();
    if(aptNumber === "") throw 'You must provide an apartment number';
    if(aptNumber.lenght > 26) throw 'Apartment number must be less than 26 characters';
    if(typeof notes !== 'string') throw 'Notes must be a string';
    notes = notes.trim();
    if(notes === "") throw 'You must provide notes';
    if(notes.lenght > 100) throw 'Notes must be less than 1000 characters';
    // if(!Array.isArray(comments)) throw 'Comment must be a array';
    // if(typeof dateOpened !== 'string') throw 'Date opened must be a string';
    // if(typeof dateClosed !== 'string') throw 'Date closed must be a string';
    // if(dateOpened === "") throw 'You must provide a date opened';
    // if(dateClosed === "") throw 'You must provide a date closed';
    // dateChecker(dateOpened);
    // dateChecker(dateClosed);

    const workOrderCollection = await workOrder();

    let newWorkOrder = {
        aptNumber: aptNumber,
        workType: workType,
        workStatus: 'Open',
        notes: notes,
        comments: [],
        dateOpened: new Date().toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"}),
        dateClosed: "",
    };

    const insertInfo = await workOrderCollection.insertOne(newWorkOrder);
    if (insertInfo.insertedCount === 0) throw 'Could not add work order';
    //adding this workorder id to the aplist of its apartment
    const aptCollection = await apartment();
    const updateApt = await aptCollection.updateOne(
        {aptNumber: aptNumber},
        {$push: {workOrders: insertInfo.insertedId}}
    );
    console.log(updateApt)
    if (updateApt.modifiedCount === 0) {
        throw "Error: Could not update apartment successfully";
    }

    const newId = insertInfo.insertedId;
    const work = await getWorkById(newId.toString());
    return work;
};


 export const getWorkById = async (workId) => {
    if (!workId){
      throw "Error: Id does not exist";
    }
    if (typeof workId !== "string"){
      throw "Error: Id has to be a string";
    }
    if (workId.trim() === ' '){
      throw "Error: Id can be empty";
    }
    if (workId.replaceAll(" ", "") === ''){
      throw "Error: Id cannot be empty";
    }
    if (workId.length === ''){
      throw "Error: Id can't be empty";
    }
    for (let i = 0; i < workId.length; i++){
      if (!workId && typeof workId !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    workId = workId.trim();
    if (!ObjectId.isValid(workId)){
      throw "Error: Invalid Object Id";
    }
    const workCollected = await workOrder();
    const specficWork = await workCollected.findOne({_id: new ObjectId(workId)});
    if(!specficWork){
      throw "Error: Work not found with that id";
    }
    specficWork._id = specficWork._id.toString();
    return specficWork;
  };


 export const newNotes = async (workId, newNote) => {
    if (!workId){
      throw "Error: Id does not exist";
    }
    if (typeof workId !== "string"){
      throw "Error: Id has to be a string";
    }
    if (workId.trim === ' '){
      throw "Error: Id can be empty";
    }
    if (workId.replaceAll(" ", "") === ''){
      throw "Error: Id cannot be empty";
    }
    if (workId.length === ''){
      throw "Error: Id can't be empty";
    }
    for (let i = 0; i < workId.length; i++){
      if (!workId && typeof workId !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    workId = workId.trim();
    if (!ObjectId.isValid(workId)){
      throw "Error: Invalid Object Id";
    }
    if(!newNote){
      throw "Error: New Note was not provided"
    }
    if (typeof newNote !== "string"){
      throw "Error: New Note has to be a string";
    }
    if (newNote.trim === ' '){
      throw "Error: New Note can be empty";
    }
    if (newNote.replaceAll(" ", "") === ''){
      throw "Error: New Note cannot be empty";
    }
    if (newNote.length === ''){
      throw "Error: New Note can't be empty";
    }
    for (let i = 0; i < newNote.length; i++){
      if (!newNote && typeof newNote !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    newNote = newNote.trim();
   
    const updatedWork = {
      notes: newNote
    }
    const GetID = await getWorkById(workId);

    const workOrderCollection = await workOrder();
    
     const updateSpecficWo = await workOrderCollection.findOneAndUpdate(
      {_id: new ObjectId(workId)},
      {$set: updatedWork},
      {returnDocument: 'after'}
    );
  
    
    if (updateSpecficWo.lastErrorObject.n === 0) {
      throw "Error: Note could not be update successfully";
    }
    updateSpecficWo.value._id = updateSpecficWo.value._id.toString();
    return updateSpecficWo.value;
  
  
  };
export const updateProg = async (workId, newProg) => {
    if (!workId){
      throw "Error: Id does not exist";
    }
    if (typeof workId !== "string"){
      throw "Error: Id has to be a string";
    }
    if (workId.trim === ' '){
      throw "Error: Id can be empty";
    }
    if (workId.replaceAll(" ", "") === ''){
      throw "Error: Id cannot be empty";
    }
    if (workId.length === ''){
      throw "Error: Id can't be empty";
    }
    for (let i = 0; i < workId.length; i++){
      if (!workId && typeof workId !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    workId = workId.trim();
    if (!ObjectId.isValid(workId)){
      throw "Error: Invalid Object Id";
    }
    if(!newProg){
      throw "Error: New Name was not provided"
    }
    if (typeof newProg !== "string"){
      throw "Error: New Name has to be a string";
    }
    if (newProg.trim === ' '){
      throw "Error: New Name can be empty";
    }
    if (newProg.replaceAll(" ", "") === ''){
      throw "Error: New Name cannot be empty";
    }
    if (newProg.length === ''){
      throw "Error: New Name can't be empty";
    }
    for (let i = 0; i < newProg.length; i++){
      if (!newProg && typeof newProg !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    newProg = newProg.trim();
   
    const updatedWork = {
      workStatus: newProg
    }
    const GetID = await getWorkById(workId);

    const workOrderCollection = await workOrder();
     const updateSpecficWo = await workOrderCollection.findOneAndUpdate(
      {_id: new ObjectId(workId)},
      {$set: updatedWork},
      {returnDocument: 'after'}
    );
  
    
    if (updateSpecficWo.lastErrorObject.n === 0) {
      throw "Error: Note could not be update successfully";
    }
    updateSpecficWo.value._id = updateSpecficWo.value._id.toString();
    return updateSpecficWo.value;
  
  
  };

  export const closeWork = async (workId) => {
    if (!workId){
      throw "Error: Id does not exist";
    }
    if (typeof workId !== "string"){
      throw "Error: Id has to be a string";
    }
    if (workId.trim === ' '){
      throw "Error: Id can be empty";
    }
    if (workId.replaceAll(" ", "") === ''){
      throw "Error: Id cannot be empty";
    }
    if (workId.length === ''){
      throw "Error: Id can't be empty";
    }
    for (let i = 0; i < workId.length; i++){
      if (!workId && typeof workId !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    workId = workId.trim();
    if (!ObjectId.isValid(workId)){
      throw "Error: Invalid Object Id";
    }
    
    const updatedWork = {
      dateClosed: new Date().toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"})
    }
    const GetID = await getWorkById(workId);

    const workOrderCollection = await workOrder();
     const updateSpecficWo = await workOrderCollection.findOneAndUpdate(
      {_id: new ObjectId(workId)},
      {$set: updatedWork},
      {returnDocument: 'after'}
    );
  
    
    if (updateSpecficWo.lastErrorObject.n === 0) {
      throw "Error: Note could not be update successfully";
    }
    updateSpecficWo.value._id = updateSpecficWo.value._id.toString();
    return updateSpecficWo.value;
  
  
  };

  //getting a can not get workorder before initalization error when testing but logid seems sound
// export const getWorkOrderByAptNumber = async (aptNumber) => {
//     const workOrderCollection = await workOrder();
//     //find all the work orders for the given apptNUmber
//     const workOrder = await workOrderCollection.find({aptNumber: aptNumber}).toArray();

//     if(!workOrder){
//         throw "Error: Apartment not found with that id";
//     }
//     workOrder._id = workOrder._id.toString();
//     return workOrder;

// }

export const getWorkOrderByAptNumber = async (aptNumber) => {
    // add errror checking
    const workOrderCollection = await workOrder();
    const workOrders = await workOrderCollection.find({ aptNumber: aptNumber }).toArray();
  
    if (!workOrders || workOrders.length === 0) {
      throw "Error: No work orders found for apartment number";
    }
  
    return workOrders.map(workOrder => {
      workOrder._id = workOrder._id.toString();
      return workOrder;
    });
  };

export const getAllWork = async () => {
    const workOrderCollection = await workOrder();
    let workList = await workOrderCollection.find({}).toArray();
    if(workList.length === 0){
      return [];
    }
    if(!workList){
      throw "Error: Was not able to capture all payments"
    }
    workList = workList.map((items) =>{ items._id = items._id.toString();
    return items;
    });
    return workList;
  //// need to 
};
  
  
    // export {workCreate, getWorkById,  getWorkOrderByAptNumber, newNotes, updateProg};


    


