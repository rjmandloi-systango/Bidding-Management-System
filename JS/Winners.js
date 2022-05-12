import { db, set, ref, get, child, update, remove } from "./firebase.js";
const databaseRef = ref(db);
import { capitalize } from "./capitalize.js"
getWinners();
//getting all the winners 
async function getWinners() {
    let winnersTable = document.getElementById("winnersTable");
    let winnerCount = 1;

    //creating winners table headings 
    let tableHead = `
                <thead>
                <tr class="tableData">
                <th scope="col">#</th>
                <th scope="col">Product image</th>
                <th scope="col">Winner</th>
                <th scope="col">Product name</th>
                <th scope="col">Starting bid <span class="textColorInBidPage">&#8377</span> </th>
                <th scope="col">Max. bid <span class="textColorInBidPage">&#8377</span> </th>
                <th scope="col">Seller name </th>
                <th scope="col"><span class="textColorInBidPage">Sold</span>/<span class="ListingDate">Listed</span>(Date) </th>

                </tr>
                </thead>                    
                  `;
    winnersTable.innerHTML += tableHead;

    //get all the winners 
    await get(child(databaseRef, "Winners/")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                snapshot.forEach(winners => {
                    let maxBid = winners.val().BuyerBidMoney;
                    //getting the information of product via seller Id
                    get(child(databaseRef, `User/${winners.val().SellerID}/Details/ProductSold/${winners.val().ProductID}/`)).then((snapshot) => {
                        if (typeof (snapshot) !== 'undefined') {
                            if (snapshot.exists()) {
                                // console.log(snapshot.val());
                                let productName = capitalize(snapshot.val().ProductName);
                                let startingBid = snapshot.val().ProductPrice;
                                let imageUrl = snapshot.val().ImageURl;
                                let sellerName = capitalize(snapshot.val().SellerName);
                                let productListingDate = snapshot.val().ProductListingDate;
                                let bidEndDate = snapshot.val().BidDate;

                                //getting the information of Buyer via Buyer  Id
                                get(child(databaseRef, `User/${winners.val().BuyerID}/Details/`)).then((snapshot) => {
                                    if (typeof (snapshot) !== 'undefined') {
                                        if (snapshot.exists()) {
                                            console.log(snapshot.val());
                                            let tableContent = `
                                                    <tr class="tableData">
                                                    <th scope="row">${winnerCount}</th>
                                                    <td><img  class=" historyTableImage " style=" width: 150px;  height: 150px     background-repeat: no-repeat; background-size: contain; object-fit: contain;" src=${imageUrl}></td>
                                                    <td class="fw-bold">${capitalize(snapshot.val().FirstName)} ${capitalize(snapshot.val().LastName)} <br> <span><small><b>${snapshot.val().Email}</b></small></span></td>
                                                    <td>${capitalize(productName)}</td>
                                                    <td>${startingBid}</td>
                                                    <td>${maxBid}</td>
                                                    <td>${capitalize(sellerName)}</td>   
                                                    <td class="fw-bold textColorInBidPage">${bidEndDate}<br> <span class="ListingDate"><small><b>${productListingDate}</b></small></span></td>
                                                    </tr>
                                                `;
                                            winnerCount++;
                                            winnersTable.innerHTML += tableContent;
                                        }

                                    }
                                })//buyer info
                            }
                        }
                    })//seller info
                });
            }
        }
    });
}
