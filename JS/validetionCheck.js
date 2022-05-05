function validetion(userDataObj, userDatavalidetionObj) {

    if (userDataObj.userFirstName === "") {
        userDatavalidetionObj.fname.innerHTML = "Enter First Name";
        userDatavalidetionObj.fname.style.color = "red";
    }else if(userDataObj.userLastName===""){
        userDatavalidetionObj.lname.innerHTML = "Enter Last Name";
        userDatavalidetionObj.lname.style.color = "red";
    }else if(userDataObj.userPhone===""){
        userDatavalidetionObj.phone.innerHTML = "Enter Phone No";
        userDatavalidetionObj.phone.style.color = "red";
    }else if(userDataObj.userEmail===""){
        userDatavalidetionObj.email.innerHTML = "Enter Email";
        userDatavalidetionObj.email.style.color = "red";
    }else if(userDataObj.userCountry===""){
        userDatavalidetionObj.country.innerHTML = "Select Country";
        userDatavalidetionObj.country.style.color = "red";
    }else if(userDataObj.userState===""){
        userDatavalidetionObj.state.innerHTML = "Select State";
        userDatavalidetionObj.state.style.color = "red";
    }else if(userDataObj.userCity===""){
        userDatavalidetionObj.city.innerHTML = "Select City";
        userDatavalidetionObj.city.style.color = "red";
    }else if(userDataObj.userPinCode===""){
        userDatavalidetionObj.pin.innerHTML = "Enter Pin Code";
        userDatavalidetionObj.pin.style.color = "red";
    }else if(userDataObj.userFullAddress===""){
        userDatavalidetionObj.add.innerHTML = "Enter your address";
        userDatavalidetionObj.add.style.color = "red";
    }else if(userDataObj.userLandmark===""){
        userDatavalidetionObj.lmark.innerHTML = "Enter Land Mark";
        userDatavalidetionObj.lmark.style.color = "red";
    }
    
    else if(userDataObj.userPassword===""){
        userDatavalidetionObj.pass.innerHTML = "Enter you password";
        userDatavalidetionObj.pass.style.color = "red";
    }else {
        userDatavalidetionObj.fname.style.display = "none";
        userDatavalidetionObj.lname.style.display = "none";
        return true;
    }

}
export { validetion };