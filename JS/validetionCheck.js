function validetion(userDataObj, userDatavalidetionObj) {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passLenght=userDataObj.userPassword;
    // console.log(userDataObj.userPasswordData);
    // console.log( passLenght.length+"bbbbbbbbbbbbbbbbbbbbbb");
    // // console.log(typeof 0);
    //     if(passLenght.length==0){
    //         console.log('okkkkkkkkkkkkkkkkkkkkkkk');
    //     }

    if (userDataObj.userFirstName === "") {
        userDatavalidetionObj.fname.innerHTML = "Enter First Name";
        userDatavalidetionObj.fname.style.color = "red";
    }else if(userDataObj.userLastName===""){
        userDatavalidetionObj.lname.innerHTML = "Enter Last Name";
        userDatavalidetionObj.lname.style.color = "red";
    }else if(userDataObj.userPhone===""){
        userDatavalidetionObj.phone.innerHTML = "Enter Phone No";
        userDatavalidetionObj.phone.style.color = "red";
    }else if(userDataObj.userEmail===""  || !(userDataObj.userEmail.match(validRegex))){
        userDatavalidetionObj.email.innerHTML = "Enter Valid Email";
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
    
    else if(passLenght.length<3){
        userDatavalidetionObj.passData.innerHTML = "Enter Valid Password";
        userDatavalidetionObj.passData.style.color = "red";
        // console.log(userDataObj.userPassword+"aaaaaaaaaaaaaaaaaaaaa");
    }else {
        userDatavalidetionObj.fname.style.display = "none";
        userDatavalidetionObj.lname.style.display = "none";
        return true;
    }

}
export { validetion };