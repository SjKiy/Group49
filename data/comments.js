import { ObjectId } from 'mongodb';
import { workOrder } from "../config/mongoCollections.js";
import * as workOrders from "./workOrder.js";

export const create = async (
    userId,
    content,
    date,
  ) => {
    
    if (!userId){
        throw "Error: Id does not exist";
      }
      if (typeof userId !== "string"){
        throw "Error: Id has to be a string";
      }
      if (userId.trim === ' '){
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
      if (userId === undefined || userId === null || content === undefined || content === null || date === undefined || date === null){
        throw "Error: Comment fieldcan't be undefined or null"
      }
      if ( !userId || !content || !date){
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
    
    
      if (userId.length === '' || content.length === '' || date.length === '' ){
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
        _id: new ObjectId(),//object id
        userId: userId,
        content: content,
        date: date,
     
      }
      const workCollected = await workOrder();
      // const GetID = await get(id);
    
    //   const existingWork = await workCollected.findOne({ _id: new ObjectId(userId), "albums.title": title });
    const existingWork = await workCollected.findOne({ _id: new ObjectId(userId)});

      if (!existingWork) {
        throw "Error: Title already exists";// ALREADY have it
      }
      let insertWorkInfo = await workCollected.updateOne({_id: new ObjectId(userId)}, {$push: {comments: commentToCreate}});
      if (!insertWorkInfo.acknowledged){
        throw "Error: Comment was not able to be added";
      }

      commentToCreate._id = commentToCreate._id.toString();
      return commentToCreate;
    
    // };

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
  // export const getAll = async (commentId) => {
  //   if (!commentId){
  //     throw "Error: Id does not exist";
  //   }
  //   if (typeof commentId !== "string"){
  //     throw "Error: Id has to be a string";
  //   }
  //   if (commentId.trim === ' '){
  //     throw "Error: Id can be empty";
  //   }
  //   if (commentId.replaceAll(" ", "") === ''){
  //     throw "Error: Id cannot be empty";
  //   }
  //   if (commentId.length === ''){
  //     throw "Error: Id can't be empty";
  //   }
  //   for (let i = 0; i < commentId.length; i++){
  //     if (!commentId && typeof commentId !== "string" ){
  //       throw "Error: Id must exist and be a string";
  //     }
  //   }
  //   commentId = commentId.trim();
  //   if (!ObjectId.isValid(commentId)){
  //     throw "Error: Invalid Object Id tess";
  //   }
  //   // const AlbumsCollected = await bands();
  //   let commentsCollected = await band.get(commentId);
  //   // let numOfAlb = AlbumsCollected.albums.length;
  //   let commentList =  commentsCollected.comments;
  //   if(commentList.length === 0){
  //     return [];
  //   }
  //   // if(!AlbumsList){
  //   //   throw "Error: Was not able to capture all bands"
  //   // }
  // //   AlbumsList = AlbumsList.map((items) =>{ items._id = items._id.toString()
  // //   return items;
  // //   });
  // //   return AlbumsList;
  // // //// need to 
  // // };
  // commentList = commentList.map((comment) => {
  //   comment._id = comment._id.toString();
  //   return comment;
  //   });
  
  //   return commentList;
  // };

        // const AlbumID = insertAlbumInfo.toString();
      // const ALBUM =  await get(AlbumID);
    //   let bandAlbums = await band.get(bandId);
    //   let numOfAlb = bandAlbums.albums.length;
    //   // let numofrating = bandAlbums.albums.rating;
    //   let totalRating = 0;
    //   for (let i = 0; i < numOfAlb; i++){
    //     totalRating += bandAlbums.albums[i].rating;
    //   }
    //   let avg = totalRating/ numOfAlb;
     
    //   await albumsCollected.updateOne({ _id: new ObjectId(bandId) }, { $set: { overallRating:  Number(avg.toFixed(1)) } });
      // const AlbumID = insertAlbumInfo.toString();
      // const OverID = averageerate.toString();
      // const Over = await band.get(bandId.toString());///////come back to this 