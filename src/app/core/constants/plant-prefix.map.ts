import { Plant } from "@core/enums/options-enums/Plant.enum";

export const PLANT_PREFIX_MAP: Record<string, Plant> = {
  PP: Plant.PrimerPiso,
  PB: Plant.PlantaBaja,
  SS: Plant.Subsuelo
};

export function resolvePlantFromCode(raw?: string | null): Plant | null {
  if (!raw) return null;
  const prefix = raw.split('-')[0].toUpperCase();
  return PLANT_PREFIX_MAP[prefix] ?? null;
}