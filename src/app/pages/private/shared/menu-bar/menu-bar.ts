import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RoleUser } from '../../../../core/models/enums/role-user.enum';

@Component({
  standalone: true,
  selector: 'app-menu-bar',
  imports: [RouterLink],
  templateUrl: './menu-bar.html',
  styleUrl: './menu-bar.css'
})
export class MenuBarComponent {

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
