
import {db,set,ref} from "./firebase.js";
let ID=0;
function insertUser() {
    let userName ="antu";


      set(ref(db, "Bidder/" + (ID + 1) + "/"), {
        "Deatils": {
          nickname: userName,
         }
        
      })

        .then(() => {
          alert('You are Registered...')
        })
        .catch((error) => {
          alert("error aa gai h");
        });
      set(ref(db, "SerialCount"), (ID + 1))
        .then(() => {
          alert("ID update");
        })
        .catch((error) => {
          alert("error");
        });
      
}
insertUser();