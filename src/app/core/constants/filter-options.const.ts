import { ComponentType, COMPONENT_TYPE_VALUES } from '@core/enums/components-enums/component-type.enum';
import { OperatingSystem } from '@core/enums/device-enums/operating-system.enum';
import { criticalityLevel } from '@core/enums/device-enums/criticality-level.enum';
import { PropertyAccess } from '@core/enums/device-enums/property-access.enum';

// FilterOption interface - compatible con BaseTableStore
export interface FilterOption {
  key?: string;
  label: string;
  data: any;
}

// Opciones para filtros de Component Type
export const COMPONENT_TYPE_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'Tipos', data: null },
  ...COMPONENT_TYPE_VALUES.map((type, index) => ({
    key: `comp_${index}`,
    label: type,
    data: type as ComponentType
  }))
];

// Opciones para filtros de Operating System
export const OPERATING_SYSTEM_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'Sistemas Operativos', data: null },
  { key: 'os_0', label: 'Windows', data: OperatingSystem.Windows },
  { key: 'os_1', label: 'Linux', data: OperatingSystem.Linux },
  { key: 'os_2', label: 'MacOS', data: OperatingSystem.MacOS }
];

// Opciones para filtros de Criticality Level
export const CRITICALITY_LEVEL_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'Criticidad', data: null },
  { key: 'crit_0', label: 'Alta', data: criticalityLevel.Alta },
  { key: 'crit_1', label: 'Media', data: criticalityLevel.Media },
  { key: 'crit_2', label: 'Baja', data: criticalityLevel.Baja }
];

// Opciones para filtros de Property Access
export const PROPERTY_ACCESS_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'Propiedad', data: null },
  { key: 'prop_0', label: 'Compañía', data: PropertyAccess.Compania },
  { key: 'prop_1', label: 'Empleado', data: PropertyAccess.Empleado },
  { key: 'prop_2', label: 'No Definido', data: PropertyAccess.No }
];

// Opciones para tipo de dispositivo (Desktop/Notebook)
export const DEVICE_TYPE_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'Tipo Dispositivo', data: null },
  { key: 'type_0', label: 'Desktop', data: true },
  { key: 'type_1', label: 'Notebook', data: false }
];

// Opciones para disponibilidad física
export const AVAILABILITY_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'Disponibilidad', data: null },
  { key: 'avail_0', label: 'Disponible', data: true },
  { key: 'avail_1', label: 'No Disponible', data: false }
];

// Opciones para soporte
export const SUPPORT_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'Soporte', data: null },
  { key: 'supp_0', label: 'Con Soporte', data: true },
  { key: 'supp_1', label: 'Sin Soporte', data: false }
];

// Helper para construir opciones booleanas genéricas
export function createBooleanOptions(label: string, trueLabel: string, falseLabel: string): FilterOption[] {
  return [
    { key: 'all', label, data: null },
    { key: 'bool_true', label: trueLabel, data: true },
    { key: 'bool_false', label: falseLabel, data: false }
  ];
}