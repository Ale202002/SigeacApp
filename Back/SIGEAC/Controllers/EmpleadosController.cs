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
            // Validar si el usuario existe
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

            return CreatedAtAction(nameof(CrearEmpleado), new { id = nuevoEmpleado.ID_Empleado }, nuevoEmpleado);
        }
    }
}