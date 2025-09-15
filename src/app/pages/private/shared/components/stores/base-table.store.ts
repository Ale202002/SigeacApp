import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';
import { Plant } from '@core/enums/options-enums/Plant.enum';
import { STATUS_OPTIONS, PLANT_OPTIONS } from '@core/constants/table-filters.const';
import { FilterOption } from '@core/constants/filter-options.const';
import { applyBaseFilters, BaseFilter } from '@core/utils/generic-filter.utils';
import { SearchableEntity } from '@core/utils/search.utils';
import { resolvePlantFromCode } from '@core/constants/plant-prefix.map';
import { SelectableItem } from '../generic-table/generic-table';

// Interface que deben implementar los servicios CRUD
export interface CrudService<T, CreateDto, UpdateDto> {
  listar(): Observable<T[]>;
  buscar(id: number): Observable<T>;
  crear(payload: CreateDto): Observable<T>;
  actualizar?(id: number, payload: UpdateDto): Observable<T>; // algunos servicios usan 'actualizar'
  editar?(id: number, payload: UpdateDto): Observable<T>;     // otros usan 'editar'
  eliminar(id: number): Observable<void>;
}

// Interface que deben implementar los items que usan esta store
export interface BaseTableItem extends SelectableItem, SearchableEntity {
  status?: EntityStatus;
  plant?: Plant | null;
}

@Injectable()
export abstract class BaseTableStore<T extends BaseTableItem> {

  // Signals principales
  protected baseItemsSig = signal<T[]>([]);
  protected filterSig = signal<BaseFilter>({ status: null, plant: null, search: '' });

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  
  // Paginación
  readonly currentPage = signal(0);
  readonly rowsPerPage = signal(10);
  readonly totalRecords = computed(() => this.items().length);

  // Computed values
  readonly items = computed(() =>
    applyBaseFilters(this.baseItemsSig(), this.filterSig())
  );
  
  readonly allSelected = computed(() => {
    const list = this.items();
    return list.length > 0 && list.every(item => item.selected);
  });

  // Opciones de filtros
  readonly plantas: FilterOption[] = PLANT_OPTIONS
    .filter(o => o.label.toLowerCase() !== 'plantas')
    .map(o => ({ key: `plant_${o.data}`, label: o.label, data: o.data }));

  readonly estados: FilterOption[] = STATUS_OPTIONS
    .filter(o => o.label.toLowerCase() !== 'estados')
    .map(o => ({ key: `status_${o.data}`, label: o.label, data: o.data }));

  constructor(protected msg: MessageService) {}

  // Métodos abstractos que deben implementar las clases derivadas
  abstract load(): void;

  // Métodos comunes
  refresh() { 
    this.load(); 
  }

  setSearch(term: string) {
    this.filterSig.update(f => ({ ...f, search: term }));
  }

  setPlant(plant: Plant | null) {
    this.filterSig.update(f => ({ ...f, plant }));
  }

  setStatus(status: EntityStatus | null) {
    this.filterSig.update(f => ({ ...f, status }));
  }

  clearFilters() {
    this.filterSig.set({ status: null, plant: null, search: '' });
  }

  // Métodos de selección
  toggleAll(select: boolean) {
    this.baseItemsSig.update(items => {
      items.forEach(item => item.selected = select);
      return [...items];
    });
  }

  toggleRow(row: T) {
    this.baseItemsSig.update(items => {
      const item = items.find(i => i.id === row.id);
      if (item) {
        item.selected = !item.selected;
      }
      return [...items];
    });
  }

  // Métodos de paginación
  onPageChange(event: any) {
    this.currentPage.set(event.page);
    this.rowsPerPage.set(event.rows);
  }

  // Métodos helper
  getSelectedItems(): T[] {
    return this.items().filter(item => item.selected);
  }

  getSelectedCount(): number {
    return this.getSelectedItems().length;
  }

  // Método para actualizar items base (para stores que lo necesiten)
  protected updateBaseItems(items: T[]) {
    this.baseItemsSig.set(items);
  }

  // Método para actualizar un item específico
  updateItem(updatedItem: T) {
    this.baseItemsSig.update(items => {
      const index = items.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        items[index] = { ...updatedItem };
      }
      return [...items];
    });
  }

  // Método para agregar un item
  addItem(newItem: T) {
    this.baseItemsSig.update(items => [...items, newItem]);
  }
}