import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { WorkStationService } from '@core/services/workstation.service';
import { UserService } from '@core/services/user.service';
import { WorkStationCreateDto } from '@core/interfaces/Dtos/workstationDto.interface';
import { WorkStation } from '@core/interfaces/workstation.interface';
import { User } from '@core/interfaces/user.interface';

@Component({
  standalone: true,
  selector: 'app-new-workstation',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ToastModule],
  templateUrl: './new-workstation.component.html',
  providers: [MessageService]
})
export class NewWorkstationComponent implements OnInit {

  @Output() workstationCreated = new EventEmitter<WorkStation>();

  show = false;
  saving = false;

  form!: FormGroup;

  // Opciones para los dropdowns
  plantasOptions = [
    { label: 'SS', value: 'SS' },
    { label: 'PB', value: 'PB' },
    { label: 'P1', value: 'P1' }
  ];

  empleadosOptions: any[] = []; // Se cargarán solo empleados sin puesto
  equiposOptions = [
    { label: '18', value: 18 },
    { label: '19', value: 19 },
    { label: '20', value: 20 },
    { label: '21', value: 21 },
    { label: '22', value: 22 }
  ];

  constructor(
    private fb: FormBuilder,
    private workstationService: WorkStationService,
    private userService: UserService,
    private msg: MessageService
  ) {
    this.form = this.fb.group({
      puesto: ['', [Validators.required, Validators.minLength(3)]],
      planta: ['', [Validators.required]],
      empleado: [''],
      equipo: [''],
      fecha: [new Date(), [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadEmpleados();
  }

  loadEmpleados() {
    this.userService.listar().subscribe({
      next: (users: User[]) => {
        // TODO: Filtrar empleados sin puesto cuando tengamos esa información
        this.empleadosOptions = users.map(user => ({
          label: `${user.nombre} ${user.apellido}`,
          value: user.id
        }));
      },
      error: () => {
        this.msg.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los empleados'
        });
      }
    });
  }

  open() {
    this.form.reset();
    this.form.patchValue({ 
      fecha: new Date()
    });
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

    const formValue = this.form.value;

    const payload: WorkStationCreateDto = {
      ubicacion: formValue.puesto,
      estado: 'activo', // Por defecto activo
      usuarioID: formValue.empleado || null // Empleado seleccionado o null
    };

    this.workstationService.crear(payload).subscribe({
      next: (workstation) => {
        // console.log('Puesto creado desde backend:', workstation);
        
        this.workstationCreated.emit(workstation);
        this.msg.add({ 
          severity: 'success', 
          summary: 'Registrado', 
          detail: 'Puesto de trabajo creado correctamente' 
        });
        this.saving = false;
        this.show = false;
      },
      error: (err) => {
        // console.log('Crear puesto error =>', err);
        
        let errorMessage = 'No se pudo crear el puesto de trabajo';
        
        if (err.status === 400) {
          if (err.error?.errors) {
            const validationErrors = err.error.errors;
            if (validationErrors.ubicacion) {
              errorMessage = `Ubicación: ${validationErrors.ubicacion.join(', ')}`;
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
          summary: 'Error', 
          detail: errorMessage,
          life: 5000
        });
        this.saving = false;
      }
    });
  }

  f(c: string) { 
    return this.form.get(c); 
  }
}
