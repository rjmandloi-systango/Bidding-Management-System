import { userDeatils } from "./fetchUserData.js";
import { db, set, ref, get, child, update, remove } from "./firebase.js";
// export {}
// import {createCard} from "./index.js";
import { productImageURL } from "./imageUpload.js";
// console.log(productImageURL);
// let UserData = JSON.parse(localStorage.getItem("USERDATA"));
// let sellerId=UserData.id;
let productIdIncrementor = 1;
let userDATA = JSON.parse(localStorage.getItem("USERDATA"));

let bidButtonIdIncrementor = 1;
let bidDate = document.getElementById("bidDate");
let currentDateObj = new Date();
let currentMonth = currentDateObj.getMonth() + 1;
let currentDate = currentDateObj.getDate();
let minDateString = `${currentDateObj.getFullYear()}-`;
if (currentMonth < 10) {
  minDateString += `0${currentMonth}-`;
} else {
  minDateString += `${currentMonth}-`;
}
if (currentDate < 10) {
  minDateString += `0${currentDate}`;
} else {
  minDateString += `${currentDate}`;
}
bidDate.min = minDateString;

let hours = currentDateObj.getHours();
let minutes = currentDateObj.getMinutes();

allProductDataFetch();
let productDeatils = [];
let arr = [];

function allProductDataFetch() {
  let isLogout = localStorage.getItem("STATUS"); //FALSE=LOGIN   TRUE=LOGOUT
  const databaseRef = ref(db);

  get(child(databaseRef, "User/")).then((snapshot) => {
    if (typeof snapshot !== "undefined") {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          productDeatils.push({
            id: child.val().Details.ProductSold,
          });
        });
      }

      productDeatils.forEach((element) => {
        // console.log('line 27',element);
        if (element?.id) {
          Object.keys(element.id).forEach((key) => {
            // console.log('line 30',element.id[key]["ProductName"]);
            // createCard(element.id[key]["ProductName"],element.id[key]["ProductDiscription"],element.id[key]["ProductPrice"]);
            createCard();
            function createCard() {
              // ;
              let productName = element.id[key]["ProductName"];
              let sellerName = element.id[key]["SellerName"];
              let bidEndingDate = element.id[key]["BidDate"];
              let productId = element.id[key]["ProductId"];
              let sellerId = element.id[key]["UserId"];
              // let InitialBid =element.id[key]["ProductPrice"];
              // let bidDate=element.id[key]["bidDate"];
              // console.log(typeof(productName));
              let productDiscription = element.id[key]["ProductDiscription"];
              let productStartingBid = element.id[key]["ProductPrice"];
              let userId = element.id[key]["UserId"];
              // let sellerContactNumber = document.getElementById("sellerContactNumber").value;
              // let url = "https://image.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg";
              // let url = productImageURL;
              let url = element.id[key]["ImageURl"];
              // console.log(url)
              // const card = document.createElement('div');
              // card.classList = 'card-body';
              let uniqueProductId = "productId" + productIdIncrementor;
              let uniqueBidButtonId = "bidButton" + bidButtonIdIncrementor;

              // Construct card content
              let isLogin;
              if (isLogout === "true") {
                isLogin = 0;
              } else {
                isLogin = 1;
              }
              let productContent = `
             <div class="card productCard mt-5 rounded-3 ms-4 mr-5"  style="width: 18rem;">
              
                  <div class="card-body  rounded-3" >
                           <div class="productName text-center p-1 rounded-3">
                             <h5 class="card-title">${productName}</h5>    
                           </div>
            
                           <div >
                             <img src=${url} class="card-img-top img-thumbnail imgShowInCard" alt="...">
                           </div>
            
                           <div>
                             <p class="card-text text-start  text-dark"><span class ="fw-bold">Discription:</span>${productDiscription}</p>
                           </div>
            
                           <div >
                           <p class="card-text   text-dark"><span class ="fw-bold">Initial bid:</span>${productStartingBid} &#8377</p>
                           </div>
                           
                          
                                 
                                  <div class="col-sm">
                                    <span class="clock fs-2" fw-bold >&#128336</span>
                                    <span class=" fs-5 fw-bold"  id=${uniqueProductId}></span>
                                  </div>
            
                                  <div class="col-sm">
                                    Max Bid &#8377
                                  </div>
                                     
                            
                              <div class="d-flex justify-content-between border text-dark >
                              
                                   <span class="col-6">person</span>

                             `;

              let productContentWhenNotLogin = `
                                   <button class="btn btn-primary col-6 biddingStatus" id=${uniqueBidButtonId}  data-bs-toggle="modal" data-bs-target="#exampleModal1">Your bid</button>
                                               
                              </div>
                            
                  </div>
             </div>
                `;

              let productContentWhenLogin = `
                <button  class="btn btn-primary col-6 biddingStatus" id=${uniqueBidButtonId} onclick="fetchProductData('${productName}','${sellerName}','${bidEndingDate}','${productStartingBid}','${productId}','${url}','${sellerId}')" >Your bid</button>
                            
                </div>
         

         </div>
      </div>
    `;

              let productLayout;
              if (isLogin) {
                productLayout = productContent + productContentWhenLogin;
              } else {
                userDATA.id="youLoggedOut";
                productLayout = productContent + productContentWhenNotLogin;
              }
              // Append newly created card element to the container
              container.innerHTML += productLayout;
              
              if (userDATA.id == userId) {
                console.log("inside disabled");
                document.getElementById(uniqueBidButtonId).disabled = true;
              }


              timer(
                uniqueProductId,
                uniqueBidButtonId,
                element.id[key]["BidDate"],
                element.id[key]["BitTime"]
              );
              productIdIncrementor++;
              bidButtonIdIncrementor++;
            }
          });
        }
      });
    }
  });
}
let productObj;
window.fetchProductData = function (
  pname,
  sname,
  betime,
  InitialBid,
  productId,
  url,
  sellerId
) {
  productObj = {
    pname: pname,
    sname: sname,
    betime: betime,
    InitialBid: InitialBid,
    productId: productId,
    url: url,
    sellerId: sellerId,
  };
  sessionStorage.setItem("ProductData", JSON.stringify(productObj));
  location.href = "HTML/BidPage.html";
};

