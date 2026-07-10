import { inject, Injectable, signal } from '@angular/core';
import { IDeepDiveProduct } from '../models/product.models';
import { map, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  readonly #baseUrl = 'api/cartDeepDive';
  readonly #http = inject(HttpClient);

  addToCart(product: IDeepDiveProduct) {
    return this.#http.post<IDeepDiveProduct[]>(this.#baseUrl, product);
  }

  getCartProducts() {
    return this.#http.get<IDeepDiveProduct[]>(this.#baseUrl);
  }

  removeFromCart(index: number) {
    return this.#http.delete(this.#baseUrl + index);
  }
}
