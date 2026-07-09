import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDeepDiveProduct } from '../../../shared/models/product.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  readonly #baseUrl = 'api/productsDeepDive';
  loadProducts(): Observable<IDeepDiveProduct[]> {
    return this.http.get<IDeepDiveProduct[]>(this.#baseUrl);
  }
}
