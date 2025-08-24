import {  Component} from '@angular/core';
import { TableComponent } from "../../components/table-component/table.component";


@Component({
  standalone: true,
  selector: 'app-employee-page',
  imports: [TableComponent],
  templateUrl: './employee-page.component.html',
  
})


export default class EmployeePageComponent { }
  

