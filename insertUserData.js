
import { db, set, ref,get,child, update, remove } from "./firebase.js";
import { validetion } from "./validetionCheck.js";
// import { validetion } from "./validetionCheck";
import {userDeatils} from "./fetchUserData.js";
// console.log(userDeatils);
let ID = 0;
idFetch();
let userDataInsert = document.getElementById("userDataInssert");
userDataInsert.addEventListener('click', userData);

function userData() {
  let userDataObj = {
    userFirstName: document.getElementById("firstName").value,
    userLastName: document.getElementById("lastName").value,
    userPhone: document.getElementById("userPhone").value,
    userEmail: document.getElementById("userEmail").value,
    userCountry: document.getElementById("userCountry").value,
    userState: document.getElementById("userState").value,
    userCity: document.getElementById("userCity").value,
    userPinCode: document.getElementById("userPinCode").value,
    userFullAddress: document.getElementById("userFullAddress").value,
    userLandmark: document.getElementById("userLandMark").value,
    userName: document.getElementById("userName").value,
    userPassword: document.getElementById("userPassword").value,
    userInvalidCheck: document.getElementById("invalidCheck").value
  }
  let userDatavalidetionObj = {
    fname: document.getElementById("fname"),
    lname: document.getElementById("lname"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
    country: document.getElementById("country"),
    state: document.getElementById("state"),
    city: document.getElementById("city"),
    pin: document.getElementById("pin"),
    add: document.getElementById("add"),
    lmark: document.getElementById("lmark"),
    uname: document.getElementById("uname"),
    pass: document.getElementById("pass"),
    agree: document.getElementById("agree"),
  }

 if(validetion(userDataObj,userDatavalidetionObj)){
  let flag=0;
userDeatils.forEach(element => {
    if(element.Email===userDataObj.userEmail){
      // alert('alredy exist...')
      flag=1;
    }
    // else{
    //   insertUser(userDataObj);
    // }
  });
    if(flag==1){
      alert('alredy exist...')
    }else{
      insertUser(userDataObj);
    }
 
}
}


function insertUser(userDataObj) {
  set(ref(db, "User/" + (ID+1) + "/"), {

    "Details": {
      FirstName: userDataObj.userFirstName,
      LastName: userDataObj.userLastName,
      PhoneNo:userDataObj.userPhone,
      Email:userDataObj.userEmail,
      Country:userDataObj.userCountry,
      State:userDataObj.userState,
      City:userDataObj.userCity,
      PinCode:userDataObj.userPinCode,
      FullAddress:userDataObj.userFullAddress,
      LandMark:userDataObj.userLandmark,
      UserName:userDataObj.userName,
      UserPass:userDataObj.userPassword
    }
  }).then(() => {
      alert('You are Registered...')
      location.href = './index.html';
    })
    .catch((error) => {
      alert("error aa gai h");
    });
    set(ref(db, "ID"), (ID + 1))
    .then(() => {
      // alert("serial count update");
    })
    .catch((error) => {
      alert("error");
    });
}

function idFetch() {
  const databaseRef = ref(db);
  get(child(databaseRef, "ID")).then((snapshot) => {
    if (snapshot.exists()) {
      ID = snapshot.val();
    }
  });
}

