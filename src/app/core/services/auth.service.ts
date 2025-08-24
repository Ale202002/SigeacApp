import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserLogin, User } from '../models/User.model';

// Definimos el tipo exacto del usuario que devuelve el backend

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //Esto es un debug por si se necesita ver el usuario actual
  /*debugUser(): void {
    console.log('Usuario actual:', this.getCurrentUser());
  }*/

  //Se pide la URL de la api de /Usuarios del backend -- 
  // Metodos BehaviorSubject y CurrentUserSubject para recibir estado del usuario logueado y actualizarlo
  private readonly API_URL = 'https://localhost:44334/api/Usuarios';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  //Se inicia el servicio y se carga el usuario en el LocalStorage
  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  //Manda las credenciales al backend y devuelve el usuario, 
  // solamente se guarda en el LocalStorage los datos del usuario (sin contraseña)
  login(credentials: UserLogin): Observable<User> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        // Si la respuesta tiene 'usuario', guardar solo el usuario
        const user = response.usuario ? response.usuario : response;
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  //Es un cerrar sesion y se borran los datos del usuario del LocalStorage
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  //Devuelve el usuario logueado, sino hay login devuelve null
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  //Pregunta si hay un usuario logueado (es un true/false)
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  //Pregunta si el usuario tiene un rol específico(Admin/RRHH/Empleado)
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.rol === role : false;
  }

  //Verifica si el usuario es Administrador
  isAdmin(): boolean {
    return this.hasRole('Administrador');
  }

  //Verifica si el usuario es RRHH
  isRRHH(): boolean {
    return this.hasRole('RRHH');
  }

  //Verifica si el usuario es Empleado
  isUser(): boolean {
    return this.hasRole('Empleado');
  }

  //Cuando se loguea el usuario dependiendo su rol lo tira a la ruta correspondiente
  getDashboardRouteByRole(): string {
    const user = this.getCurrentUser();
    switch (user?.rol) {
      case 'Administrador':
        return '/dashboard/employee';
      case 'RRHH':
        return '/dashboard/employee';
      case 'Empleado':
        return '/dashboard/my-device';
      default:
        return '/dashboard';
    }
  }

  //Carga el usuario desde el LocalStorage
  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}