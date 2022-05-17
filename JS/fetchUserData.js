import { db, set, ref,get,child, update, remove } from "./firebase.js";
allDataFetch();
let userDeatils = [];
// get all users from DB and store inside userDeatils
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
                    "Address":child.val().Details.FullAddress,
                    "LandMakr":child.val().Details.LandMark,
                    "UserPass":child.val().Details.UserPass,
                    "UserId":child.val().Details.UserID,
                    "WalletMoney":child.val().Details.PocketMoney
            })
        });
      }
    }

  });
}
export {userDeatils};
console.log(userDeatils);