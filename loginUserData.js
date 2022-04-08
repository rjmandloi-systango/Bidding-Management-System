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
    if(userDeatils[index].UserName===userNameLogin && userDeatils[index].UserPass===userPassLogin)
    {
      flag=1;
      console.log(userDeatils[index]);
      localStorage.setItem("USERDATA",JSON.stringify(userDeatils[index]));
    }
  }
  if(flag==1){
 alert("welcome !");

 let sellBtn=document.getElementById("sellBtn");
 let myProducts=document.getElementById("myProducts");
 let btnls=document.querySelector(".buttonls");
 let btnls1=document.querySelector("#registerBtn");
 document.querySelector(".btn-close").click();
 myProducts.classList.remove("hide");
 sellBtn.classList.remove("hide");
 btnls.classList.add("hide");
 btnls1.classList.add("hide");
 //  location.href = './index.html';
  
}else{
    alert("invalid user or pass !");
  }
}

console.log(userDeatils);
