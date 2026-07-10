import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { IDeepDiveProduct } from "../../../../shared/models/product.models";
import { computed, inject } from "@angular/core";
import { GlobalCheckoutStore } from "../../../../shared/store/global-checkout.store";
import { Router } from "@angular/router";
import { DeepDiveProduct } from "../../../../deep-dive-product-data";

type ProductState = {
  products: IDeepDiveProduct[];
};

const initialProductState: ProductState = {
  products: [],
}

export const ProductStore = signalStore(
  withState(initialProductState),

  withComputed((store) => ({
    productsByCategories: computed(() => {
      const categoryProductMap = store.products().reduce(
        (result: Record<string, IDeepDiveProduct[]>, product) => {
          const category = product.category;

          if (!result[category]) {
            result[category] = [];
          }

          result[category].push(product);

          return result;
        },
        {},
      );

      return Object.keys(categoryProductMap).map(
        (category) => ({
          category,
          products: categoryProductMap[category],
        }),
      );
    })
  })),

  withMethods((
    store, 
    globalCheckoutStore = inject(GlobalCheckoutStore), 
    router = inject(Router)) => ({
      getAll() {
        patchState(store, { products: DeepDiveProduct.products })
      },
      addToCart: globalCheckoutStore.addToCart,
      onProductClicked(id: string) {
        router.navigate(['products', id]);
      },
  })),
  withHooks({
    onInit(store) {
      store.getAll();
    }
  })
);