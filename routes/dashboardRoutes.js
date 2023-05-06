import {Router} from 'express';
import EmailValidator from 'email-validator';
import { createUser, getAptByUseriD, checkUser } from '../data/user.js';
import { getPaymentsByUser } from '../data/payments.js';
import { create, getActiveWorkOrders } from '../data/apartment.js';
import { isNUllOrUndefined } from '../data/dataHelper.js';
import { dateChecker } from '../data/dataHelper.js';
import * as user from '../data/user.js';
import * as payment from '../data/payments.js';
import * as apartment from '../data/apartment.js';
import * as comments from '../data/comments.js';
import * as workOrder from '../data/workOrder.js';

const router = Router();


//get home page
router.route('/').get(async (req, res) => {
    //TODO
});

// registration page get and post
router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    return res.status(200).render('register', {title: "Register"});
  })
  .post(async (req, res) => {
    //code here for POST
    let missing = []
    let {firstNameInput, lastNameInput, emailAddressInput, passwordInput, confirmPasswordInput, roleInput} = req.body;
    if (!firstNameInput) missing.push('Missing First Name');
    if (!lastNameInput) missing.push('Missing Last Name');
    if (!emailAddressInput) missing.push('Missing Email Address');
    if (!passwordInput) missing.push('Missing Password');
    if (!confirmPasswordInput) missing.push('Missing Password Confirmation');
    if (!roleInput) missing.push('Missing Role');
    if (missing.length >= 1) {
      let err = '';
      for (const m of missing) {
        err += m + ', '
      }
      err = err.substring(0, err.length - 2);
      return res.status(400).render('register', {title: 'Register', error: true, info: err});
    }
    const firstName = firstNameInput.trim();
    const lastName = lastNameInput.trim();
    const emailAddress = emailAddressInput.trim().toLowerCase();
    const password = passwordInput.trim();
    const confirmPassword = confirmPasswordInput.trim();
    let err = [];
    if (firstName.length < 2 || firstName.length >25) err.push("First name must be between 2 and 25 chars");
    if (lastName.length < 2 || lastName.length >25) err.push("Last name must be between 2 and 25 chars");
    if (/\s/.test(firstName)) err.push("First name should not contain spaces");
    if (/\d/.test(firstName)) err.push("First name should not contain numbers");  
    if (/\s/.test(lastName)) err.push("Last name should not contain spaces");
    if (/\d/.test(lastName)) err.push("Last name should not contain numbers");
    if (!EmailValidator.validate(emailAddress)) err.push("Invalid email address format");
    if (/\s/.test(password)) err.push("Password should not contain spaces");
    if (password.length < 8) err.push("Password must be at least 8 characters long");
    if (!/[A-Z]/.test(password)) err.push("Password must contain at least one uppercase letter");
    if (!/\d/.test(password)) err.push("Password must contain at least one digit");
    if (!/[\W_]/.test(password)) err.push("Password must contain at least one special character");
    if (confirmPassword !== password) err.push("Passwords must match");
    if (roleInput !== 'tenant' && roleInput !== 'landlord') err.push("Role must be 'tenant' or 'landlord'");
    if (err.length >= 1) {
      let str = "";
      for (const m of err) {
        str += m + ", ";
      }
      str = str.substring(0, str.length - 2);
      return res.status(400).render('register', {title: 'Register', error: true, info: err});
    }

    // IMPLEMENT WITH USER DATA CREATEUSER
    try {
      const added = await createUser(firstName,lastName,emailAddress,password,roleInput);
      if (added.insertedUser) {return res.status(200).redirect('/login')}
      else return res.status(500).render('error', {info: "Internal Server Error"});
    } catch (error) {
      return res.status(400).render('register', {title: 'Register', error: true, info: error});
    }
  });

