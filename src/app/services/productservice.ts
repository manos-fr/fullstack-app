import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapData } from '../data.functions';

import { Product, ProductsMapped } from '../domain/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<ProductsMapped> {
    return this.http
      .get<any>(`assets/data/products.json`)
      .pipe(map((res) => mapData(res)));
  }
}
