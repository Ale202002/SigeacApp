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
export default class LayoutPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);


  // Obtener el usuario actual usando el método público
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
    return this.user?.rol === RoleUser.Usuario;
  }

  activeSection: string = '';

  toggleSection(section: string) {
    this.activeSection = this.activeSection === section ? '' : section;
  }

  logoff() {
    localStorage.removeItem('leaveUser');
    this.router.navigateByUrl('/login');
  }
}
