import { workOrder } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { isNUllOrUndefined } from "./dataHelper.js";

const workCreate = async (
    aptNumber,
    workType,
    workStatus,
    notes,
    comments,
    dateOpened,
    dateClosed,
) => {
    if (isNUllOrUndefined(aptNumber)) throw 'You must provide an apartment number';
    if (isNUllOrUndefined(workType)) throw 'You must provide a work type';
    if (isNUllOrUndefined(workStatus)) throw 'You must provide a work status';
    if (isNUllOrUndefined(notes)) throw 'You must provide notes';
    if (isNUllOrUndefined(comments)) throw 'You must provide a comment';
    if (isNUllOrUndefined(dateOpened)) throw 'You must provide a date opened';
    if (isNUllOrUndefined(dateClosed)) throw 'You must provide a date closed';
    workType = workType.trim();
    if(workType === "") throw 'You must provide a work type';
    if(workType.lenght > 26) throw 'Work type must be less than 100 characters';
    if(typeof workType !== 'string') throw 'Work type must be a string';
    workStatus = workStatus.trim();
    if(workStatus === "") throw 'You must provide a work status';
    if(workStatus.lenght > 26) throw 'Work status must be less than 100 characters';
    if(typeof workStatus !== 'string') throw 'Work status must be a string';
    aptNumber = aptNumber.trim();
    if(aptNumber === "") throw 'You must provide an apartment number';
    if(aptNumber.lenght > 26) throw 'Apartment number must be less than 26 characters';
    if(typeof aptNumber !== 'string') throw 'Apartment number must be a string';
    notes = notes.trim();
    if(notes === "") throw 'You must provide notes';
    if(notes.lenght > 100) throw 'Notes must be less than 1000 characters';
    if(typeof notes !== 'string') throw 'Notes must be a string';
    //if(Array.isArray(comments)) throw 'Comment must be a array';
    if(typeof dateOpened !== 'string') throw 'Date opened must be a string';
    if(typeof dateClosed !== 'string') throw 'Date closed must be a string';
    if(dateOpened === "") throw 'You must provide a date opened';
    if(dateClosed === "") throw 'You must provide a date closed';

    const workOrderCollection = await workOrder();

    let newWorkOrder = {
        aptNumber: aptNumber,
        workType: workType,
        workStatus: workStatus,
        notes: notes,
        comments: comments,
        dateOpened: dateOpened,
        dateClosed: dateClosed,
    };

    const insertInfo = await workOrderCollection.insertOne(newWorkOrder);
    if (insertInfo.insertedCount === 0) throw 'Could not add work order';

    const newId = insertInfo.insertedId;
    //const workOrder = await get(newId);
    return insertInfo;
};

export {workCreate};


    


