import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './productlist.component';
import { ProductHideDirective } from './productHide.directive';
import { ConvertToSpaces } from './convertToSpaces.pipe';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { RouterModule } from '@angular/router';
import { ProductResolverService } from './product-resolver.service';

@NgModule({
  declarations: [ ProductlistComponent, ProductHideDirective, ConvertToSpaces, ProductDetailComponent, ProductEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', children: [

        {path: '', component: ProductlistComponent},
        {path: ':id', component: ProductDetailComponent, resolve: {product : ProductResolverService}},
        {path: ':id/edit', component: ProductEditComponent}

      ]}
     
    ])
  ]
})
export class ProductModule { }
