// import {
//   db,
//   set,
//   ref,
//   get,
//   child,
//   update,
//   remove,
//   orderByChild,
//   query,
//   onValue,
//   limitToFirst,
// } from "./firebase.js";

// f();
// async function f() {
//   let highestBidder = {};
//   let products = {};
//   let productsKey = [];

  
//   const que = ref(db, "Bidding-Products");

//   await get(que).then((snapshot) => {
//     products = { ...snapshot.val() }; //all objects are stored inside products
  
//     productsKey = Object.keys(products); //all object keys are stored inside productsKeys
  
//   });

//   productsKey.forEach((key) => {
//     // console.log(products[key]);
//     if (products[key]?.length > 0 && products[key]?.length < 2) {
//       highestBidder[key] = products[key];
//     } else if (products[key]?.length) {
//       const highestProduct = products[key]
//         .filter((key) => key)
//         .sort((a, b) => {
//           // console.log(
//           //   a.BuyerBidMoney,
//           //   b.BuyerBidMoney,
//           //   a.BuyerBidMoney - b.BuyerBidMoney
//           // );
//           if (a.BuyerBidMoney < b.BuyerBidMoney) {
//             return 1;
//           }
//           if (a.BuyerBidMoney > b.BuyerBidMoney) {
//             return -1;
//           }
//           return 0;
//         });
//       // console.log(highestProduct);
//       highestBidder[key] = highestProduct;
//     } //    console.log(products[key].length);
//   });
//   // console.log(highestBidder);
//   fetchHighestBidder(highestBidder);
// }

// function fetchHighestBidder(highestBidder) {
//   let productIds = Object.keys(highestBidder);
//   console.log(productIds);
//   productIds.forEach((key) => {
//     // console.log(highestBidder[key][0].BuyerBidMoney);
//     console.log(highestBidder[key][0]);

//     let pcard = document.getElementById(
//       `mb_${highestBidder[key][0].ProductID}`
//     );
//     //  pcard.innerHTML=highestBidder[key][0].BuyerBidMoney;
//     // console.log(pcard);
//   });

// }

