
let ProductData=JSON.parse(sessionStorage.ProductData);

console.log(ProductData.pname);
let bidData=document.getElementById("bidData");
bidDataContainer();
function bidDataContainer()
{

let bidContent=`  <h1>${ProductData.pname}</h1>
<div class="container">
    <div class="d-flex flex-column flex-md-row">
        <div class=" col-12 col-md-6" style="background-color: aqua;">
            <div>
                <h2>Current Seller Name</h2>
                <p>Max Bid Price</p>
                <p>Max Bid Person Name</p>
                <p>Ending Time</p>
            </div>
        </div>
        <div class="col-12 col-md-6" style="background-color: rgb(0, 255, 85);">
            <div>
                <h2>Place Your Bid here...</h2>
                <input type="number" placeholder="place bid">
                <button>Place</button>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-between flex-column flex-md-row">
        <div class="col-6 col-md-3" style="background-color: rgb(222, 41, 238);">
            <div>
                <h2>Leader Board</h2>
                <p>1st position</p>
                <p>2nd position</p>
                <p>3rd position</p>
            </div>
        </div>
        <div class=" col-6 col-md-3" style="background-color: rgb(199, 25, 190);">
            <h2>Last 10 Bidders Name</h2>
            <p>1st</p>
            <p>2nd</p>
            <p>3rd</p>
            <p>4th</p>
            <p>5th</p>
        </div>
        <div class="col-6 col-md-3" style="background-color: rgb(132, 161, 161);">
            <h2>My last Bid</h2>
        </div>
    </div>
</div>`;
bidData.innerHTML=bidContent;
}