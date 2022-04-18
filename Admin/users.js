import { db, set, ref, get, child, update, remove } from "../firebase.js";


// allDataFetch();
// let userDeatils = [];

window.userDataList = function () {

    const databaseRef = ref(db);
    // var ul = document.createElement("ul");
    // document.body.appendChild(ul);

    get(child(databaseRef, "User/")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {

            if (snapshot.exists()) {
                snapshot.forEach((child) => {


                    // var li = document.createElement("li");
                    // li.className = "list-group-item";
                    // li.innerHTML = child.val().Details.FirstName;
                    // ul.appendChild(li);

                    const card = document.createElement('div');
                    card.classList = 'card-body';
                    let userDeatils = `
                    <div class="card">
                        <div class="card-header">
                            ${child.val().Details.FirstName}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${child.val().Details.PhoneNo}</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                     </div>
                    `;
                    card.innerHTML+=userDeatils;

                    //     userDeatils.push({
                    //         "id": child.key,
                    //         "FirstName":child.val().Details.FirstName,
                    //         "LastName":child.val().Details.LastName,
                    //         "Phone":child.val().Details.PhoneNo,
                    //         "Email":child.val().Details.Email,
                    //         "Country":child.val().Details.Country,
                    //         "State":child.val().Details.State,
                    //         "PinCode":child.val().Details.PinCode,
                    //         "Address":child.val().Details.Address,
                    //         "LandMakr":child.val().Details.LandMakr,
                    //         // "UserName":child.val().Details.UserName,
                    //         "UserPass":child.val().Details.UserPass,
                    //         "UserId":child.val().Details.UserID

                    // })

                });
            }
        }

    });
}

// console.log(userDeatils);
// export { userDeatils };