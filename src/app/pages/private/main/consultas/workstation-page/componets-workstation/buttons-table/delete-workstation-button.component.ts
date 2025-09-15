import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkStation } from '@core/interfaces/workstation.interface';
import { ConfirmationDialogComponent } from '@pages/private/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DeleteButtonComponent } from '@pages/private/shared/components/actions/delete-button/delete-button.component';

@Component({
  selector: 'app-delete-workstation-button',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmationDialogComponent,
    DeleteButtonComponent
  ],
  templateUrl: './delete-workstation.html'
})
export class DeleteWorkstationButtonComponent implements OnInit {
  @Input({ required: true }) workstation!: WorkStation;
  @Output() confirmDelete = new EventEmitter<WorkStation>();

  // Estado del diálogo de confirmación
  showDeleteDialog = false;

  constructor() {}

  ngOnInit() {
    // Abrir automáticamente el modal al inicializar
    this.openDeleteDialog();
  }

  openDeleteDialog() {
    this.showDeleteDialog = true;
  }

  onConfirmDelete() {
    this.confirmDelete.emit(this.workstation);
    this.showDeleteDialog = false;
  }

  onCancelDelete() {
    this.showDeleteDialog = false;
  }
}