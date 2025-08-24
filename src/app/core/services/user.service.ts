import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User, UserCreate, UserUpdate } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    //URL de la API de /Usuarios
   private readonly API_URL = 'https://localhost:44334/api/Usuarios';

  //Se inyecta el httpclient para las peticiones al backend
  constructor(private http: HttpClient) {}

  //se hace un CRUD para usuarios de la linea 17 hasta 35 (una vez creado el usuario se le pone por default el rol Empleado)
  crear(user: UserCreate): Observable<any> {
      return this.http.post(`${this.API_URL}/crear`, user);
    }
  
    modificar(id: number, user: UserUpdate): Observable<any> {
      return this.http.put(`${this.API_URL}/editar/${id}`, user);
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
