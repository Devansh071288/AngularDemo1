import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './productlist.component';
import { ProductHideDirective } from './productHide.directive';
import { ConvertToSpaces } from './convertToSpaces.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ProductlistComponent, ProductHideDirective, ConvertToSpaces],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ]
})
export class ProductModule { }
