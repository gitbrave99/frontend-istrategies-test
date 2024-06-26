import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product/pages/product-page/product-page.component';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { OrderPageComponent } from './order/pages/order-page/order-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { BaseTemplatePageComponent } from './shared/template/base-template-page/base-template-page.component';
import { loginGuard } from './core/guards/login.guard';
import { bodegaGuard } from './core/guards/bodega.guard';
import { produccionGuard } from './core/guards/produccion.guard';

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "matinsa",
    component: BaseTemplatePageComponent,
    canActivate: [loginGuard],
    children: [
      {
        path: 'produccion',
        loadChildren: () => import('./order/order.module').then(o => o.OrderModule),
        canActivate: [produccionGuard]
      },
      {
        path: 'bodega',
        loadChildren: () => import('./product/product.module').then(o => o.ProductModule),
        canActivate: [bodegaGuard]
      },
    ]
  },
  {
    path: 'notfound',
    component: NotFoundPageComponent
  },
  {
    path: "**",
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
