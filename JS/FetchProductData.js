import { db, set, ref, get, child, update, remove } from "./firebase.js";
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
              let productDiscription = element.id[key]["ProductDiscription"];
              let productStartingBid = element.id[key]["ProductPrice"];
              let userId = element.id[key]["UserId"];
              let url = element.id[key]["ImageURl"];
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
             <div class="card productCard mt-5 rounded-3 ms-4 mr-5"  id=${productId} style="width: 18rem;">
              
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
            
                                  <div class="col-sm fw-bold">
                                 Max bid  &#8377 <span id=mb_${productId}> ${productStartingBid} </span>
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
                userDATA.id = "youLoggedOut";
                productLayout = productContent + productContentWhenNotLogin;
              }
              // Append newly created card element to the container
              container.innerHTML += productLayout;

              if (userDATA.id == userId) {
                // console.log("inside disabled");
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
      `${shortMonth} ${dateArray[2]}, ${dateArray[0]} ${hours + 4
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

highestBiddersOfProducts();
//maximum bidding function
async function highestBiddersOfProducts() {
  let highestBidder = {};
  let products = {};
  let productsKey = [];

  // let arr1=[];
  const que = ref(db, "Bidding-Products");

  await get(que).then((snapshot) => {
    products = { ...snapshot.val() }; //all objects are stored inside products
    productsKey = Object.keys(products); //all object keys are stored inside productsKeys
  });
  productsKey.forEach((key) => {
    // console.log(products[key]);
    if (products[key]?.length > 0 && products[key]?.length < 2) {
      highestBidder[key] = products[key];
    } else if (products[key]?.length) {
      const highestProduct = products[key]
        .filter((key) => key)
        .sort((a, b) => {
          // console.log(
          //   a.BuyerBidMoney,
          //   b.BuyerBidMoney,
          //   a.BuyerBidMoney - b.BuyerBidMoney
          // );
          if (a.BuyerBidMoney < b.BuyerBidMoney) {
            return 1;
          }
          if (a.BuyerBidMoney > b.BuyerBidMoney) {
            return -1;
          }
          return 0;
        });
      // console.log(highestProduct);
      highestBidder[key] = highestProduct;
    } //    console.log(products[key].length);
  });
  // console.log(highestBidder);
  fetchHighestBidder(highestBidder);
}

  function fetchHighestBidder(highestBidder) {
    let productIds = Object.keys(highestBidder);
    console.log(productIds);
    productIds.forEach((key) => {
      // console.log(highestBidder[key][0].BuyerBidMoney);
      console.log(highestBidder[key][0]);
   let pcard=   document.getElementById(`mb_${highestBidder[key][0].ProductID}`);
    
      document.getElementById(`mb_${highestBidder[key][0].ProductID}`).innerHTML=`${highestBidder[key][0].BuyerBidMoney}`;
      //  pcard.innerHTML=highestBidder[key][0].BuyerBidMoney;
      // console.log(pcard);
    });
  }
    
export { productDeatils };

console.log("Products Details", productDeatils);

