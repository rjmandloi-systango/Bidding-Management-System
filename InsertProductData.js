import { db, set, ref,get,child, update, remove } from "./firebase.js";

let UserData=JSON.parse(localStorage.getItem("USERDATA"));
let UserID=UserData.id
let sellButton=document.getElementById("sellSubmitButton");
sellButton.addEventListener("click",productData);
let productIdArray=[];
let date=new Date();
    let time=date.getMilliseconds();
    
function productData(){
    let productInformation={
     productName:document.getElementById("productName").value,
     productDiscription:document.getElementById("productDiscription").value,
     productPrice:document.getElementById("productPrice").value,
     sellerContactNumber:document.getElementById("sellerContactNumber").value,
     bidDate:document.getElementById("bidDate").value,
     bidTime:document.getElementById("bidTime").value
    }
    insertProcuctDetails(productInformation);
}

function insertProcuctDetails(productInformation) {
    update(ref(db, "User/"+UserID+"/Details/ProductSold/"+[time]), {
        
      
        
        ProductName: productInformation.productName,
        ProductDiscription:productInformation.productDiscription,
        ProductPrice:productInformation.productPrice,
        SellerContactNumber:productInformation.sellerContactNumber,
        BidDate:productInformation.bidDate,
        BitTime:productInformation.bidTime,
        

       

    
}).then(() => {
  productIdArray.push(time)      
  alert('Congrats your product added successfully...')
        // location.href = './index.html'; 
    })
      .catch((error) => {
        // alert("error aa gai h");
      });
      // set(ref(db, "ID"), (ID + 1))
      // .then(() => {
      //   // alert("serial count update");
      // })
      // .catch((error) => {
      //   alert("error");
      // });
  }
  // console.log("ProductArray-->",time)