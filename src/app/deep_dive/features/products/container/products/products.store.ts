import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { IDeepDiveProduct } from "../../../../shared/models/product.models";
import { computed, inject } from "@angular/core";
import { GlobalCheckoutStore } from "../../../../shared/store/global-checkout.store";
import { Router } from "@angular/router";
import { DeepDiveProduct } from "../../../../deep-dive-product-data";
import { GlobalProductsStore } from "../../../../shared/store/global-products.store";

export const ProductStore = signalStore(
  withComputed((
    _store,
    globalProductsStore = inject(GlobalProductsStore)
  ) => ({
    productsByCategories: computed(() => {
      const categoryProductMap = globalProductsStore.products().reduce(
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
    _store, 
    globalCheckoutStore = inject(GlobalCheckoutStore), 
    router = inject(Router)) => ({
      addToCart: globalCheckoutStore.addToCart,
      onProductClicked(id: string) {
        router.navigate(['products', id]);
      },
  })),
  withHooks({
    onInit(
      _store,
      globalProductsStore = inject(GlobalProductsStore),
    ) {
      globalProductsStore.getAll();
    }
  })
);