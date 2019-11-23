import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { ProductlistComponent } from './products/productlist.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'products', component: ProductlistComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'products/:id/edit', component: ProductEditComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
