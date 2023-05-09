import {dbConnection, closeConnection} from "./config/mongoConnection.js"

import * as workOrder from './data/workOrder.js';
import * as user from './data/user.js';
import * as payment from './data/payments.js';
import * as comments from './data/comments.js';
import * as apartments from './data/apartment.js';
import { mongoConfig } from './config/settings.js';


async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    ///landlord
    try {
    const Landlord = await user.createUserSeed(
        "Patrick",
        "Hill", 
        "PatrickHill@Stevens.edu", 
        "1MyPass123!",
         "landlord");

    ///tenant 1
    const Tenant1 = await user.createUserSeed(
        "Isabelle",
        "First", 
        "IsabelleFirst@stevens.edu", 
        "2MyPass123!",
        "tenant");


    ///tenant 2
    const Tenant2 = await user.createUserSeed(
        "Micheal",
         "Second", 
          "MichealSecond@stevens.edu", 
          "3MyPass123!",
          "tenant");

    ///tenant3
    const Tenant3 = await user.createUserSeed(
        "Tyler",
         "Third", 
          "TylerThird@stevens.edu", 
        "4MyPass123!",
        "tenant");
    
      const Tenant4 = await user.createUserSeed(
        "Jerry",
         "Shoe", 
          "JerryShoe@stevens.edu", 
          "5MyPass123!",
          "tenant");
    ///apartment 1
    const apartment1 = await apartments.createSeed(
        "Apt 1",
        1500, 
        16500, 
        "05/20/2023",
        800, 
        1,
        1, 
        "Nice apartment with nice view", 
        false, 
        [],
        []);
  
    ///apartment2
    const apartment2 = await apartments.createSeed(
        "Apt 2", 
        2200, 
        18000, 
         "05/23/2023", 
        1000, 
        2,
        2, 
        "Apartment with lots of room", 
        false, 
        [], 
        []);

    ///apartment 3
     const apartment3 = await apartments.createSeed(
        "Apt 3", 
        2500, 
        20000, 
        "05/21/2023", 
        1400, 
        3,
        3, 
        "Huge apartment with 3 bathrooms and 3 beds", 
        false, 
        [], 
         []);


         const apartment4 = await apartments.createSeed(
          "Apt 4", 
          3000, 
          24000, 
          "05/29/2023", 
          1600, 
          4,
          4, 
          "Luxury Aparment", 
          false, 
          [], 
           []);

         
    ///assign apartment1 to Tenant1
     const assign1 = await user.assignAptToUser(
        Tenant1, 
        apartment1);

    ///assign apartment2 to Tenant2
    const assign2 = await user.assignAptToUser(
        Tenant2, 
        apartment2);

    ///assign apartment2 to Tenant2
    const assign3 = await user.assignAptToUser(
        Tenant3, 
        apartment3);

    ///work order for apartment 1
    const WorkOrder1 = await workOrder.workCreateSeed(
        "apt 1",
        "Bathroom", 
        "Bathroom toilet is broken")

    ///work order for apartment 2
     const WorkOrder2 = await workOrder.workCreateSeed(
        "apt 2",
        "Kitchen", 
        "Water leaking into kitchen")
    
    ///work order for apartment 2
    const WorkOrder3 = await workOrder.workCreateSeed(
        "apt 3",
        "Kitchen", 
        "Dishwasher is broken")

    ///payment from tenant1 of apartment1
   const Payment1 = await payment.createpayment(
    Tenant1,
    apartment1,
    1500,
    "4532018264927139"
  );

    ///payment from tenant2 of apartment2
  const Payment2 = await payment.createpayment(
    Tenant2,
    apartment2,
    2200,
    "2394853954927931"
  );

    ///payment from tenant3 of apartment3
  const Payment3 = await payment.createpayment(
    Tenant3,
    apartment3,
    3000,
    "9325843954927297"
  );
  
    ///comment from tenant1 on workorder
  const comment1 = await comments.create(
    WorkOrder1,
    Tenant1,
    "Is anyone gonna come fix this? the toilet is still broken",
    "05/10/2023"
  )

    ///comment from tenant2 on workorder
  const comment2 = await comments.create(
    WorkOrder2,
    Tenant2,
    "Bruh it is still leaking",
    "05/11/2023"
  )

    ///comment from tenant3 on workorder
  const comment3 = await comments.create(
    WorkOrder3,
    Tenant3,
    "How long is it gonna take? ",
    "05/20/2023"
  )

    }
    catch (e){
        console.log(e)
    }

  
 ///await db.dropDatabase();


    console.log('Seed File has been processed');

    await closeConnection();

     }

  

main();