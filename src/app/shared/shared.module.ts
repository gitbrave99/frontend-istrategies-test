import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PrimenglModule } from '../primengl/primengl.module';
import { BaseTemplatePageComponent } from './template/base-template-page/base-template-page.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundPageComponent,
    BaseTemplatePageComponent
  ],
  imports: [
    CommonModule,
    PrimenglModule,
    RouterModule,
    HttpClientModule
  ],
  exports:[
    NotFoundPageComponent,
    NavbarComponent,
    BaseTemplatePageComponent
  ]
})
export class SharedModule { }
