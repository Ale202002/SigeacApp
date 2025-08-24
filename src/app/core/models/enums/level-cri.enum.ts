//es un enum para definir los niveles de criticidad
export enum LevelCri{
    Alta='Alta',
    Media='Media',
    Baja='Baja',
}

// es un helper que convierte de número a rol
export function getLevelCriFromNumber(value: number): LevelCri {
  switch (value) {
    case 0: return LevelCri.Alta;
    case 1: return LevelCri.Media;
    case 2: return LevelCri.Baja;
    default: return LevelCri.Baja;
  }
}

// es un helper que convierte de rol a número
export function getLevelCriNumber(rol: LevelCri): number {
  switch (rol) {
    case LevelCri.Alta: return 0;
    case LevelCri.Media: return 1;
    case LevelCri.Baja: return 2;
    default: return 2;
  }
}