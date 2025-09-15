import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';
import { Plant } from '@core/enums/options-enums/Plant.enum';
import { buildSearchIndex } from '@core/utils/search.utils';
import { User } from '@core/interfaces/user.interface';
import { WorkStation } from '@core/interfaces/workstation.interface';

export interface Employee {
  id: number;
  nombre: string;
  dni: string;
  correo: string;
  puestoId: number | null;
  puestoUbicacion: string | null;
  status: EntityStatus;
  plant: Plant | null;
  searchIndex: string;
  selected?: boolean;
}

export function mapToEmployees(users: User[], puestos: WorkStation[]): Employee[] {
  return users.map(u => {
    const puesto = puestos.find(p => p.usuarioId === u.id) || null;
    const status = puesto ? puesto.status : EntityStatus.Inactivo;
    const plant = puesto ? puesto.plant : null;

    const searchIndex = buildSearchIndex([
      u.nombre,
      u.apellido,
      u.email,
      puesto?.ubicacion,
      status,
      plant
    ]);

    return {
      id: u.id,
      nombre: `${u.nombre} ${u.apellido}`.trim(),
      dni: u.dni,
      correo: u.email,
      puestoId: puesto?.id ?? null,
      puestoUbicacion: puesto?.ubicacion ?? null,
      status,
      plant,
      searchIndex,
      selected: false
    };
  });
}