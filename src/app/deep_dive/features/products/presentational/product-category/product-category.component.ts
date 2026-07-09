import { Component, input, output } from '@angular/core';
import { IDeepDiveProduct } from '../../../../shared/models/product.models';
import { ProductComponent } from '../product/product.component';

@Component({
    selector: 'app-product-category',
    imports: [ProductComponent],
    templateUrl: './product-category.component.html',
    styleUrl: './product-category.component.scss'
})
export class ProductCategoryComponent {
  categoryName = input.required<string>();

  products = input.required<IDeepDiveProduct[]>();

  clicked = output<string>();

  cartClicked = output<IDeepDiveProduct>();

  onClicked(id: string): void {
    this.clicked.emit(id);
  }

  onCartClicked(product: IDeepDiveProduct): void {
    this.cartClicked.emit(product);
  }
}
