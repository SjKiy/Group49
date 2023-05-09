//https://stackoverflow.com/questions/59986525/submitting-form-using-jquery-ajax
// used this for the ajax login page

(function ($) {

    let loginForm = $("#login-form")
    let emailInput = $("#emailAddressInput")
    let passwordInput = $("#passwordInput")
    let loginError = $("#errorLoginAjax")
    // let loginError = $("#errorLogInCS")
  
  
    loginForm.submit(function (event) {
        event.preventDefault();
  
        let email = emailInput.val().trim().toLowerCase();
        let password = passwordInput.val().trim();
        let emailReg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
        if (!email || !password) {
            loginError.html('Email or Password was not provided');
        }
        else if (email === ""){
            loginError.html('Cannot leave email empty.');
        }
        else if (password === ""){
            loginError.html('Cannot leave password empty.');
        }
        else if (!email.match(emailReg)){
            loginError.html('Email is invalid');
        }
  
        else if (!password.match(passReg)){
            loginError.html('Password is minimum of 8 characters.  Needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character');
        }
        else {
            $.ajax({
                url: '/login',
                method: 'POST',
                data: { email, password },
                dataType: 'json',
                success: function (response) {
                    console.log('Login successful:', response);
                    if (response.success) {
                        if (response.accountType === 'tenant') {
                            window.location.href = '/tenant';
                        } else if (response.accountType === 'landlord') {
                            window.location.href = '/landlord';
                        }
                    } else {
                        loginError.html(`<p>${response.error}</p>`);
                    }
                },
                error: function (jqXHR, textStatus, error) {
                    loginError.html(`<p>Server error: ${error}</p>`);
                }
            })
        }
  
    });
  
  })(window.jQuery);