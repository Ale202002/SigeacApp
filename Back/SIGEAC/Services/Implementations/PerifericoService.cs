using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Services.Implementations
{
    public class PerifericoService : IPerifericoService
    {
        private readonly SigeacDbContext _context;

        public PerifericoService(SigeacDbContext context)
        {
            _context = context;
        }

        public async Task<Periferico> CrearPeriferico(Periferico periferico)
        {
            _context.Perifericos.Add(periferico);
            await _context.SaveChangesAsync();
            return periferico;
        }

        public async Task<Periferico?> EditarPeriferico(int id, Periferico periferico)
        {
            var existente = await _context.Perifericos.FindAsync(id);
            if (existente == null) return null;

            existente.Nombre = periferico.Nombre;
            existente.Tipo = periferico.Tipo;
            existente.Estado = periferico.Estado;

            await _context.SaveChangesAsync();
            return existente;
        }

        public async Task<IEnumerable<Periferico>> ListarPerifericos()
        {
            return await _context.Perifericos
                .Include(p => p.Equipo) // para traer el equipo asignado si lo tiene
                .ToListAsync();
        }

        public async Task<bool> EliminarPeriferico(int id)
        {
            var periferico = await _context.Perifericos.FindAsync(id);
            if (periferico == null) return false;

            _context.Perifericos.Remove(periferico);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
