import {Router} from 'express';
import EmailValidator from 'email-validator';
import { createUser, getAptByUseriD, checkUser } from '../data/user.js';
import { getPaymentsByUser } from '../data/payments.js';
import { create, getActiveWorkOrders } from '../data/apartment.js';
import { getAllAptLandlord } from '../data/user.js';
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
      req.session.user= {_id: checked._id, firstName: checked.firstName, lastName: checked.lastName, emailAddress: checked.emailAddress, role: checked.role}
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
    const active = await getActiveWorkOrders(apt._id)
    const pastPays = await getPaymentsByUser(req.session.user._id)
    return res.status(200).render('tenant', {title: 'Tenant Dashboard', today: new Date().toLocaleDateString(), rentDue: apt.rentRemaining, rentDate: apt.rentDate, numWorkOrders: active.length, payment1: (pastPays[0] ? pastPays[0] : 'None'), payment2: (pastPays[1] ? pastPays[1] : '')});
  } catch (error) {
    return res.status(400).render('error', {title: "Error Page", info: error})
  }
    
});

//Payment page get(go to page) put(submit update to rent);
router
    .route('/pay')
    .get(async (req, res) => {
        //TODO
        return res.status(200).render('pay', {title: "Payment Portal"});
    })
    .post(async (req, res) => {
        //adds to payment collection and subtracts from apt rent due.
        //redirects to /payments
    }
);

router.route('/myapt').get(async (req, res) => {
  //returns info on tenant's apt
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
  })
  .put(async (req, res) => {
    //TODO
    //only for landlord: updates workorder collection, to add notes and such
    //renders workorders
  })

;

//goes to previous payment page
router.route('/payments').get(async (req, res) => {
    //TODO
    //gets all previous payments for current user
    //renders page
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

router.route('/apartments').get(async (req, res) => {
    // be able to view all apartments and their info (tenants, rent, size, workorders)
    // be able to add new tenants  to apartments / add new apartments

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


export default router;