export interface SearchableEntity {
  searchIndex: string;
}

export function buildSearchIndex(parts: (string | number | null | undefined)[]): string {
  return parts
    .filter(v => v !== null && v !== undefined && `${v}`.trim() !== '')
    .map(v => `${v}`.toLowerCase())
    .join(' ');
}