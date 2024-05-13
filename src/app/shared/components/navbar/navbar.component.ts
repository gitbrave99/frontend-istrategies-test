import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SimpleMenu } from '../../interfaces/simple-menu.interface';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'shared-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    itemsNavbar: MenuItem[] | undefined;
    itemsUserConfig: MenuItem[] | undefined;

    public menuSidebar: SimpleMenu[] = []

    constructor(
        private authService: AuthService,
        private sharedService: SharedService,
        private router: Router) { }

    logout() {
        this.authService.logout().subscribe({
            next: (response) => {
                console.log("logout response: ", response);
            },
            error: (err) => {
                console.log("ERROR RESPONSE: ", err);
            },
            complete: () => {
                this.router.navigate(['/']);
            }
        });
    }

    ngOnInit() {
        this.itemsNavbar = this.sharedService.getMenuUserLogged();
        this.itemsUserConfig = [
            {
                label: 'Configuración',
                icon: 'pi pi-cog'
            },
            {
                label: 'Salir',
                icon: 'pi pi-sign-out',
                command: () => {
                    console.log("logoutin");
                    this.logout()
                }
            }
        ]
    }
}