import { db, set, ref, get, child, update, remove } from "../JS/firebase.js";
window.removeUser = function (userId) {
    alert(userId);
    remove(ref(db, `User/${userId}`), {

    }).then(() => {
        remove(ref(db, `Bidding-Products/${productId}`), {
        }).then(() => {
            
        });

        alert('Congrats your product is deleted  successfully...')
    }).catch((error) => {
            alert("Something went wrong!!!!!!!!!");
        });
} 
