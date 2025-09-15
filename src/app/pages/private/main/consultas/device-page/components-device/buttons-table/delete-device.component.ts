import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';

import { Device } from '@core/interfaces/device.interface';
import { DeviceTableStore } from '../store/device-table.store';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  standalone: true,
  selector: 'app-delete-device-button',
  imports: [CommonModule, ConfirmationDialogComponent],
  templateUrl: './delete-device.html',
  providers: [ConfirmationService]
})
export class DeleteDeviceButtonComponent {
  @Input({ required: true }) device!: Device;
  @Output() deviceDeleted = new EventEmitter<Device>();
  
  private store = inject(DeviceTableStore, { optional: true });
  private confirmationService = inject(ConfirmationService);

  showConfirmation = false;

  onDeleteClick(): void {
    this.showConfirmation = true;
  }

  onConfirmDelete(): void {
    this.showConfirmation = false;
    
    if (this.store) {
      this.store.deleteDevice(this.device.id);
      this.deviceDeleted.emit(this.device);
    } else {
      console.error('DeviceTableStore no está disponible');
    }
  }

  onCancelDelete(): void {
    this.showConfirmation = false;
  }
}