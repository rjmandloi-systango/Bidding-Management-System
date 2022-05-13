
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
    document.getElementById("pocketmoney").innerHTML = `${walletmoney} `;
    let addMoney = document.getElementById("addMoney");
    addMoney.addEventListener('click', updateWallet);
   async function updateWallet() {
        let money = document.getElementById('insertMoney').value;
        let insertMoney = parseInt(money);
        if (walletmoney + insertMoney < 1000000) {



            // alert(UserData.Email)
           async function sendEmail() {
                // let userEmail = document.getElementById("userEmail").value;
                const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let emailMsg='';
                const charactersLength = characters.length;
                 
                //opt creation 
                for (let lenthOfOtp = 0; lenthOfOtp < 6; lenthOfOtp++) {
                    emailMsg += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                // money adding confirmation opt 
               
               
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

               
               
               
                .then(async function (message) {
                        // alert("Send a Mail to conformation.")
                        console.log(emailMsg);
                       
                       
                       
                        await swal({
                            title: "confirmation mail sent...",
                            text: "You clicked the button!",
                            icon: "info",
                            button: "Aww yiss!",
                          });
                        
                        let msg=prompt('Enter text');
                        if(msg==emailMsg){
                            update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: walletmoney + insertMoney })
                            // alert("Congretes Your Money Added Successfully.");
                            await swal({
                                title: "Congrats recharge successfull!",
                                text: "You clicked the button!",
                                icon: "success",
                                button: "Aww yiss!",
                              });
                            location.href="./walletmoney.html"
                        }
                        else{
                            // alert('you enter wrong text.')
                            await swal({
                                title: "You enter wrong text!",
                                text: "You clicked the button!",
                                icon: "error",
                                button: "Try Again",
                              });
                        }
                    
                    })
                    .catch(function (message) {
                        alert("error")
                    });
            }
            sendEmail();
        } else {
            // alert("you can add atmost 1000000 rs. in your wallet .")
            await swal({
                title: "Sorry !! you can add atmost 10Lakh rs. in your wallet!",
                text: "You clicked the button!",
                icon: "info",
                button: "Done!",
              });
        }
    }
}
walletUtilities();
