//esta interfaz de Device(Equipo) contiene todas las propiedades y datos que el backend maneja para un equipo

import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';
import { Plant } from '@core/enums/options-enums/Plant.enum';
import { resolvePlantFromCode } from '@core/constants/plant-prefix.map';
import { buildSearchIndex } from '@core/utils/search.utils';
import { OperatingSystem } from '@core/enums/device-enums/operating-system.enum';
import { criticalityLevel } from '@core/enums/device-enums/criticality-level.enum';
import { DeviceDto } from './Dtos/deviceDto.interface';
import { WorkStationDto } from './Dtos/workstationDto.interface';

export interface Device {
  id: number;
  identificador: string;
  puestoId: number | null;
  status: EntityStatus;          // derivado del puesto.estado si existe
  plant: Plant | null;
  disponibilidadFisica: boolean;
  area: string;
  empleadoAsignadoId: number | null;
  ip: string;
  numeroSerie: string;
  mac: string;
  esDesktop: boolean;
  propiedadActivo: boolean;
  sistemaOperativo: string | OperatingSystem;
  versionSO: string;
  soporte: boolean;
  confidencialidad: string | criticalityLevel;
  disponibilidad: string | criticalityLevel;
  integridad: string | criticalityLevel;
  criticidad: string | criticalityLevel;
  fechaClasificacion: string;
  vpnLabs: boolean;
  escritorioRemoto: boolean;
  cifrado: boolean;
  antivirus: boolean;
  adicionales?: string;
  componentesCount: number;
  searchIndex: string;
  selected?: boolean;
}

export function mapDeviceDto(dto: DeviceDto): Device {
  const puesto: WorkStationDto | null = dto.puesto ?? null;
  const status: EntityStatus = puesto
    ? (puesto.estado === 'activo' ? EntityStatus.Activo : EntityStatus.Inactivo)
    : EntityStatus.Inactivo;

  const plant: Plant | null = puesto ? resolvePlantFromCode(puesto.ubicacion) : null;

  const searchIndex = buildSearchIndex([
    dto.identificadorActivo,
    dto.numeroSerie,
    dto.mac,
    dto.sistemaOperativo,
    dto.area,
    status,
    plant
  ]);

  return {
    id: dto.iD_Equipo,
    identificador: dto.identificadorActivo,
    puestoId: dto.puestoID,
    status,
    plant,
    disponibilidadFisica: dto.disponibilidadFisica,
    area: dto.area,
    empleadoAsignadoId: dto.empleadoAsignadoID,
    ip: dto.ip,
    numeroSerie: dto.numeroSerie,
    mac: dto.mac,
    esDesktop: dto.tipo,
    propiedadActivo: dto.propiedadActivo,
    sistemaOperativo: dto.sistemaOperativo,
    versionSO: dto.versionSO,
    soporte: dto.soporte,
    confidencialidad: dto.confidencialidad,
    disponibilidad: dto.disponibilidad,
    integridad: dto.integridad,
    criticidad: dto.criticidad,
    fechaClasificacion: dto.fechaClasificacion,
    vpnLabs: dto.vpnLabs,
    escritorioRemoto: dto.escritorioRemoto,
    cifrado: dto.cifrado,
    antivirus: dto.antivirus,
    adicionales: dto.adicionales || undefined,
    componentesCount: dto.componentes?.length ?? 0,
    searchIndex,
    selected: false
  };
}

export function mapDevicesDto(list: DeviceDto[]): Device[] {
  return list.map(mapDeviceDto);
}