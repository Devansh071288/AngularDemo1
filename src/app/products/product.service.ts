import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IProduct } from './product';
import { tap, map, catchError } from 'rxjs/operators';

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
    if(id === 0)
    {
      return of(this.initializeProduct());
    }
    const Url = `${this.productUrl}/${id}`;
    return this.http.get<IProduct>(Url).pipe(
      map(product => product),
      tap(product => console.log('Product Data : ', product))
    )
  }

  deleteProduct(product: IProduct): Observable<IProduct>
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const id = product ? product.id : '';
    const Url = `${this.productUrl}/${id}`;
    
    return this.http.delete<IProduct>(Url, httpOptions).pipe(
      tap((data) => console.log('Deleted Products : ' + JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse)
  {
    let errorMessage = '';

    if(error.error instanceof ErrorEvent)
    {
      errorMessage = `An error occurred at : ${error.error.message}`; // Network related error messages
    }
    else
    {
      errorMessage = `Server returned code as : ${error.status}, error message is: ${error.message} `;
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

  saveProduct(product: IProduct)
  {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    if(product.id === 0)
    {
      return this.createProduct(product, headers);
    }
    
    return this.updateProduct(product, headers);
  }

  private updateProduct(product: IProduct, options: HttpHeaders) : Observable<IProduct>
  {
    const url = `${this.productUrl}/${product.id}`;

    return this.http.put(url, product, {headers : options}).
    pipe(map(() => product), catchError(this.handleError));
  }

  private createProduct(product: IProduct, options: HttpHeaders): Observable<IProduct>
  {
    product.id = undefined;
    return this.http.post<IProduct>(this.productUrl, product, {headers: options}).
    pipe(tap((data) => console.log('create product : ' + JSON.stringify(data))),
    catchError(this.handleError));
  }

  initializeProduct(): IProduct
  {
    return {
      id: 0,
      imageUrl: null,
      productName: null,
      productCode: null,
      releaseDate: new Date().toDateString(),
      price: 0,
      description: null,
      starRating: 5
    };
  }

  
}
