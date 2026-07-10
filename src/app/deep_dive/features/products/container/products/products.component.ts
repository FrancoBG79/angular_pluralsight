import { Component, inject, signal } from '@angular/core';
import { IDeepDiveProduct } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';;
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';
import { ProductStore } from './products.store';

@Component({
  selector: 'app-products',
  imports: [ProductCategoryComponent, CategoryNamePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductStore]
})
export class ProductsComponent {
  store = inject(ProductStore);

}
