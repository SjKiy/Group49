//use jquery in main handlebars jquery from online or download 
//do $.AJAX(requestConfiguration) ==> object and method and route u want to make the request
//cannot be a get request
//cannot be a get request 

//validations for registeration
let registerForm = document.getElementById("registration-form");
let registerfirstName = document.getElementById("firstNameInput");
let registerlastName = document.getElementById("lastNameInput");
let registeremail = document.getElementById("emailAddressInput");
let registerPassword = document.getElementById("passwordInput");
let registerConfirmPassword = document.getElementById("confirmPasswordInput");
let registerRole = document.getElementById("roleInput");
let registerError = document.getElementById("errorCS");

if (registerForm){
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let firstName = registerfirstName.value.trim();
        let lastName = registerlastName.value.trim();
        let emailAddress = registeremail.value.trim();
        let password = registerPassword.value.trim();
        let confirmPassword = registerConfirmPassword.value.trim();
        let role = registerRole.value.trim();
        let firstLastNumber = /[0-9].*/;
        let firstLastSpace = /\s/;
        let emailReg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



        if (firstName === "" && lastName === "" && registeremail.value === "" && password === "" && confirmPassword === "" && role === ""){
            registerError.innerHTML = "Required Fields Are Missing. Please Add them.";

        }
        else if (firstName === ""){
            registerError.innerHTML = "First Name cannot be a empty.";
        }
        else if (lastName === ""){
            registerError.innerHTML = "Last Name cannot be a empty.";
        }
        else if (emailAddress === ""){
            registerError.innerHTML = "Email cannot be a empty.";
        }
        else if (password === ""){
            registerError.innerHTML = "Password cannot be a empty.";
        }
        else if (confirmPassword === ""){
            registerError.innerHTML = "Confirm Password cannot be a empty.";
        }
        else if (role === ""){
            registerError.innerHTML = "Role cannot be empty.";
        }
        else if (firstName.trim().length < 2 || firstName.trim().length > 25){
            registerError.innerHTML = "First Name Must be between 2 and 25 characters.";
        }
        else if (lastName.trim().length < 2 || lastName.trim().length > 25){
            registerError.innerHTML = "Last Name Must be between 2 and 25 characters.";
        }
        // firstName cannot be numbers only string
        else if (firstName.match(firstLastNumber)){
            registerError.innerHTML = "First Name cannot have numbers in name.";
        }
        else if (lastName.match(firstLastNumber)){
            registerError.innerHTML = "Last Name cannot have numbers in name.";
        }
        else if (firstName.match(firstLastSpace)){
            registerError.innerHTML = "First Name cannot have spaces in name";
        }
        else if (lastName.match(firstLastSpace)){
            registerError.innerHTML = "Last Name cannot have spaces in name";
        }
        else if (!emailAddress.match(emailReg)){
            registerError.innerHTML = "Email is not valid.";
        }

        else if (!password.match(passReg)){
            registerError.innerHTML = "Password is minimum of 8 characters.  Needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character";
        }
        else if (!confirmPassword.match(passReg)){
            registerError.innerHTML = "Password is minimum of 8 characters.  Needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character";
        }
        else if (password !== confirmPassword){
            registerError.innerHTML = "Passwords do not match. Please Make Sure Passwords Match.";
        }
        else{
            
            registerForm.submit();        
       }

    });

}

//validations for login
let loginForm = document.getElementById("login-form");
let loginemail = document.getElementById("emailAddressInput");
let loginPassword = document.getElementById("passwordInput");
let loginError = document.getElementById("errorLogInCS");

if(loginForm){
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let emailAddress = loginemail.value.trim();
        let password = loginPassword.value.trim();
        let emailReg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (emailAddress === "" && password === ""){
            loginError.innerHTML = "Required Fields Are Missing. Please Add them.";
        }
        else if (emailAddress === ""){
            loginError.innerHTML = "Email cannot be a empty.";
        }
        else if (password === ""){
            loginError.innerHTML = "Password cannot be empty.";
        }
        else if (!emailAddress.match(emailReg)){
            loginError.innerHTML = "Email is not valid.";
        }

        else if (!password.match(passReg)){
            loginError.innerHTML = "Password is minimum of 8 characters.  Needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character";
        }

        else{
            
            loginForm.submit();
        }
        
    });

};

//validations for tenant paying rent

let payRentForm = document.getElementById("payment-form");
// let date = document.getElementById("rentDate");
let Cname = document.getElementById("cname");
let Cnum = document.getElementById("ccnum");
let Cmonth = document.getElementById("expmonth");
let Cyear = document.getElementById("expyear");
let Ccvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let payError = document.getElementById("errorPayCS");

