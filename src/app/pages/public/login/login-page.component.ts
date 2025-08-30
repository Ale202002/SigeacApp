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
  export class LoginPageComponent {
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

    // Marca todos los campos del formulario como 'touched' para mostrar errores inmediatamente
    markAllFieldsAsTouched() {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }

  // Esta lógica maneja el inicio de sesión
  // Se valida el formulario y se envían los datos al backend
  // Si la autenticación falla, se muestran los errores en los campos y el mensaje general
  login() {
    if (this.loginForm.invalid) return;

    // Obtiene los valores del formulario
    const { email, contrasena } = this.loginForm.value;
    // Llama al servicio de autenticación
    this.authService.login({ email, contrasena }).subscribe({
      next: (response: any) => {
        // Si el login es exitoso, navega según el rol del usuario
        const usuario = response.usuario;
        const rol = usuario?.rol;
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
      /*error: (err) => {
        // Si el login falla, muestra los errores en los campos y el mensaje general
        this.error = 'Credenciales incorrectas';
        this.markAllFieldsAsTouched();
        this.showErrors = true;
      }*/
    });
  }
}