import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  readonly #baseUrl = 'api/productsDeepDive';
  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.#baseUrl);
  }
}
