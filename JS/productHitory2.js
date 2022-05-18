import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { userDeatils } from "./fetchUserData.js";
import { capitalize } from "./capitalize.js";
let userDATA = JSON.parse(localStorage.getItem("USERDATA"));
const databaseRef = ref(db);

async function getSoldProducts() {
    let soldProductCounter = 1;
    let soldProductTable = document.getElementById("soldProductTable");
    // for sold products 
    await get(child(databaseRef, `User/${userDATA.id}/Details/ProductSold/`)).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                snapshot.forEach(Product => {
                    let maxBid;
                    let buyerInfo;
                    get(child(databaseRef, `Winners/${Product.key}`)).then((winner) => {
                        if (typeof (winner) !== 'undefined') {
                            if (winner.exists()) {
                                maxBid = winner.val().BuyerBidMoney;
                                // console.log(maxBid);
                                buyerInfo = userDeatils.find(user => user.id === `${winner.val().BuyerID}`);
                                // console.log(buyerInfo.FirstName);
                            }
                        }
                    }).then(() => {
                        if (Product.val().ProductStatus)//if status is sold in db
                        {
                            let tableContent = `
                                    <tr class="tableData">
                                    <th scope="row">${soldProductCounter}</th>
                                    <td><img class="historyTableImage" style=" width: 150px;  height: 150px     background-repeat: no-repeat; background-size: contain; object-fit: contain;" src=${Product.val().ImageURl}></td>
                                    <td>${Product.val().ProductId} </td>
                                    <td>${capitalize(Product.val().ProductName)}</td>
                                    <td>${Product.val().ProductPrice}</td>
                                    <td>${maxBid}</td>
                                    <td> ${capitalize(buyerInfo.FirstName)}<br> <span><small><b>${buyerInfo.Email}</b></small></span></td>
                                    </tr>
                                    `;
                            soldProductTable.innerHTML += tableContent;
                            soldProductCounter++;
                        }
                    })
                });
            }
        }
    })
}
async function getBoughtProducts() {
    let purchasedProductCounter = 1;
    let purchasedProductTable = document.getElementById("purchasedProductTable");
    await get(child(databaseRef, `User/${userDATA.id}/Details/PurchasedProducts/`)).then((productsIds) => {
        if (typeof (productsIds) !== 'undefined') {
            if (productsIds.exists()) {
                productsIds.forEach(product => {
                    get(child(databaseRef, `Winners/${product.key}`)).then((winner) => {
                        if (typeof (winner) !== 'undefined') {
                            if (winner.exists()) {
                                let sellerInfo = userDeatils.find(user => user.id === `${winner.val().SellerID}`);
                                get(child(databaseRef, `User/${winner.val().SellerID}/Details/ProductSold/${product.key}`)).then((productsInfo) => {
                                    if (typeof (productsInfo) !== 'undefined') {
                                        if (productsInfo.exists()) {
                                            // console.log(productsInfo.val());
                                            let tableContent = `
                                            <tr class="tableData">
                                            <th scope="row">${purchasedProductCounter}</th>
                                            <td><img class=" historyTableImage " style=" width: 150px;  height: 150px     background-repeat: no-repeat; background-size: contain; object-fit: contain;" src=${productsInfo.val().ImageURl}></td>
                                            <td>${productsInfo.val().ProductId} </td>
                                            <td>${capitalize(productsInfo.val().ProductName)}</td>
                                            <td>${productsInfo.val().ProductPrice}</td>
                                            <td>${winner.val().BuyerBidMoney}</td>
                                            <td>${capitalize(sellerInfo.FirstName)}<br> <span><small><b>${sellerInfo.Email}</b></small></span></td>
                                            </tr>
                                            `;
                                            purchasedProductTable.innerHTML += tableContent;
                                            purchasedProductCounter++;
                                        }
                                    }
                                })
                            }
                        }
                    })
                });
            }
        }
    });
}

getBoughtProducts();
getSoldProducts();