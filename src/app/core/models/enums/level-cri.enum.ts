export enum LevelCri{
    Alta='Alta',
    Media='Media',
    Baja='Baja',
}

export function getLevelCriFromNumber(value: number): LevelCri {
  switch (value) {
    case 0: return LevelCri.Alta;
    case 1: return LevelCri.Media;
    case 2: return LevelCri.Baja;
    default: return LevelCri.Baja;
  }
}

// Helper para convertir de enum a número (para API)
export function getLevelCriNumber(rol: LevelCri): number {
  switch (rol) {
    case LevelCri.Alta: return 0;
    case LevelCri.Media: return 1;
    case LevelCri.Baja: return 2;
    default: return 2;
  }
}