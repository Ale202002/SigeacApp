using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.DTOs;
using SIGEAC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PerifericoController : ControllerBase
    {
        private readonly SigeacDbContext _context;

        public PerifericoController(SigeacDbContext context)
        {
            _context = context;
        }

        // Crear Periférico
        [HttpPost("crear")]
        public async Task<IActionResult> CrearPeriferico([FromBody] PerifericoCreate request)
        {
            var periferico = new Periferico
            {
                Nombre = request.Nombre,
                Tipo = request.Tipo,
                Estado = request.Estado
            };

            _context.Perifericos.Add(periferico);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Periférico creado con éxito",
                periferico = new
                {
                    periferico.ID_Periferico,
                    periferico.Nombre,
                    periferico.Tipo,
                    periferico.Estado
                }
            });
        }

        // Editar Periférico
        [HttpPut("editar/{id}")]
        public async Task<IActionResult> EditarPeriferico(int id, [FromBody] PerifericoUpdate request)
        {
            var periferico = await _context.Perifericos.FindAsync(id);
            if (periferico == null)
                return NotFound($"Periférico con ID {id} no encontrado");

            periferico.Nombre = request.Nombre;
            periferico.Tipo = request.Tipo;
            periferico.Estado = request.Estado;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Periférico actualizado con éxito",
                periferico = new
                {
                    periferico.ID_Periferico,
                    periferico.Nombre,
                    periferico.Tipo,
                    periferico.Estado
                }
            });
        }

        // Listar Periféricos
        [HttpGet("listar")]
        public async Task<ActionResult<IEnumerable<Periferico>>> ListarPerifericos()
        {
            var perifericos = await _context.Perifericos
                .Include(p => p.Equipo) // muestra el equipo asignado (si lo tiene)
                .ToListAsync();

            return Ok(perifericos);
        }

        // Eliminar Periférico
        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarPeriferico(int id)
        {
            var periferico = await _context.Perifericos.FindAsync(id);
            if (periferico == null)
                return NotFound($"Periférico con ID {id} no encontrado");

            _context.Perifericos.Remove(periferico);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Periférico eliminado con éxito",
                periferico = new
                {
                    periferico.ID_Periferico,
                    periferico.Nombre,
                    periferico.Tipo,
                    periferico.Estado
                }
            });
        }
    }
}

