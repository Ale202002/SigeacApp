# Shared Components

Esta carpeta contiene componentes reutilizables para todas las páginas de consultas (Employee, Device, WorkStation, Component, Peripherals).

## Estructura

```
pages/private/shared/components/
├── generic-filters/          # Filtros reutilizables (estado, planta, búsqueda)
├── generic-table/           # Tabla con checkbox, loading, acciones
├── generic-modal/           # Modal forms configurables
├── status-components/       # Chips de estado, plantas, etc.
└── stores/                  # BaseStore pattern para signals + CRUD
```

## Beneficios

✅ **DRY**: No duplicar filters/list/store en cada módulo
✅ **Consistency**: Misma UX en todos los módulos  
✅ **Maintainability**: Cambios en un lugar se aplican a todos
✅ **Type Safety**: Generics para Employee, Device, WorkStation, etc.

## Uso

### Con Path Mapping `@shared/*` ✅

```typescript
// device-page.ts
import { BaseTableStore } from '@shared/components/stores/base-table.store';
import { DeviceStore } from '@shared/components/stores/device.store';

// O usando barrel exports:
import { 
  GenericTableComponent, 
  GenericFiltersComponent,
  BaseTableStore 
} from '@shared';

@Component({
  template: `
    <app-generic-filters
      [estados]="store.estados"
      [plantas]="store.plantas"
      (statusChange)="store.setStatus($event)"
      (plantChange)="store.setPlant($event)"
      (searchChange)="store.setSearch($event)">
    </app-generic-filters>

    <app-generic-table
      [items]="store.items()"
      [columns]="deviceColumns"
      [loading]="store.loading()"
      [totalRecords]="store.totalRecords()"
      [paginate]="true"
      [rows]="10"
      [rowsPerPageOptions]="[5, 10, 25, 50]"
      (pageChange)="store.onPageChange($event)"
      (itemEdit)="onDeviceEdit($event)"
      (itemDelete)="onDeviceDelete($event)">
    </app-generic-table>
  `
})
export class DevicePageComponent {
  constructor(public store: DeviceStore) {
    store.load();
  }
}
```