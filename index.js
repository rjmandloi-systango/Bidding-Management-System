function createCard() {
  productName = document.getElementById("productName").value;
  productDiscription = document.getElementById("productDiscription").value;
  productStartingBid = document.getElementById("productPrice").value;
  sellerContactNumber = document.getElementById("sellerContactNumber").value;
  let url = "https://image.shutterstock.com/image-illustration/modern-cars-studio-room-3d-260nw-735402217.jpg";
  const card = document.createElement('div');
  card.classList = 'card-body';

  // Construct card content
  const content = `
  <div class="card productCard "  style="width: 18rem;">
  
  <div class="card-body " >
    <div class="pro-name">
    <h5 class="card-title cd-title productText">${productName}</h5>    
    </div>
    <div >
    <img src="${url}" class="card-img-top" alt="...">
    </div>
    <div >
    <p class="card-text productText">Discription:${productDiscription}</p>
    </div>
    <div>
        <div >
         <p class="card-text productText">Initial bid:${productStartingBid} &#8377</p>
         </div>
         <div>
         <p class="card-text productText">Initial bid:${productStartingBid} &#8377</p>
         </div>     
         </div>
    <a href="#" class="btn btn-primary " >Your bid</a>
  </div>
</div>
    `;

  // Append newyly created card element to the container
  container.innerHTML += content;
}
