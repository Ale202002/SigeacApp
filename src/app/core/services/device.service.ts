import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Device, mapDeviceDto, mapDevicesDto } from '@core/interfaces/device.interface';
import { DeviceCreateDto, DeviceDto, DeviceUpdateDto } from '@core/interfaces/Dtos/deviceDto.interface';


@Injectable({ providedIn: 'root' })
export class DeviceService {
  private readonly API_URL = 'https://localhost:44334/api/Equipos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Device[]> {
    return this.http.get<DeviceDto[]>(`${this.API_URL}/listar`)
      .pipe(map(mapDevicesDto));
  }

  buscar(id: number): Observable<Device> {
    return this.http.get<DeviceDto>(`${this.API_URL}/buscar/${id}`)
      .pipe(map(mapDeviceDto));
  }

  crear(payload: DeviceCreateDto): Observable<Device> {
    return this.http.post<DeviceDto>(`${this.API_URL}/crear`, payload)
      .pipe(map(mapDeviceDto));
  }

  actualizar(id: number, payload: DeviceUpdateDto): Observable<Device> {
    return this.http.put<DeviceDto>(`${this.API_URL}/editar/${id}`, payload)
      .pipe(map(mapDeviceDto));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/eliminar/${id}`);
  }
}