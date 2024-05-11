import { Component } from '@angular/core';
import { UsuarioLogin } from '../../interfaces/usuario-login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private authService: AuthService) { }
  usuarioLogin: UsuarioLogin = {} as UsuarioLogin
  loadingLogin: boolean = false

  login() {
    this.loadingLogin = true;

    this.authService.login(this.usuarioLogin).subscribe({
      next: (resp) => {
        console.log("Login response: ", resp);
      },
      complete: () => {
        this.loadingLogin = false
      }
    })
  }

}
