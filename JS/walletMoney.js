
import { db, set, ref, get, child, update, remove } from "./firebase.js";
let UserData = JSON.parse(localStorage.getItem("USERDATA"));

const databaseRef = ref(db);
let walletmoney;
async function walletUtilities() {
    document.getElementById("userMail").value = UserData.Email;
    await get(child(databaseRef, "User/" + UserData.id + "/Details")).then((snapshot) => {
        if (typeof (snapshot) !== 'undefined') {
            if (snapshot.exists()) {
                // console.log("log--" + snapshot.val().WalletMoney)
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
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let emailMsg = '';
                const charactersLength = characters.length;

                //opt creation 
                for (let lenthOfOtp = 0; lenthOfOtp < 6; lenthOfOtp++) {
                    emailMsg += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                // document.getElementById("userMail").value=UserData.Email;
                document.getElementById("message").value = emailMsg;

                document.getElementById('contact-form').addEventListener('submit', function (event) {
                    event.preventDefault();
                    // these IDs from the previous steps
                    emailjs.sendForm('service_azr4btl', 'template_6xrullv', this)
                        .then(async function () {
                            await swal({
                                title: "confirmation mail sent...",
                                text: "Please check your mail...",
                                icon: "info",
                                button: "Aww yiss!",
                            });

                            let msg = prompt('Enter text');
                            if (msg == emailMsg) {
                                update(ref(db, "User/" + UserData.id + "/Details"), { WalletMoney: walletmoney + insertMoney })
                                // alert("Congretes Your Money Added Successfully.");
                                await swal({
                                    title: "Congrats recharge successfull!",
                                    text: "hurray!",
                                    icon: "success",
                                    button: "Aww yiss!",
                                });
                                location.href = "./walletmoney.html"
                            }
                            else {
                                // alert('you enter wrong text.')
                                await swal({
                                    title: "You enter wrong text!",
                                    text: "opps!",
                                    icon: "error",
                                    button: "Try Again",
                                });
                            }
                            console.log('SUCCESS!');
                        }, function (error) {
                            console.log('FAILED...', error);
                        });
                });
                document.getElementById("OTPBtn").click();
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
