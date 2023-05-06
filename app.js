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
// import {workCreate, getWorkOrderByAptNumber, getWorkById, newNotes, updateProg} from './data/workOrder.js';
import * as workOrder from './data/workOrder.js';
import * as user from './data/user.js';
import * as payment from './data/payments.js';
import * as comments from './data/comments.js';
import * as apartments from './data/apartment.js';
import { apartment } from './config/mongoCollections.js';
// async function main(){
  // let work2 = undefined;
  // let work3 = undefined;
  //   let apt 
    // let x 
    // try{
    //     apt = await create("Apt 1", 1500, 16500, "01/05/2023", 800, 1,1, "Nice", true, [], [])
    //     console.log(apt);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     let work3 = await workOrder.workCreate("apt 3", "Shower", "Open", "Show has no force", "01/31/2023", "02/23/2023");
    //     console.log(work3);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     let work4 = await workOrder.workCreate("apt 4", "Sink", "Open", "Sink is leaking", "02/03/2023", "02/04/2023");
    //     console.log(work4);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     let work3 = await comments.create("6455618f07521ff395f4f40b", "6453b985104c1341a5c3d7a1", "This is Comment 2", "01/26/2023");
    //     console.log(work3);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     let work4 = await comments.create("645561d79cf1606193dc0d78", "645266a22b943bdcb7c1ad23", "This is Comment 2 ", "01/27/2023");
    //     console.log(work4);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     let work4 = await workOrder.getWorkOrderByAptNumber("APT 4");
    //     console.log(work4);
    // }
    // catch(e){
    //     console.log(e);
    // }


    // try{
    //     x = await getWorkById(work3._id);
    //     console.log(x);

    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     x = await workOrder.getWorkOrderByAptNumber("apt 1");
    //     console.log(x);

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
    //     // might have to return 
    //     const work = await comments.create("6452ae0d733a5ed3b53feafe", "Hehrrrey y", "05/03/2023");
    //     console.log(work);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     // might have to return 
    //     const work = await comments.get("6452aaf64fdf07c9e0fe3be4");
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
//   let user5 = await user.assignAptToUser("64546dd2c4a45e587364d96d","645029de9a30187bd522aa3b")

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
//   let pay1 = await payment.createpayment("64546dd2c4a45e587364d96d", "645029de9a30187bd522aa3b", 1500, "4532018264927139", "05/02/23")

//   console.log(pay1);
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let pay1 = await payment.get("64528ba6fcd05b1b690f027a")

//   console.log(pay1);
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let pay1 = await payment.getPaymentsByUser("645266a22b943bdcb7c1ad23")

//   console.log(pay1);
// } catch (e) {
//   console.error(e); 
// // }
// try {
//   let pay1 = await payment.getPaymentsByApt("6452663d931c83c6400b94f8")

//   console.log(pay1);
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let aptbyId = await user.getAptByUseriD("645266a22b943bdcb7c1ad23")

//   console.log(aptbyId);
// } catch (e) {
//   console.error(e); 
// // }
// try {
//   let aptbyId = await user.getAllAptLandlord("64540df0a3049a17bd764afb")

//   console.log(aptbyId);
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let aptbyId = await apartments.getAptbyId("6452663d931c83c6400b94f8")

//   console.log(aptbyId);
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let aptbyId = await payment.getAllPayments()

//   console.log(aptbyId);
//   console.log(aptbyId[0].tenant);
//   console.log(aptbyId[0].apartmentId);

// } catch (e) {
//   console.error(e); 
// }
// try {
//   let aptbyId = await workOrder.getAllWork()

//   // console.log(aptbyId);
//   console.log(aptbyId[4].comments[0]);
//   // console.log(aptbyId[0].apartmentId);

// } catch (e) {
//   console.error(e); 
// }
// try {
//   let aptbyId = await user.getAllAptLandlord("64540df0a3049a17bd764afb")

//   // console.log(aptbyId);
//   console.log(aptbyId[0].tenants[0]);
//   // console.log(aptbyId[4].comments[0]);
//   // console.log(aptbyId[0].apartmentId);

// } catch (e) {
//   console.error(e); 
// // }
// try {
//   let getAllAp = await user.getAllAptLandlord("64540df0a3049a17bd764afb");
//   let makeString = [getAllAp[0].tenants[0].toString()];
//   let updateApts = [];
//   let test = await user.get(makeString[0]);
//   let name = test.firstName + " " + test.lastName;
//   console.log(name);
//   console.log(makeString);

//   for (let i = 0; i < getAllAp.length; i++) {
//     let allTenants = [];
//     for (let j = 0; j < getAllAp[i].tenants.length; j++) {
//       let makeString = [getAllAp[i].tenants[j].toString()];
//       let userName = await user.get(makeString[j]);
//       let userNam = userName.firstName + " " + userName.lastName;
//       // console.log(userNam);
//       const newTotal = {
//         AptNum: getAllAp[i].aptNumber,
//         Rent: getAllAp[i].rentCost,
//         RentRemaining: getAllAp[i].rentRemaining,
//         RentDate: getAllAp[i].rentDate,
//         Size: getAllAp[i].size,
//         Beds: getAllAp[i].bedNum,
//         Baths: getAllAp[i].bathNum,
//         Description: getAllAp[i].description,
//         Vacancies: getAllAp[i].isVacant,
//         Tenants: userNam,
//         WorkOrders: getAllAp[i].workOrders,
//       };
//       allTenants.push(newTotal);
//       console.log(allTenants);
//     }
//   }
//fixed the get all apartments
// try {
//   let getAllAp = await user.getAllAptLandlord("64540df0a3049a17bd764afb");
//   let ten = [];
//   for (let i = 0; i < getAllAp.length; i++) {
//     let allTenants = [];

