import { Component, inject, input } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-page',
  imports: [ProductCard],
  templateUrl: './product-page.html',
})
export class ProductPage {
  private route = inject(ActivatedRoute);

  productsService = inject(ProductsService);
  idProduct = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('idSlug'))
    )
  );
 
  productResource = rxResource({
    params: () => ({ idProduct: this.idProduct() }),
    stream: ({ params }) => this.productsService.getProductById(params.idProduct ?? "")
  });
}
