import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { tapResponse } from "@ngrx/operators";
import { exhaustMap } from "rxjs";
import { IDeepDiveProduct } from "../models/product.models";
import { ProductsService } from "../services/products.service";

type ProductsState = {
  products: IDeepDiveProduct[];
}

const initialProductsState: ProductsState = {
  products: [],
};

export const GlobalProductsStore = signalStore(
  { providedIn: 'root' },

  withState(initialProductsState),

  withMethods((
    store,
    productsService = inject(ProductsService)
  ) => ({
    getAll: rxMethod<void>(
      exhaustMap(() => productsService.loadProducts()
        .pipe(
          tapResponse({
            next: (products) => patchState(store, { products }),
            error: console.error,
          }),
        ),
      ),
    ),

    add(product: IDeepDiveProduct) {
      patchState(store, { products: [...store.products(), product]});
    },

    addMany(products: IDeepDiveProduct[]) {
      patchState(store, { products })
    },
  })),
);