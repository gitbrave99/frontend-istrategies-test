import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product/pages/product-page/product-page.component';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { OrderPageComponent } from './order/pages/order-page/order-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { BaseTemplatePageComponent } from './shared/template/base-template-page/base-template-page.component';

const routes: Routes = [
  {
    path:"",
    component: LoginPageComponent
  },
  {
    path:"matinsa",
    component: BaseTemplatePageComponent
  },
  {
    path:"**",
    component:NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
