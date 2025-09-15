import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';

import { UserService } from '@core/services/user.service';
import { WorkStationService } from '@core/services/workstation.service';
import { mapToEmployees, Employee } from '@core/models/employee.model';
import { User } from '@core/interfaces/user.interface';
import { WorkStation } from '@core/interfaces/workstation.interface';
import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';

import { BaseTableStore } from '@shared/components/stores/base-table.store';

@Injectable()
export class EmployeeTableStore extends BaseTableStore<Employee> {
  private workstations: WorkStation[] = [];
  
  constructor(
    private userService: UserService,
    private workstationService: WorkStationService,
    messageService: MessageService
  ) {
    super(messageService);
  }

  // Implementación específica para Employee usando forkJoin
  load(): void {
    this.loading.set(true);
    this.error.set(null);
    
    forkJoin({
      users: this.userService.listar(),
      puestos: this.workstationService.listar()
    }).subscribe({
      next: ({ users, puestos }) => {
        // Guardar workstations para uso posterior
        this.workstations = puestos as WorkStation[];
        this.updateBaseItems(
          mapToEmployees(users as User[], puestos as WorkStation[])
        );
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Error cargando empleados');
        this.msg.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No se pudieron cargar empleados' 
        });
      }
    });
  }

  // Método específico para agregar empleado (cuando se crea uno nuevo)
  // Refrescamos la lista completa para asegurar sincronización
  addEmployee(emp: Employee) {
    console.log('Agregando empleado al store:', emp); // Para debug
    // En lugar de agregar manualmente, refrescamos la lista completa
    // Esto asegura que todos los datos estén actualizados y sincronizados
    this.load();
  }

  // Método para verificar si un empleado se puede eliminar (siempre devuelve true ya que manejaremos la liberación automáticamente)
  canDeleteEmployee(employeeId: number): boolean {
    return true; // Permitir eliminación siempre, manejaremos la liberación del puesto automáticamente
  }

  // Método para liberar puesto de trabajo de un empleado
  private liberarPuestoDeEmpleado(employeeId: number): Observable<any> {
    const workstations = this.workstations;
    const workstation = workstations.find((ws: WorkStation) => ws.usuarioId === employeeId);
    
    if (workstation) {
      // Liberar el puesto actualizando usuarioID a null
      const updatePayload = {
        iD_Puesto: workstation.id,
        ubicacion: workstation.ubicacion,
        estado: (workstation.status === EntityStatus.Activo ? 'activo' : 'inactivo') as 'activo' | 'inactivo',
        usuarioID: null, // Liberar el puesto
        equipoID: workstation.equipoId
      };
      
      return this.workstationService.editar(workstation.id, updatePayload);
    }
    
    // Si no tiene puesto asignado, devolver un observable que complete inmediatamente
    return of(null);
  }

  // Método para dar de baja empleado (eliminar del backend)
  deleteEmployee(employeeId: number) {
    this.loading.set(true);
    
    // Primero liberar el puesto si lo tiene, luego eliminar el empleado
    this.liberarPuestoDeEmpleado(employeeId).pipe(
      switchMap(() => this.userService.eliminar(employeeId))
    ).subscribe({
      next: () => {
        // Actualizar la lista local removiendo el empleado eliminado
        const employees = this.baseItemsSig();
        const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
        
        this.updateBaseItems(updatedEmployees);
        this.loading.set(false);
        
        this.msg.add({ 
          severity: 'success', 
          summary: 'Empleado eliminado', 
          detail: 'El empleado ha sido eliminado exitosamente y su puesto de trabajo ha sido liberado automáticamente' 
        });
      },
      error: (error: any) => {
        this.loading.set(false);
        console.error('Error al eliminar empleado:', error);
        
        let errorMessage = 'No se pudo eliminar el empleado.';
        
        // Manejar diferentes tipos de errores
        if (error.status === 500) {
          // Verificar si es un error de foreign key constraint
          if (error.error && typeof error.error === 'string' && 
              error.error.includes('FK_Puestos_Usuarios_UsuarioID')) {
            errorMessage = 'No se puede eliminar este empleado porque tiene un puesto de trabajo asignado. Primero debe eliminar o reasignar su puesto de trabajo.';
          } else if (error.error && typeof error.error === 'string' && 
                     error.error.includes('REFERENCE constraint')) {
            errorMessage = 'No se puede eliminar este empleado porque tiene datos asociados en el sistema.';
          } else {
            errorMessage = 'Error interno del servidor. Contacte al administrador.';
          }
        } else if (error.status === 404) {
          errorMessage = 'Empleado no encontrado.';
        } else if (error.status === 400) {
          errorMessage = 'Solicitud inválida.';
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        
        this.msg.add({ 
          severity: 'error', 
          summary: 'Error al eliminar empleado', 
          detail: errorMessage,
          life: 7000 // Mostrar el error por más tiempo para que pueda leerlo
        });
      }
    });
  }

  // Alias para compatibilidad con el componente existente
  employees() {
    return this.items();
  }

  // Método para actualizar un empleado en el store
  updateEmployee(employee: Employee) {
    this.updateItem(employee);
  }
}