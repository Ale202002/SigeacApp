import { RoleUser } from '@core/enums/user-enums/role-user.enum';

// DTO crudo (respuesta backend)
export interface UserDto {
  iD_Usuario: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  rol: RoleUser;
  // contrasena nunca debe usarse fuera de auth; si llega anidada, ignorar
}

// DTO crear usuario (payload POST)
export interface UserCreateDto {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  // contrasena?: string;
  // rol?: RoleUser;
}

// DTO actualizar usuario (payload PUT/PATCH)
export interface UserUpdateDto {
  iD_Usuario?: number; // Opcional porque va en la URL
  nombre?: string;
  apellido?: string;
  dni?: string;
  email?: string;
  // contrasena?: string;
  // rol?: RoleUser;
}

// DTO login
export interface UserLoginDto {
  email: string;
  contrasena: string;
}
