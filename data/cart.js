 import { getDeliveryId } from "./Checkout/deliveryOption.js";
 import { businessDays } from "./Utils/BussinessDays.js";
 
 export let cart = JSON.parse(localStorage.getItem('cart'))||[]; 
 

export function saveToCart() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  const deliveryOption = getDeliveryId(deliveryOptionId);
  const today = dayjs();
  const deliveryDate = businessDays(today, deliveryOption.deliveryTime);
  matchingItem.deliveryDate = deliveryDate.toISOString();

  saveToCart();
}

export function RemoveCartItem(productId) {
  const newCart = [];
  cart.find((cartItem)=>{
    if ( cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToCart();
}

export function changeCheckoutValue(productId, newQuantity) {
  let matchingItem = cart.find((item)=> item.productId === productId);
       if (matchingItem) {
         matchingItem.quantity = newQuantity;
}
saveToCart();
updateCart();
}

 export function cartQuantityScore(productId) {
   const selectQuantity = document.querySelector(`.js-selector[data-product-id="${productId}"]`);
 
   const quantity = Number(selectQuantity.value)||1;
 
   let matchingItem = cart.find((item)=> item.productId === productId);
       if (matchingItem) {
         matchingItem.quantity+= quantity
       } else {
         cart.push({
           productId,
           quantity,
           deliveryOptionId: '2'
         })
       } 
       updateCart();
       saveToCart();
     }

     export function updateCart() {
      const cartQuantity = cart.reduce((sum, item)=> sum + item.quantity, 0);

      const cartList = document.querySelector('.js-cart-list');
      if (cartList) {
        cartList.innerHTML = cartQuantity + ' items';
      }

      const cartQuantityItem = document.querySelector('.js-cart-quantity');
      if (cartQuantityItem) {
        cartQuantityItem.innerHTML = cartQuantity;
      }
      const itemList = document.querySelector('.item-list');
      if (itemList) {
        itemList.innerHTML = cartQuantity;
      }
     }