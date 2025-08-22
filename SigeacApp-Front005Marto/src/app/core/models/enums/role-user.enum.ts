export enum RoleUser{
    Administrador= 'Administrador',
    RRHH= 'RRHH',
    Usuario='Usuario',
}

export function getRolUserFromNumber(value: number): RoleUser {
  switch (value) {
    case 0: return RoleUser.Administrador;
    case 1: return RoleUser.RRHH;
    case 2: return RoleUser.Usuario;
    default: return RoleUser.Usuario;
  }
}

// Helper para convertir de enum a número (para API)
export function getRolUserNumber(rol: RoleUser): number {
  switch (rol) {
    case RoleUser.Administrador: return 0;
    case RoleUser.RRHH: return 1;
    case RoleUser.Usuario: return 2;
    default: return 2;
  }
}