import { db, set, ref, get, child, update, remove } from "../JS/firebase.js";
// let productList = [];
// document.getElementById("dropdownMenuButton3").addEventListener('click' ,myProductList);
window.myProductList = function () {
    let myProductsTable = document.getElementById("myProductTable");
    let userDATA = JSON.parse(localStorage.getItem('USERDATA'));
    // console.log(userDATA.id);
    const databaseRef = ref(db);
    get(child(databaseRef, `User/${userDATA.id}/Details/ProductSold/`)).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {

            myProductsTable.innerHTML = `
            <tr>
                  <th scope="col">Product image</th>
                  <th scope="col">Product ID</th>
                  <th scope="col">Product name</th>
                  <th scope="col">Product starting bid</th>
                  <th scope="col">Bid ending date</th>

              </tr>
            
            `;

            if (snapshot.exists()) {
                snapshot.forEach((child) => {

                    console.log(child.val().ImageURl);
                    myProductsTable.innerHTML += `<tr scope="row" class="table-active">
                    <td> <img  class="imgInTable" src=${child.val().ImageURl}></td>
                    <td style="text-align:center">${child.val().ProductId}</td>
                    <td style="text-align:center">${child.val().ProductName} </td>
                    <td style="text-align:center"> ${child.val().ProductPrice}</td>
                    <td style="text-align:center">${child.val().BidDate}</td>
                    </tr>`;





                    // productList.push({
                    //     id: child.val(),
                    //     // date:element.id[key]["ProductName"]

                    // })
                });
            }
            // console.log(productList);

            productList.forEach((element) => {
                // console.log(element.id.BidDate);


            });
        }
    });
}
