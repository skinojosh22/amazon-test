import {cart} from '../cart-class.js';
import {products} from '../products.js';
import {renderProductHTML} from '../Amazon/amazon-products.js';
import {wishlist} from '../../JS/wishlist.js';



export function getQuantityDropdown(productId, maxQuantity=10) {
  let options = '';
  for (let i = 1; i <= maxQuantity; i++) {
    options += `
     <option value="${i}" ${i === 1 ? 'selected' : ''}>${i}</option>
    `
  }
  return `
   <select class="js-selector" data-product-id="${productId}">
      ${options}
     </select>
  `
}

export function showAdded(productId) {

      const messsage = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);

      messsage.classList.add('added');
      setTimeout(()=>{
        messsage.classList.remove('added');
      },1500)
    }
    
  export function displayMessageAdded() {
    
    
    
  document.querySelectorAll('.js-add-to-cart').forEach((button) =>{

    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      showAdded(productId);
      cart.cartQuantityScore(productId);
      cart.updateCart();
      
    })
  });
  }

  export function renderProduct() {
  let productHTML ='';

    products.forEach((product) =>{
  productHTML += renderProductHTML(product, {hideCart: true, hideWishlist: true});
});
document.querySelector('.js-product-grid').innerHTML = productHTML;
  displayMessageAdded();
    wishlist.addToWishlist();
    cart.updateCart();
}
  
  export function renderLoadingPage() {
const productGrid = document.querySelector('.js-product-grid');
const loadingMessage =productGrid.innerHTML = `
<div class = "loading">Loading products...</div>
`;
return loadingMessage
}

