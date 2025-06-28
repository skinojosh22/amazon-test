import {getQuantityDropdown} from '../Utils/amazon-shorts.js';
import {formatPrice} from '../Utils/money.js';



export function renderProductHTML(product, {hideCart = false, displayWishlist = true}={}) {
  return  `
  <div class="product-container js-product-container-${product.id}">

          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getProductRating()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
           ${product.getProductPrice()}
          </div>

          <div class="product-quantity-container">
          ${getQuantityDropdown(product.id)}
          </div>
        <button class="wishlist js-wishlist" data-product-id="${product.id}">${displayWishlist ? '❤️' :'❌'}</button>
            ${product.extraInfoHTML()}
          <div class="product-spacer"></div>

          <div class="added-to-cart" data-product-id="${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

        ${hideCart?  `<button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
            Add to Cart
          </button>`:''}
        </div>
  `;
}

export function renderPaymentPage(productPrice, totalPrice, totalBeforeTax, shippingFee, tax) {
  return `

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
}