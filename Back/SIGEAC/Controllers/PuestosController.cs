using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;



namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PuestosController : ControllerBase
    {
        private readonly SigeacDbContext _context;

        public PuestosController(SigeacDbContext context)
        {
            _context = context;
        }

        // Crear Puesto
        [HttpPost("crear")]
        public async Task<IActionResult> Crear([FromBody] PuestoCreate request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var nuevoPuesto = new Puesto
            {
                Ubicacion = request.Ubicacion,
                Estado = request.Estado,
                UsuarioID = request.UsuarioID,
            };

            _context.Puestos.Add(nuevoPuesto);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Puesto creado exitosamente",
                puesto = new
                {
                    nuevoPuesto.ID_Puesto,
                    nuevoPuesto.Ubicacion,
                    nuevoPuesto.Estado,
                    nuevoPuesto.UsuarioID
                }
            });
        }

        // Editar Puesto
        [HttpPut("editar/{id}")]
        public async Task<IActionResult> Editar(int id, [FromBody] PuestoUpdate request)
        {
            var puesto = await _context.Puestos.FindAsync(id);
            if (puesto == null)
                return NotFound("Puesto no encontrado.");

            puesto.Ubicacion = request.Ubicacion;
            puesto.Estado = request.Estado;
            puesto.UsuarioID = request.UsuarioID;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Puesto editado correctamente",
                puesto = new
                {
                    puesto.ID_Puesto,
                    puesto.Ubicacion,
                    puesto.Estado,
                    puesto.UsuarioID
                }
            });
        }

        [HttpGet("listar")]
        public async Task<IActionResult> Listar()
        {
            var puestos = await _context.Puestos
                .Include(p => p.Empleado)
                .Include(p => p.Equipo)
                .ToListAsync();

            return Ok(puestos);
        }

        // Eliminar Puesto
        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var puesto = await _context.Puestos.FindAsync(id);
            if (puesto == null)
                return NotFound("Puesto no encontrado.");

            _context.Puestos.Remove(puesto);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Puesto eliminado con éxito",
                puesto = new
                {
                    puesto.ID_Puesto,
                    puesto.Ubicacion,
                    puesto.Estado,
                    puesto.UsuarioID
                }
            });
        }
    }
}
