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
            // Verificar si el usuario existe
            var usuario = await _context.Usuarios.FindAsync(request.UsuarioId);
            if (usuario == null)
            {
                return NotFound($"No se encontró un usuario con ID {request.UsuarioId}");
            }

            // Verificar si el usuarioid ya está asignado a otro empleado
            var usuarioYaAsignado = await _context.Empleados.AnyAsync(e => e.UsuarioId == request.UsuarioId);
            if (usuarioYaAsignado)
            {
                return Conflict("Este usuario ya está asignado a otro empleado.");
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
        public async Task<IActionResult> ActualizarEmpleado(int id, [FromBody] EmpleadoUpdate request)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
            {
                return NotFound($"No se encontró el empleado con ID {id}");
            }

            // Validar si el nuevo correo ya está en uso por otro empleado
            if (!string.Equals(empleado.CorreoElectronico, request.CorreoElectronico, StringComparison.OrdinalIgnoreCase))
            {
                var correoEnUso = await _context.Empleados.AnyAsync(e =>
                    e.CorreoElectronico == request.CorreoElectronico && e.ID_Empleado != id);

                if (correoEnUso)
                {
                    return Conflict("El correo electrónico ya está en uso por otro empleado.");
                }
            }

            // Validar si el usuarioid está en uso por otro empleado
            if (empleado.UsuarioId != request.UsuarioId)
            {
                var usuarioYaAsignado = await _context.Empleados.AnyAsync(e =>
                    e.UsuarioId == request.UsuarioId && e.ID_Empleado != id);

                if (usuarioYaAsignado)
                {
                    return Conflict("Este usuario ya está asignado a otro empleado.");
                }

                // validar que el nuevo Usuario exista
                var usuario = await _context.Usuarios.FindAsync(request.UsuarioId);
                if (usuario == null)
                {
                    return NotFound($"No se encontró un usuario con ID {request.UsuarioId}");
                }

                empleado.UsuarioId = request.UsuarioId;
            }

            // Actualizar campos restantes
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

        [HttpGet("listar")]
        public async Task<IActionResult> ListarEmpleados()
        {
            var empleados = await _context.Empleados
                .Include(e => e.Usuario)
                .ToListAsync();

            return Ok(empleados);
        }

        [HttpGet("buscar/{id}")]
        public async Task<IActionResult> BuscarEmpleado(int id)
        {
            var empleado = await _context.Empleados
                .Include(e => e.Usuario)
                .FirstOrDefaultAsync(e => e.ID_Empleado == id);

            if (empleado == null)
                return NotFound("Empleado no encontrado.");

            return Ok(empleado);
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