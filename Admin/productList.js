import { db, set, ref, get, child, update, remove } from "../JS/firebase.js";
let productList = [];
let uniqueDeleteButtonCounter = 1;
let uniqueDeleteButtonId = "deleteBtn";
// document.getElementById("productButton").addEventListener("click", createProductList);
createProductList();
//product list for admin 
async function createProductList() {
    //get the id from products.html
    let productTable = document.getElementById("productTable");
       
    // table heading for product list 
    productTable.innerHTML = `
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

    //get product data by traversing users 
    const databaseRef = ref(db);
    await get(child(databaseRef, "User/")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {

            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    // push all the products into productList array
                    productList.push({
                        id: child.val().Details.ProductSold,
                    })
                });
            }

            //printing the table by traversing productList array
            productList.forEach((element) => {
                if (element?.id) {
                    Object.keys(element.id).forEach((key) => {
                        let productId = key;    //prints the product id e.g. 339,557 ...
                        let userId = element.id[key]["UserId"];
                        let url = element.id[key]["ImageURl"];
                        let productName = element.id[key]["ProductName"];
                        let productDiscription = element.id[key]["ProductDiscription"];
                        let productStartingBid = element.id[key]["ProductPrice"];
                        let bidEndDate = element.id[key]["BidDate"];
                        let sellerContact = element.id[key]["SellerContactNumber"];

                        //show product table
                        productTable.innerHTML += `<tr class="table-active "><td> <img class="imgShowInCard " src=${url}></td><td>${userId}</td><td>${productId} </td><td> ${productName}</td><td> <details> <summary> Product discription</summary> ${productDiscription} </details></td><td>${productStartingBid}</td><td>${bidEndDate}</td> <td> ${sellerContact}</td><td><button onclick="removeProduct(${userId} ,${productId})" id=${uniqueDeleteButtonId + uniqueDeleteButtonCounter}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                            </button></td></tr>`;
                        uniqueDeleteButtonCounter++;
                    });
                }
            });
        }
    });  
}
//remove product and also its bids present in bidding 
window.removeProduct = function (userId, productId) {

    if (confirm("Are you sure want to delete this product ?"))
         //remove product form user
        remove(ref(db, `User/${userId}/Details/ProductSold/${productId}`), {
        }).then(() => {
            // remove product  from Bidding-Products in database 
            remove(ref(db, `Bidding-Products/${productId}`), {
            }).then(() => {
                btn.click();
            });
        }).catch((error) => {
        });

}


let modal = document.getElementById("myModal");
// Get the button that opens the modal
let btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
btn.addEventListener("click", popup);

// function to popup while deleting a product 
function popup() {
    function popupMsg() {
        document.getElementById("popupMessage").innerHTML = "Your product is deleted successfully";
        modal.style.display = "block";
    }
    popupMsg();
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        location.href = "products.html";
    }
    // // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            location.href = "products.html";
        }
    }

}
