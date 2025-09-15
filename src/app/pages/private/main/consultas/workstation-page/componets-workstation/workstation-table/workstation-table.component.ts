import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Shared Components
import { GenericFiltersComponent } from '@pages/private/shared/components/generic-filters/generic-filters.component';
import { GenericTable, TableColumn } from '@pages/private/shared/components/generic-table/generic-table';

// Workstation Components
import { NewWorkstationComponent } from '../new-workstation/new-workstation.component';
import { EditWorkstationButtonComponent } from '../buttons-table/edit-workstation-button.component';
import { DeleteWorkstationButtonComponent } from '../buttons-table/delete-workstation-button.component';

// Store and Services
import { WorkstationTableStore } from '../store/workstation-store';

// Interfaces
import { WorkStation } from '@core/interfaces/workstation.interface';

@Component({
  selector: 'app-workstation-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
    GenericFiltersComponent,
    GenericTable,
    NewWorkstationComponent,
    EditWorkstationButtonComponent,
    DeleteWorkstationButtonComponent
  ],
  providers: [MessageService, WorkstationTableStore],
  templateUrl: './workstation-table.component.html'
})
export class WorkstationTableComponent implements OnInit {
  
  store = inject(WorkstationTableStore);
  selectedWorkstation: WorkStation | null = null;
  showEditModal = false;
  showDeleteModal = false;

  // Columnas de la tabla
  columns: TableColumn[] = [
    { field: 'id', header: 'ID', type: 'text', width: '80px' },
    { field: 'ubicacion', header: 'Puesto', type: 'text', width: '200px' },
    { field: 'status', header: 'Estado', type: 'status', width: '120px' },
    { field: 'usuarioId', header: 'Empleado', type: 'text', width: '150px' },
    { field: 'equipoId', header: 'Equipo', type: 'text', width: '150px' }
  ];

  ngOnInit(): void {
    this.store.load();
  }

  // Métodos para manejar filtros
  onFiltersChange(filters: any): void {
    this.store.setSearch(filters.search || '');
    this.store.setStatus(filters.status);
    this.store.setPlant(filters.plant);
  }

  onClearFilters(): void {
    this.store.clearFilters();
  }

  // Métodos para manejar acciones de la tabla
  onEditWorkstation(workstation: WorkStation): void {
    console.log('Edit clicked for workstation:', workstation);
    this.selectedWorkstation = workstation;
    this.showEditModal = true;
  }

  onDeleteWorkstation(workstation: WorkStation): void {
    console.log('Delete clicked for workstation:', workstation);
    this.selectedWorkstation = workstation;
    this.showDeleteModal = true;
  }

  // Método para confirmar eliminación
  onConfirmDeleteWorkstation(workstation: WorkStation): void {
    this.store.deleteWorkstation(workstation.id);
    this.selectedWorkstation = null;
    this.showDeleteModal = false;
  }

  // Método para manejar la actualización de workstation
  onWorkstationUpdated(): void {
    this.refresh();
    this.showEditModal = false;
  }

  // Método para cerrar modales
  onCancelEdit(): void {
    this.showEditModal = false;
    this.selectedWorkstation = null;
  }

  onCancelDelete(): void {
    this.showDeleteModal = false;
    this.selectedWorkstation = null;
  }

  // Método para refrescar los datos
  refresh(): void {
    this.store.load();
  }
}
