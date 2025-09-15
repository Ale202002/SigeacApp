import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Employee } from '@core/models/employee.model';
import { ConfirmationDialogComponent } from '@pages/private/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DeleteButtonComponent } from '@pages/private/shared/components/actions/delete-button/delete-button.component';

@Component({
  selector: 'app-delete-employee-button',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmationDialogComponent,
    DeleteButtonComponent
  ],
  templateUrl: './delete-employee.html'
})
export class DeleteEmployeeButtonComponent {
  @Input({ required: true }) employee!: Employee;
  @Output() confirmDelete = new EventEmitter<Employee>();

  // Estado del diálogo de confirmación
  showDeleteDialog = false;

  constructor() {}

  openDeleteDialog() {
    this.showDeleteDialog = true;
  }

  onConfirmDelete() {
    this.confirmDelete.emit(this.employee);
    this.showDeleteDialog = false;
  }

  onCancelDelete() {
    this.showDeleteDialog = false;
  }
}