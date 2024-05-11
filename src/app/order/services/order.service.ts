import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Order, OrderInProgress, OrderNew } from '../interfaces/order.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.urlBase}/orden-produccion`)
  }

  getOrdersByDate(date:string): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.urlBase}/orden-produccion/date?date=${date}`)
  }

  getOrdersByEstusDeliveryDate(status: number, deliveryDate: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.urlBase}/orden-produccion/estado-fecha?estado=${status}&fecha=${deliveryDate}`)
  }

  getReportAll(): Observable<Blob> {
    return this.http.get(`${environment.urlBase}/orden-produccion/export-pdf-all`, {
      responseType: 'blob'
    });
  }

  getReportByDate(date: string): Observable<Blob> {
    return this.http.get(`${environment.urlBase}/orden-produccion/export-pdf-date?date=${date}`, {
      responseType: 'blob'
    });
  }

  getReport(status: number, date: string): Observable<Blob> {
    return this.http.get(`${environment.urlBase}/orden-produccion/export-pdf?status=${status}&date=${date}`, {
      responseType: 'blob'
    });
  }


  save(order: OrderNew): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.urlBase}/orden-produccion`, order).pipe(
      catchError((error: any) => {
        const apiResponse: ApiResponse = error.error;
        console.log('Error en la solicitud:', apiResponse);
        return throwError(() => error.error);
      })
    );
  }

  updateInProgress(pidOrdenProduction: number, order: OrderInProgress): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.urlBase}/orden-produccion/proceso/${pidOrdenProduction}`, order)
      .pipe(
        catchError((error: any) => {
          const apiResponse: ApiResponse = error.error;
          console.log('Error en la solicitud:', apiResponse);
          return throwError(() => error.error);
        })
      )
  }

  updateInComplete(pidOrdenProduction: number, fechaFinalizacion: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.urlBase}/orden-produccion/finalizada/${pidOrdenProduction}`, { fechaFinalizacion: fechaFinalizacion })
      .pipe(
        catchError((error: any) => {
          const apiResponse: ApiResponse = error.error;
          console.log('Error en la solicitud:', apiResponse);
          return throwError(() => error.error);
        })
      )
  }
}
