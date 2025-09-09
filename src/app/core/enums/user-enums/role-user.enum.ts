//es un enum para definir los roles validos del usuario

export enum RoleUser{
  Administrador= 'Administrador',
  RRHH= 'RRHH',
  Empleado='Empleado',
}

// es un helper que convierte de número a rol
export function getRolUserFromNumber(value: number): RoleUser {
  switch (value) {
    case 0: return RoleUser.Administrador;
    case 1: return RoleUser.RRHH;
    case 2: return RoleUser.Empleado;
    default: return RoleUser.Empleado;
  }
}

// es un helper que convierte de rol a número
export function getRolUserNumber(rol: RoleUser): number {
  switch (rol) {
    case RoleUser.Administrador: return 0;
    case RoleUser.RRHH: return 1;
    case RoleUser.Empleado: return 2;
    default: return 2;
  }
}

//Estos helpers se utilizan para mapear entre los roles de usuario y sus representaciones numéricas,
// facilitando la interacción con APIs que requieren este formato.