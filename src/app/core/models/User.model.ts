import { RoleUser } from "./enums/role-user.enum";

export interface User {
    ID_Usuario: number;
    Nombre: string;
    Rol: RoleUser;
    Email: string;
    Contrasena: string;
}

export interface UserCreate {
    Nombre: string;
    Email: string;
    Contrasena: string;
    Rol: RoleUser;
}

export interface UserUpdate {
    Nombre: string;
    Email: string;
}

export interface UserLogin {
    Email: string;
    Contrasena: string;
    Rol: RoleUser;
}

export interface UserLoginResponse {
    Mensaje: string;
    Usuario: {
        ID_Usuario: number;
        Nombre: string;
        Rol: RoleUser;
        Email: string;
        Contrasena: string;
    };
}