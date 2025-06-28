import { getProduct} from "../data/products.js";
import { orders } from "../data/Orders/orders-shorts.js";
import { updateCart } from "../data/cart.js";

 function trackingPage() {

// Get query parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
const orderId = urlParams.get("orderId");



// Find the specific order by ID
const order = orders.find(order => order.id === orderId);


// Find the item in the order
const item = order.items.find(i => i.productId === productId);



// Fetch the product details
const product = getProduct(productId);



// Calculate delivery date
const deliveryDate = dayjs(order.placedAt).add(4, "day").format("dddd, MMMM D");

// Build tracking HTML
const trackingHTML = `
  <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>

    <div class="delivery-date">Arriving on ${dayjs(item.deliveryDate).format('MMMM D')}</div>

    <div class="product-info">${product.name}</div>
    <div class="product-info">Quantity: ${item.quantity}</div>

    <img class="product-image" src="${product.image}" />

    <div class="progress-labels-container">
      <div class="progress-label">Preparing</div>
      <div class="progress-label">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  </div>
`;

document.querySelector(".js-main").innerHTML = trackingHTML;
updateCart();
 } 
 trackingPage();
 
 
 const label = document.querySelectorAll('.progress-label');
 const progressBar = document.querySelector('.progress-bar');
 
 const progressStages = [0, 50, 100]
let stage = 0;

function updateProgress() {
  label.forEach((label)=>label.classList.remove('active'))
  
  if (label[stage]) {
    label[stage].classList.add('active')
  }
  progressBar.style.width = `${progressStages[stage]}%`;

stage++;
if (stage<progressStages.length) {
  setTimeout(updateProgress, 5000)
}
}
updateProgress();
