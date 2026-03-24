import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { FrontProductCard } from '@store-front/components/front-product-card/front-product-card';

@Component({
  selector: 'app-home-page',
  imports: [FrontProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {
  productsService = inject(ProductsService);

  productsResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.productsService.getProducts();
    }
  })
}
