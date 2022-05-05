
import { db, set, ref, get, child, update, remove  } from "./firebase.js";
let UserData = JSON.parse(localStorage.getItem("USERDATA"));
const databaseRef = ref(db);

let walletmoney;
async function walletUtilities() {
    await get(child(databaseRef, "User/" + UserData.id + "/Details")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                console.log("log--" + snapshot.val().WalletMoney)
                walletmoney = snapshot.val().WalletMoney
            }
        }
    });
    document.getElementById("pocketmoney").innerHTML = `Your Current Money<p>${walletmoney}</p>`;
    let addMoney = document.getElementById("addMoney");
    addMoney.addEventListener('click', updateWallet);
    function updateWallet() {
        let money = document.getElementById('insertMoney').value;
        let insertMoney = parseInt(money);
        if (walletmoney+insertMoney < 1000000) {

            update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: walletmoney + insertMoney })
            alert("Congretes Your Money Added Successfully.");
          

        } else {
            alert("you can add atmost 1000000 rs. in your wallet .")
            
        }
    }
}
walletUtilities();
