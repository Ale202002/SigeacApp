import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserLoginResponse } from '../../../core/models/User.model';
import { RoleUser } from '../../../core/models/enums/role-user.enum';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Contrasena: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const { Email, Contrasena } = this.loginForm.value;
    this.authService.login({ email: Email, contrasena: Contrasena }).subscribe({
      next: (response: UserLoginResponse) => {
        const rol = response.usuario?.rol;
        const routesByRole = {
          [RoleUser.Administrador]: '/dashboard/employee',
          [RoleUser.RRHH]: '/dashboard/employee',
          [RoleUser.Usuario]: '/dashboard/my-device',
        };
        const route = routesByRole[rol as RoleUser] || '/dashboard';
        if (!routesByRole[rol as RoleUser]) {
          this.error = 'No tienes permisos para acceder.';
          return;
        }
        this.router.navigate([route]);
      },
      error: () => this.error = 'Credenciales incorrectas'
    });
  }
}