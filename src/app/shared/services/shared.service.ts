import { Injectable } from '@angular/core';
import { DataResponse } from '../../auth/interfaces/login-response.interface';
import { SimpleMenu } from '../interfaces/simple-menu.interface';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userData: DataResponse = {} as DataResponse;
  constructor() { }

  public getMenuUserLogged(): MenuItem[] | undefined {
    if (localStorage.getItem("userdata")) {
      console.log(localStorage.getItem("userdata"));
      this.userData = JSON.parse(localStorage.getItem("userdata")!)
      console.log("data from servd ", this.userData);
    }
    if (this.userData.tipousuario == 1) {
      return this.menuBodega
    }
    if (this.userData.tipousuario == 2) {
      return this.menuProduccion
    }
    return []
  }

  private menuProduccion: MenuItem[] | undefined = [
    {
      label: 'produccion',
      url: 'matinsa/produccion'
    }
  ]

  private menuBodega: MenuItem[] | undefined = [
    {
      label: 'Bodega',
      url: 'matinsa/bodega'
    }
  ]

}

