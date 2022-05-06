import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { userDeatils} from "./fetchUserData.js";
import {capitalize} from "./capitalize.js"

let userDATA = JSON.parse(localStorage.getItem("USERDATA"));
const databaseRef = ref(db);

userProductHistory()

async function userProductHistory() {
    let purchasedProductCounter = 1;
    let  soldProductCounter = 1;
    let purchasedProductTable = document.getElementById("purchasedProductTable");
    let soldProductTable = document.getElementById("soldProductTable");
    await get(child(databaseRef, "Winners/")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                snapshot.forEach(winners => {
                    // console.log(winners.key);//product key 
                    if (winners.val().SellerID == userDATA.id)//for sold products 
                    {
                        // console.log(winners.val().BuyerBidMoney);
                        get(child(databaseRef, `User/${winners.val().SellerID}/Details/ProductSold/${winners.key}`)).then((soldProduct) => {
                            if (typeof (soldProduct) !== 'undefined') {
                                if (soldProduct.exists()) {
                                    console.log(winners.val().BuyerID);
                                    let buyerName = userDeatils.find(user => user.id === `${winners.val().BuyerID}`);
                                    console.log(buyerName. FirstName);
                                    let tableContent = `
                                    <tr class="tableData">
                                    <th scope="row">${soldProductCounter}</th>
                                    <td><img class="historyTableImage" style=" width: 150px;  height: 150px     background-repeat: no-repeat; background-size: contain; object-fit: contain;" src=${soldProduct.val().ImageURl}></td>
                                    <td>${soldProduct.val().ProductId} </td>
                                    <td>${capitalize(soldProduct.val().ProductName)}</td>
                                    <td>${soldProduct.val().ProductPrice}</td>
                                    <td>${winners.val().BuyerBidMoney}</td>
                                    <td> ${capitalize(buyerName. FirstName)}<br> <span><small><b>${buyerName.Email}</b></small></span></td>
                                    </tr>
                                    `;
                                    soldProductTable.innerHTML +=tableContent;
                                    soldProductCounter++;
                                }
                            }
                        })
                    }
                    if (winners.val().BuyerID == userDATA.id) {
                        get(child(databaseRef, `User/${winners.val().SellerID}/Details/ProductSold/${winners.key}`)).then((purchasedProduct) => {
                            if (typeof (purchasedProduct) !== 'undefined') {
                                if (purchasedProduct.exists()) {
                                    let sellerName = userDeatils.find(user => user.id === `${winners.val().SellerID}`);
                                    console.log(sellerName.FirstName);
                                    // document.getElementById("seller").innerHTML="Seller";
                                    let tableContent = `
                                    <tr class="tableData">
                                    <th scope="row">${purchasedProductCounter}</th>
                                    <td><img class=" historyTableImage " style=" width: 150px;  height: 150px     background-repeat: no-repeat; background-size: contain; object-fit: contain;" src=${purchasedProduct.val().ImageURl}></td>
                                    <td>${purchasedProduct.val().ProductId} </td>
                                    <td>${capitalize(purchasedProduct.val().ProductName)}</td>
                                    <td>${purchasedProduct.val().ProductPrice}</td>
                                    <td>${winners.val().BuyerBidMoney}</td>
                                    <td>${capitalize(sellerName.FirstName)}<br> <span><small><b>${sellerName.Email}</b></small></span></td>
                                    </tr>
                                    `;
                                    purchasedProductTable.innerHTML +=tableContent;
                                    purchasedProductCounter++;
                                }
                            }
                        })

                    }
                });
            }
        }
    })
}

