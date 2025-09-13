// DTO crudo (forma backend)
export interface ComponentDto {
  iD_Componente: number;
  tipo: string;             // backend envía string ("Procesador", etc.)
  nombre: string;
  estado: string;           // "Activo" | "Inactivo" (casing variable)
  equipoID: number;
  equipo?: any | null;      // puedes tipar luego si necesitas
}

// Crear (payload POST) - ajusta si backend exige otro casing
export interface ComponentCreateDto {
  nombre: string;
  tipo: string;
  estado: string;
  equipoID: number;
}

// Update (payload PUT/PATCH)
export interface ComponentUpdateDto {
  iD_Componente: number;
  nombre?: string;
  tipo?: string;
  estado?: string;
  equipoID?: number;
}