import { Employee } from './Employee.model';
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

  // Niveles de seguridad 
  /*
  Confidencialidad: NivelCriticidad;
  Disponibilidad: NivelCriticidad;
  Integridad: NivelCriticidad;
  Criticidad: NivelCriticidad;
  FechaClasificacion: string;

  // Fecha de clasificación */
  
  // ISO date string

  // Conectividad
  VPNLabs: boolean;
  EscritorioRemoto: boolean;

  // Accesorios
  /*
  Monitor: PropiedadAccesorio;
  Teclado: PropiedadAccesorio;
  Mouse: PropiedadAccesorio;
  Auriculares: PropiedadAccesorio;
  */

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