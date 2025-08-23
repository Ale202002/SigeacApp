import { Employee } from './Employee.model';
import { LevelCri } from './enums/level-cri.enum';
import { PropertyAccess } from './enums/property-access.enum';
import { WorkStation } from './WorkStation.model';

export interface device {
  ID_Equipo: number;
  IdentificadorActivo: string;

  // Relaciones
  PuestoID: number;
  Puesto?: WorkStation;
  EmpleadoAsignadoID: number;
  EmpleadoAsignado?: Employee;

  // Propiedades básicas
  DisponibilidadFisica: boolean;
  Area: string;
  IP: string;
  NumeroSerie: string;
  MAC: string;
  Tipo: string;
  PropiedadActivo: boolean;

  // Sistema Operativo
  SistemaOperativo: string;
  VersionSO: string;
  Soporte: boolean;

   //Niveles de seguridad 
  
  Confidencialidad: LevelCri;
  Disponibilidad: LevelCri;
  Integridad: LevelCri;
  Criticidad: LevelCri;
  FechaClasificacion: string;

  // Fecha de clasificación */
  
  // ISO date string

  // Conectividad
  VPNLabs: boolean;
  EscritorioRemoto: boolean;

  // Accesorios
  
  Monitor: PropertyAccess;
  Teclado: PropertyAccess;
  Mouse: PropertyAccess;
  Auriculares: PropertyAccess;
  

  // Hardware
  Procesador: string;
  Disco: string;
  RAM: string;

  // Seguridad
  Cifrado: boolean;
  Antivirus: boolean;

  // Opcionales
  Adicionales?: string;
  UsuariosAutorizados?: Employee[];
}