//     for (let j = 0; j < getAllAp[i].tenants.length; j++) {
//       let makeString = [getAllAp[i].tenants[j].toString()];
//       let userName = await user.get(makeString[j]);
//       let userNam = userName.firstName + " " + userName.lastName;
//       // console.log(userNam);
//       allTenants.push(userNam);
//     }
//       const newTotal = {
//         AptNum: getAllAp[i].aptNumber,
//         Rent: getAllAp[i].rentCost,
//         RentRemaining: getAllAp[i].rentRemaining,
//         RentDate: getAllAp[i].rentDate,
//         Size: getAllAp[i].size,
//         Beds: getAllAp[i].bedNum,
//         Baths: getAllAp[i].bathNum,
//         Description: getAllAp[i].description,
//         Vacancies: getAllAp[i].isVacant,
//         Tenants: allTenants,
//         WorkOrders: getAllAp[i].workOrders,
//       };
//       ten.push(newTotal);
//   // }
  
//   console.log(ten);

// }
  
// } catch (e) {
//   console.log(e);
  
// }
  // }
  //       for (let i = 0; i < getAllAp.length; i++) {
  //         let allTenants = [];
  //         for (let j = 0; j < getAllAp[i].tenants.length; j++) {
  //           let userName = await user.get(getAllAp[i].tenants[j].userId);
  //           let userNam = userName.firstName + " " + userName.lastName;
  //           console.log(getAllAp);
  //         }
  //       }
  // console.log(getAllAp);
        //     allTenants.push([userNam]);
        //   }
        // const updatedApts = {
        //   AptNum: getAllAp[i].aptNumber,
        //   Rent: getAllAp[i].rent,
        //   RentRemaining: getAllAp[i].rentRemaining,
        //   RentDate: getAllAp[i].rentDate,
        //   Size: getAllAp[i].size,
        //   Beds: getAllAp[i].bedNum,
        //   Baths: getAllAp[i].bathNum,
        //   Description: getAllAp[i].description,
        //   Vacancies: getAllAp[i].isVacant,
        //   Tenants: allTenants,
        //   WorkOrders: getAllAp[i].workOrders,
        // };
        // updateApts.push(updatedApts);
  
        // console.log(updateApts);
        // }
// } catch (e) {
//   console.error(e); 
// }
// try {
//   let getAllWork = await workOrder.getAllWork();
//   // let updateWork = [];
//   for (let i = 0; i < getAllWork.length; i++) {
//     // let allComments = [];
//     for (let j = 0; j < getAllWork[i].comments.length; j++) {
//       let userName = await user.get(getAllWork[i].comments[j].userId);
//       // let userNam = userName.firstName + " " + userName.lastName;
//       // allComments.push([userNam, getAllWork[i].comments[j].content]);
//       console.log(userName);
//     }



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

app.get('/', async (req, res, next) => {
    if(req,session.user && req.session.user.role == "tenant"){
        return res.redirect('/tenant');
    }
    if(req.session.user && req.session.user.role == "landlord"){
        return res.redirect('/landlord');
    }
    next()
    
    
    
});

app.use(async (req, res, next) => {
  let time = new Date().toUTCString();
  let requestMethod = req.method;
  let requestRoute = req.originalUrl;
  let userCheck = "Non-Authenticated User";
  if (req.session.user) {
      userCheck = "Authenticated User";
  }
  console.log(`[${time}]: ${requestMethod} ${requestRoute} (${userCheck})`);
  next();
});


app.get('/tenant', async (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    if(req.session.user && req.session.user.accountType == "landlord"){
        return res.redirect('/landlord');
    }
    next()

});

app.get('/landlord', async (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    if(req.session.user && req.session.user.accountType == "tenant"){
        return res.redirect('/tenant');
    }
    next()

});

app.get('/register', async (req, res, next) => {
    if(req.session.user){
        return res.redirect('/login');
    }
    next()
});

app.get('/pay', async (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    if(req.session.user && req.session.user.accountType == "landlord"){
        return res.redirect('/landlord');
    }
    next()
});

app.get('/login', async (req, res, next) => {
    if(req.session.user){   
        if(req.session.user.accountType == "tenant"){
            return res.redirect('/tenant');
        }
        if(req.session.user.accountType == "landlord"){
            return res.redirect('/landlord');
        }
    }
    next()
});

app.get('/myapt', async (req, res, next) => {
  if(!req.session.user){
      return res.redirect('/login');
  }
  if (req.session.user && req.session.user.accountType == "landlord"){
    return res.redirect('/landlord')
  }
  next()
});

app.get('/submitworkorder', async (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next()
});

app.get('/workorders', async (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next()
});

app.get('/payments', async (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next()
});

app.get('/logout', async (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next()
});
app.get('/', (req, res, next) => {
  if (!req.session.user) {
      return res.status(403).redirect('/login');
  }
  if (req.session.user.role == "landlord") {
      return res.redirect('/landlord');
  }
  if (req.session.user.role == "tenant") {
      return res.redirect('/tenant');
  }
  console.log("dkkk")

  next();
});



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
