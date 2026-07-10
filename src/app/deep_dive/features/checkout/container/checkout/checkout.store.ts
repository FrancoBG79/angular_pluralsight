import { computed, inject } from "@angular/core";
import { signalStore, withComputed, withMethods } from "@ngrx/signals";
import { GlobalCheckoutStore } from "../../../../shared/store/global-checkout.store";
import { IDeepDiveProduct } from "../../../../shared/models/product.models";

export const CheckoutStore = signalStore(
  withComputed((
    _store,
    globalCheckoutStore = inject(GlobalCheckoutStore)
  ) => ({
    cartProducts: globalCheckoutStore.products,
    totalAmount: computed(() => calculateTotalAmount(globalCheckoutStore.products()))
  })),

  withMethods((
    _store,
    globalCheckoutStore = inject(GlobalCheckoutStore)
  ) => ({
    removeFromCart: globalCheckoutStore.removeFromCart,
  })),
);

function calculateTotalAmount(products: IDeepDiveProduct[]) {
    return products.reduce((acc: number, prev) => acc + prev.price, 0);
  }