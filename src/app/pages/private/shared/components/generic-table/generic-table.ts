import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { statusSeverity, statusLabel } from '@core/utils/status.helpers';

export interface TableColumn {
  field: string;
  header: string;
  width?: string;
  type?: 'text' | 'status' | 'custom';
}

export interface SelectableItem {
  id: number;
  selected?: boolean;
}

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, TableModule, CheckboxModule, PaginatorModule, FormsModule],
  templateUrl: './generic-table.html'
})
export class GenericTable<T extends SelectableItem> {
  @Input() items: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() loading = false;
  @Input() allSelected = false;
  @Input() showCheckboxes = true;
  @Input() showActions = true;
  @Input() emptyMessage = 'No hay registros.';
  
  // Paginación
  @Input() paginate = true;
  @Input() rows = 10;
  @Input() totalRecords = 0;
  @Input() rowsPerPageOptions = [5, 10, 25, 50];

  @Output() toggleAll = new EventEmitter<boolean>();
  @Output() rowToggle = new EventEmitter<T>();
  @Output() editItem = new EventEmitter<T>();
  @Output() deleteItem = new EventEmitter<T>();
  @Output() pageChange = new EventEmitter<PaginatorState>();

  // Paginación state
  first: number = 0;
  currentRows: number = 10;

  ngOnInit() {
    this.currentRows = this.rows;
  }

  onToggleAll(event: any) {
    this.toggleAll.emit(event.checked);
  }

  onRowToggle(item: T) {
    this.rowToggle.emit(item);
  }

  onEdit(item: T) {
    this.editItem.emit(item);
  }

  onDelete(item: T) {
    this.deleteItem.emit(item);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.currentRows = event.rows ?? 10;
    this.pageChange.emit(event);
  }

  // Computed para items paginados
  get paginatedItems(): T[] {
    if (!this.paginate) return this.items;
    const start = this.first;
    const end = start + this.currentRows;
    return this.items.slice(start, end);
  }

  getFieldValue(item: T, field: string): any {
    const keys = field.split('.');
    let value: any = item;
    for (const key of keys) {
      value = value?.[key];
    }
    return value;
  }

  getStatusSeverity(item: T, field: string): string {
    const value = this.getFieldValue(item, field);
    return statusSeverity(value);
  }

  getStatusLabel(item: T, field: string): string {
    const value = this.getFieldValue(item, field);
    return statusLabel(value);
  }
}