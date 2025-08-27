import {  Component} from '@angular/core';
import { EmployeeTableComponent } from "./components-employee/employee-table/employee-table.component";



@Component({
  standalone: true,
  selector: 'app-employee-page',
  imports: [ EmployeeTableComponent],
  templateUrl: './employee-page.component.html',
  
})


export class EmployeePageComponent {
 
}