import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
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
    // Range,
    // HigherOrderMaps
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Acme Product Management';
  pageTitle = 'Acme Product Management';

  cartCount = 0;
}
