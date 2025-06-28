import { getProduct } from "../products.js";
import { deliveryOptions, getDeliveryId } from "./deliveryOption.js";
import { businessDays } from "../Utils/BussinessDays.js";
import { formatPrice } from "../Utils/money.js";
import { paymentSummaryHTML } from "./PaymentSummary.js";
import { cart } from "../cart-class.js";
import { showToast } from "../toast.js";


export function orderSummaryHTML() {
  let orderSummary ='';
  
if (cart.cartItems.length === 0) {
  document.querySelector('.js-order-summary').innerHTML = `
  <div>Cart is empty. <a href="amazon.html">Go to shop</a></div>
  `;
  return;
}

cart.cartItems.forEach((cartItem)=>{

  const productId = cartItem.productId;
  const matchProduct = getProduct(productId)

  const deliveryOptionId = cartItem.deliveryOptionId;
  const deliveryOption = getDeliveryId(deliveryOptionId);

  const today = dayjs();
  const deliveryDate = businessDays(today, deliveryOption.deliveryTime);
  const dateString = deliveryDate.format('dddd, MMMM D');

  orderSummary += `
   <div class="cart-item-container js-cart-container-${matchProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchProduct.name}
          </div>
          <div class="product-price">
            $${formatPrice(matchProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update" data-product-id="${matchProduct.id}">
              Update
            </span>
            <input class="js-input">
            <span class="save link-primary js-save-link" data-product-id="${matchProduct.id}">save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionHTML(matchProduct, cartItem)}

        </div>
      </div>
    </div>
  `
})


function deliveryOptionHTML(matchProduct, cartItem) {
  let html = '';
  
  deliveryOptions.forEach((deliveryOption)=>{
  const today = dayjs();
  const deliveryDate = businessDays(today, deliveryOption.deliveryTime);
  const dateString = deliveryDate.format('dddd, MMMM D');

  const priceString = deliveryOption.deliveryPrice === 0
  ? 'FREE'
  : `$${(deliveryOption.deliveryPrice/100).toFixed(2)} -`
  ;

  const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
  html +=`
      <div class="delivery-option js-delivery-option" data-product-id = "${matchProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio" ${isChecked ?'checked' :''}
          class="delivery-option-input"
          name="delivery-option-${matchProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
`;
})

return html;
}

document.querySelector('.js-order-summary').innerHTML = orderSummary;

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click', ()=>{
    const {productId, deliveryOptionId} = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      orderSummaryHTML();
      paymentSummaryHTML();
  })
})

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;
   cart.RemoveCartItem(productId);
   cart.updateCart();
   const container = document.querySelector(`.js-cart-container-${productId}`);
   container.remove();
   paymentSummaryHTML();
  })
})

document.querySelectorAll('.js-update').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const cartItem = link.closest('.cart-item-container');
    cartItem.classList.add('isEditing');
  })
})

document.querySelectorAll('.js-save-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;
    const cartItem = link.closest('.cart-item-container');
   const values = cartItem.querySelector('.js-input');
   const newQuantity = Number(values.value);
   cartItem.classList.remove('isEditing');

   if (newQuantity >= 1 && newQuantity <= 100) {
    cart.changeCheckoutValue(productId, newQuantity);
    cart.updateCart();
    orderSummaryHTML();
    paymentSummaryHTML();
   } else {
    showToast("Please enter a valid number between 1 - 100")
   }
  })
});
cart.updateCart();


}
