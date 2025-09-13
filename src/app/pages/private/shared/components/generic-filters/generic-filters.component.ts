import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterOption } from '@core/constants/filter-options.const';

@Component({
  standalone: true,
  selector: 'app-generic-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './generic-filters.component.html',
})
export class GenericFiltersComponent {
  @Input() estados: FilterOption[] = [];
  @Input() plantas: FilterOption[] = [];

  @Input() searchTerm = '';
  @Input() selectedEstado: FilterOption | null = null;
  @Input() selectedPlanta: FilterOption | null = null;

  @Output() filtersChange = new EventEmitter<{search: string, status: any, plant: any}>();
  @Output() clear = new EventEmitter<void>();
  @Output() reload = new EventEmitter<void>();

  onSearchChange() {
    this.emitFiltersChange();
  }

  onEstadoChange(option: FilterOption | null) {
    this.selectedEstado = option;
    this.emitFiltersChange();
  }

  onPlantaChange(option: FilterOption | null) {
    this.selectedPlanta = option;
    this.emitFiltersChange();
  }

  private emitFiltersChange() {
    this.filtersChange.emit({
      search: this.searchTerm,
      status: this.selectedEstado?.data || null,
      plant: this.selectedPlanta?.data || null
    });
  }

  onClear() {
    this.searchTerm = '';
    this.selectedEstado = null;
    this.selectedPlanta = null;
    this.clear.emit();
  }

  onReload() {
    this.reload.emit();
  }
}