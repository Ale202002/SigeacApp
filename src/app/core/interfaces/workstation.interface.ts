import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';
import { Plant } from '@core/enums/options-enums/Plant.enum';
import { resolvePlantFromCode } from '@core/constants/plant-prefix.map';
import { buildSearchIndex } from '@core/utils/search.utils';
import { WorkStationDto } from './Dtos/workstationDto.interface';

export interface WorkStation {
  id: number;
  ubicacion: string;
  status: EntityStatus;
  plant: Plant | null;
  usuarioId: number | null;
  equipoId: number | null;
  searchIndex: string;
  selected?: boolean;
}

export function mapWorkStationDto(dto: WorkStationDto): WorkStation {
  const plant = resolvePlantFromCode(dto.ubicacion);
  const status = dto.estado === 'activo' ? EntityStatus.Activo : EntityStatus.Inactivo;
  const searchIndex = buildSearchIndex([dto.ubicacion, status, plant, dto.usuarioID]);
  return {
    id: dto.iD_Puesto,
    ubicacion: dto.ubicacion,
    status,
    plant,
    usuarioId: dto.usuarioID,
    equipoId: dto.equipoID,
    searchIndex,
    selected: false
  };
}

export function mapWorkStationsDto(list: WorkStationDto[]): WorkStation[] {
  return list.map(mapWorkStationDto);
}