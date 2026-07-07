import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

export interface Product {
  id: number;
  name: string;
  price: number;
}
@Component({
  selector: 'app-cart',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  quantity = signal(0);

  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);

  selectedProduct = signal<Product>({
    id: 5,
    name: 'Hammer',
    price: 12
  });

  exPrice = computed(() => this.selectedProduct().price * this.quantity());
  color = computed(() => this.exPrice() > 50 ? 'green' : 'blue');

  e = effect(() => console.log('In effect, price: ' , this.exPrice()));
  constructor() {
    console.log('In constructor: ', this.quantity());

    effect(() => console.log('In effect: ', this.quantity()));

    this.quantity.update(q => q * 7);
  }

  onQuantitySelected(qty: number) {
    this.quantity.set(qty);
  }
}
