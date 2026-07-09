import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IDeepDiveProduct } from '../../../../shared/models/product.models';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  product = input.required<IDeepDiveProduct>();

  clicked = output<string>();
  cartClicked = output<IDeepDiveProduct>();

  onClick(): void {
    this.clicked.emit(this.product().id);
  }

  onCartClick(event: Event): void {
    event.stopPropagation();

    this.cartClicked.emit(this.product());
  }
}
