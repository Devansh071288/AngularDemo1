import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  pageTitle: string = 'Product Edit';
  // @ViewChild(NgForm) editForm: NgForm;
  pForm: FormGroup;
  product: IProduct;
  errorMessage: string;
  constructor(private productService: ProductService, private route: ActivatedRoute,
    private router: Router, private fb : FormBuilder) { }

  ngOnInit() {

    this.pForm = this.fb.group({ // Synchronous call
      productName: ['', [Validators.required, Validators.minLength(2)]],
      productCode: ['', [Validators.required]]
    });

    this.route.params.subscribe((params) => { // Asynchronous call
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
   // this.editForm.reset(); Template Driven
    this.product = Object.assign({}, product);
    this.populateData(product);
    if(this.product.id === 0)
    {
      this.pageTitle = 'Add Product';
    }
    else
    {
      this.pageTitle = `Edit Product : ${this.product.productName}`;
    }

  }

  populateData(product: IProduct)
  {
    this.pForm.patchValue({ // Assigning values to a Reactive form.
      productName: product.productName,
      productCode: product.productCode
    });
  }

  cancel(): void
  {
    // console.log(this.product);
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
    if(this.pForm.valid)
    {
      
      console.log(this.pForm.value); // Reactive
      this.product = Object.assign({}, this.product, this.pForm.value) 
      this.productService.saveProduct(this.product).
      subscribe(() => {
          this.onSaveComplete();
      }, (error: any) => this.errorMessage = <any>error);
    }
  }

  onSaveComplete(): void{
    // this.editForm.reset(this.editForm.value); Template Driven
    this.pForm.reset(this.pForm.value); // Reactive 
    this.router.navigate(['/products']);
  }

}
