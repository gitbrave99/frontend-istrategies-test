import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PrimenglModule } from '../primengl/primengl.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { FormsModule } from '@angular/forms';
import { ProductFormAddComponent } from './components/product-form-add/product-form-add.component';
import { ProductFormUpdateComponent } from './components/product-form-update/product-form-update.component';

import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductTableComponent,
    ProductPageComponent,
    ProductFormAddComponent,
    ProductFormUpdateComponent
  ],
  imports: [
    PrimenglModule,
    CommonModule,
    HttpClientModule,
    ProductRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    ProductPageComponent
  ],
  providers:[
    MessageService, ConfirmationService
  ]
})
export class ProductModule { }
