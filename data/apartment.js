//need a create, find user, get user info
import { apartment } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { isNUllOrUndefined } from './dataHelper.js';

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
    aptNumber = aptNumber.trim();
    description = description.trim();
    


    const aptCollection = await apartment();

    let newApt = {
        aptNumber: aptNumber,
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
    const insertInfo = await aptCollection.insertOne(newApt);
    if (insertInfo.insertedCount === 0) throw 'Could not add apartment';

    const newId = insertInfo.insertedId;

    return insertInfo

};

const getActiveWorkOrders = async (id) => {
    //returns active work orders for given apt
    return 69
}



export { create, getActiveWorkOrders}