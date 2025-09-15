import { Component, OnInit, OnDestroy, ComponentRef, ViewContainerRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { NewEmployeeComponent } from '../new-employee/new-employee.component';
import { EditEmployeeButtonComponent, DeleteEmployeeButtonComponent } from '../buttons-table';
import { GenericFiltersComponent } from '@pages/private/shared/components/generic-filters/generic-filters.component';
import { GenericTable, TableColumn } from '@pages/private/shared/components/generic-table/generic-table';

import { Employee } from '@core/models/employee.model';
import { EmployeeTableStore } from '../../store/employee-store';

@Component({
  standalone: true,
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    NewEmployeeComponent,
    EditEmployeeButtonComponent,
    DeleteEmployeeButtonComponent,
    GenericFiltersComponent,
    GenericTable
  ],
  providers: [MessageService, EmployeeTableStore]
})
export class EmployeeTableComponent implements OnInit, OnDestroy {

  private currentEditComponent: ComponentRef<EditEmployeeButtonComponent> | null = null;
  private currentDeleteComponent: ComponentRef<DeleteEmployeeButtonComponent> | null = null;

  // Dummy employee para el template hidden
  dummyEmployee: Employee = {
    id: 0,
    nombre: '',
    dni: '',
    correo: '',
    puestoId: null,
    puestoUbicacion: '',
    status: 'ACTIVO' as any,
    plant: null,
    selected: false,
    searchIndex: ''
  };

  // Configuración de columnas para la tabla
  columns: TableColumn[] = [
    { field: 'nombre', header: 'Nombre', type: 'custom', width: '250px' },
    { field: 'status', header: 'Estado', type: 'status', width: '120px' },
    { field: 'correo', header: 'Correo', type: 'text', width: '200px' },
    { field: 'puestoUbicacion', header: 'Puesto', type: 'text', width: '200px' }
  ];

  constructor(
    public store: EmployeeTableStore, 
    private messageService: MessageService,
    private viewContainer: ViewContainerRef,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.store.load();
    
    // Limpiar componentes huérfanos cada 3 segundos
    setInterval(() => {
      this.cleanupOrphanedComponents();
    }, 3000);
  }

  ngOnDestroy(): void {
    this.destroyEditComponent();
    this.destroyDeleteComponent();
  }

  private cleanupOrphanedComponents() {
    // Limpiar componente edit si el modal está cerrado
    if (this.currentEditComponent && !this.currentEditComponent.instance.show()) {
      this.destroyEditComponent();
    }
    
    // Limpiar componente delete si el modal está cerrado
    if (this.currentDeleteComponent && !this.currentDeleteComponent.instance.showDeleteDialog) {
      this.destroyDeleteComponent();
    }
  }

  // Eventos de filtros
  onFiltersChange(filters: any) {
    // Limpiar componentes dinámicos cuando cambian los filtros
    this.destroyEditComponent();
    this.destroyDeleteComponent();
    
    this.store.setSearch(filters.search || '');
    this.store.setStatus(filters.status);
    this.store.setPlant(filters.plant);
  }

  onClearFilters() {
    // Limpiar componentes dinámicos cuando se limpian los filtros
    this.destroyEditComponent();
    this.destroyDeleteComponent();
    
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
    // Destruir cualquier componente edit anterior
    this.destroyEditComponent();
    
    // Crear el componente dinámicamente
    this.currentEditComponent = this.viewContainer.createComponent(EditEmployeeButtonComponent, {
      injector: this.injector
    });
    
    // Configurar el componente
    this.currentEditComponent.instance.employee = employee;
    
    // Suscribirse al evento de actualización
    this.currentEditComponent.instance.employeeUpdated.subscribe((updatedEmployee: Employee) => {
      this.onEmployeeUpdated(updatedEmployee);
      this.destroyEditComponent();
    });
    
    // Simular el click para abrir el modal
    this.currentEditComponent.instance.openEditDialog();
    
    // Destruir componente después de un timeout para limpiar componentes huérfanos
    setTimeout(() => {
      if (this.currentEditComponent && !this.currentEditComponent.instance.show()) {
        this.destroyEditComponent();
      }
    }, 5000);
  }

  private destroyEditComponent() {
    if (this.currentEditComponent) {
      this.currentEditComponent.destroy();
      this.currentEditComponent = null;
    }
  }

  private destroyDeleteComponent() {
    if (this.currentDeleteComponent) {
      this.currentDeleteComponent.destroy();
      this.currentDeleteComponent = null;
    }
  }

  onDeleteEmployee(employee: Employee) {
    // Destruir cualquier componente delete anterior
    this.destroyDeleteComponent();
    
    // Crear el componente dinámicamente
    this.currentDeleteComponent = this.viewContainer.createComponent(DeleteEmployeeButtonComponent, {
      injector: this.injector
    });
    
    // Configurar el componente
    this.currentDeleteComponent.instance.employee = employee;
    
    // Suscribirse al evento de confirmación de eliminación
    this.currentDeleteComponent.instance.confirmDelete.subscribe((employeeToDelete: Employee) => {
      // Usar el método del store que maneja la eliminación
      this.store.deleteEmployee(employeeToDelete.id);
      this.destroyDeleteComponent();
    });
    
    // Simular el click para abrir el modal de confirmación
    this.currentDeleteComponent.instance.openDeleteDialog();
    
    // Destruir componente después de un timeout para limpiar componentes huérfanos
    setTimeout(() => {
      if (this.currentDeleteComponent && !this.currentDeleteComponent.instance.showDeleteDialog) {
        this.destroyDeleteComponent();
      }
    }, 5000);
  }

  onPageChange(event: any) {
    // Limpiar componentes dinámicos cuando cambia la página
    this.destroyEditComponent();
    this.destroyDeleteComponent();
    
    // Manejar cambio de página si es necesario
    console.log('Página cambiada:', event);
  }

  // Eventos de nuevo empleado
  onEmployeeCreated(emp: Employee) {
    this.store.addEmployee(emp);
  }

  onEmployeeUpdated(emp: Employee) {
    this.store.updateEmployee(emp);
  }

  onEmployeeDeleted(emp: Employee) {
    // El hijo ya eliminó del backend, recargar la lista
    this.store.refresh();
  }

  private handleDeleteError(err: any) {
    let errorMessage = 'No se pudo eliminar el empleado.';
    
    if (err.status === 404) {
      errorMessage = 'El empleado no fue encontrado.';
    } else if (err.status === 409) {
      errorMessage = 'No se puede eliminar el empleado porque tiene datos relacionados.';
    } else if (err.status === 500) {
      errorMessage = 'No se puede eliminar el empleado porque tiene equipos asignados. Primero debe liberar los equipos asignados.';
    } else if (err.status === 403) {
      errorMessage = 'No tiene permisos para eliminar este empleado.';
    } else if (err.error?.message) {
      errorMessage = err.error.message;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error al eliminar',
      detail: errorMessage,
      life: 7000
    });
  }

  onReloadRequested() {
    this.store.refresh();
  }
}