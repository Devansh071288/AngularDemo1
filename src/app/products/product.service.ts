import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './product';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'api/products';
  constructor(private http: HttpClient) { }

  getProducts() : Observable<IProduct[]>
  {
      return this.http.get<IProduct[]>(this.productUrl).pipe(
        tap(products => console.log('Products Data : ', JSON.stringify(products)))
      );
  }

  getProduct(id: number) : Observable<IProduct>
  {
    const Url = `${this.productUrl}/${id}`;
    return this.http.get<IProduct>(Url).pipe(
      map(product => product),
      tap(product => console.log('Product Data : ', product))
    )
  }
}
