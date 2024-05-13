import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { PrimenglModule } from '../primengl/primengl.module';
import { OrderFormUpdateComponent } from './components/order-form-update/order-form-update.component';
import { OrderFormAddComponent } from './components/order-form-add/order-form-add.component';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [
    OrderTableComponent,
    OrderPageComponent,
    OrderFormUpdateComponent,
    OrderFormAddComponent,
  ],
  imports: [
    CommonModule,
    PrimenglModule,
    OrderRoutingModule
  ],
  exports:[
    OrderPageComponent
  ]
})
export class OrderModule { }
