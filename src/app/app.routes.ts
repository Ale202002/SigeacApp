import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { RoleUser } from './core/models/enums/role-user.enum';

//esta es la raiz de las routes de la aplicacion en donde los usuarios son redirigidos segun su rol
// y se comportan mediante los guards.
export const routes: Routes = [
  {
    path: 'login',
  loadComponent: () => import('./pages/public/login/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
  loadComponent: () => import('./pages/private/main/main').then(m => m.MainComponent),
    children: [
      // Dashboard principal (moved to main)
  { path: '', loadComponent: () => import('./pages/private/main/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent) },
      // Home (pisos)
  { path: 'primer-piso', loadComponent: () => import('./pages/private/main/home/first-floor-page/first-floor-page.component').then(m => m.FirstFloorPageComponent) },
  { path: 'planta-baja', loadComponent: () => import('./pages/private/main/home/ground-floor-page/ground-floor-page.component').then(m => m.GroundFloorPageComponent) },
  { path: 'subsuelo', loadComponent: () => import('./pages/private/main/home/basement-page/basement-page.component').then(m => m.BasementPageComponent) },
      // Consultas
  { path: 'employee', loadComponent: () => import('./pages/private/main/consultas/employee-page/employee-page.component').then(m => m.EmployeePageComponent), canActivate: [RoleGuard], data: { roles: [RoleUser.RRHH, RoleUser.Administrador] } },
  { path: 'workstation', loadComponent: () => import('./pages/private/main/consultas/workstation-page/workstation-page.component').then(m => m.WorkstationPageComponent), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador] } },
  { path: 'devices', loadComponent: () => import('./pages/private/main/consultas/device-page/device-page.component').then(m => m.DevicePageComponent), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador, RoleUser.Empleado] } },
  { path: 'my-device', loadComponent: () => import('./pages/private/main/consultas/device-page/my-device-page/my-device-page.component').then(m => m.MyDevicePageComponent), canActivate: [RoleGuard], data: { roles: [RoleUser.Empleado] } },
  { path: 'components', loadComponent: () => import('./pages/private/main/consultas/components-page/components-page.component').then(m => m.ComponentsPageComponent), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador] } },
  { path: 'history', loadComponent: () => import('./pages/private/main/consultas/history-page/history-page.component').then(m => m.HistoryPageComponent), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador, RoleUser.RRHH] } },
      // Otros
      /* { path: 'user', loadComponent: () => import('./pages/private/user-page/user-page.component').then(m => m.default), canActivate: [RoleGuard], data: { roles: [RoleUser.Administrador] } } */
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];