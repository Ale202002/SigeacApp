import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Device } from '@core/interfaces/device.interface';

@Component({
  standalone: true,
  selector: 'app-edit-device-button',
  imports: [CommonModule],
  templateUrl: './edit-device.html'
})
export class EditDeviceButtonComponent {
  @Input({ required: true }) device!: Device;
  @Output() deviceEdit = new EventEmitter<Device>();

  onEditClick(): void {
    this.deviceEdit.emit(this.device);
    console.log('Edit device:', this.device);
    // TODO: Abrir modal de edición cuando esté implementado
  }
}