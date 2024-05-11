import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Product, Product2, ProductUpdate } from '../interface/product.interface';
import { ApiResponse } from '../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.urlBase}/productos`)
  }

  getProductByType(type:number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.urlBase}/productos/list-type/${type}`)
  }

  getReport(type:number): Observable<Blob> {
    return this.http.get(`${environment.urlBase}/productos/export-pdf/${type}`, {
      responseType: 'blob'
    });
  }

  save(pProduct: Product) {
    const { idProducto, ...resto } = pProduct
    return this.http.post<ApiResponse>(`${environment.urlBase}/productos`, resto)
    .pipe(
      catchError((error: any) => {
        const apiResponse: ApiResponse = error.error;
        console.log('Error en la solicitud:', apiResponse);
        return throwError(()=>error.error);
      })
    );
  }

  update(pProduct: ProductUpdate):Observable<ApiResponse>  {
    const { idProducto, ...resto } = pProduct
    return this.http.put<ApiResponse>(`${environment.urlBase}/productos/${idProducto}`, resto)
    .pipe(
      catchError((error: any) => {
        const apiResponse: ApiResponse = error.error;
        console.log('Error en la solicitud:', apiResponse);
        return throwError(()=>error.error);
      })
    );
  }
  delete(idProduct:number):Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${environment.urlBase}/productos/${idProduct}`)
  }
}
