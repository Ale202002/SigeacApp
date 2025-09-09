import { User } from '@core/interfaces/user.interface';
import { Device } from './device.interface';


//aca se definen las interfaces de puesto de trabajo que 
// tienen los datos tambien de equipo y usuario, esto se saco de los datos del backend
export interface WorkStation {
    ID_Puesto: number;
    ubicacion: string;
    estado: string;
    usuarioID: number;
    equipoID: number;
    empleado?: User
    equipo?: Device;
}

export interface WorkStationCreate {
    ubicacion: string;
    estado: string;
    usuarioID?: number;
}

export interface WorkStationUpdate {
    ubicacion: string;
    estado: string;
    usuarioID?: number;
}