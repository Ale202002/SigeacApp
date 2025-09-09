//es un enum para definir los niveles de criticidad
export enum criticalityLevel {
    Alta='Alta',
    Media='Media',
    Baja='Baja',
}

// es un helper que convierte de número a rol
export function getCriticalityLevelFromNumber(value: number): criticalityLevel {
  switch (value) {
    case 0: return criticalityLevel.Alta;
    case 1: return criticalityLevel.Media;
    case 2: return criticalityLevel.Baja;
    default: return criticalityLevel.Baja;
  }
}

// es un helper que convierte de rol a número
export function getCriticalityLevelNumber(rol: criticalityLevel): number {
  switch (rol) {
    case criticalityLevel.Alta: return 0;
    case criticalityLevel.Media: return 1;
    case criticalityLevel.Baja: return 2;
    default: return 2;
  }
}