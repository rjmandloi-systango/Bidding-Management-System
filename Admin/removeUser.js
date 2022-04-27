import { db, set, ref, get, child, update, remove } from "../JS/firebase.js";
const databaseRef = ref(db);

window.removeUser =async function (userId) {
    let productKeys=[];
    alert(userId);
    await get(child(databaseRef, `User/${userId}/Details/ProductSold`)).then((snapshot) => {
      if (typeof snapshot !== "undefined") {
        if (snapshot.exists()) {
          productKeys=Object.keys(snapshot.val());
        }
      }
    })
    // console.log(productKeys);
    
    await remove(ref(db, `User/${userId}`), {
    }).then(() => {
        productKeys.forEach((element)=>{
            remove(ref(db, `Bidding-Products/${element}`), {
              }).then(() => {
                console.log(element +"is deleted from bidding Products");
              });
            })      
        alert('Congrats your product is deleted  successfully...')
    }).catch((error) => {
            alert("Something went wrong!!!!!!!!!");
        });

}
    