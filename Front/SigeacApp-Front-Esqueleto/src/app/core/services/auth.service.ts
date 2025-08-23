import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserLoginResponse, UserLogin } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = '';
  private currentUserSubject = new BehaviorSubject<UserLogin | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  login(credentials: UserLogin): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response.Usuario);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): UserLogin | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.Rol === role : false;
  }

  isAdmin(): boolean {
    return this.hasRole('Administrador');
  }

  isRRHH(): boolean {
    return this.hasRole('RRHH');
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}