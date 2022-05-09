import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { productImageURL } from "./imageUpload.js";

let UserData = JSON.parse(localStorage.getItem("USERDATA"));
let UserID = UserData.id;
let UserName=UserData.FirstName+" "+UserData.LastName;
let UserPhone=UserData.Phone;
let sellButton = document.getElementById("sellSubmitButton");
sellButton.addEventListener("click", productData);
let productIdArray = [];
let date = new Date();
let time = date.getMilliseconds();
 
//getting all the new product data so as to make an entry in DB
function productData() {
  let productInformation = {
    productId: time,
    productName: document.getElementById("productName").value,
    productDiscription: document.getElementById("productDiscription").value,
    productPrice: document.getElementById("productPrice").value,
    sellerContactNumber:UserPhone,
    bidDate: document.getElementById("bidDate").value,
    bidTime: document.getElementById("bidTime").value

  }
  insertProcuctDetails(productInformation);
}

// create an entry corresponding to a particular user about its products
function insertProcuctDetails(productInformation) {
  let url = productImageURL;
  update(ref(db, "User/" + UserID + "/Details/ProductSold/" + [time]), {
    ProductName: productInformation.productName,
    ProductDiscription: productInformation.productDiscription,
    ProductPrice: productInformation.productPrice,
    SellerContactNumber: productInformation.sellerContactNumber,
    BidDate: productInformation.bidDate,
    BitTime: productInformation.bidTime,
    ImageURl:url,
    ProductId:productInformation.productId,
    UserId:UserID,
    SellerName:UserName
  }).then(() => {
    productIdArray.push(time)
    // alert('Congrats your product added successfully...')
  })
    .catch((error) => {
    });
  
}