import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './productlist.component';
import { ProductHideDirective } from './productHide.directive';
import { ConvertToSpaces } from './convertToSpaces.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ ProductlistComponent, ProductHideDirective, ConvertToSpaces],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class ProductModule { }
