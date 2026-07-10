import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { IDeepDiveProduct } from "../../../../shared/models/product.models";
import { inject } from "@angular/core";
import { GlobalCheckoutStore } from "../../../../shared/store/global-checkout.store";
import { DeepDiveProduct } from "../../../../deep-dive-product-data";

type ProductDetailState = {
  product: IDeepDiveProduct | null;
}

const initialProductDetailState: ProductDetailState = {
  product: null,
};

export const ProduductDetailStore = signalStore(
  withState(initialProductDetailState),

  withMethods((
    store,
    globalCheckoutSTore = inject(GlobalCheckoutStore)
  ) => ({
    loadProduct(id: string) {
      const product = DeepDiveProduct.products.find(product => product.id === id);

      patchState(store, { product })
    },

    addToCart: globalCheckoutSTore.addToCart,
  }))
)