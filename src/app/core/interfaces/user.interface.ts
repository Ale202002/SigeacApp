import { RoleUser } from '@core/enums/user-enums/role-user.enum';
import { UserDto } from './Dtos/userDto.interface';


// Modelo de dominio (normalizado)
export interface User {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  rol: RoleUser;
}

// Mapper único
export function mapUserDtoToUser(raw: UserDto): User {
  return {
    id: raw.iD_Usuario,
    nombre: raw.nombre,
    apellido: raw.apellido,
    dni: raw.dni,
    email: raw.email,
    rol: raw.rol
  };
}

export function mapUsersDtoToUsers(list: UserDto[]): User[] {
  return list.map(mapUserDtoToUser);
}
