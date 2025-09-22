import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[];
  available_sizes: string[];
}

export interface ProductListResponse {
  data: Product[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
   private apiUrl = 'https://api.redseam.redberryinternship.ge/api/products';

  constructor(private http: HttpClient) { }

   getProducts(
    page: number = 1,
    priceFrom?: number,
    priceTo?: number,
    sort?: string
  ): Observable<ProductListResponse> {
    let params = new HttpParams().set('page', page);

    if (priceFrom !== undefined) {
      params = params.set('filter[price_from]', priceFrom.toString());
    }
    if (priceTo !== undefined) {
      params = params.set('filter[price_to]', priceTo.toString());
    }
    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<ProductListResponse>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }



}


