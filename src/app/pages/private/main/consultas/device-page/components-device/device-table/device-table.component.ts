import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

import { DeviceTableStore } from '../store/device-table.store';
import { Device } from '@core/interfaces/device.interface';
import { GenericTable, TableColumn } from '@shared/components/generic-table/generic-table';
import { EditDeviceButtonComponent, DeleteDeviceButtonComponent } from '../buttons-table';

@Component({
  standalone: true,
  selector: 'app-device-table',
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    GenericTable,
    EditDeviceButtonComponent,
    DeleteDeviceButtonComponent
  ],
  providers: [DeviceTableStore, MessageService],
  templateUrl: './device-table.component.html',
})
export class DeviceTableComponent implements OnInit {
  
  protected store = inject(DeviceTableStore);

  // Propiedades para filtros individuales
  selectedSearch: string = '';
  selectedPlant: string = '';
  selectedStatus: string = '';
  selectedTipoEquipo: string = '';
  selectedComponente: string = '';

  // Opciones para dropdowns adicionales
  tipoEquipoOptions = [
    { label: 'Escritorio', value: 'Escritorio' },
    { label: 'Notebook', value: 'Notebook' },
  ];

  componenteOptions = [
    { label: 'Procesador', value: 'Procesador' },
    { label: 'Memoria Ram', value: 'Memoria Ram' },
    { label: 'Disco SSD', value: 'Disco SSD' },
    { label: 'Fuente de Poder', value: 'Fuente de Poder' },
  ];

  // Dummy device para el template hidden (igual que empleados)
  dummyDevice: Device = {
    id: 0,
    identificador: '',
    puestoId: null,
    puestoNombre: null,
    status: 'ACTIVO' as any,
    plant: null,
    disponibilidadFisica: true,
    area: '',
    empleadoAsignadoId: null,
    ip: '',
    numeroSerie: '',
    mac: '',
    esDesktop: false,
    propiedadActivo: true,
    sistemaOperativo: '',
    versionSO: '',
    soporte: false,
    confidencialidad: '',
    disponibilidad: '',
    integridad: '',
    criticidad: '',
    fechaClasificacion: '',
    vpnLabs: false,
    escritorioRemoto: false,
    cifrado: false,
    antivirus: false,
    componentesCount: 0,
    searchIndex: '',
    selected: false
  };

  // Configuración de columnas
  readonly columns: TableColumn[] = [
    {
      field: 'id',
      header: 'Equipo',
      type: 'text',
      width: '25%'
    },
    {
      field: 'tipoEquipo',
      header: 'Tipo de Equipo',
      type: 'text',
      width: '30%'
    },
    {
      field: 'componentesCount',
      header: 'Componentes', 
      type: 'text',
      width: '20%'
    },
    {
      field: 'puestoNombre',
      header: 'Puesto',
      type: 'text',
      width: '25%'
    }
  ];

  ngOnInit(): void {
    this.store.load();
  }

  // Computed para transformar los devices con tipoEquipo
  devices = computed(() => {
    const items = this.store.items();
    
    return items.map(device => {
      // Validación robusta para el tipo de equipo
      const tipoEquipo = device.esDesktop === true ? 'Escritorio' : 
                        device.esDesktop === false ? 'Notebook' : 
                        'Sin especificar';
      
      return {
        ...device,
        tipoEquipo,
        puestoNombre: device.puestoNombre || 'Sin asignar'
      };
    });
  });

  get loading() {
    return this.store.loading();
  }

  // Métodos de filtros individuales
  onSearchChange(event: any): void {
    this.selectedSearch = event.target.value;
    this.store.setSearch(this.selectedSearch);
  }

  onPlantChange(event: any): void {
    this.selectedPlant = event.target.value;
    this.store.setPlant(this.selectedPlant as any || null);
  }

  onStatusChange(event: any): void {
    this.selectedStatus = event.target.value;
    this.store.setStatus(this.selectedStatus as any || null);
  }

  // Métodos de filtros (igual que empleados)
  onFiltersChange(filters: any): void {
    if (filters.search !== undefined) {
      this.store.setSearch(filters.search);
    }
    if (filters.plant !== undefined) {
      this.store.setPlant(filters.plant);
    }
    if (filters.status !== undefined) {
      this.store.setStatus(filters.status);
    }
    if (filters.tipoEquipo !== undefined) {
      this.store.setTipoEquipo(filters.tipoEquipo);
    }
    if (filters.componentes !== undefined) {
      this.store.setComponentes(filters.componentes);
    }
  }

  onClearFilters(): void {
    this.selectedSearch = '';
    this.selectedPlant = '';
    this.selectedStatus = '';
    this.selectedTipoEquipo = '';
    this.selectedComponente = '';
    this.store.clearFilters();
  }

  // Métodos para filtros adicionales
  onTipoEquipoChange(value: string): void {
    this.selectedTipoEquipo = value;
    this.store.setTipoEquipo(value);
  }

  onComponenteChange(value: string): void {
    this.selectedComponente = value;
    this.store.setComponentes(value);
  }

  // Métodos de selección (igual que empleados)
  onToggleAll(select: boolean): void {
    this.store.toggleAll(select);
  }

  onRowToggle(device: Device): void {
    this.store.toggleRow(device);
  }

  // Métodos de acciones (igual que empleados)
  onEditDevice(device: Device): void {
    console.log('Edit device:', device);
    // TODO: Implementar edición
  }

  onDeleteDevice(device: Device): void {
    console.log('Delete device:', device);
    // TODO: Implementar eliminación
  }

  // Métodos de paginación (igual que empleados)
  onPageChange(event: any): void {
    this.store.onPageChange(event);
  }

  // Métodos de template para las columnas custom
  getComponentsBadgeClass(device: Device): string {
    const count = device.componentesCount;
    if (count === 0) return 'bg-gray-200 text-gray-700';
    if (count <= 3) return 'bg-blue-100 text-blue-700';
    return 'bg-green-100 text-green-700';
  }

  getPuestoDisplay(device: Device): string {
    return device.puestoId ? `Puesto #${device.puestoId}` : '-';
  }

  getTipoEquipoDisplay(device: Device): string {
    return device.esDesktop ? 'Escritorio' : 'Notebook';
  }
}
