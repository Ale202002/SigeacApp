export enum PropertyAccess{
    Compania='Compania',
    Empleado='Empleado',
    No='No',
}

export function getRolUserFromNumber(value: number): PropertyAccess {
  switch (value) {
    case 0: return PropertyAccess.Compania;
    case 1: return PropertyAccess.Empleado;
    case 2: return PropertyAccess.No;
    default: return PropertyAccess.No;
  }
}

// Helper para convertir de enum a número (para API)
export function getPropertyAccessNumber(rol: PropertyAccess): number {
  switch (rol) {
    case PropertyAccess.Compania: return 0;
    case PropertyAccess.Empleado: return 1;
    case PropertyAccess.No: return 2;
    default: return 2;
  }
}