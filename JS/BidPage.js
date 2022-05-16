import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { userDeatils } from "./fetchUserData.js";
import { capitalize } from "./capitalize.js"

const databaseRef = ref(db);
let UserData = JSON.parse(localStorage.getItem("USERDATA"));
let ProductData = JSON.parse(sessionStorage.ProductData);
let sortedBidders = JSON.parse(sessionStorage.getItem("SortedBidders"));
// fetch user data and product data frrm localStorage and sessionStorage
let productInitialBid = parseInt(ProductData.InitialBid);
let productId = parseInt(ProductData.productId);
// console.log(sortedBidders);
// console.log(productId);
// console.log('User Details-->', userDeatils);
let sellerId = parseInt(ProductData.sellerId);
let buyerId = parseInt(UserData.id);
let bidData = document.getElementById("bidData");
//fetching wallet money from data base and set the wallet money in session...
let walletmoney;
let highestBidderWalletMoney;
let biddersList = {};
document.getElementById("loggedInUserName").innerHTML = capitalize(UserData.FirstName);

async function walletUtilities() {
    await get(child(databaseRef, "User/" + UserData.id + "/Details")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                // console.log("log--" + snapshot.val().WalletMoney);
                walletmoney = snapshot.val().WalletMoney;
            }
        }
    });
    await get(child(databaseRef, "User/" + ProductData.highestBidderId + "/Details/")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                // console.log("log--" + snapshot.val().WalletMoney)
                highestBidderWalletMoney = snapshot.val().WalletMoney
            }
        }
    });
    sessionStorage.setItem("WalletMoney", walletmoney);
}

walletUtilities().then(() => {


    let a = Object.keys(sortedBidders[productId]);
    a.forEach(element => {
        // console.log(sortedBidders[productId][element].BuyerID);
        // console.log(sortedBidders[productId][element].BuyerBidMoney);
        let user = userDeatils.find(user => user.id === `${sortedBidders[productId][element].BuyerID}`);
        // console.log(user.FirstName);
        biddersList[element] = {
            "name": user.FirstName,
            "money": sortedBidders[productId][element].BuyerBidMoney
        }
    });



    // console.log(biddersList);
    let tablebody = document.getElementById("tbodyid");
    let counter = 0;
    let biddersListKeys = Object.keys(biddersList);
    biddersListKeys.forEach(key => {

        // console.log(biddersList[key]["name"]);
        // console.log(biddersList[key]["money"]);
        if (counter <= 4) {
            let row = document.createElement("tr");
            let name = document.createElement("td");
            name.className = "fw-bolder";
            let money = document.createElement("td");
            money.className = "fw-bolder";
            name.innerHTML = capitalize(biddersList[key]["name"]);
            money.innerHTML = biddersList[key]["money"];
            row.appendChild(name);
            row.appendChild(money);
            tablebody.appendChild(row);
        }
        counter++;
    })

});

