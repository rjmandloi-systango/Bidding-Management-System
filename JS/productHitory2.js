import { db, set, ref, get, child, update, remove } from "./firebase.js";
import { userDeatils } from "./fetchUserData.js";
import { capitalize } from "./capitalize.js";
let userDATA = JSON.parse(localStorage.getItem("USERDATA"));
const databaseRef = ref(db);

userProductHistory();
let purchasedProductCounter = 1;
let soldProductCounter = 1;
let purchasedProductTable = document.getElementById("purchasedProductTable");
let soldProductTable = document.getElementById("soldProductTable");
async function userProductHistory() {
    console.log("dfdsds");
    await get(child(databaseRef, `User/${userDATA.id}/Details/ProductSold/`)).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                snapshot.forEach(Product => {
                    // console.log(Product.val().ProductStatus);
                    if (Product.val().ProductStatus)//if status is sold in db
                    {
                    

                        // console.log(Product.val().ProductStatus);
                    }

                });
            }
        }
    })


}