import { db, set, ref, get, child, update, remove } from "../firebase.js";
let productDeatils=[];
// createProductList();
document.getElementById("productButton").addEventListener("click", createProductList);
function createProductList() {
document.getElementById("productTable").style.display="block";
    let productTable = document.getElementById("productTable");
    const databaseRef = ref(db);
    get(child(databaseRef, "User/")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {

            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    productDeatils.push({
                        id: child.val().Details.ProductSold,
                    })
                });
            }
            productDeatils.forEach((element) => {
                if (element?.id) {
                    Object.keys(element.id).forEach((key) => {
            
                        let url = element.id[key]["ImageURl"];
                        let productName = element.id[key]["ProductName"];
                        let productDiscription = element.id[key]["ProductDiscription"];
                        let productStartingBid = element.id[key]["ProductPrice"];
                        let bidEndDate=element.id[key]["BidDate"];
                        let sellerContact=element.id[key]["SellerContactNumber"];

                        productTable.innerHTML += `<tr class="table-active"><td> <img class="imgShowInCard" src=${url}></td><td> ${productName}</td><td>${productDiscription}</td><td>${productStartingBid}</td><td>${bidEndDate}</td> <td> ${sellerContact}</td> </tr>`;
                    });
                }
            });

        }


    });
}