function timer(uniqueProductId, uniqueBidButtonId, bidData1, bidTime1) {
  let bidDate = bidData1;
  let bidTime = bidTime1;
  let dateArray = bidDate.split("-");
  let timeArray = bidTime.split(":");
  let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]); //year-month-day
  let shortMonth = date.toLocaleString("en-us", { month: "short" });
  let userInputDate;

  if (
    dateArray[0] == currentDateObj.getFullYear() &&
    dateArray[1] - 1 == currentDateObj.getMonth() &&
    dateArray[2] == currentDateObj.getDate() &&
    timeArray[0] <= hours &&
    timeArray[1] <= minutes
  ) {
    // console.log("galat time diya user ne ");
    userInputDate = new Date(
      `${shortMonth} ${dateArray[2]}, ${dateArray[0]} ${
        hours + 4
      }:${minutes}:00`
    ).getTime();
  } else {
    userInputDate = new Date(
      `${shortMonth} ${dateArray[2]}, ${dateArray[0]} ${timeArray[0]}:${timeArray[1]}:00`
    ).getTime();
  }

  let timeFunction = setInterval(function () {
    // Get today's date and time
    let currentTime = new Date().getTime();

    // Find the distance between currentTime and the productIdIncrementor down date
    let distance = userInputDate - currentTime;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById(uniqueProductId).innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the productIdIncrementor down is over, write some text
    if (distance < 0) {
      document.getElementById(uniqueProductId).innerHTML = "EXPIRED";
      // console.log(uniqueBidButtonId);
      document.getElementById(uniqueBidButtonId).style.display = "none";
      clearInterval(timeFunction);
    }
  }, 1000);
}

// console.log('Products',productDeatils);
export { productDeatils };

console.log("Products Details", productDeatils);

//   <div class="row border text-dark">
//   <div class="col-sm">
//     <span class="clock fs-2" fw-bold >&#128336</span><br>
//     <p class=" fs-5 fw-bold"  id=${uniqueProductId}></p>
//   </div>

//   <div class="col-sm">
//     Max Bid &#8377
//   </div>
//  </div>

// if (isLogout) {
//   console.log(isLogout + "    logut status");
//  let bidButtons=document.getElementsByClassName("biddingStatus");
//    for(let element=0; element<bidButtons.length; element++){
//     bidButtons[element].disabled="true";
//     console.log(bidButtons[element]);
//   }

// }
// else {
//   console.log(isLogout + "   logut status");
// }

// let stat;

// if(isLogout=== "true")
// {
//   stat=0
// }
// else{
//    stat=1
// }
// if(stat)
// {
//   document.getElementById(uniqueBidButtonId).style.display = "block";
// }
// else{
//   document.getElementById(uniqueBidButtonId).disabled="true";
//   // document.getElementById(uniqueBidButtonId).style.display = "none";
//   console.log("else chala");
// }

// let productContent = `
// <div class="card productCard mt-5 rounded-3 ms-4 mr-5"  style="width: 18rem;">

//       <div class="card-body  rounded-3" >
//                <div class="productName text-center p-1 rounded-3">
//                  <h5 class="card-title">${productName}</h5>
//                </div>

//                <div >
//                  <img src=${url} class="card-img-top img-thumbnail imgShowInCard" alt="...">
//                </div>

//                <div>
//                  <p class="card-text text-start  text-dark"><span class ="fw-bold">Discription:</span>${productDiscription}</p>
//                </div>

//                <div >
//                <p class="card-text   text-dark"><span class ="fw-bold">Initial bid:</span>${productStartingBid} &#8377</p>
//                </div>

//                       <div class="col-sm">
//                         <span class="clock fs-2" fw-bold >&#128336</span>
//                         <span class=" fs-5 fw-bold"  id=${uniqueProductId}></span>
//                       </div>

//                       <div class="col-sm">
//                         Max Bid &#8377
//                       </div>

//                   <div class="d-flex justify-content-between border text-dark >

//                        <span class="col-6">person</span>

//                        <button class="btn btn-primary col-6 biddingStatus" id=${uniqueBidButtonId}  data-bs-toggle="modal" data-bs-target="#exampleModal1">Your bid</button>

//                   </div>

//       </div>
// </div>
//     `;

//   // Append newly created card element to the container
//   container.innerHTML += productContent;
