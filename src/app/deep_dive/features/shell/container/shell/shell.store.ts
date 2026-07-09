import { computed, inject } from "@angular/core";
import { signalStore, withComputed } from "@ngrx/signals";
import { GlobalCheckoutStore } from "../../../../shared/store/global-checkout.store";

export const ShellStore = signalStore(
  withComputed((_store, globalCheckoutStore = inject(GlobalCheckoutStore)) => ({
    cartProductCount: computed(() => globalCheckoutStore.products().length)
  })),
);