import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from './product';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, combineLatest, filter, map, Observable, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';
import { Review } from '../reviews/review';
import { Result } from '../utilities/utilities';

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


  selectedProductId = signal<number | undefined>(undefined);

  private productsResult$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      map(products => ({ data: products } as Result<Product[]>)),
      shareReplay(1),
      catchError(err => of({ data: [], error: this.errorService.formatError(err) } as Result<Product[]>))
    );

  private productsResult = toSignal(this.productsResult$, { initialValue: ({ data: [] } as Result<Product[]>) });

  products = computed(() => this.productsResult().data || []);
  productsError = computed(() => this.productsResult().error || '');

  private productResul$ = toObservable(this.selectedProductId)
    .pipe(
      filter(Boolean),
      switchMap((id) => {
        const productUrl = `${this.productsUrl}/${id}`;
        return this.http.get<Product>(productUrl).pipe(
          switchMap((product) => this.getProductWithReviews(product)),
          catchError(err => of({ data: [], error: this.errorService.formatError(err) } as Result<Product[]>))
        );
      }),
      map(product => ({ data: product } as Result<Product>)),
    );

  private productResult = toSignal(this.productResul$, { initialValue: ({ data: undefined } as Result<Product>) });
  product = computed(() => this.productResult()?.data);
  productError = computed(() => this.productResult()?.error || '');
  
  producSelected(selectedProductId: number): void {
    // this.productSelectedSubject.next(selectedProductId);
    this.selectedProductId.set(selectedProductId);
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

  // private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  // readonly productSelected$ = this.productSelectedSubject.asObservable();

  // readonly product$ = this.productSelected$
  //   .pipe(
  //     filter(Boolean),
  //     switchMap((id) => {
  //       const productUrl = `${this.productsUrl}/${id}`;
  //       return this.http.get<Product>(productUrl).pipe(
  //         tap(() => console.log('Get product by ID')),
  //         switchMap((product) => this.getProductWithReviews(product)),
  //         catchError(err => this.handleError(err))
  //       );
  //     })
  //   );

  // readonly product$ = combineLatest([
  //   this.productSelected$,
  //   this.products$
  // ]).pipe(
  //   map(([selectedProductId, products]) => 
  //     products.find((product) => product.id === selectedProductId)
  //   ),
  //   filter(Boolean),
  //   switchMap((product) => this.getProductWithReviews(product)),
  //   catchError(err => this.handleError(err))
  // )

  // products = computed(() => {
  //   try {
  //     return toSignal(this.products$, { initialValue: [] })();
  //   } catch (error) {
  //     return [];
  //   }
  // });

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

}


