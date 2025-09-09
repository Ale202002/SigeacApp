import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';

import { UserService } from '@core/services/user.service';

import { WorkStationService } from '@core/services/workstation.service';
import { User } from '@core/interfaces/user.interface';
import { WorkStation } from '@core/interfaces/workstation.interface';
import { mapWorkstationsToEmployees, filterEmployees, plantaMap, getTreeSelectValue } from '@pages/private/main/consultas/employee-page/utils/employee-utils/employee-utils';
export interface Employee {
    id: string;
    nombre: string;
    estado: string;
    correo: string;
    puesto: string;
    selected?: boolean;
}

@Component({
    standalone: true,
    selector: 'app-employee-table',
   
    imports: [TableModule, ToastModule, CommonModule, TagModule, ButtonModule, InputTextModule, CheckboxModule, FormsModule, TreeSelectModule],
    templateUrl: 'employee-table.component.html',
    providers: [MessageService]
})
export class EmployeeTableComponent implements OnInit {

    employees: (User & { selected?: boolean; puesto?: string; estado?: string })[] = [];
    workstations: WorkStation[] = [];
    allSelected: boolean = false;
    estados: any[] = [
        { key: 'all', label: 'Estados', data: 'null' },
        { key: '0-0', label: 'Activo', data: 'activo' },
        { key: '0-1', label: 'Inactivo', data: 'inactivo' }
    ];
    plantas: any[] = [
        { key: 'all', label: 'Plantas', data: 'null' },
        { key: '1-0', label: 'Primer piso', data: 'primer piso' },
        { key: '1-1', label: 'Planta baja', data: 'planta baja' },
        { key: '1-2', label: 'Subsuelo', data: 'subsuelo' }
    ];
    clonedEmployees: { [s: number]: User & { selected?: boolean; puesto?: string; estado?: string } } = {};
    selectedPlanta: string | null = null;
    selectedEstado: string | null = null;
    searchTerm: string = '';

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private workstationService: WorkStationService
    ) {}

    ngOnInit() {
        this.userService.listar().subscribe((data: User[]) => {
            // Mapear empleados con sus puestos usando la utilidad
            this.workstationService.listar().subscribe((puestos: WorkStation[]) => {
                this.workstations = puestos;
                this.employees = mapWorkstationsToEmployees(data, puestos);
            });
        });
    }

    private plantaMap = plantaMap;

    toggleAllSelection() {
        this.employees.forEach(emp => emp.selected = this.allSelected);
    }

    onRowSelectChange(rowIndex: number) {
        this.allSelected = this.employees.every(emp => emp.selected);
    }

    getTreeSelectValue(selected: any): string | null {
        return getTreeSelectValue(selected);
    }

    get filteredEmployees(): (User & { selected?: boolean; puesto?: string; estado?: string })[] {
    return filterEmployees(this.employees as any, { planta: this.selectedPlanta, estado: this.selectedEstado, search: this.searchTerm, plantaMap: this.plantaMap });
}

    onRowEditInit(employee: User & { selected?: boolean; puesto?: string; estado?: string }) {
        this.clonedEmployees[employee.iD_Usuario] = { ...employee };
    }

    onRowEditSave(employee: User & { selected?: boolean; puesto?: string; estado?: string }) {
        delete this.clonedEmployees[employee.iD_Usuario];
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado actualizado' });
    }

    onRowEditCancel(employee: User & { selected?: boolean; puesto?: string; estado?: string }, index: number) {
        this.employees[index] = this.clonedEmployees[employee.iD_Usuario];
        delete this.clonedEmployees[employee.iD_Usuario];
    }

    getEstadoTagColor(estado: string) {
        switch (estado) {
            case 'activo':
                return 'success';
            case 'inactivo':
                return 'danger';
            default:
                return 'info';
        }
    }
}
