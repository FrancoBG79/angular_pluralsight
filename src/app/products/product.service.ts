import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from './product';
import { rxResource } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, combineLatest, filter, map, Observable, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private reviewsUrl = 'api/reviews';
  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
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

  private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  readonly products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap((products) => console.log('Get all products: ', JSON.stringify(products))),
      shareReplay(1),
      catchError(err => this.handleError(err))
    );

  readonly product1$ = this.productSelected$
    .pipe(
      filter(Boolean),
      switchMap((id) => {
        const productUrl = `${this.productsUrl}/${id}`;
        return this.http.get<Product>(productUrl).pipe(
          tap(() => console.log('Get product by ID')),
          switchMap((product) => this.getProductWithReviews(product)),
          catchError(err => this.handleError(err))
        );
      })
    );

  readonly product$ = combineLatest([
    this.productSelected$,
    this.products$
  ]).pipe(
    map(([selectedProductId, products]) => 
      products.find((product) => product.id === selectedProductId)
    ),
    filter(Boolean),
    switchMap((product) => this.getProductWithReviews(product)),
    catchError(err => this.handleError(err))
  )

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productsUrl).pipe(
  //     tap(() => console.log('Get all products')),
  //     catchError(err => this.handleError(err))
  //   );
  // }

  // getProduct(id: number): Observable<Product> {
  //   const productUrl = `${this.productsUrl}/${id}`;
  //   return this.http.get<Product>(productUrl).pipe(
  //     tap(() => console.log('Get product by ID')),
  //     switchMap((product) => this.getProductWithReviews(product)),
  //     catchError(err => this.handleError(err))
  //   );
  // }

  producSelected(slectedProductId: number): void {
    this.productSelectedSubject.next(slectedProductId);
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      // Build the reviews URL locally to avoid a circular injection
      const url = `${this.reviewsUrl}?productId=^${product.id}$`;
      return this.http.get<Review[]>(url)
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


