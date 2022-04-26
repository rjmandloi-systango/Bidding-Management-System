// let userDataInssert = document.getElementById("userDataInssert");
// userDataInssert.addEventListener('click', sendEmail);
// let otp = Math.floor(Math.random() * (999999 - 100000) + 100000);

// function sendEmail() {
//     let userEmail = document.getElementById("userEmail").value;

//     alert(userEmail)

//     Email.send({
//         Host: "smtp.gmail.com",
//         Username: "BidItValueForYourValuables@gmail.com",
//         Password: "systango@@",
//         To: userEmail,
//         From: "BidItValueForYourValuables@gmail.com",
//         Subject: "One Time Password",
//         Body: "OTP: " + otp,
//     })
//         .then(function (message) {
//             alert("mail sent successfully")
//             let prm=prompt('Enter otp');
//             if(prm==otp){
//                 alert('done')
//             }else{
//                 alert('fail')
//             }
//         })
//         .catch(function (message) {
//             alert("error")
//         });
// }