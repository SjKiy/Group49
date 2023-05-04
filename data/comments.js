import { ObjectId } from 'mongodb';
import { workOrder } from "../config/mongoCollections.js";
import {user} from '../config/mongoCollections.js'

import * as workOrders from "./workOrder.js";
import * as users from "./user.js";

export const create = async (
    workOrderId,
    userId,
    content,
    date,
  ) => {
    
    if (!userId){
        throw "Error: Id does not exist";
      }
      if (!workOrderId){
        throw "Error: Id does not exist";
      }
      if (typeof userId !== "string"){
        throw "Error: Id has to be a string";
      }
      if (typeof workOrderId !== "string"){
        throw "Error: Id has to be a string";
      }
      if (userId.trim === ' '){
        throw "Error: Id can be empty";
      }
      if (workOrderId.trim === ' '){
        throw "Error: Id can be empty";
      }
      if (userId.replaceAll(" ", "") === ''){
        throw "Error: Id cannot be empty";
      }
      if (workOrderId.replaceAll(" ", "") === ''){
        throw "Error: Id cannot be empty";
      }
      if (userId.length === ''){
        throw "Error: Id can't be empty";
      }
      if (workOrderId.length === ''){
        throw "Error: Id can't be empty";
      }
      for (let i = 0; i < userId.length; i++){
        if (!userId && typeof userId !== "string" ){
          throw "Error: Id must exist and be a string";
        }
      }
      for (let i = 0; i < workOrderId.length; i++){
        if (!workOrderId && typeof workOrderId !== "string" ){
          throw "Error: Id must exist and be a string";
        }
      }
      if (workOrderId === undefined || workOrderId === null || userId === undefined || userId === null || content === undefined || content === null || date === undefined || date === null){
        throw "Error: Comment fieldcan't be undefined or null"
      }
      if ( !workOrderId || !userId || !content || !date){
        throw "Error: Missing info in either userId, content, date Please add";
      }
      if (typeof content !== "string" || typeof date !== "string" ){
        throw "Error: content and release date has to be a string.";
      }
      if (content.trim === ' '){
        throw "Error: content can be empty"
      }
      if (date.trim === ' '){
        throw "Error: release date can be empty"
      }
      if (content.replaceAll(" ", "") === ''){
        throw "Error: Name cannot be empty";
      }
      if (date.replaceAll(" ", "") === ''){
        throw "Error: Website cannot be empty";
      }
    
    
      if (workOrderId.length === '' || userId.length === '' || content.length === '' || date.length === '' ){
        throw "Error: Requirments can't be empty";
      }
      
    
      if(date.length < 10){
        throw "Error: Date Format incorrect"
      }
      const dateFormat =  /^\d{2}\/\d{2}\/\d{4}$/;
      if (date.match(dateFormat) === null) {
        throw "Error: Date must be in MM/DD/YYYY format";
      }
      // const days = date.split("/").map(Number);
      // const month = date.split("/").map(Number);
      // const year = date.split("/").map(Number);
      const [month, day, year] = date.split("/").map(Number);
    
    
      if (year < 1900 || year > 2025 || month <= 0 || month > 12) {
        throw "Error: Not Correct date";
      }
      const dayMonth = new Date(year, month, 0).getDate();
      if (day <= 0 || day > dayMonth) {
        throw "Error: Not Correct date";
      }
    

      content = content.trim();
      date = date.trim();
      userId = userId.trim();
      if (!ObjectId.isValid(userId)){
        throw "Error: Invalid Object Id test";
      }
    
      const commentToCreate = {
        _id: new ObjectId(),
        workOrderId: workOrderId,
        userId: userId,
        content: content,
        date: date,
      };
      
      const workCollected = await workOrder();
      const userCollected = await user();
      
      // Check if the userId value is valid
      const existingUser = await userCollected.findOne({ _id: new ObjectId(userId) });
      
      if (!existingUser) {
        throw "Error: User not found";
      }
      
      const existingWork = await workCollected.findOne({ _id: new ObjectId(workOrderId) });
      
      if (!existingWork) {
        throw "Error: Work order not found";
      }
      
      let insertWorkInfo = await workCollected.updateOne(
        { _id: new ObjectId(workOrderId) },
        { $push: { comments: commentToCreate } }
      );
      
      if (!insertWorkInfo.acknowledged) {
        throw "Error: Comment was not able to be added";
      }
      
      commentToCreate._id = commentToCreate._id.toString();
      return commentToCreate;
      

  };


  export const get = async (commentId) => {
    if (!commentId){
      throw "Error: Id does not exist";
    }
    if (typeof commentId !== "string"){
      throw "Error: Id has to be a string";
    }
    if (commentId.trim === ' '){
      throw "Error: Id can be empty";
    }
    if (commentId.replaceAll(" ", "") === ''){
      throw "Error: Id cannot be empty";
    }
    if (commentId.length === ''){
      throw "Error: Id can't be empty";
    }
    for (let i = 0; i < commentId.length; i++){
      if (!commentId && typeof commentId !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    commentId = commentId.trim();
    if (!ObjectId.isValid(commentId)){
      throw "Error: Invalid Object Id testt huh";
    }
  
    const workCollected = await workOrder();
    const allOrders = await workCollected.findOne({ "comments._id": new ObjectId(commentId)});
  
    
      for (const workCom of allOrders.comments) {
        if (workCom._id.toString() === commentId) {
          workCom._id = workCom._id.toString();
          return workCom;
          //convert tostring done
        }
      }
  
  
  };

  export const remove = async (commentId) => {
    if (!commentId){
      throw "Error: Id does not exist";
    }
    if (typeof commentId !== "string"){
      throw "Error: Id has to be a string";
    }
    if (commentId.trim === ' '){
      throw "Error: Id can be empty";
    }
    if (commentId.replaceAll(" ", "") === ''){
      throw "Error: Id cannot be empty";
    }
    if (commentId.length === ''){
      throw "Error: Id can't be empty";
    }
    for (let i = 0; i < commentId.length; i++){
      if (!commentId && typeof commentId !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    commentId = commentId.trim();
    if (!ObjectId.isValid(commentId)){
      throw "Error: Invalid Object Id testt huh";
    }
  
    const workCollected = await workOrder();
    const allOrders = await workCollected.findOne({ "comments._id": new ObjectId(commentId)});
    //let allBands = await bandAlbums.findOne({ "albums._id": new ObjectId(albumId)});
    // console.log(allBands);
    let temp = allOrders._id;
    if(!allOrders){
      throw "Error: Comment was not found"
    }
  
    // const albumsCollected = await bands();
    let deleteCommentInfo = await workCollected.updateOne({"comments._id": new ObjectId(commentId)}, {$pull: {comments: {_id: new ObjectId(commentId)}}});
    if (!deleteCommentInfo.acknowledged){
      throw "Error: Comment was not able to be remove";
    }
      return {delete: true};

  };


  export const updatedComment = async (commentId, newContent) => {
    if (!commentId){
      throw "Error: Id does not exist";
    }
    if (typeof commentId !== "string"){
      throw "Error: Id has to be a string";
    }
    if (commentId.trim() === ' '){
      throw "Error: Id can be empty";
    }
    if (commentId.replaceAll(" ", "") === ''){
      throw "Error: Id cannot be empty";
    }
    if (commentId.length === ''){
      throw "Error: Id can't be empty";
    }
    for (let i = 0; i < commentId.length; i++){
      if (!commentId && typeof commentId !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    commentId = commentId.trim();
    if (!ObjectId.isValid(commentId)){
      throw "Error: Invalid Object Id";
    }
    if(!newContent){
      throw "Error: New Name was not provided"
    }
    if (typeof newContent !== "string"){
      throw "Error: New Name has to be a string";
    }
    if (newContent.trim() === ' '){
      throw "Error: New Name can be empty";
    }
    if (newContent.replaceAll(" ", "") === ''){
      throw "Error: New Name cannot be empty";
    }
    if (newContent.length === ''){
      throw "Error: New Name can't be empty";
    }
    for (let i = 0; i < newContent.length; i++){
      if (!newContent && typeof newContent !== "string" ){
        throw "Error: Id must exist and be a string";
      }
    }
    newContent = newContent.trim();
   
    const updatedComment = {
      content: newContent
    }
  
    const workCollected = await workOrder();
    const GetID = await get(commentId);
    if (GetID.content === newContent){
      throw "Error: New name cannot be the same as the current name"
    }
     const updateSpecficComment = await workCollected.findOneAndUpdate(
    //   {_id: new ObjectId(id)},
    //   {$set: updatedComment},
    //   {returnDocument: 'after'}
    // );
    { "comments._id": new ObjectId(commentId) },
    { $set: { "comments.$.content": newContent } },
    { returnDocument: "after" }
  );
  
    
    if (updateSpecficComment.lastErrorObject.n === 0) {
      throw "Error: Comment could not be update successfully";
    }
    updateSpecficComment.value._id = updateSpecficComment.value._id.toString();
    return updateSpecficComment.value;
  
  
  };