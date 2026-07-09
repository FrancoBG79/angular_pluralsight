import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDeepDiveProduct } from '../../../shared/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = 'api/productsDeepDive';
  loadProductDetail(id: string): Observable<IDeepDiveProduct> {
    return this.#http.get<IDeepDiveProduct>(this.#baseUrl + '/' + id);
  }
}
