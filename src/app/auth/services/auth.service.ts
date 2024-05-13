import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UsuarioLogin } from '../interfaces/usuario-login';
import { LoginResponse } from '../interfaces/login-response.interface';
import { catchError, of, tap } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.urlBase
  private _usuario!: UsuarioLogin;

  constructor(
    private http: HttpClient,
    private router: Router
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
          this.redirectToUserModule(resp.data.tipousuario)
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
        localStorage.removeItem("userdata")
        localStorage.removeItem("token")
      }),
      // map(resp=> resp?.ok),
      catchError(err=>of(err.error.msg))
    )
  }


  redirectToUserModule(userType: number) {
    if (userType === 1) {
      this.router.navigate(['/matinsa/bodega']);
    } else if (userType === 2) {
      this.router.navigate(['/matinsa/produccion']);
    } else {
      this.router.navigate(['/']);
    }
  }

}