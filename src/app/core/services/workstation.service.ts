import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { mapWorkStationDto, mapWorkStationsDto, WorkStation } from '@core/interfaces/workstation.interface';
import { WorkStationCreateDto, WorkStationDto, WorkStationUpdateDto } from '@core/interfaces/Dtos/workstationDto.interface';


@Injectable({ providedIn: 'root' })
export class WorkStationService {
  private readonly API_URL = 'https://localhost:44334/api/Puestos';

  constructor(private http: HttpClient) {}

  listar(): Observable<WorkStation[]> {
    return this.http.get<WorkStationDto[]>(`${this.API_URL}/listar`)
      .pipe(map(mapWorkStationsDto));
  }

  buscar(id: number): Observable<WorkStation> {
    return this.http.get<WorkStationDto>(`${this.API_URL}/buscar/${id}`)
      .pipe(map(mapWorkStationDto));
  }

  crear(payload: WorkStationCreateDto): Observable<WorkStation> {
    return this.http.post<WorkStationDto>(`${this.API_URL}/crear`, payload)
      .pipe(map(mapWorkStationDto));
  }

  editar(id: number, payload: WorkStationUpdateDto): Observable<WorkStation> {
    return this.http.put<WorkStationDto>(`${this.API_URL}/editar/${id}`, payload)
      .pipe(map(mapWorkStationDto));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/eliminar/${id}`);
  }
} 