import { Component, inject } from '@angular/core';
import { CartItem } from '../cart';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-list',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: 'cart-list.component.html'
})
export class CartListComponent {
  // Just enough here for the template to compile
  pageTitle = 'Cart';
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
}
