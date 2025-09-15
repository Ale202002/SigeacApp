import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { UserService } from '@core/services/user.service';
import { UserCreateDto } from '@core/interfaces/Dtos/userDto.interface';
import { Employee } from '@core/models/employee.model';
import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';
import { buildSearchIndex } from '@core/utils/search.utils';

@Component({
  standalone: true,
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ToastModule],
  providers: [MessageService]
})
export class NewEmployeeComponent {

  @Output() employeeCreated = new EventEmitter<Employee>();

  show = false;
  saving = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private msg: MessageService
  ) {
    this.form = this.fb.group({
      nombreApellido: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  open() {
    this.form.reset();
    this.show = true;
  }

  close() {
    if (this.saving) return;
    this.show = false;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.createEmployee();
  }

  private createEmployee() {
    const { nombreApellido, dni, email } = this.form.value;

    const parts = (nombreApellido || '').trim().split(/\s+/);
    const nombre = parts.shift() || '';
    const apellido = parts.join(' ');

    const payload: UserCreateDto = {
      nombre,
      apellido,
      dni: dni!,
      email: email!
    };

    this.userService.crear(payload).subscribe({
      next: (newUser) => {
        const newEmployee: Employee = {
          id: newUser.id,
          nombre: `${newUser.nombre} ${newUser.apellido}`.trim(),
          dni: newUser.dni,
          correo: newUser.email,
          puestoId: null,
          puestoUbicacion: 'Sin asignar',
          status: EntityStatus.Activo,
          plant: null,
          selected: false,
          searchIndex: buildSearchIndex([
            newUser.nombre, 
            newUser.apellido, 
            newUser.email, 
            'Sin asignar', 
            EntityStatus.Activo, 
            'Sin asignar'
          ])
        };
        
        this.employeeCreated.emit(newEmployee);
        this.msg.add({ 
          severity: 'success', 
          summary: 'Creado', 
          detail: 'Empleado creado correctamente' 
        });
        this.saving = false;
        this.show = false;
      },
      error: (err) => {
        this.handleCreateError(err);
      }
    });
  }

  private handleCreateError(err: any) {
    let errorMessage = 'No se pudo crear el empleado.';
    
    if (err.status === 409) {
      errorMessage = 'Ya existe un empleado con ese DNI o correo electrónico.';
    } else if (err.status === 400) {
      if (err.error?.errors) {
        const validationErrors = err.error.errors;
        const errorMessages = [];
        
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
        
        if (errorMessages.length > 0) {
          errorMessage = `Errores de validación:\n${errorMessages.join('\n')}`;
        }
      }
    } else if (err.error?.message) {
      errorMessage = err.error.message;
    }
    
    this.msg.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: errorMessage,
      life: 5000
    });
    this.saving = false;
  }

  f(c: string) { 
    return this.form.get(c); 
  }
}