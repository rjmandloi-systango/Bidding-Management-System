import { db, set, ref,get,child, update, remove } from "./firebase.js";


allDataFetch();
let userDeatils = [];

function allDataFetch() {

  const databaseRef = ref(db);

  get(child(databaseRef, "User/")).then((snapshot) => {
    if (typeof (snapshot) !== 'undefined') {

      if (snapshot.exists()) {
        snapshot.forEach((child) => {
                userDeatils.push({
                    "id": child.key,
                    "FirstName":child.val().Details.FirstName,
                    "LastName":child.val().Details.LastName,
                    "Phone":child.val().Details.PhoneNo,
                    "Email":child.val().Details.Email,
                    "Country":child.val().Details.Country,
                    "State":child.val().Details.State,
                    "PinCode":child.val().Details.PinCode,
                    "Address":child.val().Details.Address,
                    "LandMakr":child.val().Details.LandMakr,
                    // "UserName":child.val().Details.UserName,
                    "UserPass":child.val().Details.UserPass,
                    "UserId":child.val().Details.UserID
                    
            })

            // playerNames.push(child.val().player1);
            
        });
      }
    }

  });
}

console.log(userDeatils);
export {userDeatils};