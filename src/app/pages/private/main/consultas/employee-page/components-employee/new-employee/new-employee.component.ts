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

  form!: FormGroup; // inicializada en el constructor

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
      next: (user) => {
        console.log('Usuario creado desde backend:', user); // Para debug
        
        // Construir nombre completo de forma más segura
        const nombre = user.nombre || '';
        const apellido = user.apellido || '';
        const fullName = `${nombre} ${apellido}`.trim() || 'Sin nombre';
        
        const status = EntityStatus.Inactivo; // cambia a Activo si querés
        const searchIndex = buildSearchIndex([
          nombre,
          apellido,
          user.email,
          null,
          status,
          null
        ]);

        const empleado: Employee = {
          id: user.id,
          nombre: fullName,
          correo: user.email || '',
          puestoId: null,
          puestoUbicacion: null,
          status,
          plant: null,
          searchIndex,
          selected: false
        };

        console.log('Empleado mapeado para agregar:', empleado); // Para debug
        this.employeeCreated.emit(empleado);
        this.msg.add({ severity: 'success', summary: 'Registrado', detail: 'Empleado creado' });
        this.saving = false;
        this.show = false;
      },
      error: (err) => {
        console.log('Crear usuario error =>', err);  // <--- añade esto
    this.msg.add({ severity: 'error', summary: 'Error', detail: err?.error?.message || 'No se pudo crear' });
    this.saving = false;
      }
    });
  }

  f(c: string) { return this.form.get(c); }
}