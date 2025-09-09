import { User } from '@core/interfaces/user.interface';
import { WorkStation } from '@core/interfaces/workstation.interface';

export type MappedUser = User & { puesto?: string; estado?: string; selected?: boolean };

export const plantaMap: Record<string, string> = {
  'subsuelo': 'SS',
  'planta baja': 'PB',
  'primer piso': 'PP'
};

export function getTreeSelectValue(selected: any): string | null {
  if (!selected) return null;
  if (typeof selected === 'object' && 'key' in selected && selected.key === 'all') return null;
  return typeof selected === 'object' && 'data' in selected ? selected.data : selected;
}

export function mapWorkstationsToEmployees(users: User[], workstations: WorkStation[]): MappedUser[] {
  const wsByUser: Record<number, WorkStation> = {};
  workstations.forEach(ws => { if (ws.usuarioID != null) wsByUser[ws.usuarioID] = ws; });
  return users.map(u => ({
    ...u,
    selected: false,
    puesto: wsByUser[u.iD_Usuario] ? wsByUser[u.iD_Usuario].ubicacion : '',
    estado: wsByUser[u.iD_Usuario] ? String(wsByUser[u.iD_Usuario].estado) : 'sin estado'
  }));
}

// Extrae un prefijo normalizado del puesto para comparar con plantaMap
export function normalizePuestoPrefix(puesto?: string): string {
  if (!puesto) return '';
  const p = puesto.toLowerCase();
  // ejemplos: 'ss-f1-02' -> 'ss', 'SS-F1-02' -> 'ss', '01' -> '01'
  const match = p.match(/^([a-z]{2,}|\d+)/); // toma letras al inicio o números
  return match ? match[0].toUpperCase() : '';
}

export function filterEmployees(
  employees: MappedUser[],
  options: { planta?: string | null; estado?: string | null; search?: string; plantaMap?: Record<string,string> }
): MappedUser[] {
  const plantaValue = getTreeSelectValue(options.planta);
  const estadoValue = getTreeSelectValue(options.estado);
  const search = options.search?.trim().toLowerCase() || '';

  return employees.filter(emp => {
    // planta: si plantaValue es null -> true
    let plantaMatch = true;
    if (plantaValue) {
      const expected = (options.plantaMap && options.plantaMap[plantaValue]) ? options.plantaMap[plantaValue].toUpperCase() : plantaValue.toUpperCase();
      const prefix = normalizePuestoPrefix(emp.puesto);
  plantaMatch = (prefix && prefix.startsWith(expected)) || (emp.puesto ? emp.puesto.toLowerCase().includes(plantaValue.toLowerCase()) : false);
    }

    const estadoMatch = estadoValue ? emp.estado === estadoValue : true;

    const searchMatch = search
      ? (emp.nombre?.toLowerCase().includes(search) || emp.email?.toLowerCase().includes(search) || emp.puesto?.toLowerCase().includes(search))
      : true;

    return plantaMatch && estadoMatch && searchMatch;
  });
}
