export interface User {
    ID_Usuario: number;
    Nombre: string;
    Rol: string;
    Email: string;
    Contrasena: string;
}

export interface UserCreate {
    Nombre: string;
    Email: string;
    Contrasena: string;
    Rol: string;
}

export interface UserUpdate {
    Nombre: string;
    Email: string;
}

export interface UserLogin {
    Email: string;
    Contrasena: string;
}
