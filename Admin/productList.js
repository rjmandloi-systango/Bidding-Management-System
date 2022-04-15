import { db, set, ref, get, child, update, remove } from "../firebase.js";
let productList = [];
// createProductList();
let productButtonStatus = false;
// let userId;
// let userId=0;
document.getElementById("productButton").addEventListener("click", createProductList);
function createProductList() {
    // console.log(productButtonStatus);
    if (productButtonStatus == false) {
        productButtonStatus = true;
        document.getElementById("productTable").style.display = "block";
        let productTable = document.getElementById("productTable");
        const databaseRef = ref(db);
        get(child(databaseRef, "User/")).then((snapshot) => {
            if (typeof (snapshot) !== 'undefined') {

                if (snapshot.exists()) {
                    snapshot.forEach((child) => {
                        // userId = child.val().Details.UserID;
                        // console.log(userId);
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
                            let userId=element.id[key]["UserId"];
                            let url = element.id[key]["ImageURl"];
                            let productName = element.id[key]["ProductName"];
                            let productDiscription = element.id[key]["ProductDiscription"];
                            let productStartingBid = element.id[key]["ProductPrice"];
                            let bidEndDate = element.id[key]["BidDate"];
                            let sellerContact = element.id[key]["SellerContactNumber"];
                            productTable.innerHTML += `<tr class="table-active"><td> <img class="imgShowInCard" src=${url}></td><td>${userId}</td><td>${productId} </td><td> ${productName}</td><td>${productDiscription}</td><td>${productStartingBid}</td><td>${bidEndDate}</td> <td> ${sellerContact}</td><td><button id="deleteBtn">delete</button> </td></tr>`;
                        });
                    }
                });

            }


        });
    }
    setTimeout(() => {
        document.getElementById("deleteBtn").addEventListener("click", removeProduct);        
    }, 3000);

}
// console.log(productList);


// .addEventListener("click", myFunction);
function removeProduct(){
    console.log("inside removeProduct");
    remove(ref(db, "User/6/Details/ProductSold/818" ),{

      }).then(() => {
        // productIdArray.push(time)
        alert('Congrats your product is deleted  successfully...')
        // location.href = './index.html'; 
      })
        .catch((error) => {
          // alert("error aa gai h");
        });
}