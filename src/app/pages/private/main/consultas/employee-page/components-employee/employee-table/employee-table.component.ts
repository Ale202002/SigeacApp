import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';

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
    templateUrl: './employee-table.component.html',
    providers: [MessageService]
})
export class EmployeeTableComponent implements OnInit {
    employees: Employee[] = [
        { id: '1', nombre: 'Leandro Martin Silva', estado: 'activo', correo: 'Lsilva@encodelabs.com.ar', puesto: 'Primer Piso', selected: false },
        { id: '2', nombre: 'Matias Juri', estado: 'inactivo', correo: 'Mjuri@encodelabs.com', puesto: 'Planta Baja', selected: false }
    ];

    allSelected: boolean = false;

        estados: any[] = [
            {
                key: '0',
                label: 'Estados',
                children: [
                    { key: '0-0', label: 'Activo', data: 'activo' },
                    { key: '0-1', label: 'Inactivo', data: 'inactivo' }
                ]
            }
        ];

        plantas: any[] = [
            {
                key: '1',
                label: 'Plantas',
                children: [
                    { key: '1-0', label: 'Primer piso', data: 'primer piso' },
                    { key: '1-1', label: 'Planta baja', data: 'planta baja' },
                    { key: '1-2', label: 'Subsuelo', data: 'subsuelo' }
                ]
            }
        ];

    clonedEmployees: { [s: string]: Employee } = {};
    selectedPlanta: string | null = null;
    selectedEstado: string | null = null;
    searchTerm: string = '';

    toggleAllSelection() {
        this.employees.forEach(emp => emp.selected = this.allSelected);
    }

    onRowSelectChange(rowIndex: number) {
        this.allSelected = this.employees.every(emp => emp.selected);
    }

    constructor(private messageService: MessageService) {}

    ngOnInit() {}

    getTreeSelectValue(selected: any): string | null {
        return selected && typeof selected === 'object' && 'data' in selected ? selected.data : selected;
    }

    get filteredEmployees(): Employee[] {
        return this.employees.filter(emp => {
            const plantaValue = this.getTreeSelectValue(this.selectedPlanta);
            const estadoValue = this.getTreeSelectValue(this.selectedEstado);
            const plantaMatch = plantaValue ? emp.puesto === plantaValue : true;
            const estadoMatch = estadoValue ? emp.estado === estadoValue : true;
            const search = this.searchTerm.trim().toLowerCase();
            const searchMatch = search
                ? (emp.nombre?.toLowerCase().includes(search) ||
                     emp.correo?.toLowerCase().includes(search) ||
                     emp.puesto?.toLowerCase().includes(search))
                : true;
            return plantaMatch && estadoMatch && searchMatch;
        });
    }

    onRowEditInit(employee: Employee) {
        this.clonedEmployees[employee.id] = { ...employee };
    }

    onRowEditSave(employee: Employee) {
        delete this.clonedEmployees[employee.id];
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado actualizado' });
    }

    onRowEditCancel(employee: Employee, index: number) {
        this.employees[index] = this.clonedEmployees[employee.id];
        delete this.clonedEmployees[employee.id];
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
