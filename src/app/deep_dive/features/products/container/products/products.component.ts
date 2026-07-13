import { Component, inject, signal } from '@angular/core';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';;
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';
import { ProductStore } from './products.store';
import { SearchComponent } from "../../presentational/search/search.component";

@Component({
  selector: 'app-products',
  imports: [ProductCategoryComponent, CategoryNamePipe, SearchComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductStore]
})
export class ProductsComponent {
  store = inject(ProductStore);

  constructor() {
    const query = this.store.searchTerm;
    this.store.loadByQuery(query)
  }
}
