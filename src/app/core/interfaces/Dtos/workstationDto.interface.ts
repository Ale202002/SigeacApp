import { DeviceDto } from "./deviceDto.interface";
import { UserDto } from "./userDto.interface";

; // crea cuando definas device

export interface WorkStationDto {
  iD_Puesto: number;          // respeta el casing real del backend
  ubicacion: string;
  estado: 'activo' | 'inactivo';
  usuarioID: number | null;
  equipoID: number | null;
  empleado?: UserDto | null;
  equipo?: DeviceDto | null;
}

export interface WorkStationCreateDto {
  ubicacion: string;
  estado: 'activo' | 'inactivo';
  usuarioID?: number | null;
}

export interface WorkStationUpdateDto {
  iD_Puesto: number;
  ubicacion?: string;
  estado?: 'activo' | 'inactivo';
  usuarioID?: number | null;
  equipoID?: number | null;
}