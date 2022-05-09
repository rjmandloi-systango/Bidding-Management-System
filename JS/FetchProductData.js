import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { userDeatils } from "./fetchUserData.js";
import { capitalize } from "./capitalize.js"
// import {showPopup} from "./popups.js";


console.log(userDeatils);
let highestBidder = {};

let productIdIncrementor = 1;

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


async function allProductDataFetch() {
  // showPopup();
  let userDATA = JSON.parse(localStorage.getItem("USERDATA"));
  if (userDATA == null || userDATA == undefined) {
    //  alert('null')
    let userDATA = {
      id: 0
    };

    localStorage.setItem('USERDATA', JSON.stringify(userDATA));
  }

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
            <div class="card productCard  mt-5 rounded-3 mx-auto "  id=${productId} style="width: 18rem; ">
              <div class="card-body  rounded-3" >
                  <div class="productName text-center p-1 rounded-3">
                    <h5 class="card-title">${capitalize(productName)}</h5>
                  </div>
                  <div >
                    <img src=${url} class="card-img-top img-thumbnail imgShowInCard " alt="...">
                  </div>

                  <div class="col-sm">
                    <span class="clock fs-4" fw-bold >&#128336</span>
                    <span class=" fs-5 fw-bold" data-product-id=${productId}  id=${uniqueProductId}></span>
                  </div>
                 
                 <div class="d-flex justify-content-between"  >
                  <div class="col-sm fw-bold">
                    Max bid  &#8377 <span id=mb_${productId} class="textColorInBidPage"> ${productStartingBid} </span>
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
              let productContentWhenNotLogin = `
                <button class="btn bidNowButton fw-bold col-5 biddingStatus " id=${uniqueBidButtonId}  data-bs-toggle="modal" data-bs-target="#exampleModal1">Bid now</button>
               </div>
                 
                        </div>
                   </div>
                          `;
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

              if (userDATA.id == userId) {
                // console.log("inside disabled");
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
  // alert(highestBidder)

  let maximumBidPrice = document.getElementById(`mb_${productId}`).innerHTML;
  console.log(highestBidder[productId]);
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

async function timer(uniqueProductId, uniqueBidButtonId, bidEndingDate, bidEndingTime) {
  let bidDate = bidEndingDate;
  let bidTime = bidEndingTime;
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
    userInputDate = new Date(
      `${shortMonth} ${dateArray[2]}, ${dateArray[0]} ${hours}:${minutes}:00`).getTime();
  } else {
    userInputDate = new Date(
      `${shortMonth} ${dateArray[2]}, ${dateArray[0]} ${timeArray[0]}:${timeArray[1]}:00`).getTime();
  }
  // }
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
    // console.log("currentProductId"+currentProductId);
    const databaseRef = ref(db);
    await get(child(databaseRef, `Winners/${currentProductId}`)).then((snapshot) => {
      if (typeof snapshot !== "undefined") {
        if (snapshot.exists()) {
          console.log("dbms check kiya" + currentProductId);
          isAlreadyInDatabaseWinners = true;
        }
      }
    })

    // If the productIdIncrementor down is over, write some text
    if (distanceBetweenBidEndTimeAndCurrentTime < 0) {
      document.getElementById(uniqueProductId).innerHTML = "EXPIRED";
      document.getElementById(uniqueBidButtonId).style.display = "none";
      if (!isAlreadyInDatabaseWinners) {
        let expiredProductId = document.getElementById(uniqueProductId).dataset.productId;
        console.log("expired product id " + expiredProductId);
        insertWinnerData(expiredProductId);
      } else {
        console.log("existing winner,,,,,,,,,,,,,,");
      }
      clearInterval(timeFunction);
    }
  }, 1000);
}
let productBidList = [];

highestBiddersOfProducts();
//maximum bidding function

