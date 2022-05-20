import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { userDeatils } from "./fetchUserData.js";
import { capitalize } from "./capitalize.js"

// console.log(userDeatils);

let highestBidder = {}; // object to store only highest bidders 
let productIdIncrementor = 1;
let bidButtonIdIncrementor = 1;
let bidDate = document.getElementById("bidDate"); //bid ending date
let currentDateObj = new Date();
let currentMonth = currentDateObj.getMonth() + 1;
let currentDate = currentDateObj.getDate();
let minDateString = `${currentDateObj.getFullYear()}-`;
if (currentMonth < 10) {                          //formating the date in yyyy-mm-dd format
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
async function allProductDataFetch() {
  let isLogout = localStorage.getItem("STATUS"); //FALSE=LOGIN   TRUE=LOGOUT
  let checkLogin = JSON.parse(localStorage.getItem("USERDATA"));  // only when user uses app for first time 
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
        if (element?.id) {
          Object.keys(element.id).forEach((key) => {
            createCard();
            //create card for all the products
            function createCard() {
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
              // console.log(userId);
              //check for login status                 
              let isLogin;
              if (isLogout === "true" || checkLogin.id == 0) {
                isLogin = 0;
              } else {
                isLogin = 1;
              }

              //card content
              let productContent = `
            <div class="card productCard  mt-5 rounded-3 mx-auto " data-is-Already-Stored="False" data-max-Bidder-Id  id=${productId} style="width: 18rem; ">
              <div class="card-body  rounded-3" >
                  <div class="productName text-center p-1 rounded-3">
                    <h5 class="card-title">${capitalize(productName)}</h5>
                  </div>
                  <div >
                    <img src=${url} class="card-img-top img-thumbnail imgShowInCard " alt="...">
                  </div>

                  <div class="col-sm">
                    <span class="clock fs-4" fw-bold >&#128336</span>
                    <span class=" fs-5 fw-bold"  data-product-Owner-Id=${userId}  data-product-id=${productId}  id=${uniqueProductId}></span>
                  </div>
                 
                 <div class="d-flex justify-content-between" >
                  <div class="col-sm fw-bold">
                    Max bid:  &#8377 <span id=mb_${productId}   class="textColorInBidPage"> ${productStartingBid} </span>
                  </div class="col-sm fw-bold">
                  <div>
                    <i class="fa fa-user " style="color:chocolate;"></i> <span class="col-6 fw-bold"  id="maxBidderName_${productId}">--::--</span>
                  </div>
                  </div>

                  <div >
                    <p class="card-text fw-bold text-dark"><span class ="fw-bold">Starting bid:</span> &#8377 ${productStartingBid} </p>
                  </div>
                  
                  <div class="d-flex justify-content-between  border text-dark" >
                  <div>
                  <details>
                     <summary style="color:white; background-color:chocolate; width:130px; "><b>View details</b></summary>
                    <p class="card-text text-start  text-dark"><span class ="fw-bold"></span>${capitalize(productDiscription)}</p>
                    </details>
                  </div>
                    
                  `;

              // added to card when user is logged out 
              let productContentWhenNotLogin = `
                <button class="btn bidNowButton fw-bold col-5 biddingStatus " id=${uniqueBidButtonId}  data-bs-toggle="modal" data-bs-target="#exampleModal1">Bid now</button>
                          </div>
                        </div>
                      </div>
                          `;
              // added to card when user is logged in 
              let productContentWhenLogin = `
                    <button  class="btn bidNowButton fw-bold col-5 biddingStatus " id=${uniqueBidButtonId} onclick="fetchProductData('${productName}','${sellerName}','${bidEndingDate}','${productStartingBid}','${productId}','${url}','${sellerId}')" >Bid now</button>
                        </div>
                      </div>
                    </div>
                          `;

              userDATA = JSON.parse(localStorage.getItem("USERDATA"));
              let productLayout;
              if (isLogin) {
                productLayout = productContent + productContentWhenLogin;
              } else {
                userDATA.id = "youLoggedOut";
                productLayout = productContent + productContentWhenNotLogin;
              }
              // Append newly created card element to the container
              container.innerHTML += productLayout;
              // bid now button is disabled when 
              if (userDATA.id == userId) {
                document.getElementById(uniqueBidButtonId).disabled = true;
              }


              //to auto close discription of other products while targetting specific product 
              const details = document.querySelectorAll("details");
              // Add the onclick listeners.
              details.forEach((targetDetail) => {
                targetDetail.addEventListener("click", () => {
                  // Close all the details that are not targetDetail.
                  details.forEach((detail) => {
                    if (detail !== targetDetail) {
                      detail.removeAttribute("open");
                    }
                  });
                });
              });


              // calling reverse timer for all products
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



  let maximumBidPrice = document.getElementById(`mb_${productId}`).innerHTML;
  // console.log(highestBidder[productId]);
  let highestBidderId = 0;
  if (highestBidder[productId] != undefined) {
    highestBidderId = highestBidder[productId].BuyerID;
  }


  productObj = {
    pname: pname,
    sname: sname,
    betime: betime,
    InitialBid: InitialBid,
    productId: productId,
    url: url,
    sellerId: sellerId,
    maximumBidPrice: maximumBidPrice,
    highestBidderId: highestBidderId,
  };
  sessionStorage.setItem("ProductData", JSON.stringify(productObj));

  // export defa {prducts};
  window.open(`HTML/BidPage.html`, '_blank');

};


// reverse timer function for products
async function timer(uniqueProductId, uniqueBidButtonId, bidEndingDate, bidEndingTime) {

  let bidDate = bidEndingDate;
  let bidTime = bidEndingTime;
  let dateArray = bidDate.split("-");//hh-mm(24 hour time format)
  let timeArray = bidTime.split(":"); //yyyy-mm-dd
  let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]); //year-month-day
  let shortMonth = date.toLocaleString("en-us", { month: "short" });
  let userInputDate;

  userInputDate = new Date(
    `${shortMonth} ${dateArray[2]}, ${dateArray[0]} ${timeArray[0]}:${timeArray[1]}:00`).getTime();

  //timer operates on 1 second of interval
  let timeFunction = setInterval(async function () {
    // Get today's date and time
    let currentTime = new Date().getTime();

    // Find the distanceBetweenBidEndTimeAndCurrentTime between currentTime and the productIdIncrementor down date
    let distanceBetweenBidEndTimeAndCurrentTime = userInputDate - currentTime;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distanceBetweenBidEndTimeAndCurrentTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distanceBetweenBidEndTimeAndCurrentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distanceBetweenBidEndTimeAndCurrentTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distanceBetweenBidEndTimeAndCurrentTime % (1000 * 60)) / 1000);
    let isAlreadyInDatabaseWinners = false;
    // Output the result in an element with id="demo"

    document.getElementById(uniqueProductId).innerHTML =
      days + "D " + hours + "H " + minutes + "M " + seconds + "S ";
    let currentProductId = document.getElementById(uniqueProductId).dataset.productId;
    const databaseRef = ref(db);


    //check if the products is already present in the winning list 
    await get(child(databaseRef, `Winners/${currentProductId}`)).then((snapshot) => {
      if (typeof snapshot !== "undefined") {
        if (snapshot.exists()) {
          // console.log("dbms check kiya" + currentProductId);
          isAlreadyInDatabaseWinners = true;
        }
      }
    })

    let isAlreadySold = false;
    let currentUserId = document.getElementById(uniqueProductId).dataset.productOwnerId;
    let currentBuyerId = document.getElementById(currentProductId).dataset.maxBidderId;


    //checking for expired products
    if (distanceBetweenBidEndTimeAndCurrentTime <= 0) {
      
       //check for already sold product  ni db
      await get(child(databaseRef, `User/${currentUserId}/Details/ProductSold/${currentProductId}/`)).then((snapshot) => {
        if (typeof snapshot !== "undefined") {
          if (snapshot.exists()) {
            if (snapshot.val().ProductStatus) {  // if product status exists and is set to sold 
              // console.log("is already sold ");
              isAlreadySold = true;
            }
          }
        }
      })

      document.getElementById(uniqueProductId).innerHTML = "EXPIRED";
      document.getElementById(uniqueBidButtonId).style.display = "none";
      let productStatus;
      if (document.getElementById(`maxBidderName_${currentProductId}`).innerHTML == "--::--") {
        productStatus = "Unsold";
      } else {
        productStatus = "sold";
      }

      if (isAlreadySold != true) {
        // entry form purchased products i buyer DB
        if (currentBuyerId != "") {
          await update(ref(db, `User/${currentBuyerId}/Details/PurchasedProducts/` + [currentProductId]), {
            ProductId: currentProductId,
            ProductStatus: "Purchased",
          }).then(() => {
          })
            .catch((error) => {
              console.log(error);
            });
        }

        // entry for expired products (sold/unsold) IN SELLER DB  
        await update(ref(db, `User/${currentUserId}/Details/ProductSold/${currentProductId}`), {
          ProductStatus: productStatus,
        }).then(() => {
        })
          .catch((error) => {
            console.log(error);
          });
      }

      //if the product is already present in winners list it won't be repeated again
      if (!isAlreadyInDatabaseWinners && isAlreadySold != true && document.getElementById(`maxBidderName_${currentProductId}`).innerHTML != "--::--") {
        let expiredProductId = document.getElementById(uniqueProductId).dataset.productId;
        // console.log("expired product id " + expiredProductId);
        insertWinnerData(expiredProductId);
      }
      clearInterval(timeFunction);
    }
  }, 1000);
}


let productBidList = []; //  
highestBiddersOfProducts(); //function to sort the winners and to set max bidder to the product  

//maximum bidding function
async function highestBiddersOfProducts() {
  let productsKey = [];
  let products = {};
  let sortedBidders = {};
  let productArray = [];

  const dbPath = ref(db, "Bidding-Products");
  await get(dbPath).then((snapshot) => {
    products = { ...snapshot.val() }; //all objects are stored inside products
    productsKey = Object.keys(products);//all object keys are stored inside productsKeys
  });
  // console.log('products--->', products);
  productsKey.forEach((key) => {
    let productKeysForParticularUser = Object.keys(products[key])
    if (Object.keys(products[key]).length) {
      // console.log("else ");
      productKeysForParticularUser.forEach((key2) => {
        // console.log(products[key][key2]);
        productArray.push(
          products[key][key2]
        );


        productBidList.push(
          products[key][key2]
        );

      })

      //sorting for maximum bidder 
      productArray.sort((a, b) => {
        if (a.BuyerBidMoney < b.BuyerBidMoney) {
          return 1;
        }
        if (a.BuyerBidMoney > b.BuyerBidMoney) {
          return -1;
        }
        return 0;
      });

      //pushing max bidders to highestBidder
      highestBidder[key] = productArray[0];
      sortedBidders[key] = productArray;
      // console.log(productArray);
      productArray = [];
    }
  });

  fetchHighestBidder(highestBidder);
  sessionStorage.setItem("SortedBidders", JSON.stringify(sortedBidders));

}

//getting highrst bidders and also setting their values to the product cards 
function fetchHighestBidder(highestBidder) {
  // console.log("highestBidders", highestBidder);
  let productIds = Object.keys(highestBidder);
  productIds.forEach((key) => {
    // console.log(key);
    document.getElementById(`mb_${highestBidder[key].ProductID}`).innerHTML = `${highestBidder[key].BuyerBidMoney}`;
    let person = userDeatils.find(user => user.id === `${highestBidder[key].BuyerID}`);
    document.getElementById(`maxBidderName_${highestBidder[key].ProductID}`).innerText = capitalize(`${person.FirstName}`);
    document.getElementById(key).dataset.maxBidderId = highestBidder[key].BuyerID;//new added 
  });

}

//if a product is expired the data is stored inside Winners 
async function insertWinnerData(expiredProductId) {
  // check for empty object 
  if (Object.keys(highestBidder).length !== 0) {
    set(ref(db, "Winners" + "/" + [expiredProductId] + "/"), {
      BuyerBidMoney: highestBidder[expiredProductId].BuyerBidMoney,
      BuyerID: highestBidder[expiredProductId].BuyerID,
      ProductID: highestBidder[expiredProductId].ProductID,
      SellerID: highestBidder[expiredProductId].SellerID
    }).then(() => {
      // alert('winner detected success');
      fetchEmails(highestBidder[expiredProductId].BuyerBidMoney, highestBidder[expiredProductId].BuyerID, highestBidder[expiredProductId].ProductID, highestBidder[expiredProductId].SellerID);
    })
      .catch((error) => {
      });
  }
}

// getting the email of winner and also the seller 
async function fetchEmails(BuyerBidMoney, BuyerID, ProductID, SellerID) {
  let buyerEmail, sellerEmail, buyerName;
  let productData = {};
  userDeatils.forEach(element => {
    if (element.id == BuyerID) {
      buyerEmail = element.Email;
      buyerName = element.FirstName;
    }
    if (element.id == SellerID) {
      sellerEmail = element.Email;
    }

  });
   

  // getting the details of products for mailing both winner and seller
  productDeatils.forEach(element => {
    let a = Object.keys(element);
    a.forEach(el => {
      if (element[el] != undefined) {
        let b = Object.keys(element[el]);
        b.forEach(elb => {
          if (element[el][elb].ProductId == ProductID) {
            productData = {
              BidDate: element[el][elb].BidDate,
              BitTime: element[el][elb].BitTime,
              ImageURl: element[el][elb].ImageURl,
              ProductDiscription: element[el][elb].ProductDiscription,
              ProductID: element[el][elb].ProductId,
              ProductName: element[el][elb].ProductName,
              ProductPrice: element[el][elb].ProductPrice,
              SellerName: element[el][elb].SellerName,
              SellerContactNumber: element[el][elb].SellerContactNumber,
              UserId: element[el][elb].UserId,
            };
            console.log("send mail chala");
            // sendEmail(buyerEmail, buyerName, sellerEmail, productData, BuyerBidMoney);

          }
        })
      }
    })
    // console.log('product data--->', productData);
  });
}

// sending mail to winner and seller
async function sendEmail(buyerEmail, buyerName, sellerEmail, productData, BuyerBidMoney) {
  if (productData != undefined) {
    //email send to auction winner after product expired
    let space = '________________________________';
    document.getElementById("WinnerName").value = buyerName
    document.getElementById("winnerEmail").value = buyerEmail;
    document.getElementById("productInformationWinner").value = `
              Congratulations for winning the bid on this upcoming
              trade expo exhibit contract. I wish you all the best and may everything turn out smoothly as you work on greater profits.
              Product Image => ${productData.ImageURl}${space}
              Product Id => ${productData.ProductID} ${space}
              Product Name => ${productData.ProductName}${space}
              Product Starting Price => ${productData.ProductPrice}${space}
              Auction Winning Price => ${BuyerBidMoney}${space}
              Product Discription => ${productData.ProductDiscription}${space}
              Auction End Date => ${productData.BidDate} ${productData.BitTime}${space}
              Seller Name => ${productData.SellerName}${space}
              Seller Contact Number => ${productData.SellerContactNumber}${space}
              Seller Email => ${sellerEmail}${space}
              `;
    document.getElementById('Winner-Form').addEventListener('submit', function (event) {
      event.preventDefault();
      emailjs.sendForm('service_azr4btl', 'template_6xrullv', this)
        .then(async function () {
        }, function (error) {
          console.log('FAILED...', error);
        });
    });
    document.getElementById("sendMailToWinner").click();

    //email send to product seller after product expired
    document.getElementById("sellerEmail").value = sellerEmail;
    document.getElementById("productInformationSeller").value = `
              Congratulations!!!!! your product is Sold with following information:::
              Product Image => ${productData.ImageURl}${space}
              Product Id => ${productData.ProductID} ${space}
              Product Name => ${productData.ProductName}${space}
              Product Starting Price => ${productData.ProductPrice}${space}
              Auction Winning Price => ${BuyerBidMoney}${space}
              Product Discription => ${productData.ProductDiscription}${space}
              Auction End Date => ${productData.BidDate} ${productData.BitTime}${space}
              Buyer Name => ${buyerName}
              Buyer Email => ${buyerEmail}
              `;
    document.getElementById('Seller-Form').addEventListener('submit', function (event) {
      event.preventDefault();
      emailjs.sendForm('service_azr4btl', 'template_6xrullv', this)
        .then(async function () {
        }, function (error) {
          console.log('FAILED...', error);
        });
    });
    document.getElementById("sendMailToSeller").click();
  }
}
// console.log(productBidList);

export { productDeatils, capitalize };
// console.log("Products Details", productDeatils);
