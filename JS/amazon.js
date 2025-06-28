import {renderLoadingPage, renderProduct} from '../data/Utils/amazon-shorts.js';



renderLoadingPage();

setTimeout(()=>{
  renderProduct();
}, 1000)

