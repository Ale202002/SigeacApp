using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Services.Implementations
{
    public class PuestoService : IPuestoService
    {
        private readonly SigeacDbContext _context;

        public PuestoService(SigeacDbContext context)
        {
            _context = context;
        }

        public async Task<Puesto> CrearPuesto(Puesto puesto)
        {
            _context.Puestos.Add(puesto);
            await _context.SaveChangesAsync();
            return puesto;
        }

        public async Task<Puesto?> EditarPuesto(int id, Puesto puesto)
        {
            var existente = await _context.Puestos.FindAsync(id);
            if (existente == null) return null;

            existente.Ubicacion = puesto.Ubicacion;
            existente.Estado = puesto.Estado;
            existente.UsuarioID = puesto.UsuarioID;

            await _context.SaveChangesAsync();
            return existente;
        }

        public async Task<IEnumerable<Puesto>> ListarPuestos()
        {
            return await _context.Puestos
                .Include(p => p.Empleado)
                .Include(p => p.Equipo)
                .ToListAsync();
        }

        public async Task<bool> EliminarPuesto(int id)
        {
            var puesto = await _context.Puestos.FindAsync(id);
            if (puesto == null) return false;

            _context.Puestos.Remove(puesto);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
