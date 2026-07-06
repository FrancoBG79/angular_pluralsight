import { Component, computed, inject } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [CurrencyPipe]
})
export class ProductDetailComponent /*implements OnChanges, OnDestroy*/ {
  // Just enough here for the template to compile
  // @Input() productId: number = 0;
 
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  // Product to display
  // product: Product | null = null;
  // product$ = this.productService.product$
  //    .pipe(
  //       catchError(err => {
  //         this.errorMessage = err;
  //         console.error('Error fetching product:', err);
  //         return EMPTY;
  //       })
  //     )
  // Set the page title
  // pageTitle = 'ProductDetail'; // this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
  pageTitle = computed(() => this.product() ? `Product Detail for: ${this.product()?.productName}` : 'Product Detail');
  product = this.productService.product;
  errorMessage = this.productService.productError;
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
    
  // sub!: Subscription;
  
  // ngOnChanges(changes: SimpleChanges): void {
  //   const id = changes['productId'].currentValue;
  //   if (id) {
  //     this.sub = this.productService.getProduct(id)
  //       .pipe(
  //         catchError(err => {
  //           this.errorMessage = err;
  //           console.error('Error fetching product:', err);
  //           return EMPTY;
  //         })
  //       )
  //       .subscribe({
  //         next: product => this.product = product,
  //       });
  //   }
  // }

  // ngOnDestroy(): void {
  //   if (this.sub) {
  //      this.sub.unsubscribe();
  //   }
   
  // }
}
