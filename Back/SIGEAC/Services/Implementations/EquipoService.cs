using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Services.Implementations
{
    public class EquipoService : IEquipoService
    {
        private readonly SigeacDbContext _context;

        public EquipoService(SigeacDbContext context)
        {
            _context = context;
        }

        public async Task<Equipo> CrearEquipo(Equipo equipo, List<int>? usuariosAutorizadosIds)
        {
            if (usuariosAutorizadosIds != null)
            {
                equipo.UsuariosAutorizados = await _context.Usuarios
                    .Where(u => usuariosAutorizadosIds.Contains(u.ID_Usuario))
                    .ToListAsync();
            }

            _context.Equipos.Add(equipo);
            await _context.SaveChangesAsync();
            return equipo;
        }

        public async Task<Equipo?> EditarEquipo(int id, Equipo equipo, List<int>? usuariosAutorizadosIds)
        {
            var existente = await _context.Equipos
                .Include(e => e.UsuariosAutorizados)
                .FirstOrDefaultAsync(e => e.ID_Equipo == id);

            if (existente == null) return null;

            // Actualizar campos
            _context.Entry(existente).CurrentValues.SetValues(equipo);

            if (usuariosAutorizadosIds != null)
            {
                existente.UsuariosAutorizados = await _context.Usuarios
                    .Where(u => usuariosAutorizadosIds.Contains(u.ID_Usuario))
                    .ToListAsync();
            }

            await _context.SaveChangesAsync();
            return existente;
        }

        public async Task<IEnumerable<Equipo>> ListarEquipos()
        {
            return await _context.Equipos
                .Include(e => e.Puesto)
                .Include(e => e.EmpleadoAsignado)
                .Include(e => e.UsuariosAutorizados)
                .Include(e => e.Componentes)
                .Include(e => e.Perifericos)
                .ToListAsync();
        }

        public async Task<bool> EliminarEquipo(int id)
        {
            var equipo = await _context.Equipos.FindAsync(id);
            if (equipo == null) return false;

            _context.Equipos.Remove(equipo);
            await _context.SaveChangesAsync();
            return true;
        }

        // ------- Componentes -------
        public async Task<(Equipo? equipo, Componente? componente, string? error)> AsignarComponente(int equipoId, int componenteId)
        {
            var equipo = await _context.Equipos.Include(e => e.Componentes)
                .FirstOrDefaultAsync(e => e.ID_Equipo == equipoId);
            if (equipo == null) return (null, null, $"Equipo {equipoId} no encontrado.");

            var componente = await _context.Componentes.FindAsync(componenteId);
            if (componente == null) return (equipo, null, $"Componente {componenteId} no encontrado.");

            if (componente.EquipoID != null) return (equipo, componente, "El componente ya está asignado a otro equipo.");

            componente.EquipoID = equipoId;
            equipo.Componentes.Add(componente);

            await _context.SaveChangesAsync();
            return (equipo, componente, null);
        }

        public async Task<(Equipo? equipo, Componente? componente, string? error)> DesasignarComponente(int equipoId, int componenteId)
        {
            var equipo = await _context.Equipos.Include(e => e.Componentes)
                .FirstOrDefaultAsync(e => e.ID_Equipo == equipoId);
            if (equipo == null) return (null, null, $"Equipo {equipoId} no encontrado.");

            var componente = equipo.Componentes.FirstOrDefault(c => c.ID_Componente == componenteId);
            if (componente == null) return (equipo, null, $"El componente {componenteId} no está asignado a este equipo.");

            componente.EquipoID = null;
            equipo.Componentes.Remove(componente);

            await _context.SaveChangesAsync();
            return (equipo, componente, null);
        }

        // ------- Periféricos -------
        public async Task<(Equipo? equipo, Periferico? periferico, string? error)> AsignarPeriferico(int equipoId, int perifericoId)
        {
            var equipo = await _context.Equipos.Include(e => e.Perifericos)
                .FirstOrDefaultAsync(e => e.ID_Equipo == equipoId);
            if (equipo == null) return (null, null, $"Equipo {equipoId} no encontrado.");

            var periferico = await _context.Perifericos.FindAsync(perifericoId);
            if (periferico == null) return (equipo, null, $"Periférico {perifericoId} no encontrado.");

            if (periferico.EquipoID != null) return (equipo, periferico, "El periférico ya está asignado a otro equipo.");

            periferico.EquipoID = equipoId;
            equipo.Perifericos.Add(periferico);

            await _context.SaveChangesAsync();
            return (equipo, periferico, null);
        }

        public async Task<(Equipo? equipo, Periferico? periferico, string? error)> DesasignarPeriferico(int equipoId, int perifericoId)
        {
            var equipo = await _context.Equipos.Include(e => e.Perifericos)
                .FirstOrDefaultAsync(e => e.ID_Equipo == equipoId);
            if (equipo == null) return (null, null, $"Equipo {equipoId} no encontrado.");

            var periferico = equipo.Perifericos.FirstOrDefault(p => p.ID_Periferico == perifericoId);
            if (periferico == null) return (equipo, null, $"El periférico {perifericoId} no está asignado a este equipo.");

            periferico.EquipoID = null;
            equipo.Perifericos.Remove(periferico);

            await _context.SaveChangesAsync();
            return (equipo, periferico, null);
        }
    }
}
