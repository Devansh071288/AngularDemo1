import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './product';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'api/products';
  constructor(private http: HttpClient) { }

  getProducts() : Observable<IProduct[]>
  {
      return this.http.get<IProduct[]>(this.productUrl).pipe(
        tap(products => console.log('Product Data : ', JSON.stringify(products)))
      );
  }
}
