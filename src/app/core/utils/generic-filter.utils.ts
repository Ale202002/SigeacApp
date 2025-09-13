import { EntityStatus } from '@core/enums/options-enums/EntityStatus.enum';
import { Plant } from '@core/enums/options-enums/Plant.enum';

export interface BaseFilter {
  status: EntityStatus | null;
  plant: Plant | null;
  search: string;
}

export function applyBaseFilters<
  T extends { status?: EntityStatus; plant?: Plant | null; searchIndex?: string }
>(list: T[], f: BaseFilter): T[] {
  const term = f.search?.trim().toLowerCase() || '';
  return list.filter(item => {
    if (f.status && item.status && item.status !== f.status) return false;
    if (f.plant && item.plant && item.plant !== f.plant) return false;
    if (term) {
      const idx = (item.searchIndex || '').toLowerCase();
      if (!idx.includes(term)) return false;
    }
    return true;
  });
}