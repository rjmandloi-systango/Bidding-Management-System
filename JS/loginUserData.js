import { userDeatils } from "./fetchUserData.js";


let loginClick = document.getElementById("loginUserData");


loginClick.addEventListener('click', loginClickFun);
function loginClickFun() {
  let userNameLogin = document.getElementById("userNameLogin").value;
  let userPassLogin = document.getElementById("userPasswordLogin").value;
  checkUserLogin(userNameLogin, userPassLogin);
}


async function checkUserLogin(userNameLogin,userPassLogin){
  let flag=0;
  for(let index=0;index<userDeatils.length;index++){
    if(userDeatils[index].Email===userNameLogin && userDeatils[index].UserPass===userPassLogin)
    {
      flag=1;
      // console.log("kkkkkkkkkkkkkkkk"+userDeatils[index]);
      localStorage.setItem("USERDATA",JSON.stringify(userDeatils[index]));
    }
  }
  if(flag==1){
    
//  alert("welcome !");
await swal({
    title: "you are login successful !",
    text: "You clicked the button!",
    icon: "success",
    button: "Aww yiss!",
  });
      // alert('ok');
 localStorage.setItem("STATUS",false);
let newStatus= localStorage.getItem("STATUS");  

  if(newStatus=="false"){
    location.reload();
 document.querySelector(".btn-close").click();
  }
  
  
}else{
  await swal({
    title: "Invalid User/Email Or Password!",
    text: "You clicked the button!",
    icon: "error",
    button: "Try Again!",
  });
    // alert("invalid user or pass !");
  }
}

let logoutClick2 = document.getElementById("logoutBtn");

logoutClick2.addEventListener('click', logoutClickFun);

function logoutClickFun() {
  localStorage.setItem("STATUS", true);
  location.reload();

}


console.log('User Details....', userDeatils);





