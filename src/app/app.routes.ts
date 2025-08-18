import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { RoleUser } from './core/models/enums/role-user.enum';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/public/login/login-page.component'),
  },
  {
    path: 'dashboard',
  loadComponent: () => import('./pages/private/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
  canActivate: [AuthGuard],
  children: [
    { path: 'employee', loadComponent: () => import('./pages/private/employee-page/employee-page.component').then(m => m.EmployeePageComponent), 
      canActivate: [RoleGuard], data: { roles: [RoleUser.RRHH, RoleUser.Administrador] } },

    { path: 'workstation', loadComponent: () => import('./pages/private/workstation-page/workstation-page.component').then(m => m.WorkstationPageComponent), 
      canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador] } },

    { path: 'devices', loadComponent: () => import('./pages/private/device-page/device-page.component').then(m => m.DevicePageComponent), 
      canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador] } },

    { path: 'components', loadComponent: () => import('./pages/private/components-page/components-page.component').then(m => m.ComponentsPageComponent), 
      canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador] } },

    { path: 'history', loadComponent: () => import('./pages/private/history-page/history-page.component').then(m => m.HistoryPageComponent), 
      canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador, RoleUser.RRHH] } },

    { path: 'user', loadComponent: () => import('./pages/private/user-page/user-page.component').then(m => m.UserPageComponent), canActivate: 
      [RoleGuard], data: { roles: [RoleUser.Administrador] } },

    { path: 'my-device', loadComponent: () => import('./pages/private/my-device-page/my-device-page.component').then(m => m.MyDevicePageComponent),
       canActivate: [RoleGuard], data: { roles: [RoleUser.Usuario] } },
       
      {
        path: '',
        redirectTo: '', // Puedes redirigir al home del dashboard según el rol
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
