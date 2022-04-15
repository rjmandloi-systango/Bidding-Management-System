import { db, set, ref, get, child, update, remove } from "../firebase.js";
// function tableAT() {
//     let getTableData = document.getElementById(productTable);
//     for (let i in productTable.rows) {
//         let row = productTable.rows[i]
//         //iterate through rows
//         //rows would be accessed using the "row" variable assigned in the for loop
//         for (let j in row.cells) {
//             let col = row.cells[j]
//             //iterate through columns
//             console.log(col.innerText);
//             //columns would be accessed using the "col" variable assigned in the for loop
//         }
//     }
// }

// document.getElementById("deleteButton").addEventListener("click", removeProduct);
// document.getElementById("deleteBtn").addEventListener("click", removeProduct);
// // .addEventListener("click", myFunction);
// function removeProduct(){
//     console.log("inside removeProduct");
    // remove(ref(db, "User/6/Details/ProductSold/753" ),{

    //   }).then(() => {
    //     // productIdArray.push(time)
    //     alert('Congrats your product is deleted  successfully...')
    //     // location.href = './index.html'; 
    //   })
    //     .catch((error) => {
    //       // alert("error aa gai h");
    //     });
// }