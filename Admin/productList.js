import { db, set, ref, get, child, update, remove } from "../JS/firebase.js";
let productList = [];
let uniqueDeleteButtonCounter = 1;
let uniqueDeleteButtonId = "deleteBtn";
// document.getElementById("productButton").addEventListener("click", createProductList);
createProductList();
async function createProductList() {
    
        console.log("products");
        console.log("productList");
        let productTable = document.getElementById("productTable");
        productTable.innerHTML=`
        <thead  class="table-dark">
        <tr>
        <th scope="col">Product image</th>
        <th scope="col">User Id</th>
        <th scope="col">Product ID</th>
        <th scope="col">Product name</th>
        <th scope="col">Product discription</th>
        <th scope="col">Product starting bid</th>
        <th scope="col">Bid ending date</th>
        <th scope="col">Seller's contact</th>
        <th scope="col">Delete Items</th>
        </tr>
        <thead>   `;
        const databaseRef = ref(db);
        await get(child(databaseRef, "User/")).then((snapshot) => {
            if (typeof (snapshot) !== 'undefined') {

                if (snapshot.exists()) {
                    snapshot.forEach((child) => {

                        productList.push({
                            id: child.val().Details.ProductSold,
                        })
                    });
                }
                productList.forEach((element) => {
                    if (element?.id) {
                        Object.keys(element.id).forEach((key) => {
                            // console.log(key);

                            let productId = key;    //prints the product id e.g. 339,557 ...
                            // let productId=element.id[key]["ProductId"];
                            let userId = element.id[key]["UserId"];
                            let url = element.id[key]["ImageURl"];
                            let productName = element.id[key]["ProductName"];
                            let productDiscription = element.id[key]["ProductDiscription"];
                            let productStartingBid = element.id[key]["ProductPrice"];
                            let bidEndDate = element.id[key]["BidDate"];
                            let sellerContact = element.id[key]["SellerContactNumber"];
                            productTable.innerHTML += `<tr class="table-active "><td> <img class="imgShowInCard " src=${url}></td><td>${userId}</td><td>${productId} </td><td> ${productName}</td><td>${productDiscription}</td><td>${productStartingBid}</td><td>${bidEndDate}</td> <td> ${sellerContact}</td><td><button onclick="removeProduct(${userId} ,${productId})" id=${uniqueDeleteButtonId + uniqueDeleteButtonCounter}>delete</button></td></tr>`;
                            uniqueDeleteButtonCounter++;
                        });

                    }

                });

            }


        });
    }

window.removeProduct = function (userId, productId) {

    remove(ref(db, `User/${userId}/Details/ProductSold/${productId}`), {

    }).then(() => {
        remove(ref(db, `Bidding-Products/${productId}`), {

        }).then(() => {
        
            alert("bidding product is also deleted");

        });
        
        alert('Congrats your product is deleted  successfully...');
    }).catch((error) => {
            // alert("Something went wrong!!!!!!!!!");
        });
}


