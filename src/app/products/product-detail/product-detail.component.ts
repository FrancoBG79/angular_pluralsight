import { Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Product } from '../product';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent implements OnChanges, OnDestroy {
  // Just enough here for the template to compile
  @Input() productId: number = 0;
  errorMessage = '';

  // Product to display
  product: Product | null = null;

  // Set the page title
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
    
  sub!: Subscription;
  private productService = inject(ProductService);
  ngOnChanges(changes: SimpleChanges): void {
    const id = changes['productId'].currentValue;
    if (id) {
      this.sub = this.productService.getProduct(id)
        .pipe(
          catchError(err => {
            this.errorMessage = err;
            console.error('Error fetching product:', err);
            return EMPTY;
          })
        )
        .subscribe({
          next: product => this.product = product,
        });
    }
  }

  addToCart(product: Product) {
  }

  ngOnDestroy(): void {
    if (this.sub) {
       this.sub.unsubscribe();
    }
   
  }
}
