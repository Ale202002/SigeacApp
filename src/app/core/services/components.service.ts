import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Component, mapComponentDto, mapComponentsDto } from '@core/interfaces/components.interface';
import { ComponentCreateDto, ComponentDto, ComponentUpdateDto } from '@core/interfaces/Dtos/componentDto.interface';



@Injectable({ providedIn: 'root' })
export class ComponentService {
  private readonly API_URL = 'https://localhost:44334/api/Componentes'; // verifica plural

  constructor(private http: HttpClient) {}

  listar(): Observable<Component[]> {
    return this.http.get<ComponentDto[]>(`${this.API_URL}/listar`)
      .pipe(map(mapComponentsDto));
  }

  buscar(id: number): Observable<Component> {
    return this.http.get<ComponentDto>(`${this.API_URL}/buscar/${id}`)
      .pipe(map(mapComponentDto));
  }

  crear(payload: ComponentCreateDto): Observable<Component> {
    return this.http.post<ComponentDto>(`${this.API_URL}/crear`, payload)
      .pipe(map(mapComponentDto));
  }

  actualizar(id: number, payload: ComponentUpdateDto): Observable<Component> {
    return this.http.put<ComponentDto>(`${this.API_URL}/editar/${id}`, payload)
      .pipe(map(mapComponentDto));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/eliminar/${id}`);
  }
}
