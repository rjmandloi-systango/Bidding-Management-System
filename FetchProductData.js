import { userDeatils } from "./fetchUserData.js";
import { db, set, ref,get,child, update, remove } from "./firebase.js";


allProductDataFetch();
let productDeatils = [];
let arr = [];

function allProductDataFetch() {
  let scoreTable = document.getElementById("scoreTable");

  const databaseRef = ref(db);

  get(child(databaseRef, "User/")).then((snapshot) => {
    if (typeof (snapshot) !== 'undefined') {

      if (snapshot.exists()) {
        snapshot.forEach((child) => {
                productDeatils.push({
                   id:child.val().Details.ProductSold,
            })

            
        });
      }
      
      productDeatils.forEach((element) => {
        console.log('line 27',element);
        if (element?.id) {
          Object.keys(element.id).forEach((key)=>{
            console.log('line 30',element.id[key]["ProductName"]);
          })
        }

      });
    }

  });
}
 
    console.log('Products',productDeatils)