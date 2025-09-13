import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';

/**
 * Devuelve la severidad para <p-tag> / <p-message>.
 */
export function statusSeverity(s?: EntityStatus | null): string {
  switch (s) {
    case EntityStatus.Activo: return 'success';
    case EntityStatus.Inactivo: return 'danger';
    default: return 'info';
  }
}

/**
 * Texto legible del estado.
 */
export function statusLabel(s?: EntityStatus | null): string {
  switch (s) {
    case EntityStatus.Activo: return 'Activo';
    case EntityStatus.Inactivo: return 'Inactivo';
    default: return '—';
  }
}

/**
 * Normaliza string crudo ('activo'/'inactivo') a enum.
 */
export function toEntityStatus(raw: string | null | undefined): EntityStatus {
  return (raw || '').toLowerCase() === 'activo'
    ? EntityStatus.Activo
    : EntityStatus.Inactivo;
}