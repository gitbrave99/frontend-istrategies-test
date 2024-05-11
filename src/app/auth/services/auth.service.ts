import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UsuarioLogin } from '../interfaces/usuario-login';
import { LoginResponse } from '../interfaces/login-response.interface';
import { catchError, of, tap } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.urlBase
  private _usuario!: UsuarioLogin;

  constructor(
    private http: HttpClient
  ) { }

  login(user:UsuarioLogin){
    const url= `${this.baseUrl}/login`;
    return this.http.post<LoginResponse>(url,user)
    .pipe(
      tap(resp=>{
        console.log("respuesta: ", resp);
        if (resp.success) {
          localStorage.setItem("userdata", JSON.stringify(resp.data));
          localStorage.setItem("token", resp.data.token);
        }
      }),
      // map(resp=> resp?.ok),
      catchError(err=>of(err.error.msg))
    )
  }

  logout(){
    const url= `${this.baseUrl}/logout`;
    return this.http.delete<ApiResponse>(url)
    .pipe(
      tap(resp=>{
        console.log("respuesta: ", resp);
        
      }),
      // map(resp=> resp?.ok),
      catchError(err=>of(err.error.msg))
    )
  }
}