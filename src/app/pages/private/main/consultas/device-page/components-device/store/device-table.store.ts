import { Injectable, computed, signal, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

import { DeviceService } from '@core/services/device.service';
import { Device } from '@core/interfaces/device.interface';
import { BaseTableStore } from '@shared/components/stores/base-table.store';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DeviceTableStore extends BaseTableStore<Device> {
  
  private deviceService = inject(DeviceService);
  
  // Filtros adicionales específicos para devices
  readonly tipoEquipoFilter = signal<string>('');
  readonly componentesFilter = signal<string>('');

  // Computed para obtener tipos de equipo únicos
  readonly tiposEquipo = computed(() => {
    const devices = this.baseItemsSig();
    const tipos = devices.map(device => device.sistemaOperativo).filter(Boolean);
    return [...new Set(tipos)];
  });

  // Computed para obtener componentes únicos basado en componentesCount
  readonly componentesDisponibles = computed(() => {
    // Por ahora usamos categories básicas basadas en componentesCount
    const categories = ['Sin Componentes', 'Pocos Componentes', 'Muchos Componentes'];
    return categories;
  });

  constructor() {
    const messageService = inject(MessageService);
    super(messageService);
  }

  // Implementación del método abstracto load
  load(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.deviceService.listar().subscribe({
      next: (devices: Device[]) => {
        this.updateBaseItems(devices);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set('Error cargando equipos');
        this.msg.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No se pudieron cargar los equipos' 
        });
        console.error('Error loading devices:', error);
      }
    });
  }

  // Método para eliminar device
  async deleteDevice(deviceId: number): Promise<void> {
    this.loading.set(true);
    
    this.deviceService.eliminar(deviceId).subscribe({
      next: () => {
        this.msg.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Equipo eliminado correctamente'
        });
        this.load(); // Recargar la lista
      },
      error: (error: HttpErrorResponse) => {
        this.msg.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar el equipo'
        });
        console.error('Error deleting device:', error);
        this.loading.set(false);
      }
    });
  }

  // Métodos para filtros adicionales
  setTipoEquipo(tipoEquipo: string): void {
    this.tipoEquipoFilter.set(tipoEquipo);
  }

  setComponentes(componentes: string): void {
    this.componentesFilter.set(componentes);
  }

  // Override de clearFilters para incluir filtros adicionales
  override clearFilters() {
    super.clearFilters();
    this.tipoEquipoFilter.set('');
    this.componentesFilter.set('');
  }

  // Computed que combina filtros base con filtros adicionales
  override readonly items = computed(() => {
    // Aplicar filtros base primero
    let filtered = this.baseItemsSig().filter(device => {
      const baseFilter = this.filterSig();
      
      // Filtro de búsqueda
      if (baseFilter.search) {
        const searchTerm = baseFilter.search.toLowerCase();
        if (!device.searchIndex.toLowerCase().includes(searchTerm)) return false;
      }

      // Filtro de estado
      if (baseFilter.status && device.status !== baseFilter.status) return false;

      // Filtro de planta
      if (baseFilter.plant && device.plant !== baseFilter.plant) return false;

      return true;
    });
    
    // Aplicar filtros adicionales
    const tipoEquipo = this.tipoEquipoFilter();
    if (tipoEquipo) {
      filtered = filtered.filter(device => device.sistemaOperativo === tipoEquipo);
    }

    const componentes = this.componentesFilter();
    if (componentes) {
      if (componentes === 'Sin Componentes') {
        filtered = filtered.filter(device => device.componentesCount === 0);
      } else if (componentes === 'Pocos Componentes') {
        filtered = filtered.filter(device => device.componentesCount > 0 && device.componentesCount <= 3);
      } else if (componentes === 'Muchos Componentes') {
        filtered = filtered.filter(device => device.componentesCount > 3);
      }
    }

    return filtered;
  });
}