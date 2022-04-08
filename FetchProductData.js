import { userDeatils } from "./fetchUserData.js";
import { db, set, ref,get,child, update, remove } from "./firebase.js";


allProductDataFetch();
let productDeatils = [];

function allProductDataFetch() {

  const databaseRef = ref(db);

  get(child(databaseRef, "User/")).then((snapshot) => {
    if (typeof (snapshot) !== 'undefined') {

      if (snapshot.exists()) {
        snapshot.forEach((child) => {
                productDeatils.push({
                   id:child.val().Details.ProductSold,
            })

            // playerNames.push(child.val().player1);
            
        });
      }
    }

  });
}
 
    console.log(productDeatils)
    // export {userDeatils};