// login page get and post
router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    return res.status(200).render('login', {title: 'Login'});
  })
  .post(async (req, res) => {
    //code here for POST
    let err='';
    let {emailAddressInput, passwordInput} = req.body;
    if (!emailAddressInput || !passwordInput) {
      return res.status(400).render('login', {title: 'Login', error: true, info: "Email or Password not provided"});
    }
    const email = emailAddressInput.trim().toLowerCase();
    const password = passwordInput.trim();
    if (!EmailValidator.validate(email)) err += "Invalid Email";
    if (/\s/.test(password)) err += "Invalid Password";
    else if (password.length < 8) err += "Invalid Password";
    else if (!/[A-Z]/.test(password)) err += "Invalid Password";
    else if (!/\d/.test(password)) err += "Invalid Password";
    else if (!/[\W_]/.test(password)) err += "Invalid Password";
    if (err) return res.status(400).render('login', {title: 'Login', error: true, info: err});
    
    // IMPLEMENT WITH USER DATA CHECKUSER
    try {
      const checked = await checkUser(email, password);
      req.session.user= {_id: checked._id, firstName: checked.firstName, lastName: checked.lastName, emailAddress: checked.emailAddress, accountType: checked.accountType}
      if (checked.accountType === 'tenant') return res.status(200).redirect('/tenant');
      if (checked.accountType === 'landlord') return res.status(200).redirect('/landlord');
    } catch (error) {
      return res.status(400).render('login', {title: 'Login', error: true, info: error});
    }
  });

//goes to tenant dashboard
router.route('/tenant').get(async (req, res) => {
  //TODO fix when session is set up
  try {
    const apt = await getAptByUseriD(req.session.user._id)
    const active = await getActiveWorkOrders(apt[0]._id)
    const pastPays = await getPaymentsByUser(req.session.user._id)
    return res.status(200).render('tenant', {title: 'Tenant Dashboard', today: new Date().toLocaleDateString(), rentDue: apt[0].rentRemaining, rentDate: apt[0].rentDate, numWorkOrders: active.length, payment1: (pastPays[0] ? pastPays[0] : 'None'), payment2: (pastPays[1] ? pastPays[1] : '')});
  } catch (error) {
    return res.status(400).render('error', {title: "Error Page", info: error})
  }
    
});

//Payment page get(go to page) put(submit update to rent);
router
    .route('/pay')
    .get(async (req, res) => {
        //TODO
      const apt = await getAptByUseriD(req.session.user._id)
      const amount = apt[0].rentRemaining
      const rent = apt[0].rentCost
      return res.status(200).render('pay', {title: "Payment Portal", amount: amount, rent: rent});
    })
    .post(async (req, res) => {
        //adds to payment collection and subtracts from apt rent due.
        //redirects to /payments
    }
);

router.route('/myapt').get(async (req, res) => {
  //returns info on tenant's apt
  const apt = await getAptByUseriD(req.session.user._id)
  return res.status(200).render('myapt', {title: "My Apartment", apt: apt[0]})
});

//goes to submit work order page
router
  .route('/submitworkorder')
  .get(async (req, res) => {
    //TODO
    //render submission page
  })
  .post(async (req, res) => {
    //TODO
    //add to work order collection and update apartment that work order is for
    //redirects to /workorders
  });

//goes to all work order page
router.route('/workorders').get(async (req, res) => {
    //TODO
    //gets all work orders for current user's apt
    //if current user is landlord: gets all work orders (open,complete,inprog)
    //renders page
    if (req.session.user.accountType === 'landlord') {
      let getAllWork = await workOrder.getAllWork();
      let updateWork = [];
      for (let i = 0; i < getAllWork.length; i++) {
        let allComments = [];
        for (let j = 0; j < getAllWork[i].comments.length; j++) {
          let userName = await user.get(getAllWork[i].comments[j].userId);
          let userNam = userName.firstName + " " + userName.lastName;
          allComments.push([userNam, 
            getAllWork[i].comments[j].content, 
            getAllWork[i].comments[j].date]);
        }
      const updatedWorkOrder = {
        AptNum: getAllWork[i].aptNumber,
        workType: getAllWork[i].workType,
        workStatus: getAllWork[i].workStatus,
        notes: getAllWork[i].notes,
        comments: allComments,
        dateOpened: getAllWork[i].dateOpened,
        dateClosed: getAllWork[i].dateClosed,
      };
      updateWork.push(updatedWorkOrder);

    }
    let aptPaySearch = req.query.aptNum;
    // console.log(aptPaySearch);
    if(aptPaySearch){
      updateWork = updateWork.filter((apt) => apt.AptNum.toLowerCase() === aptPaySearch.toLowerCase());
    }
    return res.status(200).render('workorder', {title: 'View All Work Orders', work: updateWork});
  }

  })
  .put(async (req, res) => {
    //TODO
    //only for landlord: updates workorder collection, to add notes and such
    //renders workorders
  })

