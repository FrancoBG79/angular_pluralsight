import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [NgClass, CurrencyPipe],
})
export class ProductDetailsComponent {
  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return `images/robot-parts/${product.imageName}`;
  }

  buyButtonClicked(product: IProduct) {
    this.buy.emit();
  }
}