if(payRentForm){
    payRentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let cardName = Cname.value.trim();
        let cardNumber = Cnum.value.trim();
        let cardMonth = Cmonth.value.trim();
        let cardYear = Cyear.value.trim();
        let cardCvv = Ccvv.value.trim();
        let rentAmount = amount.value.trim(); 
        //take from https://ihateregex.io/expr/credit-card/     
        let ccReg = /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/;
        let cvvReg = /^[0-9]{3}$/;
        //modified from https://regex101.com/library/AFarfB
        let CCmonthReg = /^(0[1-9]|1[0-2])$/;
        let CCyearReg = /^[0-9]{2}$/;

        if (cardName === "" && cardNumber === "" && cardMonth === "" && cardYear === "" && cardCvv === "" && rentAmount === ""){
            payError.innerHTML = "Required Fields Are Missing. Please Add them.";
        }
        else if (cardName === ""){
            payError.innerHTML = "Card Name cannot be a empty.";
        }
        else if (cardNumber === ""){
            payError.innerHTML = "Card Number cannot be a empty.";
        }
        else if (cardMonth === ""){
            payError.innerHTML = "Card Month cannot be empty.";
        }
        else if (cardYear === ""){
            payError.innerHTML = "Card Year cannot be empty.";
        }
        else if (cardCvv === ""){
            payError.innerHTML = "Card CVV cannot be empty.";
        }
        else if (rentAmount === ""){
            payError.innerHTML = "Rent Amount cannot be empty.";
        }
        else if (!cardNumber.match(ccReg)){
            payError.innerHTML = "Card Number is not valid.";
        }
        else if (!cardMonth.match(CCmonthReg)){
            payError.innerHTML = "Card Month is not valid.";
        }
        else if (!cardYear.match(CCyearReg)){
            payError.innerHTML = "Card Year is not valid.";
        }
        else if (!cardCvv.match(cvvReg)){
            payError.innerHTML = "Card CVV is not valid.";
        }
        else if (rentAmount < 0){
            payError.innerHTML = "Rent Amount cannot be negative.";
        }
        else{
            
            payRentForm.submit();
        }


    });
};

//submit work order let loginForm = document.getElementById("login-form");
let submitworkorderform = document.getElementById("workOrderformSubmit");
let submitWorkType = document.getElementById("workType");
let submitNote = document.getElementById("notes");
let submitError = document.getElementById("errorSubmitWokrCS");
if(submitworkorderform){
    submitworkorderform.addEventListener("submit", (event) => {
        event.preventDefault();
        let workType = submitWorkType.value.trim();
        let note = submitNote.value.trim();
        // let emailReg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        // let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if ( workType === "" && note === ""){
            submitError.innerHTML = "Required Fields Are Missing. Please Add them.";
        }
        else if (workType === ""){
            submitError.innerHTML = "Work Type cannot be a empty.";
        }
        else if (note === ""){
            submitError.innerHTML = "Note cannot be empty.";
        }
        else if (typeof workType !== "string"){
            submitError.innerHTML = "Work Type is not valid.";
        }
        else if (typeof note !== "string"){
            submitError.innerHTML = "Note is not valid.";
        }

        else{
            
            submitworkorderform.submit();
        }
        
    });

};


let creatAptForm = document.getElementById("creatNewAptLL");
let creatAptNum = document.getElementById("aptNum");
let createRentCost = document.getElementById("rentCost");
let createRentDate = document.getElementById("rentDate");
let createSize = document.getElementById("size");
let createBed = document.getElementById("bedNum");
let createBath = document.getElementById("bathNum");
let createDesc = document.getElementById("description");
let createisVancant = document.getElementById("isVacant");
let createError = document.getElementById("errorCreateAptCS");

