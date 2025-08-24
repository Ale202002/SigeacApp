import { LevelCri } from "./enums/level-cri.enum";
import { PropertyAccess } from "./enums/property-access.enum";
import { User } from "./User.model";
import { WorkStation } from "./WorkStation.model";


//esta interfaz de Device(Equipo) contiene todas las propiedades y datos que el backend maneja para
//cada equipo en el sistema
export interface Device {
  ID_Equipo: number;
  IdentificadorActivo: string;
  PuestoID: number;
  Puesto?: WorkStation;
  DisponibilidadFisica: boolean;
  Area: string;
  UsuarioAsignadoID: number;
  UsuarioAsignado?: User;
  IP: string;
  NumeroSerie: string;
  MAC: string;
  Tipo: string;
  PropiedadActivo: boolean;
  SistemaOperativo: string;
  VersionSO: string;
  Soporte: boolean;
  Confidencialidad: LevelCri;
  Disponibilidad: LevelCri;
  Integridad: LevelCri;
  Criticidad: LevelCri;
  FechaClasificacion: string;
  VPNLabs: boolean;
  EscritorioRemoto: boolean;
  Monitor: PropertyAccess;
  Teclado: PropertyAccess;
  Mouse: PropertyAccess;
  Auriculares: PropertyAccess;
  Procesador: string;
  Disco: string;
  RAM: string;
  Cifrado: boolean;
  Antivirus: boolean;
  Adicionales?: string;
  UsuariosAutorizados?: User[];
}