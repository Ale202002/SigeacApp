import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { NewEmployeeComponent } from '../new-employee/new-employee.component';
import { GenericFiltersComponent } from '@pages/private/shared/components/generic-filters/generic-filters.component';
import { GenericTable, TableColumn } from '@pages/private/shared/components/generic-table/generic-table';
import { ConfirmationDialogComponent } from '@pages/private/shared/components/confirmation-dialog/confirmation-dialog.component';

import { Employee } from '@core/models/employee.model';
import { EmployeeTableStore } from '../store/employee-store';

@Component({
  standalone: true,
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    NewEmployeeComponent,
    GenericFiltersComponent,
    GenericTable,
    ConfirmationDialogComponent
  ],
  providers: [MessageService, EmployeeTableStore]
})
export class EmployeeTableComponent implements OnInit {

  // Estado del diálogo de confirmación
  showDeleteDialog = false;
  employeeToDelete: Employee | null = null;

  // Configuración de columnas para la tabla
  columns: TableColumn[] = [
    { field: 'nombre', header: 'Nombre', type: 'custom', width: '250px' },
    { field: 'status', header: 'Estado', type: 'status', width: '120px' },
    { field: 'correo', header: 'Correo', type: 'text', width: '200px' },
    { field: 'puestoUbicacion', header: 'Puesto', type: 'text', width: '200px' }
  ];

  constructor(public store: EmployeeTableStore, private messageService: MessageService) {}

  ngOnInit(): void {
    this.store.load();
  }

  // Eventos de filtros
  onFiltersChange(filters: any) {
    this.store.setSearch(filters.search || '');
    this.store.setStatus(filters.status);
    this.store.setPlant(filters.plant);
  }

  onClearFilters() {
    this.store.clearFilters();
  }

  // Eventos de tabla
  onToggleAll(select: boolean) {
    this.store.toggleAll(select);
  }

  onRowToggle(employee: Employee) {
    this.store.toggleRow(employee);
  }

  onEditEmployee(employee: Employee) {
    // TODO: Implementar edición
    console.log('Editar empleado:', employee);
  }

  onDeleteEmployee(employee: Employee) {
    this.employeeToDelete = employee;
    this.showDeleteDialog = true;
  }

  onConfirmDelete() {
    if (this.employeeToDelete) {
      this.store.deleteEmployee(this.employeeToDelete.id);
      this.showDeleteDialog = false;
      this.employeeToDelete = null;
    }
  }

  onCancelDelete() {
    this.showDeleteDialog = false;
    this.employeeToDelete = null;
  }

  onPageChange(event: any) {
    // Manejar cambio de página si es necesario
    console.log('Página cambiada:', event);
  }

  // Eventos de nuevo empleado
  onEmployeeCreated(emp: Employee) {
    this.store.addEmployee(emp);
  }

  onReloadRequested() {
    this.store.refresh();
  }
}