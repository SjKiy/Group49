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
import { apartment } from './config/mongoCollections.js';
// async function main(){
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
    //     apt3 = await create("Apt 3", 1500, 16500, "2021-02-01", 800, 1,1, "Nice", true, [], [])
    //     console.log(apt3);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     const work = await workCreate("apt 1", "Plumbing", "Open", "Fix the sink", ["hi"], "2021-02-01", "2021-02-02");
    //     console.log(work);
    // }
    // catch(e){
    //     console.log(e);
    // }


    
// try {
//     let user1 = await user.createUser("use", "adsjsaj", "test1@yahoo.com", "Horsepull748*%", "tenant",[apt._id])

//     console.log(user1);
//   } catch (e) {
//     console.error(e); 
//   }
    
// try {
//     let user2 = await user.createUser("use", "adsjsaj", "test2@yahoo.com", "Horsepull748*%", "tenant")

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
//   let user5 = await user.assignAptToUser("64513be1813378a0fbab7edd","64513be1813378a0fbab7edc")

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
//   let pay1 = await payment.createpayment("64513be1813378a0fbab7edd", "6451769ef9e4a9b3311d09fc", 1500, "05/02/23",)

//   console.log(pay1);
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