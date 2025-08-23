import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard-redirect-page',
  imports: [],
  templateUrl: './dashboard-redirect-page.component.html',
})
export class DashboardRedirectPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onInit() {
    const route = this.authService.getDashboardRouteByRole();
    this.router.navigate([route], { replaceUrl: true });
  }
}