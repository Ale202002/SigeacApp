import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User, UserCreate, UserUpdate } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private readonly API_URL = 'https://localhost:44334/api/Usuarios';

  constructor(private http: HttpClient) {}

  crear(user: UserCreate): Observable<any> {
      return this.http.post(`${this.API_URL}/crear`, user);
    }
  
    modificar(id: number, user: UserUpdate): Observable<any> {
      return this.http.put(`${this.API_URL}/modificar/${id}`, user);
    }
  
    listar(): Observable<User[]> {
      return this.http.get<User[]>(`${this.API_URL}/listar`);
    }
  
    buscar(id: number): Observable<User> {
      return this.http.get<User>(`${this.API_URL}/buscar/${id}`);
    }
  
    eliminar(id: number): Observable<any> {
      return this.http.delete(`${this.API_URL}/eliminar/${id}`);
    }
  
}
