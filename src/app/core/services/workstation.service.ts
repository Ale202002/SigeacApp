import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkStation, WorkStationCreate, WorkStationUpdate } from '../models/WorkStation.model';

@Injectable({
  providedIn: 'root'
})
export class WorkStationService {
  private readonly API_URL = 'https://localhost:44334/api/Puestos';

  constructor(private http: HttpClient) {}

  // Métodos que coinciden EXACTAMENTE con tu Swagger
  crear(puesto: WorkStationCreate): Observable<any> {
    return this.http.post(`${this.API_URL}/crear`, puesto);
  }

  editar(id: number, puesto: WorkStationUpdate): Observable<any> {
    return this.http.put(`${this.API_URL}/editar/${id}`, puesto);
  }

  listar(): Observable<WorkStation[]> {
    return this.http.get<WorkStation[]>(`${this.API_URL}/listar`);
  }

  buscar(id: number): Observable<WorkStation> {
    return this.http.get<WorkStation>(`${this.API_URL}/buscar/${id}`);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`);
  }
}