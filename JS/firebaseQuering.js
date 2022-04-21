import {
  db,
  set,
  ref,
  get,
  child,
  update,
  remove,
  orderByChild,
  query,
  onValue,
  limitToFirst,
} from "./firebase.js";

// const que = query(ref(db, "Bidding-Products/608"), limitToFirst(3));
// get(que)
//     .then((snapshot) => {
//         snapshot.forEach(childSnapshot => {
//             console.log(childSnapshot.val());

//         });

//     });

// const que = query(ref(db, "Bidding-Products"));
// get(que).then((snapshot) => {
//     {
//     //   console.log(snapshot.val());
//         snapshot.forEach(childSnapshot => {
//             console.log(childSnapshot.val());
//             // query(ref(db, "Bidding-Products/608"), limitToFirst(3));
//             // console.log(childSnapshot.val());

//         });
//     }
// });
f();
async function f() {
  let highestBidder = {};
  let products = {};
  let productsKey = [];

  // let arr1=[];
  const que = ref(db, "Bidding-Products");

  await get(que).then((snapshot) => {
    products = { ...snapshot.val() };
    productsKey = Object.keys(products);
    // console.log(products,productsKey);
  });

  productsKey.forEach((key) => {
    console.log(products[key]);
    if (products[key]?.length > 0 && products[key]?.length < 2) {
      highestBidder[key] = products[key];
    } else if (products[key]?.length) {
      const highestProduct = products[key]
        .filter((key) => key)
        .sort((a, b) => {
          console.log(
            a.BuyerBidMoney,
            b.BuyerBidMoney,
            (a.BuyerBidMoney - b.BuyerBidMoney)
          );
          if (a.BuyerBidMoney < b.BuyerBidMoney) {
            return 1;
          }
          if (a.BuyerBidMoney > b.BuyerBidMoney) {
            return -1;
          }
          return 0;
        });
      console.log(highestProduct);
      highestBidder[key] = highestProduct;
    } //    console.log(products[key].length);
    // console.log(products[key]);
  });
}
  // for (let element of productsKey )
  // {
  //          console.log(Object.keys(element).length);

  // }

  //    / array.forEach(function(currentValue, index, arr)
  //          console.log(Object.keys(index).length);
  // )


// Object.keys(arr).forEach(key => {

//     // console.log(key , arr[key]);
//     Object.keys(arr[key]).forEach(key2 =>{

//         // console.log(arr[key][key2]);
//         arr1.push(arr[key][key2]);
//     })
// });
// // console.log(arr1);
// arr1.sort((a, b) => {
//     return b.BuyerBidMoney - a.BuyerBidMoney;
// });
// console.log(arr1);

// console.log(arr);
