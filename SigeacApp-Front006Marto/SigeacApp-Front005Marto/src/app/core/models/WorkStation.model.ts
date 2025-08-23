import { Employee } from './Employee.model';
import { device } from './Device.model';
export interface WorkStation {
    ID_Puesto: number;
    Ubicacion: string;
    Estado: number;
    EmpleadoID: Employee;
    Empleado?: Employee;
    EquipoID: number;
    Equipo?: device;
}

export interface WorkStationCreate {
    Ubicacion: string;
    Estado: number;
    EmpleadoID: Employee;
    EquipoID: number;
}

export interface WorkStationUpdate {
    Ubicacion: string;
    Estado: number;
    EmpleadoID: Employee;
    EquipoID: number;
}



