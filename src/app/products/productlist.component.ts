import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  title: string = "Product List";
  imageWidth = 50;
  imageMargin = 2;
  _listFilter: string = '';
  showImage: boolean = true;
  hideProduct: boolean = true;
  products: IProduct[];
  filteredProducts: IProduct[];

  get listFilter() : string
  {
    return this._listFilter;
  }

  set listFilter(value)
  {
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
  }
  constructor(private productService : ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products.sort(this.compareProducts);
      this.filteredProducts = this.products;
      this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
    })
  }

  compareProducts(a: IProduct, b: IProduct): number
  {
    return (a.productName.charCodeAt(0) - b.productName.charCodeAt(0));
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

  performFilter(filterBy: string) : IProduct[]
  {
    return this.products.filter((product: IProduct) => 
    product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
  }

}
