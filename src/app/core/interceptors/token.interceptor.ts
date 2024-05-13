import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest= req;
    if (localStorage.getItem("token")) {
      clonedRequest= req.clone({
        setHeaders:{Authorization:localStorage.getItem("token")!}
      })
    }

    return next.handle(clonedRequest)
  }
}