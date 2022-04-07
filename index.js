let productIdIncrementor = 1;
let bidButtonIdIncrementor = 1;
function createCard() {
  productName = document.getElementById("productName").value;
  productDiscription = document.getElementById("productDiscription").value;
  productStartingBid = document.getElementById("productPrice").value;
  sellerContactNumber = document.getElementById("sellerContactNumber").value;
  let url = "https://image.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg";
  const card = document.createElement('div');
  card.classList = 'card-body';
  let uniqueProductId = "productId" + productIdIncrementor;
  let uniqueBidButtonId = "bidButton" + bidButtonIdIncrementor;

  // Construct card content
  let productContent = `
<div class="card productCard "  style="width: 18rem;">
  
      <div class="card-body " >
               <div class="productName">
                 <h5 class="card-title">${productName}</h5>    
               </div>

               <div >
                 <img src="${url}" class="card-img-top" alt="...">
               </div>

               <div>
                 <p class="card-text   text-dark">Discription:${productDiscription}</p>
               </div>

               <div >
               <p class="card-text   text-dark">Initial bid:${productStartingBid} &#8377</p>
               </div>
               
              
                    <div class="row border text-dark">
                      <div class="col-sm">
                        <span class="clock"  >&#128336</span><br>
                        <p class="timeText"  id=${uniqueProductId}></p>
                      </div>

                      <div class="col-sm">
                        Max Bid &#8377
                      </div>
                    </div>    
                
                  <div class="d-flex justify-content-between border text-dark >
                  
                       <span class="col-6">person</span>
                       <a href="#" class="btn btn-primary col-6" id=${uniqueBidButtonId} >Your bid</a>
                                   
                  </div>
                
      </div>
</div>
    `;

  // Append newly created card element to the container
  container.innerHTML += productContent;
  timer(uniqueProductId , uniqueBidButtonId);
  productIdIncrementor++;
  bidButtonIdIncrementor++;
}

let bidDate = document.getElementById("bidDate");
let currentDateObj = new Date();
let currentMonth = currentDateObj.getMonth() + 1;
let currentDate = currentDateObj.getDate();
let minDateString = `${currentDateObj.getFullYear()}-`;
if (currentMonth < 10) {
  minDateString += `0${currentMonth}-`;
}
else {
  minDateString += `${currentMonth}-`;
}
if (currentDate < 10) {
  minDateString += `0${currentDate}`;
}
else {
  minDateString += `${currentDate}`;
}
// console.log(minDateString);
bidDate.min = minDateString;
// console.log(bidDate.min);

function timer(uniqueProductId , uniqueBidButtonId ) {

  let bidDate = document.getElementById("bidDate").value;
  let bidTime = document.getElementById("bidTime").value;
  let dateArray = bidDate.split("-");
  let timeArray = bidTime.split(":");
  let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  let shortMonth = date.toLocaleString('en-us', { month: 'short' });
  let userInputDate = new Date(`${shortMonth} ${dateArray[2]}, ${dateArray[0]} ${timeArray[0]}:${timeArray[1]}:00`).getTime();
  // Update the productIdIncrementor down every 1 second
  let timeFunction = setInterval(function () {
    // Get today's date and time
    let currentTime = new Date().getTime();

    // Find the distance between currentTime and the productIdIncrementor down date
    let distance = userInputDate - currentTime;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById(uniqueProductId).innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

    // If the productIdIncrementor down is over, write some text 
    if (distance < 0) {
      document.getElementById(uniqueProductId).innerHTML = "EXPIRED";
      console.log(uniqueBidButtonId);
      document.getElementById(uniqueBidButtonId).style.display = "none";
      clearInterval(timeFunction);
    }
  }, 1000);
}