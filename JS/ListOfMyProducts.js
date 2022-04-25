import { db, set, ref, get, child, update, remove } from "../JS/firebase.js";
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
                  <th scope="col">Delete product</th>
              </tr>
            `;
            if (snapshot.exists()) {
                snapshot.forEach((child) => {

                    // console.log(child.val().ImageURl);
                    myProductsTable.innerHTML += `<tr scope="row" class="table-active">
                    <td> <img  class="imgInTable" src=${child.val().ImageURl}></td>
                    <td style="text-align:center">${child.val().ProductId}</td>
                    <td style="text-align:center">${child.val().ProductName} </td>
                    <td style="text-align:center"> ${child.val().ProductPrice}</td>
                    <td style="text-align:center">${child.val().BidDate}</td>
                    <td><button onclick="removeProduct(${userDATA.id} ,${child.val().ProductId})">delete</button></td>
                    </tr>`;
                });
            }

        }
    });
}


window.removeProduct = function (userId, productId) {
    remove(ref(db, `User/${userId}/Details/ProductSold/${productId}`), {
    }).then(() => {

        remove(ref(db, `Bidding-Products/${productId}`), {
        }).then(() => {
        });

        alert('Congrats your product is deleted  successfully...')
    }).catch((error) => {
        alert("Something went wrong!!!!!!!!!");
    });
}