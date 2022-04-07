import { db, set, ref,get,child, update, remove } from "./firebase.js";

let loginClick=document.getElementById("loginUserData");

loginClick.addEventListener('click',loginClickFun);
function loginClickFun(){
  let userNameLogin=document.getElementById("userNameLogin").value;
  let userPassLogin=document.getElementById("userPasswordLogin").value;  
  checkUserLogin(userNameLogin,userPassLogin);
}


allDataFetch();
let userDeatils = [];

function allDataFetch() {

  const databaseRef = ref(db);

  get(child(databaseRef, "User/")).then((snapshot) => {
    if (typeof (snapshot) !== 'undefined') {

      if (snapshot.exists()) {
        snapshot.forEach((child) => {
                userDeatils.push({
                    "id": child.key,
                    "FirstName":child.val().Details.FirstName,
                    "LastName":child.val().Details.LastName,
                    "Phone":child.val().Details.PhoneNo,
                    "Email":child.val().Details.Email,
                    "Country":child.val().Details.Country,
                    "State":child.val().Details.State,
                    "PinCode":child.val().Details.PinCode,
                    "Address":child.val().Details.Address,
                    "LandMakr":child.val().Details.LandMakr,
                    "UserName":child.val().Details.UserName,
                    "UserPass":child.val().Details.UserPass
            })

            // playerNames.push(child.val().player1);
            
        });
      }
    }

  });
}
function checkUserLogin(userNameLogin,userPassLogin){
  let flag=0;
  for(let index=0;index<userDeatils.length;index++){
    if(userDeatils[index].UserName===userNameLogin && userDeatils[index].UserPass===userPassLogin)
    {
      flag=1;
    }
  }
  if(flag==1){
 alert("welcome !");
 location.href = './index.html';
  }else{
    alert("invalid user or pass !");
  }
}

console.log(userDeatils)