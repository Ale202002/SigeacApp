//esta interfaz de Device(Equipo) contiene todas las propiedades y datos que el backend maneja para un equipo
import { criticalityLevel } from "@core/enums/device-enums/criticality-level.enum";
import { OperatingSystem } from "@core/enums/device-enums/operating-system.enum";
import { User } from "./user.interface";
import { WorkStation } from "./workstation.interface";

export interface Device {
  ID_Equipo: number;
  IdentificadorActivo: string;
  PuestoID: number;
  Puesto?: WorkStation;
  DisponibilidadFisica: boolean;
  Area: string;
  EmpleadoAsignadoID: number;
  EmpleadoAsignado?: User;
  IP: string;
  NumeroSerie: string;
  MAC: string;
  Tipo: boolean; // true = desktop, false = notebook
  PropiedadActivo: boolean;
  SistemaOperativo: OperatingSystem;
  VersionSO: string;
  Soporte: boolean;
  Confidencialidad: criticalityLevel;
  Disponibilidad: criticalityLevel;
  Integridad: criticalityLevel;
  Criticidad: criticalityLevel;
  FechaClasificacion: string;
  VPNLabs: boolean;
  EscritorioRemoto: boolean;
  Cifrado: boolean;
  ContrasenaCifrado?: string;
  Antivirus: boolean;
  Adicionales?: string;
  UsuariosAutorizados?: User[];
}

export interface DeviceCreate {
  IdentificadorActivo: string;
  PuestoID: number;
  DisponibilidadFisica: boolean;
  Area: string;
  EmpleadoAsignadoID: number;
  IP: string;
  NumeroSerie: string;
  MAC: string;
  Tipo: boolean;
  PropiedadActivo: boolean;
  SistemaOperativo: OperatingSystem;
  VersionSO: string;
  Soporte: boolean;
  Confidencialidad: criticalityLevel;
  Disponibilidad: criticalityLevel;
  Integridad: criticalityLevel;
  Criticidad: criticalityLevel;
  FechaClasificacion: string;
  VPNLabs: boolean;
  EscritorioRemoto: boolean;
  Cifrado: boolean;
  ContrasenaCifrado?: string;
  Antivirus: boolean;
  Adicionales?: string;
  UsuariosAutorizadosIDs?: number[];
}

// Para actualizar (con ID)
export interface DeviceUpdate {
  ID_Equipo: number;
  IdentificadorActivo: string;
  PuestoID: number;
  DisponibilidadFisica: boolean;
  Area: string;
  EmpleadoAsignadoID: number;
  IP: string;
  NumeroSerie: string;
  MAC: string;
  Tipo: boolean;
  PropiedadActivo: boolean;
  SistemaOperativo: OperatingSystem;
  VersionSO: string;
  Soporte: boolean;
  Confidencialidad: criticalityLevel;
  Disponibilidad: criticalityLevel;
  Integridad: criticalityLevel;
  Criticidad: criticalityLevel;
  FechaClasificacion: string;
  VPNLabs: boolean;
  EscritorioRemoto: boolean;
  Cifrado: boolean;
  ContrasenaCifrado?: string;
  Antivirus: boolean;
  Adicionales?: string;
  UsuariosAutorizadosIDs?: number[];
}