async function highestBiddersOfProducts() {
  // let highestBidder = {};
  let productsKey = [];
  let products = {};
  let sortedBidders = {};
  let productArray = [];

  const que = ref(db, "Bidding-Products");
  await get(que).then((snapshot) => {
    products = { ...snapshot.val() }; //all objects are stored inside products
    productsKey = Object.keys(products);//all object keys are stored inside productsKeys
  });
  console.log('products--->', products);
  productsKey.forEach((key) => {
    let pro = Object.keys(products[key])

    if (Object.keys(products[key]).length) {
      // console.log("else ");
      pro.forEach((key2) => {
        // console.log(products[key][key2]);
        productArray.push(
          products[key][key2]
        );

        productBidList.push(
          products[key][key2]
        );

      })

      productArray.sort((a, b) => {
        if (a.BuyerBidMoney < b.BuyerBidMoney) {
          return 1;
        }
        if (a.BuyerBidMoney > b.BuyerBidMoney) {
          return -1;
        }
        return 0;
      });
      highestBidder[key] = productArray[0];
      sortedBidders[key] = productArray;
      console.log(productArray);
      productArray = [];
    }
  });
  fetchHighestBidder(highestBidder);
  sessionStorage.setItem("SortedBidders", JSON.stringify(sortedBidders));

}

function fetchHighestBidder(highestBidder) {
  console.log("highestBidders", highestBidder);
  let productIds = Object.keys(highestBidder);
  productIds.forEach((key) => {
    document.getElementById(`mb_${highestBidder[key].ProductID}`).innerHTML = `${highestBidder[key].BuyerBidMoney}`;
    let person = userDeatils.find(user => user.id === `${highestBidder[key].BuyerID}`);
    document.getElementById(`maxBidderName_${highestBidder[key].ProductID}`).innerText = capitalize(`${person.FirstName}`);
  });

}


