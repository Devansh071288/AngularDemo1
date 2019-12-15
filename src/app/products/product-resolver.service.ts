import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IProduct } from './product';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import {catchError, map} from 'rxjs/operators';

@Injectable(
    {
        providedIn:'root'
    }
)
export class ProductResolverService implements Resolve<IProduct>
{
    constructor(private router: Router, private productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct>
    {
        let id = route.params['id'];

        if(isNaN(id))
        {
            console.log("Product was not a number.");
            this.router.navigate(['/products']);
            return of(null);
        }

        return this.productService.getProduct(+id).pipe(map((product : IProduct) => {
            if(product)
            {
                return product;
            }

            console.log("Product was not found.");
            this.router.navigate(['/products']);
            return null;
        }), catchError((error) => {
            console.log("Retrieval error.");
            this.router.navigate(['/products']);
            return of(null);
        }));
    }
}