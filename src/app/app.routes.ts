import { Routes } from '@angular/router';
import { HomeComponent } from './animations/home/home.component';
import { CatalogComponent } from './animations/catalog/catalog.component';
import { CartComponent } from './animations/cart/cart.component';
// import { HomeComponent } from './rxjs_signals_fundamentals/home/home.component';
// import { PageNotFoundComponent } from './rxjs_signals_fundamentals/utilities/page-not-found.component';

export const routes: Routes = [
   { path: 'home', component: HomeComponent, title: "Home - Joe's Robot Shop" },
    { path: 'catalog', component: CatalogComponent, title: "Catalog - Joe's Robot Shop" },
    { path: 'cart', component: CartComponent, title: "Cart - Joe's Robot Shop" },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'welcome', component: HomeComponent },
  // {
  //   path: 'products',
  //   loadComponent: () => import('./rxjs_signals_fundamentals/products/product-list/product-list.component').then(c => c.ProductListComponent)
  // },
  // {
  //   path: 'cart',
  //   loadComponent: () => import('./rxjs_signals_fundamentals/cart/cart-shell/cart-shell.component').then(c => c.CartShellComponent)
  // },
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];
