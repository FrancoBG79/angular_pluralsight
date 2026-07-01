import { Component, inject } from '@angular/core';

import { AsyncPipe, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgClass, ProductDetailComponent, AsyncPipe]
})
export class ProductListComponent /*implements OnInit, OnDestroy*/ {
 
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';
  sub!: Subscription;
  private productService = inject(ProductService);
  // Products
  readonly products$ = this.productService.products$
      .pipe(
        tap(() => console.log('fetched products')),
        catchError(err => {
          this.errorMessage = err;
          console.error('Error fetching products:', err);
          return EMPTY;
        })
      );
  // products: Product[] = [];

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  // ngOnInit(): void {
  //   this.sub = this.productService.products$
  //     .pipe(
  //       tap(() => console.log('fetched products')),
  //       catchError(err => {
  //         this.errorMessage = err;
  //         console.error('Error fetching products:', err);
  //         return EMPTY;
  //       })
  //     ).subscribe({
  //       next: products => {
  //         this.products = products;
  //         console.log('Products fetched successfully');
  //       },
  //     });
  // }
 
  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
}
