import { getProduct} from "../data/products.js";
import { cart } from "../data/cart-class.js";
import {orders, calculateOrderTotal, clearOrders} from '../data/Orders/orders-shorts.js';
import { showToast } from "../data/toast.js";


renderOrderPage();
// Renders order page
function renderOrderPage() {
let ClearOrders = document.getElementById('remove-orders');

if (orders.length === 0) {
  document.querySelector('.js-order-container').innerHTML =`
  <div class = "no-orders">🛒 No orders <a class = "shop-link" href = "amazon.html">Go Shopping</a></div>
  `;
  ClearOrders.style.opacity = 0;
  return;
}
  
 
  let orderSummaryDate = '';

  

  orders.forEach(order => {
   
   let orderSummary =`
           <div class="order-block">
     <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.placedAt).format('MMMM D') || "Unknown Date"}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${calculateOrderTotal(order)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

    `;

    order.items.forEach(item => {
      const product = getProduct(item.productId);
     

      orderSummary += `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${product.image}" />
          </div>
          <div class="product-details">
            <div class="product-name">${product.name}</div>
            <div class="product-delivery-date">Arriving on: ${dayjs(item.deliveryDate).format('MMMM D')}</div>
            <div class="product-quantity">Quantity: ${item.quantity}</div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message js-buy-again" data-product-id="${item.productId}">Buy it again</span>
            </button>
          </div>
          <div class="product-actions">
            <a href="tracking.html?productId=${item.productId}&orderId=${order.id}">
              <button class="track-package-button button-secondary">Track package</button>
            </a>
          </div>
        </div>
      `;
    });
    // Close order block
    orderSummary += `</div>`;

    // Append to fullHTML
    orderSummaryDate += orderSummary;
  });

   
const orderContainer = document.querySelector('.js-order-container');

if (orderContainer) {
  orderContainer.innerHTML = orderSummaryDate;
} else {
  showToast('❌ .js-order-container not found in DOM');
}
cart.updateCart();


document.addEventListener('click', (button) => {
  const target = button.target.closest('.js-buy-again');
  if (!target) return;

  const productId = target.dataset.productId;
  const product = getProduct(productId);

  if (!product) {
    showToast(`❌ Product with ID ${productId} not found`);
    return;
  }

  cart.cartQuantityScore(productId);

  showToast(`${product.name} added to cart. 🛒`);
});
ClearOrders.addEventListener('click', ()=>{
  clearOrders();
  showToast('Orders removed ❌');
    location.reload();
});
  }
  
  


