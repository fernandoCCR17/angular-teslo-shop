import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Product, ProductsResponse } from "@products/interfaces/product.interface";
import { count, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

interface Options {
    limit?: number;
    offset?: number;
    gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductsService {
    private http = inject(HttpClient);

    private productsCache = new Map<string, ProductsResponse>();
    private productCache = new Map<string, Product>();

    getProducts(options?: Options): Observable<ProductsResponse> {
        const { limit = 10, offset = 0, gender = '' } = options || {};

        const key = `${limit}-${offset}-${gender}`;
        if (this.productsCache.has(key)) {
            return of(this.productsCache.get(key)!);
        }


        return this.http
        .get<ProductsResponse>(`${baseUrl}/products`, {
            params: {
                limit,
                offset,
                gender
            }
        }).pipe(
            tap(response => this.productsCache.set(key, response))
        );
    }
    
    getProductById(idProduct: string): Observable<Product> {
        if (!idProduct) return new Observable<Product>();

        const key = idProduct;
        if (this.productCache.has(key)) {
            return of(this.productCache.get(key)!);
        }


        return this.http
        .get<Product>(`${baseUrl}/products/${idProduct}`).pipe(
            tap(product => this.productCache.set(key, product))
        )
    }
}