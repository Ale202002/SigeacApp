export enum ComponentType {
  Procesador = 'Procesador',
  MemoriaSSD = 'Memoria SSD',
  MemoriaRAM = 'Memoria RAM',
  FuenteDePoder = 'Fuente de Poder',
  PlacaMadre = 'Placa Madre'
}

// Lista de valores (útil para selects)
export const COMPONENT_TYPE_VALUES: string[] = Object.values(ComponentType);

// Normalizador seguro (string crudo → enum o null)
export function parseComponentType(raw: string | null | undefined): ComponentType | null {
  if (!raw) return null;
  const lower = raw.trim().toLowerCase();
  return (
    Object.values(ComponentType).find(v => v.toLowerCase() === lower) ?? null
  ) as ComponentType | null;
}