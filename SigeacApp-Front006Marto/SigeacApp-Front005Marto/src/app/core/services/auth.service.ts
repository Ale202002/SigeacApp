import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserLoginResponse, UserLogin, User } from '../models/User.model';

// Definimos el tipo exacto del usuario que devuelve el backend

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://localhost:44334/api/Usuarios';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  login(credentials: { email: string; contrasena: string }): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        if (response.usuario) {
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
          this.currentUserSubject.next(response.usuario);
        }
      })
    );
  } 

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.rol === role : false;
  }

  isAdmin(): boolean {
    return this.hasRole('Administrador');
  }

  isRRHH(): boolean {
    return this.hasRole('RRHH');
  }

  getDashboardRouteByRole(): string {
    const user = this.getCurrentUser();
    switch (user?.rol) {
      case 'Administrador':
        return '/dashboard/employee';
      case 'RRHH':
        return '/dashboard/employee';
      case 'Usuario':
        return '/dashboard/my-device';
      default:
        return '/dashboard';
    }
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}