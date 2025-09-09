import { RoleUser } from "@core/enums/user-enums/role-user.enum";

//Aca se definen las interfaces del usuario del backend,como tambien su create,update y login
export interface User {
    iD_Usuario: number;
    nombre: string;
    apellido: string;
    dni: string;
    rol: RoleUser; // Solo: Administrador, RRHH, Empleado
    email: string;
    contrasena: string;
}

export interface UserCreate {
    Nombre: string;
    apellido: string;
    dni: string;
    Email: string;
    /*Contrasena: string;*/
    /*Rol: RoleUser; // Solo: Administrador, RRHH, Empleado*/
}

export interface UserUpdate {
    iD_Usuario: number;
    Nombre: string;
    apellido: string;
    dni: string;
    Email: string;
    contrasena: string;
}

export interface UserLogin {
    email: string;
    contrasena: string;
}