;

router.route('/editWorkOrders').get(async (req, res) => {
  //code here for GET
  return res.status(200).render('editWorkOrders', {title: 'Edit Work Orders', none: false});
})
.put(async (req, res) => {
  //code here for PUT
});






//goes to previous payment page
router.route('/payments').get(async (req, res) => {
    //TODO
    //gets all previous payments for current user
    //renders page
    console.log(req.session.user.accountType)
    if (req.session.user.accountType === 'landlord') {
      let getAllPay = await payment.getAllPayments();
      let allss = [];
  
      for (let i = 0; i < getAllPay.length; i++) {
          let apt = await apartment.getAptbyId(getAllPay[i].apartmentId);
          let tenantNames = await user.get(getAllPay[i].tenant);
          let test = apt.aptNumber;
          let test1 = tenantNames.firstName + " " + tenantNames.lastName;
  
          const updatedPayinfo = {
            TenantName: test1,
            AptName: test,
            Amount: getAllPay[i].paymentAmount,
            date: getAllPay[i].date
          }
          allss.push(updatedPayinfo);
      }

      let aptPaySearch = req.query.aptNum;
      if(aptPaySearch){
        allss = allss.filter((apt) => apt.AptName.toLowerCase() === aptPaySearch.toLowerCase());
      }
      return res.status(200).render('paymentsLandlord', {title: 'All Payments Made', payments: allss});
    }
    else {
      // get all payments for user
      const p = await getPaymentsByUser(req.session.user._id)
      const apt = await getAptByUseriD(req.session.user._id)
      return res.status(200).render('paymentsTenant', {title: 'Previous Payments', payments: p})
    }
});


//goes to landlord dashboard
router.route('/landlord').get(async (req, res) => {
    // const apts = await getAllAptLandlord(req.session.user._id)
    // //need function to get all the work orders for all the apts of the landlord
    // const active = 0
    // let paymentsDue = 0;
    // paymentsDue ++ for every apt in apts that has pending rent due
    return res.status(200).render('landlord', {title: 'Landlord Dashboard', today: new Date().toLocaleDateString(), numWorkOrders: 0, numPayments: 0});

  
});


router.route('/viewallapartments').get(async (req, res) => {
  //code here for GET
  //come back to this
  let landlord = req.session.user._id;
  // let tentName = req.session.user.tenants;
  let getAllAp = await user.getAllAptLandlord(landlord);
  let ten = [];
  for (let i = 0; i < getAllAp.length; i++) {
    let allTenants = [];
  
    for (let j = 0; j < getAllAp[i].tenants.length; j++) {
      let makeString = [getAllAp[i].tenants[j].toString()];
      let userName = await user.get(makeString[j]);
      let userNam = userName.firstName + " " + userName.lastName;
      // console.log(userNam);
      allTenants.push(userNam);
    }
      const newTotal = {
        AptNum: getAllAp[i].aptNumber,
        Rent: getAllAp[i].rentCost,
        RentRemaining: getAllAp[i].rentRemaining,
        RentDate: getAllAp[i].rentDate,
        Size: getAllAp[i].size,
        Beds: getAllAp[i].bedNum,
        Baths: getAllAp[i].bathNum,
        Description: getAllAp[i].description,
        Vacancies: getAllAp[i].isVacant,
        Tenants: allTenants,
        WorkOrders: getAllAp[i].workOrders,
      };
      ten.push(newTotal);
  // }
    
    console.log(ten);
  
  }
    
  return res.status(200).render('viewallapartments', {title: 'View All Apartments', getAllApts: ten});

});

