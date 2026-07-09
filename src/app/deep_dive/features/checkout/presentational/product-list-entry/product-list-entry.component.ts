import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IDeepDiveProduct } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';

@Component({
  selector: 'app-product-list-entry',
  imports: [NgOptimizedImage, CategoryNamePipe, CurrencyPipe],
  templateUrl: './product-list-entry.component.html',
  styleUrl: './product-list-entry.component.scss',
})
export class ProductListEntryComponent {
  product = input.required<IDeepDiveProduct>();

  removeClicked = output();

  onRemove(): void {
    this.removeClicked.emit();
  }
}
