import { getProduct, loadProductFetch } from "../data/products.js";
import { updateCart } from "../data/cart.js";

// Load orders from localStorage
export const orders = JSON.parse(localStorage.getItem('order')) || [];

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Add new order to storage
export function addOrder(order) {
   order.id = generateId();
  orders.unshift(order);
  saveOrders();
}

function saveOrders() {
  localStorage.setItem('order', JSON.stringify(orders));
}

function calculateOrderTotal(order) {
  let total = 0;
  order.items.forEach(item => {
    const product = getProduct(item.productId);
    if (product) {
      total += product.priceCents * item.quantity;
    }
  });
  return (total / 100).toFixed(2); // format as dollars
}


// Renders order page
function renderOrderPage() {

  
 
  let orderSummaryDate = '';

  

  orders.forEach(order => {
   if (orders.length === 0) {
    orderSummary = `<p>No orders yet.</p>`;
  }

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
  console.error('❌ .js-order-container not found in DOM');
}
updateCart();


document.addEventListener('click', (button) => {
  const target = button.target.closest('.js-buy-again');
  if (!target) return;

  const productId = target.dataset.productId;
  const product = getProduct(productId);

  if (!product) {
    console.error(`❌ Product with ID ${productId} not found`);
    return;
  }

  // Create the item you want to add
  const cartItem = {
    productId: product.id,
    quantity: 1
  };

  // Load existing cart or start new
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if already in cart
  const existingItem = cart.find(item => item.productId === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart(); // update cart badge or UI

  alert(`${product.name} added to cart.`);
});

  }
  

// Wait until products are loaded
window.addEventListener('DOMContentLoaded', () => {
  loadProductFetch().then(() => {
    const orderContainer = document.querySelector('.js-order-container');
    if (orderContainer) {
      renderOrderPage(); // ✅ only runs if the container exists
      updateCart();
    } else {
      console.log('⏭ Skipping renderOrderPage — container not found on this page.');
    }
  });
});

