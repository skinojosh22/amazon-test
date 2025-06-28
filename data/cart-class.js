import { getDeliveryId } from "./Checkout/deliveryOption.js";
import { businessDays } from "./Utils/BussinessDays.js";

class Cart {
 cartItems = JSON.parse(localStorage.getItem(this.localStorageKey))||[];
 localStorageKey;

 constructor(localStorageKey){
  this.localStorageKey = localStorageKey;
  this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey))||[];
 }

saveToCart() {
  localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
}

updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })
  matchingItem.deliveryOptionId = deliveryOptionId;

  const deliveryOption = getDeliveryId(deliveryOptionId);
  const today = dayjs();
  const deliveryDate = businessDays(today, deliveryOption.deliveryTime);
  matchingItem.deliveryDate = deliveryDate.toISOString();

  this.saveToCart();
}

RemoveCartItem(productId) {
  const newCart = [];
  this.cartItems.find((cartItem)=>{
    if ( cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });
  this.cartItems = newCart;
  this.saveToCart();
}

changeCheckoutValue(productId, newQuantity) {
  let matchingItem = this.cartItems.find((item)=> item.productId === productId);
       if (matchingItem) {
         matchingItem.quantity = newQuantity;
}
this.saveToCart();
this.updateCart();
}

cartQuantityScore(productId) {
   const selectQuantity = document.querySelector(`.js-selector[data-product-id="${productId}"]`);
 
   //const quantity = Number(selectQuantity.value)||1;
   const quantity = selectQuantity ? Number(selectQuantity.value) || 1 : 1;

 
   let matchingItem = this.cartItems.find((item)=> item.productId === productId);
       if (matchingItem) {
         matchingItem.quantity+= quantity
       } else {
         this.cartItems.push({
           productId,
           quantity,
           deliveryOptionId: '2'
         })
       } 
       this.updateCart();
      this.saveToCart();
     }

     updateCart() {
      const cartQuantity = this.cartItems.reduce((sum, item)=> sum + item.quantity, 0);

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
     removeCart(){
      localStorage.removeItem('cart')
     }
     

}

export const cart = new Cart('cart');
export const businessOrder = new Cart('business-order');
