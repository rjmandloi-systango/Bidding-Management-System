import { db, set, ref, get, child, update, remove } from "../JS/firebase.js";
window.myProductList = async function () {
    
    let myProductsTable = document.getElementById("myProductTable");
    console.log(myProductsTable);

    let userDATA = JSON.parse(localStorage.getItem('USERDATA'));
    // console.log(userDATA.id);
    const databaseRef = ref(db);
   await get(child(databaseRef, `User/${userDATA.id}/Details/ProductSold/`)).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            myProductsTable.innerHTML = `
            <tr class="tableData">
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
                    myProductsTable.innerHTML += `<tr  scope="row" class="table-active tableData">
                    <td> <img  class="imgInTable" src=${child.val().ImageURl}></td>
                    <td style="text-align:center">${child.val().ProductId}</td>
                    <td style="text-align:center">${child.val().ProductName} </td>
                    <td style="text-align:center"> ${child.val().ProductPrice}</td>
                    <td style="text-align:center">${child.val().BidDate}</td>
                    <td class="tableData"><button onclick="removeProduct(${userDATA.id} ,${child.val().ProductId})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash " viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg></button></td>
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

        // alert('Congrats your product is deleted  successfully...')
    }).catch((error) => {
        alert("Something went wrong!!!!!!!!!");
    });
}