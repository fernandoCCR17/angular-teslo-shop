import { Component, input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarousel } from "../product-carousel/product-carousel";

@Component({
  selector: 'product-card',
  imports: [ProductCarousel],
  templateUrl: './product-card.html',
})
export class ProductCard { 
  product = input.required<Product>();
}
