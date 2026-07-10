import { Component, inject, input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ProductImageComponent } from '../../presentational/product-image/product-image.component';
import { ProductInfoComponent } from '../../presentational/product-info/product-info.component';
import { ProduductDetailStore } from './product-detail.store';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, ProductImageComponent, ProductInfoComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  providers: [ProduductDetailStore]
})
export class ProductDetailComponent {
  id = input.required<string>();
  store = inject(ProduductDetailStore)
}
