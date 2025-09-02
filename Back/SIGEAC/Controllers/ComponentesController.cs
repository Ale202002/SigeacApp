using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComponenteController : ControllerBase
    {
        private readonly SigeacDbContext _context;

        public ComponenteController(SigeacDbContext context)
        {
            _context = context;
        }

        // Crear Componente
        [HttpPost("crear")]
        public async Task<IActionResult> CrearComponente([FromBody] ComponenteCreate request)
        {
            var componente = new Componente
            {
                Nombre = request.Nombre,
                Tipo = request.Tipo,
                Estado = request.Estado
            };

            _context.Componentes.Add(componente);
            await _context.SaveChangesAsync();

            return Ok($"Componente {componente.Nombre} creado con éxito (ID: {componente.ID_Componente})");
        }

        // Listar Componentes
        [HttpGet("listar")]
        public async Task<ActionResult<IEnumerable<Componente>>> ListarComponentes()
        {
            var componentes = await _context.Componentes
                .Include(c => c.Equipo) // muestra el equipo asignado (si lo tiene)
                .ToListAsync();

            return Ok(componentes);
        }

        // Editar Componente
        [HttpPut("editar/{id}")]
        public async Task<IActionResult> EditarComponente(int id, [FromBody] ComponenteUpdate request)
        {
            var componente = await _context.Componentes.FindAsync(id);
            if (componente == null)
                return NotFound($"Componente con ID {id} no encontrado");

            componente.Nombre = request.Nombre;
            componente.Tipo = request.Tipo;
            componente.Estado = request.Estado;
            componente.EquipoID = request.EquipoID; // permite asignar/desasignar equipo

            await _context.SaveChangesAsync();

            return Ok($"Componente {componente.Nombre} actualizado con éxito");
        }

        //  Eliminar Componente
        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarComponente(int id)
        {
            var componente = await _context.Componentes.FindAsync(id);
            if (componente == null)
                return NotFound($"Componente con ID {id} no encontrado");

            _context.Componentes.Remove(componente);
            await _context.SaveChangesAsync();

            return Ok($"Componente {componente.Nombre} eliminado con éxito");
        }
    }
}

