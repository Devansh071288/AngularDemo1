import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  title: string = "Product List";
  imageWidth = 50;
  imageMargin = 2;
  listFilter: string = 'listFilter';
  showImage: boolean = true;
  hideProduct: boolean = true;
  products: IProduct[];
  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    })
  }

  HideProducts(event: any)
  {
    this.hideProduct = !this.hideProduct;
  }

  toggleImage() : void{
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string) : void
  {
    this.title = 'Product List: ' + message;
  }

}
