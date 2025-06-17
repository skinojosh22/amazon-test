//import { cart, updateCart } from "../cart.js";
import { getProduct } from "../products.js";
import { getDeliveryId, deliveryOptions } from "./deliveryOption.js";
import { formatPrice } from "../Utils/money.js";
import { cart } from "../cart-class.js";
import { addOrder } from "../../JS/Order.js";
import { businessDays } from "../Utils/BussinessDays.js";

export function paymentSummaryHTML() {
  let productPrice = 0;
  let shippingFee = 0;
  let priceHTML = '';
  cart.cartItems.forEach( cartItem => {
    const product = getProduct(cartItem.productId);
      productPrice += product.priceCents * cartItem.quantity;

      const deliveryOption = getDeliveryId(cartItem.deliveryOptionId);
      shippingFee += deliveryOption.deliveryPrice;
  });
  const totalBeforeTax = productPrice + shippingFee;
  const tax = totalBeforeTax * 0.1;
  const totalPrice = totalBeforeTax + tax;

    priceHTML += `
  <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (<span class="item-list"></span>):</div>
        <div class="payment-summary-money">
        $${formatPrice(productPrice)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
        $${formatPrice(shippingFee)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
        $${formatPrice(totalBeforeTax)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
        $${formatPrice(tax)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
        $${formatPrice(totalPrice)}
        </div>
      </div>

      <button class="place-order-button button-primary 
      js-place-order">
        Place your order
      </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = priceHTML;
    cart.updateCart();

   document.querySelector('.js-place-order').addEventListener('click', () => {
  try {
  const order = {
    id: Date.now(),
    placedAt: new Date().toISOString(),
    total: `$${formatPrice(totalPrice)}`,
    items: cart.cartItems.map(item => {
      const deliveryOption = deliveryOptions.find(option => option.id === item.deliveryOptionId);

      const today = dayjs();
      const deliveryDate = businessDays(today, deliveryOption.deliveryTime);

      return {
        ...item, // spread the item fields like productId, quantity, etc.
        deliveryDate: deliveryDate.toISOString()
      };
    })
  };

  addOrder(order);
  cart.removeCart();
  window.location.href = 'orders.html';

} catch (error) {
  console.error('❌ An unexpected error occurred:', error);
}
   });





    /*document.querySelector('.js-place-order').addEventListener('click', async ()=>{
      try {
        fetch('https://webhook.site/356efb3d-668b-48ac-917b-836fd8aa5029', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      })
      const order = await response.json();
      console.log(order);
      addOrder(order)
      } catch (error) {
        console.log('An unexpected error has been detected. Please try again later')
      }
      
    })*/

}