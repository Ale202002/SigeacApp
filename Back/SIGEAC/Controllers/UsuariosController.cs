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

        [HttpPut("modificar/{id}")]
        public async Task<IActionResult> ModificarUsuario(int id, [FromBody] UsuarioUpdate usuarioUpdate)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound($"No se encontró el usuario con ID {id}");
            }

            // Verificar si el nuevo email ya existe (y no es del mismo usuario)
            if (!string.Equals(usuario.Email, usuarioUpdate.Email, StringComparison.OrdinalIgnoreCase))
            {
                var emailEnUso = await _context.Usuarios.AnyAsync(u => u.Email == usuarioUpdate.Email);
                if (emailEnUso)
                {
                    return Conflict("El email ya está en uso por otro usuario.");
                }
            }

            // Actualizar campos permitidos
            usuario.Nombre = usuarioUpdate.Nombre;
            usuario.Email = usuarioUpdate.Email;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                usuario.ID_Usuario,
                usuario.Nombre,
                usuario.Email,
                usuario.Rol
            });
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound($"No se encontró el usuario con ID {id}");
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return Ok($"Usuario con ID {id} eliminado correctamente.");
        }

    }
}
