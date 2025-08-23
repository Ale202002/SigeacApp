import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserLoginResponse } from '../../../core/models/User.model';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
  export default class LoginPageComponent {
  loginForm: FormGroup;
  error = '';
  showErrors = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const { email, contrasena } = this.loginForm.value;
    this.authService.login({ email, contrasena }).subscribe({
      next: (response: UserLoginResponse) => {
        const rol = response.usuario?.rol;
        const routesByRole = {
          Administrador: '/dashboard',
          RRHH: '/dashboard/employee',
          Usuario: '/dashboard/my-device',
        };
        const route = routesByRole[rol as keyof typeof routesByRole] || '/dashboard';
        if (!routesByRole[rol as keyof typeof routesByRole]) {
          this.error = 'No tienes permisos para acceder.';
          return;
        }
        this.router.navigate([route]);
      },
      error: () => this.error = 'Credenciales incorrectas'
    });
  }
}