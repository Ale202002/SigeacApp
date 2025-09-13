
import { ComponentType } from '@core/enums/components-enums/component-type.enum';
import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';
import { buildSearchIndex } from '@core/utils/search.utils';
import { ComponentDto } from './Dtos/deviceDto.interface';


export interface Component {
  id: number;
  tipo: ComponentType | string;
  nombre: string;
  status: EntityStatus;
  deviceId: number;
  searchIndex: string;
  selected?: boolean;
}

function mapEstado(raw: string): EntityStatus {
  const v = (raw || '').toLowerCase();
  return v === 'activo' ? EntityStatus.Activo : EntityStatus.Inactivo;
}

export function mapComponentDto(dto: ComponentDto): Component {
  const status = mapEstado(dto.estado);
  const searchIndex = buildSearchIndex([dto.nombre, dto.tipo, status]);
  return {
    id: dto.iD_Componente,
    tipo: dto.tipo as ComponentType,
    nombre: dto.nombre,
    status,
    deviceId: dto.equipoID,
    searchIndex,
    selected: false
  };
}

export function mapComponentsDto(list: ComponentDto[]): Component[] {
  return list.map(mapComponentDto);
}