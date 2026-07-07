/* Defines the product */
import { Review } from "../reviews/review";
export interface Product {
  id: number;
  productName: string;
  productCode: string;
  description: string;
  price: number;
  supplierIds?: number[];
  quantityInStock?: number;
  hasReviews?: boolean;
  reviews?: Review[];
}
