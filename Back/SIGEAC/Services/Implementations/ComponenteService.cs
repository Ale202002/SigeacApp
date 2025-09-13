using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.DTOs;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Services.Implementations
{
    public class ComponenteService : IComponenteService
    {
        private readonly SigeacDbContext _context;

        public ComponenteService(SigeacDbContext context)
        {
            _context = context;
        }

        public async Task<Componente> CrearComponente(ComponenteCreate request)
        {
            var componente = new Componente
            {
                Nombre = request.Nombre,
                Tipo = request.Tipo,
                Estado = request.Estado
            };

            _context.Componentes.Add(componente);
            await _context.SaveChangesAsync();

            return componente;
        }

        public async Task<Componente?> EditarComponente(int id, ComponenteUpdate request)
        {
            var componente = await _context.Componentes.FindAsync(id);
            if (componente == null) return null;

            componente.Nombre = request.Nombre;
            componente.Tipo = request.Tipo;
            componente.Estado = request.Estado;

            await _context.SaveChangesAsync();
            return componente;
        }

        public async Task<IEnumerable<Componente>> ListarComponentes()
        {
            return await _context.Componentes
                .Include(c => c.Equipo) // muestra el equipo asignado (si lo tiene)
                .ToListAsync();
        }

        public async Task<Componente?> EliminarComponente(int id)
        {
            var componente = await _context.Componentes.FindAsync(id);
            if (componente == null) return null;

            _context.Componentes.Remove(componente);
            await _context.SaveChangesAsync();

            return componente;
        }
    }
}
