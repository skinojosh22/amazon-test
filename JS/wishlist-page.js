import {wishlist} from './wishlist.js';
import {products} from '../data/products.js';
import {renderProductHTML} from '../data/Amazon/amazon-products.js';
import {displayMessageAdded} from '../data/Utils/amazon-shorts.js';
import {cart} from '../data/cart-class.js';


renderWishlist();

function renderWishlist() {
  const container = document.querySelector('.js-product-grid');
  let html = '';
  

  wishlist.wishlistItems.forEach((item) => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      html += renderProductHTML(product, { hideCart: true, displayWishlist: false});
    }
  });

  container.innerHTML = html;
  cart.updateCart();
  wishlist.removeWishlist();
  displayMessageAdded();
}