import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { IDeepDiveProduct } from "../../../../shared/models/product.models";
import { computed, inject } from "@angular/core";
import { GlobalCheckoutStore } from "../../../../shared/store/global-checkout.store";
import { DeepDiveProduct } from "../../../../deep-dive-product-data";
import { GlobalProductsStore } from "../../../../shared/store/global-products.store";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustMap, filter, pipe, tap } from "rxjs";
import { ProductDetailService } from "../../service/product-detail.service";
import { tapResponse } from "@ngrx/operators";

type ProductDetailState = {
  productId: string | null;
}

const initialProductDetailState: ProductDetailState = {
  productId: null,
};

export const ProduductDetailStore = signalStore(
  withState(initialProductDetailState),

  withComputed((
    store,
    globalProductStore = inject(GlobalProductsStore)
  ) => ({
    productDetail: computed(() => {
      const productID = store.productId();
      const existingProduct = globalProductStore.products().find(p => p.id === productID);

      return existingProduct ?? null;
    })
  })),

  withMethods((
    store,
    globalCheckoutSTore = inject(GlobalCheckoutStore),
    globalProductStore = inject(GlobalProductsStore),
    productDetailService = inject(ProductDetailService)
  ) => ({
    addToCart: globalCheckoutSTore.addToCart,

    loadProductIfNotLoaded: rxMethod<string>(
      pipe(
        tap((productId) => patchState(store, { productId })),
        filter((productId) => !globalProductStore.products().find(p => p.id === productId)),
        exhaustMap((productId) => productDetailService.loadProductDetail(productId).pipe(
          tapResponse({
            next: (product) => {
              globalProductStore.add(product)
            },
            error: console.error,
          })
        ))
      )
    )
  }))
)