import { User } from './User.model';
export interface Employee {
    ID_Empleado: number;
    NombreCompleto: string;
    DNI: string;
    CorreoElectronico: string;
    UsuarioId: number;
    Usuario: User;
}

export interface EmployeeCreate {
    NombreCompleto: string;
    DNI: string;
    CorreoElectronico: string;
    UsuarioId: number;
}

export interface EmployeeUpdate {
    NombreCompleto: string;
    DNI: string;
    CorreoElectronico: string;
    UsuarioId: number;
}
