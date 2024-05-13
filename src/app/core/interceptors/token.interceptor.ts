import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from '../../auth/interfaces/login-response.interface';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let clonedRequest= req;
    let lsdata:DataResponse={} as DataResponse
    if (localStorage.getItem("userdata")) {
      lsdata=JSON.parse(localStorage.getItem("userdata")!)

      clonedRequest= req.clone({
        setHeaders:{Authorization:lsdata.token!}
      })
    }

    return next.handle(clonedRequest)
  }
}