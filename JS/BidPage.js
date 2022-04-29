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
    {/* <h1 style="color: #194681;">${ProductData.pname}</h1> */ }


    let bidContent = ` 

<div class="container" style="margin-top:50px;">
    <div class="d-flex flex-column flex-md-row mb-4">
        <div class=" col-12 col-md-6">
        
        <div class="card productCard mt-0 rounded-3 ms-4 mr-5 "  style="width: 20rem;">
              
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
                           <div >
                           
                           <p class="card-text   text-dark"><span class ="fw-bold">bid last date:&nbsp&nbsp&nbsp</span>${ProductData.betime}</p>
                           </div>
                           <div >
                           
                           <p class="card-text   text-dark"><span class ="fw-bold">Maximum Bid:</span>${ProductData.maximumBidPrice}</p>
                           </div>
                  </div>
             </div>
        </div>

        <div class="col-12 col-md-6 text-center card productCard mt-0 rounded-3 ms-4 mr-5" style="width: 25rem;color:chocolate;>
            <div style="clore:#">
                <h5>Place Your Bid here...</h5>
                <div>
                <input  type="number" placeholder="place bid" id="bidMoney">
                <button class="addProductButton" id="bidMoneybtn">Place</button>
                </div>
                <h5 class="mt-4 "># Make sure you have enough money to place your bid. </h5>
                
                <img src="../images/bid.jpg" class="card-img-top img-thumbnail " alt="...">
            
            </div>
        </div>
    </div>
    
        <div class="d-flex flex-column flex-md-row mb-4">
        <div class=" col-12 col-md-6">
        <div class="card productCard mt-0 rounded-3 ms-4 mr-5"  style="width: 30rem;color:chocolate;"">
    
            <h2 s>Last 10 Buyers Name</h2>
                <table >
                <tr>
                <th>Buyer Name</th>
                <th>Bdding Money</th>
               </tr>
              
                <tr>
                <td>
                <p>1st Buyer</p>
               </td>
                <td>
                <p>0</p>
               </td>
               </tr>

               <tr>
               <td>
               <p>2nd Buyer</p>
              </td>
               <td>
               <p>0</p>
              </td>
              </tr>
              
              <tr>
              <td>
              <p>3rd Buyer</p>
             </td>
              <td>
              <p>0</p>
             </td>
             </tr>

             <tr>
             <td>
             <p>4th Buyer</p>
            </td>
             <td>
             <p>0</p>
            </td>
            </tr>

            <tr>
            <td>
            <p>5th Buyer</p>
           </td>
            <td>
            <p>0</p>
           </td>
           </tr>

           <tr>
           <td>
           <p>6th Buyer</p>
          </td>
           <td>
           <p>0</p>
          </td>
          </tr>

          <tr>
          <td>
          <p>7th Buyer</p>
         </td>
          <td>
          <p>0</p>
         </td>
         </tr>

         <tr>
         <td>
         <p>8th Buyer</p>
        </td>
         <td>
         <p>0</p>
        </td>
        </tr>

        <tr>
         <td>
         <p>9th Buyer</p>
        </td>
         <td>
         <p>0</p>
        </td>
        </tr>
        <tr>

        <td>
        <p>10th Buyer</p>
       </td>
        <td>
        <p>0</p>
       </td>
       </tr>


                </table>
           
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
            /*************** */
            // update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: walletmoney - bidMoney })


        } else {
            alert("you dose not bid smaller than Maximum Bid.")

        }
    } else {
        alert("You do not have enough money in your wallet.");
    }
}