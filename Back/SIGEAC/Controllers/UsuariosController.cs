using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;
using System.Threading.Tasks;



namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UsuariosController : ControllerBase
    {
        private readonly SigeacDbContext _context;

        public UsuariosController(SigeacDbContext context)
        {
            _context = context;
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearUsuario([FromBody] UsuarioCreate request)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Email == request.Email))
            {
                return Conflict("Ya existe un usuario con ese email.");
            }

            var nuevoUsuario = new Usuario
            {
                Nombre = request.Nombre,
                Rol = request.Rol,
                Email = request.Email,
                Contraseña = request.Contraseña 
            };

            _context.Usuarios.Add(nuevoUsuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CrearUsuario), new { id = nuevoUsuario.ID_Usuario }, new
            {
                nuevoUsuario.ID_Usuario,
                nuevoUsuario.Nombre,
                nuevoUsuario.Email,
                nuevoUsuario.Rol
            });
        }
    }
}
