import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PrimenglModule } from '../primengl/primengl.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    PrimenglModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    LoginPageComponent
  ]
})
export class AuthModule { }
