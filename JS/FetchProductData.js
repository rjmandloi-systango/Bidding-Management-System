import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { userDeatils } from "./fetchUserData.js";
console.log(userDeatils);
let highestBidder = {};

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


async function allProductDataFetch() {
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
            <div class="card productCard mt-5 rounded-3  m-2 ms-3"  id=${productId} style="width: 18rem;">
              <div class="card-body  rounded-3" >
                  <div class="productName text-center p-1 rounded-3">
                    <h5 class="card-title">${capitalize(productName)}</h5>
                  </div>
                  <div >
                    <img src=${url} class="card-img-top img-thumbnail imgShowInCard" alt="...">
                  </div>
                  <div>
                    <p class="card-text text-start  text-dark"><span class ="fw-bold">Discription:</span>${capitalize(productDiscription)}</p>
                  </div>
                  <div >
                    <p class="card-text   text-dark"><span class ="fw-bold">Initial bid:</span>${productStartingBid} &#8377</p>
                  </div>
                  <div class="col-sm">
                    <span class="clock fs-2" fw-bold >&#128336</span>
                    <span class=" fs-5 fw-bold" data-product-id=${productId}  id=${uniqueProductId}></span>
                  </div>
                  <div class="col-sm fw-bold">
                    Max bid  &#8377 <span id=mb_${productId}> ${productStartingBid} </span>
                  </div>
                  <div class="d-flex justify-content-between border text-dark" >
                    <div>
                    <i class="fa fa-user fs-2" style="color:chocolate;"></i> <span class="col-6" id="maxBidderName_${productId}">--::--</span>
                    </div>
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
  // alert(highestBidder)

  let maximumBidPrice = document.getElementById(`mb_${productId}`).innerHTML;
   console.log(highestBidder[productId]);
   let highestBidderId=0;
   if(highestBidder[productId]!=undefined){
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
    window.open(`HTML/BidPage.html`, '_blank');

};

async function timer(uniqueProductId, uniqueBidButtonId, bidData1, bidTime1) {
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
    // needto fix this 
    userInputDate = new Date(
      `${shortMonth} ${dateArray[2]}, ${dateArray[0]} ${hours + 0
      }:${minutes}:00`
    ).getTime();
  } else {
    userInputDate = new Date(
      `${shortMonth} ${dateArray[2]}, ${dateArray[0]} ${timeArray[0]}:${timeArray[1]}:00`
    ).getTime();
  }

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
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

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
  let products = {};
  let productsKey = [];
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
      console.log(productArray);
      productArray = [];
    }
  });
  fetchHighestBidder(highestBidder);
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
  console.log(highestBidder[expiredProductId]);
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
      // alert("error aa gai h");
    });
}
async function fetchEmails(BuyerBidMoney, BuyerID, ProductID, SellerID) {
  let buyerEmail, sellerEmail;
  let productData = {};
  // console.log("emailsender run---->"+BuyerBidMoney,BuyerID,ProductID,SellerID)

  // console.log("00000000000",userDeatils)
  console.log('afafa');

  userDeatils.forEach(element => {
    // console.log(element.id)
    if (element.id == BuyerID) {
      // console.log("Buyer email--->",element.Email)
      buyerEmail = element.Email;
    }
    if (element.id == SellerID) {
      // console.log("seller email--->",element.Email)
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
    // maybe productData are undefined
    console.log('product data--->', productData);


  });

  // console.log('afafa');

}

async function sendEmail(buyerEmail, sellerEmail, productData, BuyerBidMoney) {

  console.log('send email wala chlaa', buyerEmail, sellerEmail);
  // console.log('product data--->', productData);
  // let userEmail = document.getElementById("userEmail").value;

  // alert(userEmail)
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

      .then(function (message) {
        alert("mail sent successfully")
      })
      .catch(function (message) {
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

// function checkForAlreadyExistingEntryInWinner(currentProductId)
// {

// }

console.log(productBidList);

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}



export { productDeatils, capitalize };
console.log("Products Details", productDeatils);

// {"pname":"moblie","sname":"shubham singh","betime":"2022-04-29","InitialBid":"1200","productId":"676","url":"https://firebasestorage.googleapis.com/v0/b/bidding-management-syste-da0d1.appspot.com/o/Images%2F1650369521398.JPEG?alt=media&token=6d8519ff-ca68-41b3-9e21-6ead392d9a0d","sellerId":"1"}


// {"pname":"","sname":"shubham singh","betime":"2022-05-01","InitialBid":"25000","productId":"131","url":"https://firebasestorage.googleapis.com/v0/b/bidding-management-syste-da0d1.appspot.com/o/Images%2Fdownload.jpeg?alt=media&token=702708b6-7a38-4420-8499-726c4d96c20e","sellerId":"1","maximumBidPrice":" 25000 "}