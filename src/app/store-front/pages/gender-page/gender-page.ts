import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { AlertSoft } from '@shared/components/alerts/alert-soft/alert-soft';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { FrontProductCard } from '@store-front/components/front-product-card/front-product-card';
import { Pagination } from "@shared/components/pagination/pagination";
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [FrontProductCard, AlertSoft, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  private route = inject(ActivatedRoute);
  
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);


  genderParam = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('gender') ?? '')
    )
  );

  productsResource = rxResource({
    params: () => ({  gender: this.genderParam(), page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: params.gender,
        offset: params.page * 9
      });
    }
  })
}
