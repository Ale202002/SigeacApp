/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeCreate, EmployeeUpdate } from '../models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API_URL = 'https://localhost:44334/api/Empleados';

  constructor(private http: HttpClient) {}

  crear(employee: EmployeeCreate): Observable<any> {
    return this.http.post(`${this.API_URL}/crear`, employee);
  }

  modificar(id: number, employee: EmployeeUpdate): Observable<any> {
    return this.http.put(`${this.API_URL}/modificar/${id}`, employee);
  }

  listar(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.API_URL}/listar`);
  }

  buscar(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/buscar/${id}`);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`);
  }

  // Método específico para buscar empleado por usuario
  buscarPorUsuario(usuarioId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/buscar-por-usuario/${usuarioId}`);
  }

  // Validar si DNI ya existe
  validarDNI(dni: string, employeeId?: number): Observable<boolean> {
    const params = employeeId ? `?employeeId=${employeeId}` : '';
    return this.http.get<boolean>(`${this.API_URL}/validar-dni/${dni}${params}`);
  }

  // Validar si correo ya existe
  validarCorreo(correo: string, employeeId?: number): Observable<boolean> {
    const params = employeeId ? `?employeeId=${employeeId}` : '';
    return this.http.get<boolean>(`${this.API_URL}/validar-correo/${correo}${params}`);
  }
}*/


//este servicio de employee se eliminara?? ya que no se usa mas el crud de empleados