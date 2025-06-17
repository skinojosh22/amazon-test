import { orderSummaryHTML } from "../data/Checkout/orderSummary.js";
import { paymentSummaryHTML } from "../data/Checkout/PaymentSummary.js";
import { loadProduct, loadProductFetch } from "../data/products.js";


new Promise((resolve) => {
  loadProduct(()=>{
    resolve();
  })
}).then(()=>{
  orderSummaryHTML();
paymentSummaryHTML();
})


/*
loadProduct(()=>{
orderSummaryHTML();
paymentSummaryHTML();
})*/
