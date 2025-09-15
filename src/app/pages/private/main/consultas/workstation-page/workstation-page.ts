import { Component } from '@angular/core';
import { WorkstationTableComponent } from './componets-workstation';

@Component({
  standalone: true,
  selector: 'app-workstation-page',
  imports: [WorkstationTableComponent],
  templateUrl: './workstation-page.html',
})
export class WorkstationPageComponent { }
