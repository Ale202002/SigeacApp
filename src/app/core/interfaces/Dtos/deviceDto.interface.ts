import { UserDto } from "./userDto.interface";
import { WorkStationDto } from "./workstationDto.interface";


export interface ComponentDto {
  iD_Componente: number;
  tipo: string;               // ej: "Procesador"
  nombre: string;
  estado: 'Activo' | 'Inactivo' | string;
  equipoID: number;
  equipo?: DeviceDto | null;
}

export interface DeviceDto {
  iD_Equipo: number;
  identificadorActivo: string;
  puestoID: number | null;
  puesto?: WorkStationDto | null;
  disponibilidadFisica: boolean;
  area: string;
  empleadoAsignadoID: number | null;
  empleadoAsignado?: UserDto | null;
  ip: string;
  numeroSerie: string;
  mac: string;
  tipo: boolean;                  // true=desktop, false=notebook (según tu comentario)
  propiedadActivo: boolean;
  sistemaOperativo: string;       // map a OperatingSystem enum si coincide
  versionSO: string;
  soporte: boolean;
  confidencialidad: string;       // "Alta" | "Media" | ...
  disponibilidad: string;
  integridad: string;
  criticidad: string;
  fechaClasificacion: string;     // ISO
  vpnLabs: boolean;
  escritorioRemoto: boolean;
  cifrado: boolean;
  contrasenaCifrado: string;
  antivirus: boolean;
  adicionales: string;
  usuariosAutorizados: UserDto[];
  componentes: ComponentDto[];
}

// Create DTO (usa casing que espera tu backend; ajusta si difiere)
export interface DeviceCreateDto {
  identificadorActivo: string;
  puestoID: number | null;
  disponibilidadFisica: boolean;
  area: string;
  empleadoAsignadoID: number | null;
  ip: string;
  numeroSerie: string;
  mac: string;
  tipo: boolean;
  propiedadActivo: boolean;
  sistemaOperativo: string;
  versionSO: string;
  soporte: boolean;
  confidencialidad: string;
  disponibilidad: string;
  integridad: string;
  criticidad: string;
  fechaClasificacion: string;
  vpnLabs: boolean;
  escritorioRemoto: boolean;
  cifrado: boolean;
  contrasenaCifrado?: string;
  antivirus: boolean;
  adicionales?: string;
  usuariosAutorizadosIDs?: number[];
}

// Update DTO
export interface DeviceUpdateDto extends Partial<DeviceCreateDto> {
  iD_Equipo: number;
}