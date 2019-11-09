import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: IProduct;
  constructor(private productService: ProductService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id : number ;
    id = this.route.snapshot.params["id"];
    // this.route.params.subscribe((params) => {
    //   id = params["id"];
    // });
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
    })
  }

  onBack()
  {
    this.router.navigate(['/products'], {queryParamsHandling: 'preserve'});
  }

}
