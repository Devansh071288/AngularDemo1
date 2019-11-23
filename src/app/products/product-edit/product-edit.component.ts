import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  pageTitle: string = 'Product Edit';
  @ViewChild(NgForm) editForm: NgForm;
  product: IProduct;
  errorMessage: string;
  constructor(private productService: ProductService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.getProduct(id);
    });
  }

  getProduct(id: number)
  {
    this.productService.getProduct(id).subscribe(product => {
      this.onProductsRetrieved(product);
    }, error => this.errorMessage = <any>error)
  }

  onProductsRetrieved(product: IProduct) : void{
    // Reset the form to pristine
    this.editForm.reset();
    this.product = Object.assign({}, product);
    
    if(this.product.id === 0)
    {
      this.pageTitle = 'Add Product';
    }
    else
    {
      this.pageTitle = `Edit Product : ${this.product.productName}`;
    }

  }

  cancel(): void
  {
    console.log(this.product);
    this.router.navigate(['/products']);
  }

  deleteProduct(): void
  {
    if(this.product.id)
    {
      if(confirm(`Really delete the product : ${this.product.productName}?`))
      {
        this.productService.deleteProduct(this.product).subscribe(() => {
          console.log('Product Deleted.');
        }, (error: any) => this.errorMessage = <any>error)
      }
    }
  }

  saveProduct(): void
  {
    if(this.editForm.valid)
    {
      this.productService.saveProduct(this.product).
      subscribe(() => {
          this.onSaveComplete();
      }, (error: any) => this.errorMessage = <any>error);
    }
  }

  onSaveComplete(): void{
    this.editForm.reset(this.editForm.value);
    this.router.navigate(['/products']);
  }

}
