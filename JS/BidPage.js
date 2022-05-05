import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { userDeatils } from "./fetchUserData.js";



const databaseRef = ref(db);
let UserData = JSON.parse(localStorage.getItem("USERDATA"));
let ProductData = JSON.parse(sessionStorage.ProductData);
let sortedBidders = JSON.parse(sessionStorage.getItem("SortedBidders"));

// fetch user data and product data frrm localStorage and sessionStorage
let productInitialBid = parseInt(ProductData.InitialBid);
let productId = parseInt(ProductData.productId);
console.log(sortedBidders);
console.log(productId);
console.log('User Details-->', userDeatils);

let sellerId = parseInt(ProductData.sellerId);
let buyerId = parseInt(UserData.id);

let bidData = document.getElementById("bidData");
//fetching wallet money from data base and set the wallet money in session...
let walletmoney;
let highestBidderWalletMoney;
let biddersList = {};





async function walletUtilities() {
    await get(child(databaseRef, "User/" + UserData.id + "/Details")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                console.log("log--" + snapshot.val().WalletMoney)
                walletmoney = snapshot.val().WalletMoney
            }
        }
    });
    await get(child(databaseRef, "User/" + ProductData.highestBidderId + "/Details/")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                console.log("log--" + snapshot.val().WalletMoney)
                highestBidderWalletMoney = snapshot.val().WalletMoney
            }
        }
    });
    let a = Object.keys(sortedBidders[productId]);
    a.forEach(element => {
        console.log(sortedBidders[productId][element].BuyerID);
        console.log(sortedBidders[productId][element].BuyerBidMoney);
        let user = userDeatils.find(user => user.id === `${sortedBidders[productId][element].BuyerID}`);
        console.log(user.FirstName);
        // biddersList.push(
        //     {
        //         "name": user.FirstName,
        //         "money": sortedBidders[productId][element].BuyerBidMoney
        //     })
        biddersList[element] = {
            "name": user.FirstName,
            "money": sortedBidders[productId][element].BuyerBidMoney

        }
    });

    sessionStorage.setItem("WalletMoney", walletmoney);

}

walletUtilities().then(() => {

    console.log(biddersList);
    let tablebody = document.getElementById("tbodyid");
    let counter = 0;
    let biddersListKeys = Object.keys(biddersList);
    biddersListKeys.forEach(key => {



        console.log(biddersList[key]["name"]);
        console.log(biddersList[key]["money"]);
        if (counter <= 4) {
            let row = document.createElement("tr");
            let name = document.createElement("td");
            let money = document.createElement("td");
            name.innerHTML = biddersList[key]["name"];
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
                    <p class="card-text   text-dark"><span class ="fw-bold">Initial bid:</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${productInitialBid} &#8377</p>
                    </div>

                    <div>
                    <p class="card-text   text-dark"><span class ="fw-bold">bid last date:&nbsp&nbsp&nbsp</span>${ProductData.betime}</p>
                    </div>

                    <div>
                    <p class="card-text   text-dark"><span class ="fw-bold">Maximum Bid:</span>${ProductData.maximumBidPrice}</p>
                    </div>
                    </div>
                    </div>
      <div class=" card productCard col-md-4 mt-4  rounded-3">
                    <h5 class="text-center textColorInBidPage">Place Your Bid here...</h5>
                    <div>
                    <input  type="number" placeholder="place bid" id="bidMoney">
                    <button class="addProductButton" id="bidMoneybtn">Place</button>
                    </div>
                    <p class="mt-4 textColorInBidPage "># Make sure you have enough money to place your bid. </p>
                    
                    <img  src="../images/bid.jpg" class="image-fluid"  alt="...">
                    
      </div>
      <div class=" card productCard col-md-4 m-4 rounded-3">

        <h2 class="textColorInBidPage text-center">Top Bidders</h2>
               
        <table id="biddersTable">
                <thead>
                    <tr>
                    <th>Bidder Name</th>
                    <th>Bidding Money</th>
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
function insertBid() {
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
                    .then(() => {
                        alert('Cogrates your bid added successfully...')
                        // window.open(`../index.html`);
                        // alert('-')
                        update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: parseInt(walletmoney) - bidMoney })
                            .then(() => {
                                // alert('+')
                                if (highestBidderWalletMoney != undefined) {
                                    update(ref(db, "User/" + ProductData.highestBidderId + "/Details"), { WalletMoney: parseInt(highestBidderWalletMoney) + parseInt(ProductData.maximumBidPrice) }).then(() => {
                                    })

                                }
                                location.href = '../index.html';
                            })
                        // 

                    })
                    .catch((error) => {
                        alert("error aa gai h");
                    });
                // update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: walletmoney - bidMoney })


            } else {
                alert("you dose not bid smaller than Maximum Bid.")

            }
        } else {
            alert("You do not have enough money in your wallet.");

        }
    }
}
