import { getProduct } from "../products.js";
import { getDeliveryId, deliveryOptions } from "./deliveryOption.js";
import { formatPrice } from "../Utils/money.js";
import { cart } from "../cart-class.js";
import { addOrder } from "../Orders/orders-shorts.js";
import { businessDays } from "../Utils/BussinessDays.js";
import {renderPaymentPage} from '../Amazon/amazon-products.js';
import { showToast } from "../toast.js";

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

 if (cart.cartItems.length === 0) {
      priceHTML = '';
    return;
  } else {
    priceHTML += renderPaymentPage(productPrice, totalPrice, totalBeforeTax, shippingFee, tax);
  }

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

       if (!deliveryOption) {
  showToast(`Missing delivery option for item:`, item);
  return {
    ...item,
    deliveryDate: null
  };
}

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
  showToast('❌ An unexpected error occurred:', error);
}
   });


}
