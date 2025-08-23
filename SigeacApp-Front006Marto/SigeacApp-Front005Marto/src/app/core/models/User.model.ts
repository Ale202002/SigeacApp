import { RoleUser } from "./enums/role-user.enum";

export interface User {
    iD_Usuario: number;
    nombre: string;
    rol: RoleUser;
    email: string;
    contrasena: string;
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
    email: string;
    contrasena: string;
    rol?: RoleUser | undefined;
}

/*export interface UsuarioBackend {
    iD_Usuario: number;
    nombre: string;
    email: string;
    rol: string;
}*/

export interface UserLoginResponse {
    mensaje: string;
    usuario: User;
}
