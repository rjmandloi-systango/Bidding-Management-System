
import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { validetion } from "./validetionCheck.js";
import { userDeatils } from "./fetchUserData.js";

let ID = 0;
idFetch();
let userDataInsert = document.getElementById("userDataInssert");
userDataInsert.addEventListener('click', userData);

// getting user data from registration form 
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
    userPassword: document.getElementById("userPassword").value,
    userInvalidCheck: document.getElementById("invalidCheck").value
  }

  // console.log(userDataObj.userFullAddress);
  // console.log(userDataObj.userPassword);
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

    // uname: document.getElementById("uname"),
    passData: document.getElementById("passData"),
    agree: document.getElementById("agree"),
  }
  // console.log(fname);
// console.log(passData);
  if (validetion(userDataObj, userDatavalidetionObj)) {
    let flag = 0;
    userDeatils.forEach(element => {
      if (element.Email === userDataObj.userEmail) {
        flag = 1;
      }
    });
    if (flag == 1) {
      // alert('alredy exist...')
    } else {

      let userDataInssert = document.getElementById("userDataInssert");
      userDataInssert.addEventListener('click', sendEmail);
      let otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
     
   async  function sendEmail() {
        let userEmail = document.getElementById("userEmail").value;

        // alert(userEmail)
        Email.send({
          Host: "smtp.gmail.com",
          Username: "BidItValueForYourValuables@gmail.com",
          Password: "systango@@",
          To: userEmail,
          From: "BidItValueForYourValuables@gmail.com",
          Subject: "One Time Password",
          Body: "OTP: " + otp,
        })
          .then(async function (message) {
              // console.log(otp);
            // alert("mail sent successfully")
            console.log(otp);

            
            
            await swal({
              title: "Mail Sent Successfully!",
              text: "You clicked the button!",
              icon: "info",
              button: "Done",
            });
            let inputFromPrompt = prompt('Enter OTP');
            if (inputFromPrompt == otp) {
              insertUser(userDataObj);
        
              // alert('verification done!')
              await swal({
                title: "Successfully verified ",
                text: "You clicked the button!",
                icon: "success",
                button: "Done",
              });
              
            } 
            else {
              // alert('verification fail')
              await swal({
                title: "Opps verification failed!",
                text: "You clicked the button!",
                icon: "error",
                button: "Done",
              });
          
            }
          
          
          })
          .catch(function (message) {
            alert("error")
          });
      }
      
    }

  }
}


async function insertUser(userDataObj) {
  set(ref(db, "User/" + (ID + 1) + "/"), {
    "Details": {
      FirstName: userDataObj.userFirstName,
      LastName: userDataObj.userLastName,
      PhoneNo: userDataObj.userPhone,
      Email: userDataObj.userEmail,
      Country: userDataObj.userCountry,
      State: userDataObj.userState,
      City: userDataObj.userCity,
      PinCode: userDataObj.userPinCode,
      FullAddress: userDataObj.userFullAddress,
      LandMark: userDataObj.userLandmark,
      WalletMoney: 0,
      UserPass: userDataObj.userPassword,
      UserID: ID + 1                       
    }
  }).then(async() => {
    // alert('You are Registered...')
    await swal({
      title: "You are Registered!",
      text: "You clicked the button!",
      icon: "success",
      button: "Done",
    });

    location.href = '../index.html';
  })
    .catch((error) => {
      alert("error aa gai h");
    });
  set(ref(db, "ID"), (ID + 1))
    .then(() => {
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

