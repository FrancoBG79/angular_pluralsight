import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProductData } from './rxjs_signals_fundamentals/products/product-data';
import { ReviewData } from './rxjs_signals_fundamentals/reviews/review-data';
import { SupplierData } from './rxjs_signals_fundamentals/suppliers/supplier-data';
import { ProductRobotData } from './animations/product-data';
import { CartRobotData } from './animations/cart/cart-data';
import { DeepDiveProduct } from './deep_dive/deep-dive-product-data';
import { DeepDiveCart } from './deep_dive/deep-dive-cart-data';

// Required class for the In Memory Web API
export class AppData implements InMemoryDbService {

  // Creates the 'in memory' database
  // Can then issue http requests to retrieve this data,
  // just as if the data were located on a backend server
  createDb() {
    const productsRobot = ProductRobotData.products;
    const products = ProductData.products;
    const suppliers = SupplierData.suppliers;
    const reviews = ReviewData.reviews;
    const cart = CartRobotData.cart;  
    const productsDeepDive = DeepDiveProduct.products;
    const cartDeepDive = DeepDiveCart.cart;
    return { 
      products, 
      suppliers, 
      reviews, 
      productsRobot, 
      cart, 
      productsDeepDive, 
      cartDeepDive 
    };
  }
}
