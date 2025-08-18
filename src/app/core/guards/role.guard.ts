import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleUser } from '../models/enums/role-user.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as RoleUser[];

    if (!allowedRoles) {
      return true;
    }

    const user = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (allowedRoles.includes(user.Rol)) {
      return true;
    }

    // Redirigir según el rol del usuario
    this.redirectByRole(user.Rol);
    return false;
  }

  private redirectByRole(role: RoleUser): void {
    switch (role) {
      case RoleUser.Usuario:
        this.router.navigate(['/mi-equipo']);
        break;
      case RoleUser.RRHH:
        this.router.navigate(['/empleados']);
        break;
      case RoleUser.Administrador:
        this.router.navigate(['/dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}
