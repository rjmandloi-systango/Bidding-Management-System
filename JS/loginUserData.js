import {userDeatils} from "./fetchUserData.js";


let loginClick=document.getElementById("loginUserData");


loginClick.addEventListener('click',loginClickFun);
function loginClickFun(){
  let userNameLogin=document.getElementById("userNameLogin").value;
  let userPassLogin=document.getElementById("userPasswordLogin").value;  
  checkUserLogin(userNameLogin,userPassLogin);
}

function checkUserLogin(userNameLogin,userPassLogin){
  let flag=0;
  for(let index=0;index<userDeatils.length;index++){
    if(userDeatils[index].Email===userNameLogin && userDeatils[index].UserPass===userPassLogin)
    {
      flag=1;
      console.log(userDeatils[index]);
      localStorage.setItem("USERDATA",JSON.stringify(userDeatils[index]));
    }
  }
  if(flag==1){


    alert("welcome !");




 localStorage.setItem("STATUS",false);
let newStatus= localStorage.getItem("STATUS");  

  if(newStatus=="false"){
    location.reload();
//     let sellBtn=document.getElementById("sellBtn");
//  let myProducts=document.getElementById("myProducts");
//  let logoutBtn=document.getElementById("logoutBtn");
//  let btnls=document.querySelector(".buttonls");
//  let btnls1=document.querySelector("#registerBtn");
 document.querySelector(".btn-close").click();
//  myProducts.classList.remove("hide");
//  logoutBtn.classList.remove("hide");
//  sellBtn.classList.remove("hide");
//  btnls.classList.add("hide");
//  btnls1.classList.add("hide");
  }
  
 //  location.href = './index.html';
  
}else{
    alert("invalid user or pass !");
  }
}

 let logoutClick2=document.getElementById("logoutBtn");
// console.log('before')

 logoutClick2.addEventListener('click',logoutClickFun);

 function logoutClickFun(){
  console.log('after')
  localStorage.setItem("STATUS",true);
  location.reload();

}


console.log('users Data',userDeatils);