bidDataContainer();
async function bidDataContainer() {
    {/* <h1 style="color: #194681;">${ProductData.pname}</h1> */ }

    let bidContent = ` 

  <div class="container-fluid mt-5">
  <div class="row biddingPageDiv" >
     
      <div class=" card productCard  col-md-3 m-4  rounded-3">
       
                    <div class="card-body  rounded-3" >
                                    
                    <div class="productName text-center p-1 rounded-3">
                    <h5 class="card-title ">${ProductData.pname}</h5>    
                    </div>

                    <div >
                        <img src=${ProductData.url} class="card-img-top img-thumbnail imgShowInCard" alt="...">
                    </div>

                    <div >
                    <p class="fw-bold">Starting bid:<span class="textColorInBidPage"> &#8377 ${productInitialBid}</span></p>
                    </div>
 
                    <div>
                    <p class ="fw-bold">Maximum Bid:<span class="textColorInBidPage">${ProductData.maximumBidPrice}</span></p>
                    </div>

                    <div>
                    <p class ="fw-bold">Bid ends on:<span class="textColorInBidPage">${ProductData.betime}</span></p>
                    </div>

                   
                    </div>
                    </div>
      <div class=" card productCard col-md-4 mt-4  rounded-3">
                    <h5 class="text-center textColorInBidPage">Place Your Bid here...</h5>
                    <div>
                    <input  type="number" min="0"  placeholder="place bid" id="bidMoney" oninput="validity.valid||(value=value.replace(/\D+/g, ''))">
                    <button class="addProductButton" id="bidMoneybtn">Place</button>
                    </div>
                    <p class="mt-4 textColorInBidPage "># Make sure you have enough money to place your bid. </p>
                    <p class="mt-4 textColorInBidPage "><b style="color:red;">* Once you placed the bid , there is no going back. </b></p>
                    
                    <img  src="../images/bid.jpg" class="image-fluid"  alt="...">
                    
      </div>
      <div class=" card productCard col-md-4 m-4 rounded-3">

        <h2 class="textColorInBidPage text-center">Top Bidders</h2>
               
        <table class="table text-center" id="biddersTable">
                <thead>
                    <tr>
                    <th class="textColorInBidPage">Bidder Name</th>
                    <th class="textColorInBidPage">Bidding Money</th>
                    </tr>
                </thead>          
                <tbody id="tbodyid">       
                </tbody>
                    
        </table>
      </div>
    </div>
  </div>
`;
    bidData.innerHTML = bidContent;
}


// place bid button id
let bidMoneybtn = document.getElementById("bidMoneybtn");

bidMoneybtn.addEventListener("click", insertBid);
async function insertBid() {
    if (confirm("Are you sure want to place a bid?")) {
        let walletMoney = parseInt(sessionStorage.getItem("WalletMoney"));

        let bidMoney = parseInt(document.getElementById("bidMoney").value);
        if (walletMoney >= bidMoney) {
            if (bidMoney > ProductData.maximumBidPrice) {
                set(ref(db, "Bidding-Products/" + (productId) + "/" + (buyerId) + "/"), {
                    BuyerID: buyerId,
                    BuyerBidMoney: bidMoney,
                    SellerID: sellerId,
                    ProductID: productId
                })
                    .then(async () => {
                        // alert('Cogrates your bid added successfully...')
                        await swal({
                            title: "Congrats your bid added successfully!",
                            text: "You clicked the button!",
                            icon: "success",
                            button: "Done",
                        });
                        if(UserData.id == ProductData.highestBidderId)
                        {
                            update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: parseInt(walletmoney) +(parseInt(ProductData.maximumBidPrice - bidMoney)) });
                            // console.log(parseInt(ProductData.maximumBidPrice) , parseInt(highestBidderWalletMoney) , bidMoney ,parseInt(walletmoney));
                            // console.log(UserData.id , ProductData.highestBidderId) ;
                            location.href = '../index.html';                                    
                        }
                        else{               
                        update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: parseInt(walletmoney) - bidMoney })
                            .then(() => {
                                if (highestBidderWalletMoney != undefined) {
                                    update(ref(db, "User/" + ProductData.highestBidderId + "/Details"), { WalletMoney: parseInt(highestBidderWalletMoney) + parseInt(ProductData.maximumBidPrice) }).then(() => {
                                    })
                                }
                                    location.href = '../index.html';                                    
                            })
                        // 
                         }
                    })
                    .catch((error) => {
                        alert("error aa gai h");
                    });
                // update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: walletmoney - bidMoney })
            } else {
                // alert("you dose not bid smaller than Maximum Bid.")
                await swal({
                    title: "You cannot bid smaller than Maximum Bid!",
                    text: "You clicked the button!",
                    icon: "info",
                    button: "Done",
                });

            }
        } else {
            // alert("You do not have enough money in your wallet.");
            await swal({
                title: "Opps insuffucient funds in wallet",
                text: "You clicked the button!",
                icon: "error",
                button: "Done",
            });

        }
    }
}