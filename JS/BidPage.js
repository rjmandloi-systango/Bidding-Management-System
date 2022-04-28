import { db, set, ref, get, child, update, remove } from "./firebase.js";
const databaseRef = ref(db);


let UserData = JSON.parse(localStorage.getItem("USERDATA"));
let ProductData = JSON.parse(sessionStorage.ProductData);
// fetch user data and product data frrm localStorage and sessionStorage
let productInitialBid = parseInt(ProductData.InitialBid);
let productId = parseInt(ProductData.productId);
let sellerId = parseInt(ProductData.sellerId);
let buyerId = parseInt(UserData.id);

let bidData = document.getElementById("bidData");
//fetching wallet money from data base and set the wallet money in session...
let walletmoney;
let highestBidderWalletMoney;
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


    sessionStorage.setItem("WalletMoney", walletmoney);

}
walletUtilities()



bidDataContainer();
function bidDataContainer() {

    let bidContent = ` 
<h1 style="color: #194681;">${ProductData.pname}</h1>
<div class="container">
    <div class="d-flex flex-column flex-md-row mb-4">
        <div class=" col-12 col-md-6">
        
        <div class="card productCard mt-0 rounded-3 ms-4 mr-5 "  style="width: 20rem;">
              
                  <div class="card-body  rounded-3" >
                  <div class="productName text-center p-1 rounded-3">
                             <h5 class="card-title ">Seller : ${ProductData.sname}</h5>    
                           </div>
            
                           <div >
                             <img src=${ProductData.url} class="card-img-top img-thumbnail imgShowInCard" alt="...">
                           </div>
            
                           <div >
                           <p class="card-text   text-dark"><span class ="fw-bold">Initial bid:</span>${productInitialBid} &#8377</p>
                           </div>
                           <div >
                           <p class="card-text   text-dark"><span class ="fw-bold">bid last date:</span>${ProductData.betime} &#8377</p>
                           </div>
                           <div class="d-flex justify-content-between border text-dark >
                           <span class="col-6">Max Bidder Price</span>
                           <p>${ProductData.maximumBidPrice}</p>   
                       </div>
                      
                     
                  </div>
             </div>
        </div>
        <div class="col-12 col-md-6 text-center card productCard mt-0 rounded-3 ms-4 mr-5" style="width: 25rem; >
            <div>
                <h2 style="color:chocolate;">Place Your Bid here...</h2>
                <input  type="number" placeholder="place bid" id="bidMoney">
                <button id="bidMoneybtn">Place</button>
                <h5 class="mt-4 "># Make sure you have enough money to place your bid. </h5>
                
                <img src="../images/bid.jpg" class="card-img-top img-thumbnail " alt="...">
            
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-between flex-column flex-md-row">
    <div class="col-6 col-md-3" style="background-color: rgb(222, 41, 238);">
            <div>
                <h2>Leader Board</h2>
                <p>1st position</p>
                <p>2nd position</p>
                <p>3rd position</p>
            </div>
        </div>
        <div class=" col-6 col-md-3" style="background-color: rgb(199, 25, 190);">
            <h2>Last 10 Bidders Name</h2>
            <p>1st</p>
            <p>2nd</p>
            <p>3rd</p>
            <p>4th</p>
            <p>5th</p>
        </div>
        <div class="col-6 col-md-3" style="background-color: rgb(132, 161, 161);">
            <h2>My last Bid</h2>
        </div>
    </div>
</div>`;
    bidData.innerHTML = bidContent;
}

// place bid button id
let bidMoneybtn = document.getElementById("bidMoneybtn");

bidMoneybtn.addEventListener("click", insertBid);
function insertBid() {
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
                    alert('-')
                    update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: parseInt(walletmoney) - bidMoney })
                        .then(() => {
                            alert('+')
                            if (highestBidderWalletMoney != undefined) {
                                update(ref(db, "User/" + ProductData.highestBidderId + "/Details"), { WalletMoney: parseInt(highestBidderWalletMoney) + parseInt(ProductData.maximumBidPrice) }).then(() => {
                                })

                                }
                        location.href = '../index.html';
                })
            // 

        })
                .catch ((error) => {
            alert("error aa gai h");
        });
        /*************** */
        // update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: walletmoney - bidMoney })


    } else {
        alert("you dose not bid smaller than Maximum Bid.")

    }
} else {
    alert("You do not have enough money in your wallet.");
}
}