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

            return Ok(new
            {
                mensaje = "Componente creado con éxito",
                componente = new
                {
                    componente.ID_Componente,
                    componente.Nombre,
                    componente.Tipo,
                    componente.Estado
                }
            });
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

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Componente actualizado con éxito",
                componente = new
                {
                    componente.ID_Componente,
                    componente.Nombre,
                    componente.Tipo,
                    componente.Estado
                }
            });
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

        // Eliminar Componente
        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarComponente(int id)
        {
            var componente = await _context.Componentes.FindAsync(id);
            if (componente == null)
                return NotFound($"Componente con ID {id} no encontrado");

            _context.Componentes.Remove(componente);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Componente eliminado con éxito",
                componente = new
                {
                    componente.ID_Componente,
                    componente.Nombre,
                    componente.Tipo,
                    componente.Estado
                }
            });
        }
    }
}