router.route('/error').get(async (req, res) => {
  //code here for GET
  return res.status(400).render('error');
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  return res.status(200).render('logout', {title: 'Logged Out'})
});


router.route('/landlordassignApt').get(async (req, res) => {
  return res.status(200).render('landlordassignApt', {title: 'Assign Tenant to Apartment'})

})
.post(async (req, res) => {
  
});


router.route('/landlordCreateApt').get(async (req, res) => {
  return res.status(200).render('landlordCreateApt', {title: 'Create An Apartment'})

})
.post(async (req, res) => {
  // let aptNumber = req.body.aptNum;
  // let rentCost = req.body.rentCost;
  // let rentRemaining =  req.body.rentRem;
  // let rentDate =  req.body.rentDate;
  // let size =  req.body.size;
  // let bedNum =  req.body.bed;
  // let bathNum =  req.body.bath;
  // let description =  req.body.description;
  // let isVacant =  req.body.isVacant;
  console.log("Received POST request with data:", req.body);

  let aptNumber = req.body.aptNum;
  let rentCost = Number(req.body.rentCost);
  let rentRemaining =  Number(req.body.rentRem);
  let rentDate =  req.body.rentDate;
  let size =  Number(req.body.size);
  let bedNum =  Number(req.body.bed);
  let bathNum =  Number(req.body.bath);
  let description =  req.body.description;
  // let isVacant =  req.body.isVacant;
  let isVacant = false; 

  if (req.body.isVacant === 'true') {
    isVacant = true; 
  }

  // let {aptNumber, rentCost, rentRemaining, rentDate, size, bedNum, bathNum, description, isVacant} = req.body;

  if (isNUllOrUndefined(aptNumber)){
    return res.status(400).render('landlordCreateApt', { error: 'Apartment Number is missing.'});

  }
  if (isNUllOrUndefined(rentCost)){
    return res.status(400).render('landlordCreateApt', { error: 'Rent Cost is missing.'});

  }
  if (isNUllOrUndefined(rentRemaining)){
    return res.status(400).render('landlordCreateApt', { error: 'Rent Remaining is missing.'});
  }
  if (isNUllOrUndefined(rentDate)){
    return res.status(400).render('landlordCreateApt', { error: 'Rent Date is missing.'});
  }
  if (isNUllOrUndefined(size)){
    return res.status(400).render('landlordCreateApt', { error: 'Size is missing.'});
  }
  if (isNUllOrUndefined(bedNum)) {
    return res.status(400).render('landlordCreateApt', { error: 'Number of Beds is missing.'});
  };
  if (isNUllOrUndefined(bathNum)){
    return res.status(400).render('landlordCreateApt', { error: 'Number of Baths is missing.'});
  };
  if (isNUllOrUndefined(description)) {
    return res.status(400).render('landlordCreateApt', { error: 'Description is missing.'});
  };
  if (isNUllOrUndefined(isVacant)){
    return res.status(400).render('landlordCreateApt', { error: 'Vacancy is missing.'});
  };
  // if (isNUllOrUndefined(tenants)) {
  //   return res.status(400).render('landlordCreateApt', { error: 'Tenants is missing.'});
  // };
  // if (isNUllOrUndefined(workOrders)) {
  //   return res.status(400).render('landlordCreateApt', { error: 'Work Orders is missing.'});
  // };
  //error checking for aptNumber
  if(typeof aptNumber !== 'string') {
    return res.status(400).render('landlordCreateApt', { error: 'Apartment Number must be a string.'});
  };
  aptNumber = aptNumber.trim();
  if(aptNumber === "") {
    return res.status(400).render('landlordCreateApt', { error: 'Apartment Number must not be an empty string.'});
  };
  if(aptNumber.lenght > 26) {
    return res.status(400).render('landlordCreateApt', { error: 'Apartment Number must be less than 26 characters.'});
  };
  //other then checking for nums should there be any other constaints?
  if(typeof rentCost !== 'number') {
    return res.status(400).render('landlordCreateApt', { error: 'Rent Cost must be a number.'});
  };
  if(typeof rentRemaining !== 'number') {
    return res.status(400).render('landlordCreateApt', { error: 'Rent Remaining must be a number.'});
  };
  if(typeof size !== 'number') {
    return res.status(400).render('landlordCreateApt', { error: 'Size must be a number.'});
  };
  if(typeof bedNum !== 'number') {
    return res.status(400).render('landlordCreateApt', { error: 'Number of Beds must be a number.'});
  };
  if(typeof bathNum !== 'number') {
    return res.status(400).render('landlordCreateApt', { error: 'Number of Baths must be a number.'});
  };
  if(bedNum < 0) {
    return res.status(400).render('landlordCreateApt', { error: 'Number of beds must be positive.'});
  };
  if(bathNum < 0) {
    return res.status(400).render('landlordCreateApt', { error: 'Number of baths must be positive.'});
  };
  if(size < 0) {
    return res.status(400).render('landlordCreateApt', { error: 'Size must be positive.'});
  };
  if(rentCost < 0) {
    return res.status(400).render('landlordCreateApt', { error: 'Rent Cost must be positive.'});
  };
  if(rentRemaining < 0) {
    return res.status(400).render('landlordCreateApt', { error: 'Rent Remaining must be positive.'});
  };
  if (dateChecker(rentDate)){
    return res.status(400).render('landlordCreateApt', { error: 'Rent Date must be a date.'});
  }
  //error checking for rentDate
  //error checking for description
  if(typeof description !== 'string') {
    return res.status(400).render('landlordCreateApt', { error: 'Description must be a string.'});
  };
  description = description.trim();
  if(description === "") {
    return res.status(400).render('landlordCreateApt', { error: 'Description must not be an empty string.'});
  };
  if(description.lenght > 100) {
    return res.status(400).render('landlordCreateApt', { error: 'Description must be less than 100 characters.'});
  };
  //error checking for isVacant
  if(typeof isVacant !== 'boolean') {
    return res.status(400).render('landlordCreateApt', { error: 'Vacancy must be true or false.'});
  };
  //error checking for tenants, for tentants and workorders should I check if they exist or no since the only way to update is on the user side
  // if(!Array.isArray(tenants)) throw 'Tenants must be an array';
  // if(!Array.isArray(workOrders)) throw 'Work orders must be an array';
  // if(tenants.length > bedNum*2 ) {
  //   return res.status(400).render('landlordCreateApt', { error: 'Too many tenants for the number of beds.'});
  // };

  // try{
  //   const LoginCheck = await apartment.create(aptNumber, rentCost, rentRemaining, rentDate, size, bedNum, bathNum, description, isVacant, [], []);
  //   if(LoginCheck){
  //     return res.redirect('/viewallapartments');
  //     ///not redirecting to login page it shows the error duplicate email
  //   }else{
  //      return res.status(500).render('landlordCreateApt',{error:true, error:"Internal Server Error"});
  //   }
  //   }catch(e){
  //     return res.status(400).render('landlordCreateApt',{error:true, error: e});
  //   // console.log("test");
  // }

  try {
    const LoginCheck = await apartment.create(aptNumber, rentCost, rentRemaining, rentDate, size, bedNum, bathNum, description, isVacant, [], []);
  
    console.log("Insert result:", LoginCheck);
  
    if(LoginCheck){
      return res.redirect('/viewallapartments');
    } else {
      return res.status(500).render('landlordCreateApt',{error:true, error:"Internal Server Error"});
    }
  } catch(e){
    console.error("Error occurred:", e);
    return res.status(400).render('landlordCreateApt',{error:true, error: e});
  }

});




export default router;


