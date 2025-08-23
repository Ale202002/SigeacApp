import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { RoleUser } from './core/models/enums/role-user.enum';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/public/login/login-page.component').then(m => m.default)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/private/layout-page/layout-page.component').then(m => m.default),
    children: [
  { path: '', loadComponent: () => import('./pages/private/dashboard-page/dashboard-page.component').then(m => m.default) },
  // Home (pisos)
  { path: 'primer-piso', loadComponent: () => import('./pages/private/home/first-floor-page/first-floor-page.component').then(m => m.default) },
  { path: 'planta-baja', loadComponent: () => import('./pages/private/home/ground-floor-page/ground-floor-page.component').then(m => m.default) },
  { path: 'subsuelo', loadComponent: () => import('./pages/private/home/basement-page/basement-page.component').then(m => m.default) },
  // Consultas
  { path: 'employee', loadComponent: () => import('./pages/private/consultas/employee-page/employee-page.component').then(m => m.default), canActivate: [RoleGuard], data: { roles: [RoleUser.RRHH, RoleUser.Administrador] } },
  { path: 'workstation', loadComponent: () => import('./pages/private/consultas/workstation-page/workstation-page.component').then(m => m.default), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador] } },
  { path: 'devices', loadComponent: () => import('./pages/private/consultas/device-page/device-page.component').then(m => m.default), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador, RoleUser.Usuario] } },
  { path: 'my-device', loadComponent: () => import('./pages/private/consultas/device-page/my-device-page/my-device-page.component').then(m => m.default), canActivate: [RoleGuard], data: { roles: [RoleUser.Usuario] } },
  { path: 'components', loadComponent: () => import('./pages/private/consultas/components-page/components-page.component').then(m => m.default), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador] } },
  { path: 'history', loadComponent: () => import('./pages/private/consultas/history-page/history-page.component').then(m => m.default), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador, RoleUser.RRHH] } },
  // Otros
  { path: 'user', loadComponent: () => import('./pages/private/user-page/user-page.component').then(m => m.default), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador] } }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
