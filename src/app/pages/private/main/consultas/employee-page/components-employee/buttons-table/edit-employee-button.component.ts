import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

import { Employee } from '@core/models/employee.model';
import { UserService } from '@core/services/user.service';
import { buildSearchIndex } from '@core/utils/search.utils';
import { EditButtonComponent } from '@pages/private/shared/components/actions/edit-button/edit-button.component';

@Component({
  selector: 'app-edit-employee-button',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TooltipModule,
    EditButtonComponent
  ],
  templateUrl: './edit-employee.html',
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class EditEmployeeButtonComponent {
  @Input({ required: true }) employee!: Employee;
  @Output() employeeUpdated = new EventEmitter<Employee>();

  show = signal(false);
  saving = signal(false);
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private msg: MessageService
  ) {
    this.form = this.fb.group({
      nombreApellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  openEditDialog() {
    // Llenar el formulario con los datos actuales del empleado
    this.form.patchValue({
      nombreApellido: this.employee.nombre,
      dni: this.employee.dni,
      email: this.employee.correo
    });
    this.show.set(true);
  }

  cancel() {
    this.show.set(false);
    this.form.reset();
    this.form.markAsUntouched();
    this.saving.set(false);
  }

  submit() {
    if (this.form.invalid) return;
    
    this.saving.set(true);
    this.updateEmployee();
  }

  private updateEmployee() {
    const { nombreApellido, dni, email } = this.form.value;
    const parts = (nombreApellido || '').trim().split(/\s+/);
    const nombre = parts.shift() || '';
    const apellido = parts.join(' ');

    // Obtener la contraseña actual usando el endpoint listar
    this.userService.listar().subscribe({
      next: (users) => {
        const currentUser = users.find(u => u.id === this.employee.id);
        
        // Payload con la contraseña actual preservada
        const payload = {
          iD_Usuario: this.employee.id,
          nombre,
          apellido,
          dni: dni!,
          email: email!,
          contrasena: (currentUser as any)?.contrasena || "Temporal123"
        };

        // Llamar al servicio para actualizar en la base de datos
        this.userService.modificar(this.employee.id, payload).subscribe({
          next: (updatedUser) => {
            // Si el backend no devuelve los datos actualizados, usar los del payload
            const nombre = updatedUser?.nombre || payload.nombre;
            const apellido = updatedUser?.apellido || payload.apellido;
            const dni = updatedUser?.dni || payload.dni;
            const email = updatedUser?.email || payload.email;
            
            // Construir el empleado actualizado con los datos actualizados
            const updatedEmployee: Employee = {
              ...this.employee,
              nombre: `${nombre} ${apellido}`.trim(),
              dni: dni,
              correo: email,
              searchIndex: buildSearchIndex([
                nombre, 
                apellido, 
                email, 
                this.employee.puestoUbicacion, 
                this.employee.status, 
                this.employee.plant
              ])
            };
            
            this.employeeUpdated.emit(updatedEmployee);
            this.msg.add({ 
              severity: 'success', 
              summary: 'Actualizado', 
              detail: 'Se actualizo los datos del usuario' 
            });
            this.saving.set(false);
            this.show.set(false);
            this.form.reset();
          },
          error: (err) => {
            this.handleUpdateError(err);
          }
        });
      },
      error: (err) => {
        this.msg.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No se pudieron obtener los datos de usuarios',
          life: 5000
        });
        this.saving.set(false);
      }
    });
  }

  private handleUpdateError(err: any) {
    let errorMessage = 'No se pudo actualizar el empleado.';
    
    if (err.status === 404) {
      errorMessage = 'Empleado no encontrado.';
    } else if (err.status === 400) {
      // Manejar errores de validación específicos
      if (err.error?.errors) {
        const validationErrors = err.error.errors;
        const errorMessages = [];
        
        // Revisar errores específicos de cada campo
        if (validationErrors.nombre) {
          errorMessages.push(`Nombre: ${validationErrors.nombre.join(', ')}`);
        }
        if (validationErrors.apellido) {
          errorMessages.push(`Apellido: ${validationErrors.apellido.join(', ')}`);
        }
        if (validationErrors.dni) {
          errorMessages.push(`DNI: ${validationErrors.dni.join(', ')}`);
        }
        if (validationErrors.email) {
          errorMessages.push(`Email: ${validationErrors.email.join(', ')}`);
        }
        if (validationErrors.iD_Usuario) {
          errorMessages.push(`ID Usuario: ${validationErrors.iD_Usuario.join(', ')}`);
        }
        
        if (errorMessages.length > 0) {
          errorMessage = `Errores de validación:\n${errorMessages.join('\n')}`;
        } else {
          errorMessage = 'Datos inválidos. Verifique la información ingresada.';
        }
      } else {
        errorMessage = 'Datos inválidos. Verifique la información ingresada.';
      }
    } else if (err.status === 409) {
      errorMessage = 'El DNI o email ya están en uso por otro usuario.';
    } else if (err.error?.message) {
      errorMessage = err.error.message;
    }
    
    this.msg.add({ 
      severity: 'error', 
      summary: 'Error al actualizar', 
      detail: errorMessage,
      life: 7000
    });
    this.saving.set(false);
  }

  f(controlName: string) { 
    return this.form.get(controlName); 
  }
}