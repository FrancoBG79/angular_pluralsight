import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ProductDetailsComponent } from "../product-details/product-details.component";

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  imports: [RouterLink, RouterLinkActive, ProductDetailsComponent],
})
export class CatalogComponent {
  products: any;
  filter: string = '';

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productSvc.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    })
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter(
        (product: any) => product.category === this.filter
      );
  }
}
