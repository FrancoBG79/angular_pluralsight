import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  imports: [RouterLink, RouterLinkActive, ProductDetailsComponent],
})
export class CatalogComponent {
  private cartSvc: CartService = inject(CartService);
  private productSvc: ProductService = inject(ProductService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  

  filterLinks = ['Heads', 'Arms', 'Torsos', 'Bases', 'All'];
  filterBy = signal('All');
  products = toSignal(this.productSvc.getProducts(), { initialValue: [] });
  filteredProducts = computed(() => 
      this.filterBy() === 'All'
        ? this.products()
        : this.products().filter(
          (product: any) => product.category === this.filterBy()
        )
  )
  

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filterBy.set(params['filter'] ?? 'All');
    })
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }
}
