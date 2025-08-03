using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpleadosController : ControllerBase
    {
        private readonly SigeacDbContext _context;

        public EmpleadosController(SigeacDbContext context)
        {
            _context = context;
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearEmpleado([FromBody] EmpleadoCreate request)
        {
            var usuario = await _context.Usuarios.FindAsync(request.UsuarioId);
            if (usuario == null)
            {
                return NotFound($"No se encontró un usuario con ID {request.UsuarioId}");
            }

            var nuevoEmpleado = new Empleado
            {
                NombreCompleto = request.NombreCompleto,
                DNI = request.DNI,
                CorreoElectronico = request.CorreoElectronico,
                UsuarioId = request.UsuarioId
            };

            _context.Empleados.Add(nuevoEmpleado);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CrearEmpleado), new { id = nuevoEmpleado.ID_Empleado }, new
            {
                nuevoEmpleado.ID_Empleado,
                nuevoEmpleado.NombreCompleto,
                nuevoEmpleado.DNI,
                nuevoEmpleado.CorreoElectronico,
                nuevoEmpleado.UsuarioId
            });
        }

        [HttpPut("modificar/{id}")]
        public async Task<IActionResult> ModificarEmpleado(int id, [FromBody] EmpleadoUpdate request)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
            {
                return NotFound($"No se encontró el empleado con ID {id}");
            }

            if (!string.Equals(empleado.CorreoElectronico, request.CorreoElectronico, StringComparison.OrdinalIgnoreCase))
            {
                var correoEnUso = await _context.Empleados.AnyAsync(e =>
                    e.CorreoElectronico == request.CorreoElectronico && e.ID_Empleado != id);

                if (correoEnUso)
                {
                    return Conflict("El correo electrónico ya está en uso por otro empleado.");
                }
            }

            empleado.NombreCompleto = request.NombreCompleto;
            empleado.DNI = request.DNI;
            empleado.CorreoElectronico = request.CorreoElectronico;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                empleado.ID_Empleado,
                empleado.NombreCompleto,
                empleado.DNI,
                empleado.CorreoElectronico,
                empleado.UsuarioId
            });
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarEmpleado(int id)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
            {
                return NotFound($"No se encontró el empleado con ID {id}");
            }

            _context.Empleados.Remove(empleado);
            await _context.SaveChangesAsync();

            return Ok($"Empleado con ID {id} eliminado correctamente.");
        }
    }
}