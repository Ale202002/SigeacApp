import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceTableComponent } from './components-device/device-table/device-table.component';

@Component({
  standalone: true,
  selector: 'app-device-page',
  imports: [CommonModule, DeviceTableComponent],
  templateUrl: './device-page.html',
})
export class DevicePageComponent { }