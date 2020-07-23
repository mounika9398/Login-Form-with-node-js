function checkLoginValidations(){
    let isFormValid = true;
    
    if(!$("#email").val()){
        $('#logInEmailErrtag').html("Email is required.");
        isFormValid = false;
    }
    if(!$("#password").val()){
        $('#logInPassErrtag').html("Password is required.");
        isFormValid = false;
    }
    return isFormValid;
}
function checkSignUpValidations(){
    let isFormValid = true;
    console.log($("#first_name").val());
    if(!$("#first_name").val()){
        $('#regFNErrtag').html("First Name is required.");
        isFormValid = false;
    }
    if(!$("#last_name").val()){
        $('#regLNErrtag').html("Last Name is required.");
        isFormValid = false;
    }
    if(!$("#email").val()){
        $('#regEmailErrtag').html("Email is required.");
        isFormValid = false;
    }
    if(!$("#password").val()){
        $('#regPassErrtag').html("Password is required.");
        isFormValid = false;
    }
    return isFormValid;

}