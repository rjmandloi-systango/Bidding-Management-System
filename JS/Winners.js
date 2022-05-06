import { db, set, ref, get, child, update, remove } from "./firebase.js";
const databaseRef = ref(db);
import {capitalize} from "./capitalize.js"
getWinners();
async function getWinners() {
    let winnersTable = document.getElementById("winnersTable");
    let winnerCount = 1;
    let tableHead = `
                <thead>
                <tr class="tableData">
                <th scope="col">#</th>
                <th scope="col">Product image</th>
                <th scope="col">Winner</th>
                <th scope="col">Product name</th>
                <th scope="col">Starting bid </th>
                <th scope="col">Max. bid </th>
                
                <th scope="col">Seller name </th>
                                        
                </tr>
                </thead>                    
                     
                  `;
    winnersTable.innerHTML += tableHead;
    await get(child(databaseRef, "Winners/")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                snapshot.forEach(winners => {
                    let maxBid = winners.val().BuyerBidMoney;
                    get(child(databaseRef, `User/${winners.val().SellerID}/Details/ProductSold/${winners.val().ProductID}/`)).then((snapshot) => {
                        if (typeof (snapshot) !== 'undefined') {
                            if (snapshot.exists()) {
                                // console.log(snapshot.val());
                                let productName = capitalize(snapshot.val().ProductName);
                                let startingBid = snapshot.val().ProductPrice;
                                let imageUrl = snapshot.val().ImageURl;
                                let sellerName = capitalize(snapshot.val().SellerName);
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
