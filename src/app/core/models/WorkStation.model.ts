import { User } from './User.model';
import { Device } from './Device.model';

//aca se definen las interfaces de puesto de trabajo que 
// tienen los datos tambien de equipo y usuario, esto se saco de los datos del backend
export interface WorkStation {
    ID_Puesto: number;
    Ubicacion: string;
    Estado: number;
    UsuarioID: User;
    Empleado?: User
    EquipoID: number;
    Equipo?: Device;
}

export interface WorkStationCreate {
    Ubicacion: string;
    Estado: number;
    UsuarioID?: User;
    EquipoID?: number;
}

export interface WorkStationUpdate {
    Ubicacion: string;
    Estado: number;
    UsuarioID?: User;
    EquipoID?: number;
}



