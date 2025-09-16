import { Component, EventEmitter, Input, Output, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

import { WorkStation } from '@core/interfaces/workstation.interface';
import { WorkStationService } from '@core/services/workstation.service';
import { UserService } from '@core/services/user.service';
import { DeviceService } from '@core/services/device.service';
import { WorkStationUpdateDto } from '@core/interfaces/Dtos/workstationDto.interface';
import { User } from '@core/interfaces/user.interface';
import { Device } from '@core/interfaces/device.interface';
import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';
import { EditButtonComponent } from '@pages/private/shared/components/actions/edit-button/edit-button.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-workstation-button',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TooltipModule,
    EditButtonComponent
  ],
  templateUrl: './edit-workstation.html',
  providers: [MessageService],
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class EditWorkstationButtonComponent implements OnInit {
  @Input({ required: true }) workstation!: WorkStation;
  @Output() workstationUpdated = new EventEmitter<WorkStation>();

  show = signal(false);
  saving = signal(false);
  form: FormGroup;
  
  // Listas para los dropdowns
  empleados: User[] = [];
  equipos: Device[] = [];

  constructor(
    private fb: FormBuilder,
    private workstationService: WorkStationService,
    private userService: UserService,
    private deviceService: DeviceService,
    private msg: MessageService
  ) {
    this.form = this.fb.group({
      ubicacion: ['', [Validators.required, Validators.minLength(2)]],
      planta: ['', [Validators.required]],
      empleado: [''],
      equipo: [''],
      fecha: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadEmpleados();
    this.loadEquipos();
    // Abrir automáticamente el modal al inicializar
    this.openEditDialog();
  }

  loadEmpleados() {
    this.userService.listar().subscribe({
      next: (users) => {
        this.empleados = users;
      },
      error: (error) => {
        console.error('Error loading empleados:', error);
      }
    });
  }

  loadEquipos() {
    this.deviceService.listar().subscribe({
      next: (devices) => {
        this.equipos = devices;
      },
      error: (error) => {
        console.error('Error loading equipos:', error);
      }
    });
  }

  openEditDialog() {
    // Llenar el formulario con los datos actuales del puesto
    const fechaActual = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
    
    this.form.patchValue({
      ubicacion: this.workstation.ubicacion,
      planta: this.workstation.plant || '',
      empleado: this.workstation.usuarioId || '',
      equipo: this.workstation.equipoId || '',
      fecha: fechaActual,
      estado: this.workstation.status === EntityStatus.Activo ? 'activo' : 'inactivo'
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
    this.updateWorkstation();
  }

  private updateWorkstation() {
    const { ubicacion, empleado, equipo, estado } = this.form.value;

    const payload: WorkStationUpdateDto = {
      iD_Puesto: this.workstation.id,
      ubicacion: ubicacion!,
      estado: estado!,
      usuarioID: empleado || null,
      equipoID: equipo || null
    };

    this.workstationService.editar(this.workstation.id, payload).subscribe({
      next: (updatedWorkstation) => {
        this.workstationUpdated.emit(updatedWorkstation);
        this.msg.add({ 
          severity: 'success', 
          summary: 'Actualizado', 
          detail: 'Se actualizaron los datos del puesto de trabajo' 
        });
        this.saving.set(false);
        this.show.set(false);
        this.form.reset();
      },
      error: (err) => {
        this.handleUpdateError(err);
      }
    });
  }

  private handleUpdateError(err: HttpErrorResponse) {
  let errorMessage = 'No se pudo actualizar el puesto de trabajo.';

  if (err.status === 404) {
    errorMessage = 'Puesto de trabajo no encontrado.';
  } else if (err.status === 400) {
    if (err.error?.errors) {
      const validationErrors = err.error.errors;
      const errorMessages = [];

      if (validationErrors.ubicacion) {
        errorMessages.push(`Ubicación: ${validationErrors.ubicacion.join(', ')}`);
      }
      if (validationErrors.estado) {
        errorMessages.push(`Estado: ${validationErrors.estado.join(', ')}`);
      }
      if (validationErrors.iD_Puesto) {
        errorMessages.push(`ID Puesto: ${validationErrors.iD_Puesto.join(', ')}`);
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
    errorMessage = 'Ya existe un puesto con esa ubicación.';
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