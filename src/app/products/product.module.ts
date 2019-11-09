import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './productlist.component';
import { ProductHideDirective } from './productHide.directive';
import { ConvertToSpaces } from './convertToSpaces.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [ ProductlistComponent, ProductHideDirective, ConvertToSpaces, ProductDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class ProductModule { }
