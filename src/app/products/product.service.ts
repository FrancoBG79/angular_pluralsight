import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from './product';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);
  // Signals to support the template
  selectedProduct = signal<Product | undefined>(undefined);

  // Retrieve data into a signal
  productsResource = rxResource({
    stream: () => 
      this.http.get<Product[]>(this.productsUrl).pipe(
        map(items => items.sort((a, b) => a.productName < b.productName ? -1 : 1))
      ),
    defaultValue: [],
  });

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(() => console.log('Get all products')),
      catchError(err => this.handleError(err))
    );
  }

  getProduct(id: number): Observable<Product> {
    const productUrl = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(productUrl).pipe(
      tap(() => console.log('Get product by ID')),
      /* map((product) => this.getProductWithReviews(product)),*/
      catchError(err => this.handleError(err))
    );
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http.get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(
          map(reviews => ({ ...product, reviews } as Product)),
        )
    } else {
      return of(product);
    }
    
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this.errorService.formatError(err);
    // throw formattedMessage;
    return throwError(() => formattedMessage);
  }

}


