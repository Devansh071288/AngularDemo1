import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarComponent } from './star.component';

@NgModule({
  declarations: [StarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FormsModule, StarComponent, ReactiveFormsModule]
})
export class SharedModule { }
