import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from './rxjs_signals_fundamentals/cart/cart.service';
// import { Cart } from "./signals/basics/cart/cart";
// import { Range } from "./rxjs/range/range";
// import { HigherOrderMaps } from "./rxjs/higher-order-maps/higher-order-maps";
// import { ProductSelection } from './products/product-selection/product-selection';
// import { ReviewSearch } from './reviews/review-search/review-search';

@Component({
  selector: 'app-root',
  imports: [
    // ProductSelection, 
    // ReviewSearch,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    // Cart
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Acme Product Management';
  pageTitle = 'Acme Product Management';
  private cartService = inject(CartService);
  cartCount = this.cartService.cartCount;
}
