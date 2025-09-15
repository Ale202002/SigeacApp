import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, mapUserDtoToUser } from '@core/interfaces/user.interface';
import { UserCreateDto, UserDto, UserUpdateDto } from '@core/interfaces/Dtos/userDto.interface';
import { environment } from '@core/config/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/Usuarios`;

  constructor(private http: HttpClient) {}

  crear(payload: UserCreateDto): Observable<User> {
    return this.http.post<UserDto>(`${this.API_URL}/crear`, payload)
      .pipe(map(mapUserDtoToUser));
  }

  modificar(id: number, payload: UserUpdateDto): Observable<User> {
    return this.http.put<UserDto>(`${this.API_URL}/editar/${id}`, payload)
      .pipe(map(mapUserDtoToUser));
  }

  listar(): Observable<User[]> {
    return this.http.get<UserDto[]>(`${this.API_URL}/listar`)
      .pipe(map(list => list.map(mapUserDtoToUser)));
  }

  buscar(id: number): Observable<User> {
    return this.http.get<UserDto>(`${this.API_URL}/buscar/${id}`)
      .pipe(map(mapUserDtoToUser));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/eliminar/${id}`);
  }
}