import { computed, effect, Injectable, signal } from "@angular/core";
import { CartItem } from "./cart";
import { Product } from "../products/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() => 
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  )

  subTotal = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0)
  );

  deliveryFee = computed(() => this.subTotal() < 50 ? 5.99 : 0);

  tax = computed(() =>  Math.round(this.subTotal() * 10.75) / 100);

  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());

  eLength = effect(() => console.log(`Cart length: ${this.cartItems().length}`));
  
  addToCart(product: Product) {
    const index = this.cartItems().findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      this.updateQuantity(this.cartItems()[index], 1);
    } else {
      this.cartItems.update(items => [...items, { product, quantity: 1 }]);
    }
  }

  removeFromCart(cartItem: CartItem) {
    this.cartItems.update(items => 
      items.filter(item => item.product.id !== cartItem.product.id)
    );
  }

  updateQuantity(cartItem: CartItem, quantity: number): void {
    this.cartItems.update(items => 
      items.map(item => 
        item.product.id === cartItem.product.id ? { ...item, quantity } : item
      )
    );
  }
}
