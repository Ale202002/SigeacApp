import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})

  //este componente maneja la logica de la pagina de login
  export default class LoginPageComponent {
  //se utiliza los metodos reactive forms de angular para manejar el formulario de datos del login
  loginForm: FormGroup;
  error = '';
  showErrors = false;

  //aca inyectamos el formbuilder para crear el formulario y el authservice para manejar
  //la autenticacion, y con el router para navegar despues del login
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

  //esta logica maneja el inicio de sesion
  login() {
    if (this.loginForm.invalid) return;

    const { email, contrasena } = this.loginForm.value;
    /*console.log('Intentando login con:', { email, contrasena });*/
    this.authService.login({ email, contrasena }).subscribe({
      next: (response: any) => {
        /*console.log('Respuesta del backend:', response);*/
        const usuario = response.usuario;
        const rol = usuario?.rol;
        // Solo roles válidos: Administrador, RRHH, Empleado
        const routesByRole = {
          Administrador: '/dashboard',
          RRHH: '/dashboard/employee',
          Empleado: '/dashboard/my-device',
        };
        const route = routesByRole[rol as keyof typeof routesByRole];
        if (!route) {
          this.error = 'No tienes permisos para acceder.';
          return;
        }
        this.router.navigate([route]);
      },
      error: (err) => {
        /*console.log('Error en login:', err);*/
        this.error = 'Credenciales incorrectas';
      }
    });
  }
}