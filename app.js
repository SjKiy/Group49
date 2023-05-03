import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import exphbs from 'express-handlebars';
import session from 'express-session';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// TESTING
import {create} from './data/apartment.js';
import {getAptbyId} from './data/apartment.js';
import {workCreate} from './data/workOrder.js';
import * as user from './data/user.js';
import * as payment from './data/payments.js';
import* as comments from './data/comments.js';
import { apartment } from './config/mongoCollections.js';
// async function main(){
//   let work2 = undefined;
//   let work3 = undefined;
    // let apt 
    // try{
    //     apt = await create("Apt 1", 1500, 16500, "2021-02-01", 800, 1,1, "Nice", true, [], [])
    //     console.log(apt);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // let apt2 
    // try{
    //     apt2 = await create("Apt 3", 1500, 16500, "2021-02-01", 800, 1,1, "Nice", true, [], [])
    //     console.log(apt2);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // let apt3 
    // try{
    //     apt3 = await create("Apt 4", 1500, 16500, "2021-02-01", 800, 1,1, "Nice", true, [], [])
    //     console.log(apt3);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     work3 = await workCreate("apt 8", "Plumbing", "Open", "Fix the sink", "2021-02-01", "2021-02-02");
    //     console.log(work3);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     // might have to return 
    //     const work = await comments.create("6452cd185f9c1f296252b60a", "64513be1813378a0fbab7edd", "Hehrrrey y", "05/03/2023");
    //     console.log(work);
    // }
    
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     // might have to return 
    //     const work = await comments.get("6452cd6038019c93beb1242e");
    //     console.log(work);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     // might have to return 
    //     const work = await comments.updatedComment("6452cd6038019c93beb1242e", "does it work");
    //     console.log(work);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     // might have to return 
    //     const work = await comments.remove("6452ae2a236452f083e5dc12");
    //     console.log(work);
    // }
    // catch(e){
    //     console.log(e);
    // }
    
    // try {
        // album1 = await album.create(band1._id, "Wiwsh You Were Here", "09/12/1975", ["Shine On You Crazy Diamond, Pts. 1-5", "Welcome to the Machine", "Have a Cigar (Ft. Roy Harper)", "Wish You Were Here", "Shine On You Crazy Diamond, Pts. 6-9"], 4.6)

    //     console.log(album1
    //     );
    // } catch (e) {
    //    console.error(e);
    // }


    
// try {
//     let user1 = await user.createUser("use", "adsjsaj", "test1@yahoo.com", "Horsepull748*%", "tenant",[apt._id])

//     console.log(user1);
//   } catch (e) {
//     console.error(e); 
//   }
    
// try {
//     let user1 = await user.remove("6452d5d6d9e4a81c2111cd58")

//     console.log(user1);
//   } catch (e) {
//     console.error(e); 
//   }
    
// try {
//     let user2 = await user.createUser("use", "adsjsaj", "test244@yahoo.com", "Horsepull748*%", "tenant")

//     console.log(user2);
//   } catch (e) {
//     console.error(e); 
//   }
    
// try {
//     let user4 = await user.createUser("uss", "adsjsaj", "testr@yahoo.com", "Horsepull748*%", "landlord")

//     console.log(user4);
//   } catch (e) {
//     console.error(e); 
//   }
// }
    
// try {
//     let user4 = await user.get("64513be1813378a0fbab7edd")

//     console.log(user4);
//   } catch (e) {
//     console.error(e); 
//   }
// }
// try {
//     let user5 = await getAptbyId("64513be1813378a0fbab7edc")

//     console.log(user5);
//   } catch (e) {
//     console.error(e); 
//   }
// try {
//     let user5 = await getAptbyId("645172065090eee151c3aa12")

//     console.log(user5);
//   } catch (e) {
//     console.error(e); 
//   }

// try {
//   let user5 = await user.assignAptToUser("645266a22b943bdcb7c1ad23","6452663d931c83c6400b94f8")

//   console.log(user5);
// } catch (e) {
//   console.error(e); 
// }

// try {
//   let user5 = await user.assignAptToUser("645171e465205244adf0baeb","645172065090eee151c3aa12")

//   console.log(user5);
// } catch (e) {
//   console.error(e); 
// }



// try {
//   let user4 = await user.getAllAptLandlord("uss", "adsjsaj", "test5@yahoo.com", "Horsepull748*%", "landlord",)

//   console.log(user4);
// } catch (e) {
//   console.error(e); 

// try {
//   let pay1 = await payment.createpayment("645266a22b943bdcb7c1ad23", "6452663d931c83c6400b94f8", 1500, "4532018264927139", "05/02/23")

//   console.log(pay1);
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let pay1 = await payment.get("64528b542ca1e7e2351b9d93")

//   console.log(pay1);
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let pay1 = await payment.getPaymentsByUser("645266a22b943bdcb7c1ad23")

//   console.log(pay1);
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let aptbyId = await user.getAptByUseriD("645266a22b943bdcb7c1ad23")

//   console.log(aptbyId);
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let aptbyId = await user.getAllAptLandlord("64513be1813378a0fbab7edd")

//   console.log(aptbyId);
// } catch (e) {
//   console.error(e); 
// }
// }

// main();


// SERVER SETUP
const staticDir = express.static(__dirname + '/public');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: false
  })
);

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});