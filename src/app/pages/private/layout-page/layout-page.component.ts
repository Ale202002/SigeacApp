import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { RoleUser } from '../../../core/models/enums/role-user.enum';

@Component({
  standalone: true,
  selector: 'app-layout-page',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout-page.component.html',
})

//este componente seria el principal para las paginas privadas despues del login y 
// se navega segun el rol del usuario solamente.
export default class LayoutPageComponent {
  //injectamos los servicios(authservice y router)
  private authService = inject(AuthService);
  private router = inject(Router);

 /* constructor() {
    this.authService.debugUser();
  }*/


  // estos get se usan para obtener información del usuario actual y su rol
  get user() {
    return this.authService.getCurrentUser();
  }

  get isAdmin() {
    return this.user?.rol === RoleUser.Administrador;
  }

  get isRRHH() {
    return this.user?.rol === RoleUser.RRHH;
  }

  get isUser() {
    return this.user?.rol === RoleUser.Empleado;
  }

  //este string se usa para manejar los menus para mostrar u ocultar los submenus
  activeSection: string = '';

  //este togglesection se usa para activar o desactivar los submenus
  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? '' : section;
  }

  //esta funcion se usa para cerrar la sesion del usuario
  logoff() {
  this.authService.logout();
  this.router.navigateByUrl('/login');
  }
}