async function insertWinnerData(expiredProductId) {
  // check for empty object 

  // console.log("inside Insert winner data");
  if (Object.keys(highestBidder).length !== 0) {
    // console.log("inside if");
    set(ref(db, "Winners" + "/" + [expiredProductId] + "/"), {
      BuyerBidMoney: highestBidder[expiredProductId].BuyerBidMoney,
      BuyerID: highestBidder[expiredProductId].BuyerID,
      ProductID: highestBidder[expiredProductId].ProductID,
      SellerID: highestBidder[expiredProductId].SellerID

    }).then(() => {
      alert('winner detected success');
      fetchEmails(highestBidder[expiredProductId].BuyerBidMoney, highestBidder[expiredProductId].BuyerID, highestBidder[expiredProductId].ProductID, highestBidder[expiredProductId].SellerID);
    })
      .catch((error) => {
      });
  }
}
async function fetchEmails(BuyerBidMoney, BuyerID, ProductID, SellerID) {
  let buyerEmail, sellerEmail;
  let productData = {};
  console.log('afafa');
  userDeatils.forEach(element => {
    if (element.id == BuyerID) {
      buyerEmail = element.Email;
    }
    if (element.id == SellerID) {
      sellerEmail = element.Email;
    }

  });

  productDeatils.forEach(element => {
    // console.log('elem-->',element);
    let a = Object.keys(element);
    // console.log('a-->',a);
    a.forEach(el => {
      // console.log(element[el]);
      if (element[el] != undefined) {
        let b = Object.keys(element[el]);
        // console.log("bbbbbbbbbbbbbbb--->"+b);
        b.forEach(elb => {
          // console.log(element[el][elb].ProductId);
          if (element[el][elb].ProductId == ProductID) {
            // console.log(element[el][elb]);
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
            sendEmail(buyerEmail, sellerEmail, productData, BuyerBidMoney);

          }
        })
      }
    })
    console.log('product data--->', productData);
  });
}
async function sendEmail(buyerEmail, sellerEmail, productData, BuyerBidMoney) {

  console.log('send email wala chlaa', buyerEmail, sellerEmail);

  if (productData != undefined) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "BidItValueForYourValuables@gmail.com",
      Password: "systango@@",
      To: buyerEmail,
      From: "BidItValueForYourValuables@gmail.com",
      Subject: "Hurray!! ",
      Body: `<div><h2  style="color:chocolate; line-height: 2;"><span>&#127881 ; &#127881 ; &#127881 ;</span><br>  Congratulations for winning the bid on this upcoming 
    trade expo exhibit contract. I wish you all the best and may everything turn out smoothly as you work on greater profits.</h2><br>
    <img src="${productData.ImageURl}" /><br>
    <table  class="table table-striped" style="width:100%;   border: 1px solid white;
    border-collapse: collapse; text-align:left; " >
    <tr>
      <th>Product Id</th>
      <td>${productData.ProductID}</td>
    </tr>

    <tr>
    <th>Product Name</th>
    <td>${productData.ProductName}</td>
    </tr>

    <tr>
    <th>Product Starting Price</th>
    <td>${productData.ProductPrice}</td>
    </tr>

    <tr>
    <th>Auction Winning Price</th>
    <td>${BuyerBidMoney}</td>
    </tr>

    <tr>
    <th>Product Discription</th>
    <td>${productData.ProductDiscription}</td>
    </tr>

    <tr>
    <th>Auction End Date</th>
    <td>${productData.BidDate} ${productData.BitTime}</td>
    </tr>
    
    <tr>
    <th>Seller Name</th>
    <td>${productData.SellerName}</td>
    </tr>
    
    <tr>
    <th>Seller Contact Number</th>
    <td>${productData.SellerContactNumber}</td>
    </tr>

    <th>Seller Email</th>
        <td>${sellerEmail}</td>
        </tr>
      </table>
    </div>`,
    })

      .then(async function (message) {
        await swal({
          title: "Email Send Successufully!",
          text: "You clicked the button!",
          icon: "success",
          button: "Try Again!",
        });

        alert("mail sent successfully")

      })
      .catch(async function (message) {
        await swal({
          title: "Error !",
          text: "You clicked the button!",
          icon: "error",
          button: "Try Again!",
        });

        alert("error")
      });

    Email.send({
      Host: "smtp.gmail.com",
      Username: "BidItValueForYourValuables@gmail.com",
      Password: "systango@@",
      To: sellerEmail,
      From: "BidItValueForYourValuables@gmail.com",
      Subject: "Hurray!! ",
      Body: `<div><h2  style="color:chocolate; line-height: 2;"><span>&#127881 ; &#127881 ; &#127881 ;</span><br>  Congratulations!!!!!  your product is Sold with following information:::  </h2><br>
        <img src="${productData.ImageURl}" /><br>
        <table  class="table table-striped" style="width:100%;   border: 1px solid white;
        border-collapse: collapse; text-align:left; " >
        <tr>
          <th>Product Id</th>
          <td>${productData.ProductID}</td>
        </tr>
    
        <tr>
        <th>Product Name</th>
        <td>${productData.ProductName}</td>
        </tr>
    
        <tr>
        <th>Product Starting Price</th>
        <td>${productData.ProductPrice}</td>
        </tr>
    
        <tr>
        <th>Auction Winning Price</th>
        <td>${BuyerBidMoney}</td>
        </tr>
    
        <tr>
        <th>Product Discription</th>
        <td>${productData.ProductDiscription}</td>
        </tr>
    
        <tr>
        <th>Auction End Date</th>
        <td>${productData.BidDate} ${productData.BitTime}</td>
        </tr>
        
        <th>Buyer Email</th>
        <td>${buyerEmail}</td>
        </tr>
        
          </table>
        </div>`,
    })
      .then(function (message) {
        alert("mail sent successfully222222")
      })
      .catch(function (message) {
        alert("error")
      });
  } else {
    console.log("else")
  }
}
console.log(productBidList);
// const capitalize = (s) => {
//   if (typeof s !== 'string') return ''
//   return s.charAt(0).toUpperCase() + s.slice(1)
// }
export { productDeatils, capitalize };
console.log("Products Details", productDeatils);
