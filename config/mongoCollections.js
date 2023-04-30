import { dbConnection } from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

// Note: You will need to change the code below to have the collection required by the assignment!
export const user = getCollectionFn('user');
export const apartment = getCollectionFn('apartment');
export const workOrder = getCollectionFn('workOrder');
export const payments = getCollectionFn('payments');
