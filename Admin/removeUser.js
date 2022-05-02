import { db, set, ref, get, child, update, remove } from "../JS/firebase.js";
const databaseRef = ref(db);

//removal of user and also its products from bidding 
window.removeUser = async function (userId) {
  if (confirm("Are you sure want to delete this product ?")) {
    let productKeys = [];
    alert(userId);
    //if multiple products  are sold by one user then all the product ids are store in product keys
    await get(child(databaseRef, `User/${userId}/Details/ProductSold`)).then((snapshot) => {
      if (typeof snapshot !== "undefined") {
        if (snapshot.exists()) {
          productKeys = Object.keys(snapshot.val());
        }
      }
    })

    //all the produts from bidding are also deleted when its owner is deleted 
    await remove(ref(db, `User/${userId}`), {
    }).then(() => {
      productKeys.forEach((element) => {
        remove(ref(db, `Bidding-Products/${element}`), {
        }).then(() => {
          console.log(element + "is deleted from bidding Products");
        });
      })
      alert('Congrats your product is deleted  successfully...')
    }).catch((error) => {
      alert("Something went wrong!!!!!!!!!");
    });

  }
}
