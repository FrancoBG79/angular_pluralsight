import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { tapResponse } from "@ngrx/operators";
import { exhaustMap, filter, pipe } from "rxjs";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { ToastrService } from "ngx-toastr";
import { IDeepDiveProduct } from "../models/product.models";
import { CheckoutService } from "../services/checkout.service";
import { GlobalProductsStore } from "./global-products.store";
import { Product } from "../../../rxjs_signals_fundamentals/products/product";
type CheckoutState = {
  productIds: string[];
};

const initialCheckoutState: CheckoutState = {
  productIds: [],
};

export const GlobalCheckoutStore = signalStore(
  { providedIn: 'root' },
  
  withState(initialCheckoutState),

  withComputed((
    store,
    globalProductsStore = inject(GlobalProductsStore)
  ) => ({
    products: computed(() => {
      const byId = globalProductsStore
        .products()
        .reduce<Record<string, IDeepDiveProduct>>((acc, p) => {
          acc[p.id] = p;
          return acc;
        }, {});
      return store.productIds()
        .map((id) => byId[id])
        .filter((p): p is IDeepDiveProduct => !!p);
    })
  })),

  withMethods((
    store, 
    toastrService = inject(ToastrService),
    checkoutService = inject(CheckoutService),
    globalProductStore = inject(GlobalProductsStore)
  ) => ({

    loadProductsIfNotLoaded: rxMethod<void>(
      pipe(
        filter(() => !globalProductStore.products().length),
        exhaustMap(() => checkoutService.getCartProducts().pipe(
          tapResponse({
            next: (products) => {
              globalProductStore.addMany(products);

              patchState(store, { productIds: products.map((p) => p.id)})
            },
            error: console.error
          })
        ))
      )
    ),

    addToCart: rxMethod<IDeepDiveProduct>(
      exhaustMap((product) => checkoutService.addToCart(product)
        .pipe(
          tapResponse({
            next: () => {
              toastrService.success("Item added to cart");
              patchState(store, {
                productIds: [...store.productIds(), product.id],
              });
            },
            error: console.error
          }),
        ),
      ),
    ),

    removeFromCart: rxMethod<number>(
      exhaustMap((index) => checkoutService.removeFromCart(index)
        .pipe(
          tapResponse({
            next: () => {
              toastrService.success("Item removed to cart");
              patchState(store, {
                productIds: store.productIds().filter((_, i) => i !== index),
              });
            },
            error: console.error
          }),
        ),
      ),
    ),
  })),

  withHooks({
    onInit({loadProductsIfNotLoaded}) {
      loadProductsIfNotLoaded();
    }
  })
);