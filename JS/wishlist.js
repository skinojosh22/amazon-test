import { showToast } from "../data/toast.js";

class Wishlist{
  constructor(){
    this.wishlistItems = JSON.parse(localStorage.getItem('wishlist'))||[];
  }
   
  
  saveToWishlist() {
  localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems))
}

RemoveCartWishlist(productId) {
  const newWishlist = [];

 this.wishlistItems.find((wishlists)=>{
    if ( wishlists.productId != productId) {
      newWishlist.push(wishlists);
    }
  });
  this.wishlistItems = newWishlist;
  this.saveToWishlist();
}

  removeWishlist(){
    document.querySelectorAll('.js-wishlist').forEach((button)=>{
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      this.RemoveCartWishlist(productId);
      const container = document.querySelector(`.js-product-container-${productId}`);
      container.remove();
      showToast('removed ❌');
    });
    });
  }


addToWishlist() {
    document.querySelectorAll('.js-wishlist').forEach((button)=>{
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      const alreadySaved = wishlist.wishlistItems.find(item => item.productId === productId);
      if (!alreadySaved) {
        wishlist.wishlistItems.push({productId});
        wishlist.saveToWishlist();
        showToast('Saved to Wishlist ❤️')
      } else {
        showToast('Already added to wishlist ✅')
      }
    });
  });
}
}
export const wishlist = new Wishlist();