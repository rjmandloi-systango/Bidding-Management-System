import { db, set, ref, get, child, update, remove } from "../JS/firebase.js";
// document.getElementById("userButton").addEventListener('click',userList);
// location.reload();

userList();
// let userButtonStatus = false;
  function userList() {
  // document.getElementById("productTable").innerHTML="";
let users=document.getElementById("users");
  // if (userButtonStatus == false) {
  //   userButtonStatus=true;
    const databaseRef = ref(db);
    // var ul = document.createElement("ul");
    // document.body.appendChild(ul);

    get(child(databaseRef, "User/")).then((snapshot) => {
      if (typeof (snapshot) !== 'undefined') {

        if (snapshot.exists()) {
          snapshot.forEach((child) => {

            let productContent = `
                    <div class="card productCard mt-5 rounded-3 ms-4 mr-5"  style="width: 18rem;">
                     
                         <div class="card-body text-center rounded-3" >
                                  <div class="productName text-center p-1 rounded-3">
                                    <h5 class="card-title">${child.val().Details.FirstName} ${child.val().Details.LastName}</h5>    
                                  </div>
                    
                                  <div>
                                    <p class="card-text text-start  text-dark"><span class ="fw-bold">User ID:</span>${child.val().Details.UserID}</p>
                                  </div>
                                  <div>
                                    <p class="card-text text-start  text-dark"><span class ="fw-bold">Email:</span>${child.val().Details.Email}</p>
                                  </div>
                   
                                  <div >
                                    <p class="card-text text-start  text-dark"><span class ="fw-bold">Cont. no.:${child.val().Details.PhoneNo}</p>
                                  </div>
                                  <div>
                                  <p class="card-text text-start  text-dark"><span class ="fw-bold">Country:</span>${child.val().Details.Country}</p>
                                  </div>
                                  <div>
                                  <p class="card-text text-start  text-dark"><span class ="fw-bold">State:</span>${child.val().Details.State}</p>
                                  </div>
                                  <div>
                                   <p class="card-text text-start  text-dark"><span class ="fw-bold">Pin code:</span>${child.val().Details.PinCode}</p>
                                  </div>
                                  <div>
                                  <p class="card-text text-start  text-dark"><span class ="fw-bold">Full address:</span>${child.val().Details.FullAddress}</p>
                                 </div>

                             <button onclick="removeUser(${child.val().Details.UserID})" class="btn btn-primary col-6 biddingStatus data-bs-toggle="modal" data-bs-target="#exampleModal1">Delete user</button>                              
                         </div>
                    </div>
                       `;

                       users.innerHTML += productContent;
          });
        }
      }
    });
  }
// }

// console.log(userDeatils);
// export { userDeatils };




