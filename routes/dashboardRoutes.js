import {Router} from 'express';
const router = Router();


// get home page
router.route('/').get(async (req, res) => {
    //TODO
});

// registration page get and post
router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    return res.status(200).render('register');
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
      return res.status(400).render('register', {error: true, info: err});
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
      return res.status(400).render('register', {error: true, info: err});
    }
    try {
      const added = await createUser(firstName,lastName,emailAddress,password,roleInput);
      if (added.insertedUser) {return res.status(200).redirect('/login')}
      else return res.status(500).render('error', {info: "Internal Server Error"});
    } catch (error) {
      return res.status(400).render('register', {error: true, info: error});
    }
  });

// login page get and post
router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    return res.status(200).render('login');
  })
  .post(async (req, res) => {
    //code here for POST
    let err='';
    let {emailAddressInput, passwordInput} = req.body;
    if (!emailAddressInput || !passwordInput) {
      return res.status(400).render('login', {error: true, info: "Email or Password not provided"});
    }
    const email = emailAddressInput.trim().toLowerCase();
    const password = passwordInput.trim();
    if (!EmailValidator.validate(email)) err += "Invalid Email";
    if (/\s/.test(password)) err += "Invalid Password";
    else if (password.length < 8) err += "Invalid Password";
    else if (!/[A-Z]/.test(password)) err += "Invalid Password";
    else if (!/\d/.test(password)) err += "Invalid Password";
    else if (!/[\W_]/.test(password)) err += "Invalid Password";
    if (err) return res.status(400).render('login', {error: true, info: err});
    try {
      const checked = await checkUser(email, password);
      req.session.user= {firstName: checked.firstName, lastName: checked.lastName, emailAddress: checked.emailAddress, role: checked.role}
      if (checked.role === 'admin') return res.status(200).redirect('/admin');
      if (checked.role === 'user') return res.status(200).redirect('/protected');
    } catch (error) {
      return res.status(400).render('login', {error: true, info: error});
    }
  });

router.route('/tenant').get(async (req, res) => {
  //TODO
  
});

router.route('/landlord').get(async (req, res) => {
  //TODO
  
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  return res.status(400).render('error');
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  return res.status(200).render('logout')
});


export default router;