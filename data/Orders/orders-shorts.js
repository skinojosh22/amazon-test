import {getProduct} from '../products.js';
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

export function calculateOrderTotal(order) {
  let total = 0;
  order.items.forEach(item => {
    const product = getProduct(item.productId);
    if (product) {
      total += product.priceCents * item.quantity;
    }
  });
  return (total / 100).toFixed(2); // format as dollars

}

export function clearOrders() {
  localStorage.removeItem('order');
}
