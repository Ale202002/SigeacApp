import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  showErrors = false;
  showPassword = false;

  loading = signal(false);
  errorMsg = signal('');

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  markAllFieldsAsTouched(): void {
    Object.values(this.loginForm.controls).forEach(c => c.markAsTouched());
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.markAllFieldsAsTouched();
      this.showErrors = true;
      console.warn('[Login] Form inválido', this.loginForm.value);
      return;
    }

    this.errorMsg.set('');
    this.loading.set(true);

    const { email, contrasena } = this.loginForm.value;
    console.log('[Login] Enviando credenciales', { email });

    this.auth.login({ email, contrasena }).subscribe({
      next: user => {
        console.log('[Login] OK usuario:', user);
        const route = this.auth.getDashboardRouteByRole();
        this.loading.set(false);
        this.router.navigate([route]);
      },
      error: err => {
        console.error('[Login] Error', err);
        this.errorMsg.set(err?.error?.message || 'Credenciales inválidas');
        this.loading.set(false);
        this.showErrors = true;
      }
    });
  }
}