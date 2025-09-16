import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { WorkStationService } from '@core/services/workstation.service';

import { WorkStation } from '@core/interfaces/workstation.interface';


import { BaseTableStore } from '@shared/components/stores/base-table.store';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class WorkstationTableStore extends BaseTableStore<WorkStation> {
  
  constructor(
    private workstationService: WorkStationService,
    messageService: MessageService
  ) {
    super(messageService);
  }

  // Implementación específica para WorkStation
  load(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.workstationService.listar().subscribe({
      next: (workstations) => {
        this.updateBaseItems(workstations);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Error cargando puestos de trabajo');
        this.msg.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No se pudieron cargar los puestos de trabajo' 
        });
      }
    });
  }

  // Método específico para agregar puesto (cuando se crea uno nuevo)
  addWorkstation(workstation: WorkStation) {
    // console.log('Agregando puesto al store:', workstation);
    // Refrescamos la lista completa para asegurar sincronización
    void workstation; // Evita warning de variable no usada
    this.load();
  }

  // Método para actualizar un puesto en el store
  updateWorkstation(workstation: WorkStation) {
    this.updateItem(workstation);
  }

  // Método para eliminar puesto de trabajo
  deleteWorkstation(workstationId: number) {
    this.loading.set(true);
    
    this.workstationService.eliminar(workstationId).subscribe({
      next: () => {
        // Actualizar la lista local removiendo el puesto eliminado
        const workstations = this.baseItemsSig();
        const updatedWorkstations = workstations.filter(ws => ws.id !== workstationId);
        
        this.updateBaseItems(updatedWorkstations);
        this.loading.set(false);
        
        this.msg.add({ 
          severity: 'success', 
          summary: 'Puesto eliminado', 
          detail: 'El puesto de trabajo ha sido eliminado exitosamente' 
        });
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        console.error('Error al eliminar puesto:', error);

        let errorMessage = 'No se pudo eliminar el puesto de trabajo.';

        if (error.status === 500) {
          if (error.error && typeof error.error === 'string' && 
              error.error.includes('REFERENCE constraint')) {
            errorMessage = 'No se puede eliminar este puesto porque tiene datos asociados en el sistema.';
          } else {
            errorMessage = 'Error interno del servidor. Contacte al administrador.';
          }
        } else if (error.status === 404) {
          errorMessage = 'Puesto de trabajo no encontrado.';
        } else if (error.status === 400) {
          errorMessage = 'Solicitud inválida.';
        }
        // ...otros casos según tu lógica

        this.msg.add({
          severity: 'error',
          summary: 'Error al eliminar',
          detail: errorMessage,
          life: 7000
        });
      }
    });
  }

  // Alias para compatibilidad
  workstations() {
    return this.items();
  }
}
