import { Component, computed, effect, inject, Input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-item',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {

  @Input({ required: true }) set cartItem(ci: CartItem) {
    this.item.set(ci);
  }

  private cartService = inject(CartService);
  // Quantity available (hard-coded to 8)
  // Mapped to an array from 1-8
  item = signal<CartItem>(undefined!)
  qtyArr = computed(() => [...Array(this.item().product.quantityInStock).keys()].map(x => x + 1));
  // qtyArr = [...Array(this.stockQty()).keys()].map(x => x + 1);

  // Calculate the extended price
  // exPrice = this.cartItem?.quantity * this.cartItem?.product.price;
  exPrice = computed(() => this.item().quantity * this.item().product.price);

  onQuantitySelected(quantity: number): void {
    this.cartService.updateQuantity(this.item(), Number(quantity));
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.item());
  }
}
