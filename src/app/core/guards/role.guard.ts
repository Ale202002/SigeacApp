import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleUser } from '../models/enums/role-user.enum';

@Injectable({
  providedIn: 'root'
})

// Este guard se encarga de proteger las rutas que requieren un rol específico
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  //se usa el metodo  booleano para verificar si el usuario tiene el rol permitido
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

    // Si el rol viene como string, lo convertimos a RoleUser si es necesario
    const userRole = typeof user.rol === 'string' ? user.rol as RoleUser : user.rol;

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    // Redirigir según el rol del usuario solo si existe
    if (userRole) {
      this.redirectByRole(userRole);
    }
    return false;
  }

  //redirige al usuario segun su rol
  private redirectByRole(role: RoleUser): void {
    switch (role) {
      case RoleUser.Empleado:
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
