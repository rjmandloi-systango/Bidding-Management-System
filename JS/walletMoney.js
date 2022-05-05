
import { db, set, ref, get, child, update, remove } from "./firebase.js";
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
        if (walletmoney + insertMoney < 1000000) {


            // alert(UserData.Email)
            function sendEmail() {
                // let userEmail = document.getElementById("userEmail").value;
                const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let emailMsg='';
                const charactersLength = characters.length;
   
                for(let i=0;i<6;i++){
                    emailMsg += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                // alert(emailMsg);
                // alert(userEmail)
                // let mailMsg='qq';
                Email.send({
                    Host: "smtp.gmail.com",
                    Username: "BidItValueForYourValuables@gmail.com",
                    Password: "systango@@",
                    To: UserData.Email,
                    From: "BidItValueForYourValuables@gmail.com",
                    Subject: "Add Wallet Money.",
                    Body: `
                            <h3>We are Verify That we transfer money from your Bank Account To your Wallet.<br>
                            If your are agree with this amount transfer from your banck account than fill the 
                            following text.<br><br></h3>
                    
                    <p>Message: "${emailMsg}"</p>`,
                })
                    .then(function (message) {
                        alert("Send a Mail to conformation.")
                        let msg=prompt('Enter text');
                        if(msg==emailMsg){
                            update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: walletmoney + insertMoney })
                            alert("Congretes Your Money Added Successfully.");
                            location.href="./walletmoney.html"
                        }
                        else{
                            alert('Enter wrong text.')
                        }
                    })
                    .catch(function (message) {
                        alert("error")
                    });
            }

            sendEmail();
        } else {
            alert("you can add atmost 1000000 rs. in your wallet .")

        }
    }
}
walletUtilities();
