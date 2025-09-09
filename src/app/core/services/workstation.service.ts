import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkStation, WorkStationCreate, WorkStationUpdate } from '@core/interfaces/workstation.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkStationService {
  //URL de la API de /Puestos
  private readonly API_URL = 'https://localhost:44334/api/Puestos';

  //Se inyecta el httpclient para las peticiones al backend
  constructor(private http: HttpClient) {}

 //Se hace el CRUD de puestos de linea 17 hasta 35
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