if(creatAptForm){
    creatAptForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let aptNum = creatAptNum.value.trim();
        let rentCost = createRentCost.value.trim();
        let rentDate = createRentDate.value.trim();
        let size = createSize.value.trim();
        let bed = createBed.value.trim();
        let bath = createBath.value.trim();
        let desc = createDesc.value.trim();
        let isVancant = createisVancant.value.trim();
        let rentDateCheck = rentDate.split("/");

        if (aptNum === "" && rentCost === "" && rentDate === "" && size === "" && bed === "" && bath === "" && desc === "" && isVancant === ""){
            createError.innerHTML = "Required Fields Are Missing. Please Add them.";
        }
        else if (aptNum === ""){
            createError.innerHTML = "Apartment Number cannot be a empty.";
        }
        else if (rentCost === ""){
            createError.innerHTML = "Rent Cost cannot be empty.";
        }
        else if (rentDate === ""){
            createError.innerHTML = "Rent Date cannot be empty.";
        }
        else if (size === ""){
            createError.innerHTML = "Size cannot be empty.";
        }
        else if (bed === ""){
            createError.innerHTML = "Bed Number cannot be empty.";
        }
        else if (bath === ""){
            createError.innerHTML = "Bath Number cannot be empty.";
        }
        else if (desc === ""){
            createError.innerHTML = "Description cannot be empty.";
        }
        else if (isVancant === ""){
            createError.innerHTML = "Vacant cannot be empty.";
        }
        else if (rentCost < 0){
            createError.innerHTML = "Rent Cost cannot be negative.";
        }
        else if (size < 0){
            createError.innerHTML = "Size cannot be negative.";
        }
        else if (bed < 0){
            createError.innerHTML = "Bed Number cannot be negative.";
        }
        else if (bath < 0){
            createError.innerHTML = "Bath Number cannot be negative.";
        }
        else if (typeof aptNum !== "string"){
            createError.innerHTML = "Apartment Number is not valid.";
        }
        // else if (typeof rentCost !== "number"){
        //     createError.innerHTML = "Rent Cost is not valid.";
        // }
        else if (typeof rentDate !== "string"){
            createError.innerHTML = "Rent Date is not valid.";
        }
        // else if (typeof size !== "number"){
        //     createError.innerHTML = "Size is not valid.";
        // }
        // else if (typeof bed !== "number"){
        //     createError.innerHTML = "Bed Number is not valid.";
        // }
        // else if (typeof bath !== "number"){
        //     createError.innerHTML = "Bath Number is not valid.";
        // }
        else if (typeof desc !== "string"){
            createError.innerHTML = "Description is not valid.";
        }
        // else if (typeof isVancant !== "boolean"){
        //     createError.innerHTML = "Vacant is not valid.";
        // }
        else if (desc.length > 100){
            createError.innerHTML = "Description is too long.";
        }
        else if (rentDateCheck.length !== 3){
            createError.innerHTML = "Date must be in the format of MM/DD/YYYY";
        }
        else if (rentDateCheck[0].length !== 2 || rentDateCheck[1].length !== 2 || rentDateCheck[2].length !== 4){
            createError.innerHTML = "Date must be in the format of MM/DD/YYYY";
        }
        else if (isNaN(rentDateCheck[0]) || isNaN(rentDateCheck[1]) || isNaN(rentDateCheck[2])){
            createError.innerHTML = "Date must be in the format of MM/DD/YYYY";
        }
        else if (rentDateCheck[0] < 1 || rentDateCheck[0] > 12){
            createError.innerHTML = "Date must be in the format of MM/DD/YYYY";
        }
        else if (rentDateCheck[1] < 1 || rentDateCheck[1] > 31){
            createError.innerHTML = "Date must be in the format of MM/DD/YYYY";
        }
        else if (rentDateCheck[2] < 1900 || rentDateCheck[2] > 2090){
            createError.innerHTML = "Date must be in the format of MM/DD/YYYY";
        }
        else{   
            creatAptForm.submit();
        }  

    });

};


let assignAptform = document.getElementById("aptAssignform");
let assignAptemail = document.getElementById("tenantEmail");
let assignAptNum = document.getElementById("aptNum");
let assignError = document.getElementById("errorAssignAptCS");

if(assignAptform){
    assignAptform.addEventListener("submit", (event) => {
        event.preventDefault();
        let emailAddress = assignAptemail.value.trim();
        let aptNum = assignAptNum.value.trim();
        let emailReg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        // let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (emailAddress === "" && aptNum === ""){
            assignError.innerHTML = "Required Fields Are Missing. Please Add them.";
        }
        else if (emailAddress === ""){
            assignError.innerHTML = "Email cannot be a empty.";
        }
        else if (aptNum === ""){
            assignError.innerHTML = "Apartment Number cannot be empty.";
        }
        else if (!emailAddress.match(emailReg)){
            assignError.innerHTML = "Email is not valid.";
        }
        else{
            
            assignAptform.submit();
        }
        
    });

};

const paragraph = document.getElementsByClassName("workEditInfo");

if (paragraph) {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const editInfo = button.parentNode.querySelector('.workEditInfo');
        const editEdit = button.parentNode.querySelector('.workEditEdit');
        editInfo.classList.add('hidden');
        editEdit.classList.remove('hidden');
        button.classList.add('hidden');
        button.parentNode.querySelector('.end-button').classList.remove('hidden');
    });
    });

    // Add event listeners to all the save buttons
    const saveButtons = document.querySelectorAll('.end-button');
    saveButtons.forEach(button => {
    button.addEventListener('click', () => {
        const editInfo = button.parentNode.querySelector('.workEditInfo');
        const editEdit = button.parentNode.querySelector('.workEditEdit');
        const form = editEdit.querySelector('form');
        editEdit.classList.add('hidden');
        editInfo.classList.remove('hidden');
        button.classList.add('hidden');
        button.parentNode.querySelector('.edit-button').classList.remove('hidden');
        form.submit(); // Submit the form
    });
});

}