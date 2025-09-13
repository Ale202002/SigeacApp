import { EntityStatus } from "@core/enums/options-enums/EntityStatus.enum";
import { Plant } from "@core/enums/options-enums/Plant.enum";


export const STATUS_OPTIONS = [
  { key: 'all', label: 'Estados', data: null },
  { key: '0-0', label: 'Activo', data: EntityStatus.Activo },
  { key: '0-1', label: 'Inactivo', data: EntityStatus.Inactivo }
];

export const PLANT_OPTIONS = [
  { key: 'all', label: 'Plantas', data: null },
  { key: '1-0', label: 'Primer piso', data: Plant.PrimerPiso },
  { key: '1-1', label: 'Planta baja', data: Plant.PlantaBaja },
  { key: '1-2', label: 'Subsuelo', data: Plant.Subsuelo }
];